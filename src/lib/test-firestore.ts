// Test Firestore connection and permissions
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "./firebase";

// Extend window type for debugging functions
declare global {
  interface Window {
    testFirestoreConnection: () => Promise<{ success: boolean; error?: string; data?: unknown; code?: string }>;
    testFirestoreRulesDeployment: () => Promise<{ success: boolean; error?: string; message?: string; solution?: string }>;
  }
}

export const testFirestoreConnection = async () => {
  console.log("🔥 Testing Firestore Connection");
  console.log("🔥 Database instance:", db);
  console.log("🔥 Auth instance:", auth);
  console.log("🔥 Auth current user:", auth.currentUser);
  console.log("🔥 Firebase app name:", db.app.name);
  console.log("🔥 Firebase app options:", db.app.options);
  
  // Wait for auth state to be ready
  await new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("🔥 Auth state changed:", user ? `User: ${user.uid}` : "No user");
      unsubscribe();
      resolve(user);
    });
  });

  const user = auth.currentUser;
  if (!user) {
    console.error("❌ No authenticated user found");
    console.error("❌ Auth state:", auth);
    console.error("❌ Please make sure you're logged in to test Firestore");
    return { success: false, error: "No authenticated user" };
  }

  console.log("✅ Authenticated user:", user.uid);
  console.log("✅ User email:", user.email);
  console.log("✅ User display name:", user.displayName);
  console.log("✅ User email verified:", user.emailVerified);
  console.log("✅ Firebase project ID:", db.app.options.projectId);
  console.log("✅ Auth domain:", db.app.options.authDomain);

  try {
    // Test write operation
    const testData = {
      testField: "test value",
      timestamp: new Date(),
      uid: user.uid
    };

    console.log("📝 Attempting to write test data...");
    const docRef = doc(db, "userProfiles", user.uid);
    await setDoc(docRef, testData, { merge: true });
    console.log("✅ Write operation successful");

    // Test read operation
    console.log("📖 Attempting to read test data...");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("✅ Read operation successful");
      console.log("📄 Document data:", docSnap.data());
      return { success: true, data: docSnap.data() };
    } else {
      console.log("❌ No document found");
      return { success: false, error: "No document found" };
    }  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    console.error("❌ Firestore test failed:", error);
    console.error("❌ Error code:", firebaseError?.code);
    console.error("❌ Error message:", firebaseError?.message);
    console.error("❌ Full error object:", JSON.stringify(error, null, 2));
    
    // More specific error handling
    if (firebaseError?.code === 'permission-denied') {
      console.error("❌ Permission denied - check Firestore security rules");
      console.error("❌ Make sure rules are deployed in Firebase Console");
      console.error("❌ Collection: userProfiles, Document: " + user.uid);
      return { success: false, error: "Permission denied", code: firebaseError.code };
    } else if (firebaseError?.code === 'unavailable') {
      console.error("❌ Firebase unavailable - check internet connection");
      return { success: false, error: "Firebase unavailable", code: firebaseError.code };
    } else if (firebaseError?.code === 'unauthenticated') {
      console.error("❌ User not authenticated properly");
      return { success: false, error: "User not authenticated", code: firebaseError.code };
    } else if (firebaseError?.code === 'failed-precondition') {
      console.error("❌ Firebase emulator might be running or indexing issue");
      return { success: false, error: "Failed precondition", code: firebaseError.code };
    } else {
      console.error("❌ Unknown error occurred");
      return { success: false, error: firebaseError?.message || "Unknown error", code: firebaseError?.code };
    }  }
};

// Simple test to check if rules are deployed
export const testFirestoreRulesDeployment = async () => {
  console.log("🔍 Testing Firestore Rules Deployment");
  
  const user = auth.currentUser;
  if (!user) {
    console.error("❌ Please log in first");
    return { success: false, error: "Not authenticated" };
  }

  try {
    // Try to access a document that should exist per our rules
    const docRef = doc(db, "userProfiles", user.uid);
    console.log("📝 Testing minimal write operation...");
    
    // Try a simple set operation
    await setDoc(docRef, { 
      lastTest: new Date().toISOString(),
      testType: "rules-deployment-check"
    }, { merge: true });
    
    console.log("✅ Rules deployment test passed - write operation successful");
    return { success: true, message: "Rules are deployed correctly" };
    
  } catch (error: unknown) {
    const firebaseError = error as { code?: string; message?: string };
    console.error("❌ Rules deployment test failed");
    console.error("❌ Error:", firebaseError);
    
    if (firebaseError?.code === 'permission-denied') {
      console.error("🚨 RULES NOT DEPLOYED: Permission denied suggests rules are not properly deployed in Firebase Console");
      console.error("🔧 Solution: Go to Firebase Console > Firestore Database > Rules and publish the rules");
      return { 
        success: false, 
        error: "Rules not deployed", 
        solution: "Deploy rules in Firebase Console"
      };
    }
    
    return { success: false, error: firebaseError?.message || "Unknown error" };
  }
};

// Add to window for console testing
if (typeof window !== 'undefined') {
  window.testFirestoreConnection = testFirestoreConnection;
  window.testFirestoreRulesDeployment = testFirestoreRulesDeployment;
  console.log("🔧 Available debug functions:");
  console.log("🔧 - testFirestoreConnection() - Full connection test");
  console.log("🔧 - testFirestoreRulesDeployment() - Quick rules deployment test");
}
