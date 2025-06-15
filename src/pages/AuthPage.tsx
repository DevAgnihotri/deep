import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, googleProvider, githubProvider } from "@/lib/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./AuthPage.css";

export default function AuthPage() {
  const [isActive, setIsActive] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check for redirect result on component mount
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          // User signed in via redirect
          navigate("/home");
        }
      } catch (err: unknown) {
        console.error("Redirect result error:", err);
        setError(err instanceof Error ? err.message : String(err));
      }
    };
    
    checkRedirectResult();
  }, [navigate]);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
      navigate("/home");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    }
    setLoading(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!registerForm.username || !registerForm.email || !registerForm.password) {
        setError("All fields are required.");
        setLoading(false);
        return;
      }
      const userCred = await createUserWithEmailAndPassword(auth, registerForm.email, registerForm.password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        name: registerForm.username,
        email: registerForm.email,
        createdAt: new Date()
      });
      navigate("/home");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    }
    setLoading(false);
  };  const handleGoogleAuth = async () => {
    setError("");
    setLoading(true);
    
    console.log("🔥 Starting Google authentication...");
    console.log("Auth instance:", auth);
    console.log("GoogleProvider:", googleProvider);
    
    try {
      // Try popup first
      const result = await signInWithPopup(auth, googleProvider);
      console.log("✅ Google auth successful:", result.user);
      navigate("/home");
    } catch (err: unknown) {
      const firebaseError = err as { code?: string; message?: string };
      console.error("❌ Google auth error:", firebaseError);
      
      // Handle specific error cases
      if (firebaseError.code === 'auth/operation-not-allowed') {
        setError("Google Sign-In is not enabled. Please contact support or try email/password login.");
      } else if (firebaseError.code === 'auth/popup-blocked' || 
          firebaseError.code === 'auth/popup-closed-by-user' ||
          firebaseError.message?.includes('popup')) {
        console.log("🔄 Popup blocked, trying redirect...");
        try {
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr: unknown) {
          console.error("❌ Redirect auth error:", redirectErr);
          setError("Authentication failed. Please try again or use email/password login.");
        }
      } else if (firebaseError.code === 'auth/configuration-not-found') {
        setError("Google Sign-In is not configured. Please contact support.");
      } else if (firebaseError.code === 'auth/unauthorized-domain') {
        setError("This domain is not authorized. Please contact support.");
      } else {
        setError(firebaseError.message || "Authentication failed. Please try again.");
      }
    }
    setLoading(false);
  };

  const handleGithubAuth = async () => {
    setError("");
    setLoading(true);
    try {
      // Try popup first
      await signInWithPopup(auth, githubProvider);
      navigate("/home");
    } catch (err: unknown) {
      const firebaseError = err as { code?: string; message?: string };
      
      // If popup is blocked, fall back to redirect
      if (firebaseError.code === 'auth/popup-blocked' || 
          firebaseError.code === 'auth/popup-closed-by-user' ||
          firebaseError.message?.includes('popup')) {
        try {
          // Use redirect as fallback
          await signInWithRedirect(auth, githubProvider);
          // Note: redirect will reload the page, so we don't need to navigate here
          return;
        } catch (redirectErr: unknown) {
          setError("Authentication failed. Please try again.");
        }
      } else {
        setError(firebaseError.message || String(err));
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-blue-200">
      <div className={`auth-container ${isActive ? 'active' : ''}`}>
        {/* Login Form */}        <div className="form-box login">
          <form onSubmit={handleLoginSubmit}>            <div className="flex items-center justify-center mb-6">
              <img 
                src="/logo.png" 
                alt="Mindhaven Logo" 
                className="w-12 h-12 object-contain mr-3"
              />
              <h1 className="text-2xl font-bold">Mindhaven Login</h1>
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={loginForm.email}
                onChange={handleLoginChange}
              />
              <i className='bx bxs-envelope'></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={loginForm.password}
                onChange={handleLoginChange}
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="forgot-link">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>            <p>or login with social platforms</p>
            <div className="social-icons">
              <button type="button" onClick={handleGoogleAuth} disabled={loading} title="Sign in with Google">
                <i className='bx bxl-google'></i>
              </button>
              <button type="button" onClick={handleGithubAuth} disabled={loading} title="Sign in with GitHub">
                <i className='bx bxl-github'></i>
              </button>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Having trouble with social login? Try email/password above.
            </div>
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>

        {/* Register Form */}        <div className="form-box register">
          <form onSubmit={handleRegisterSubmit}>            <div className="flex items-center justify-center mb-6">
              <img 
                src="/logo.png" 
                alt="Mindhaven Logo" 
                className="w-12 h-12 object-contain mr-3"
              />
              <h1 className="text-2xl font-bold">Registration</h1>
            </div>
            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={registerForm.username}
                onChange={handleRegisterChange}
              />
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={registerForm.email}
                onChange={handleRegisterChange}
              />
              <i className='bx bxs-envelope'></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={registerForm.password}
                onChange={handleRegisterChange}
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>            <p>or register with social platforms</p>
            <div className="social-icons">
              <button type="button" onClick={handleGoogleAuth} disabled={loading} title="Sign up with Google">
                <i className='bx bxl-google'></i>
              </button>
              <button type="button" onClick={handleGithubAuth} disabled={loading} title="Sign up with GitHub">
                <i className='bx bxl-github'></i>
              </button>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Having trouble with social login? Try email/password above.
            </div>
            {error && <div className="error-message">{error}</div>}
          </form>
        </div>

        {/* Toggle Box */}
        <div className="toggle-box">          <div className="toggle-panel toggle-left">            <h1>Hello, and Welcome!</h1>
            <p>Don't have a Mindhaven account?</p>
            <button className="btn register-btn" onClick={() => setIsActive(true)}>
              Register
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have a Mindhaven account?</p>
            <button className="btn login-btn" onClick={() => setIsActive(false)}>
              Login
            </button></div>
        </div>
      </div>
    </div>
  );
}
