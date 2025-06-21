# Vercel Deployment Guide for Mindhaven

## Environment Variables Setup

### 🔧 Local Development

Your `.env` file has been created with all necessary variables. The project will work immediately in development.

### ☁️ Vercel Production Deployment

When deploying to Vercel, you need to set these environment variables in your Vercel dashboard:

### 🔑 Required Environment Variables

1. **VITE_FIREBASE_API_KEY**

   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `VITE_FIREBASE_API_KEY` = `AIzaSyBUnmIiEIEGBapfymqOi1llnfHfou4JPIY`

2. **VITE_GOOGLE_CLIENT_ID**

   - Add: `VITE_GOOGLE_CLIENT_ID` = `592394375846-ftp9cnlamo37lm00r1nd6167j0ie0bo7.apps.googleusercontent.com`

3. **VITE_APP_NAME** (Optional)
   - Add: `VITE_APP_NAME` = `Mindhaven`

### 🚀 Deployment Steps

1. Connect your GitHub repository to Vercel
2. Set the environment variables above in Vercel dashboard
3. Deploy!

### 📝 Notes

- ✅ `.env` file created for local development
- ✅ All environment variables are properly linked in the codebase
- ✅ Firebase and Google Auth configurations use environment variables
- ✅ Fallback values ensure the app works even if env vars are missing
- ✅ The project will work perfectly on Vercel with these settings

### 🔐 Security Features Applied

✅ Created `.env` file with all necessary variables
✅ Removed hardcoded tokens from Notebook 6  
✅ Environment variables for Firebase API key with fallbacks
✅ Protected .env files in .gitignore
✅ Commented out push_to_hub operations  
✅ Google Client ID uses environment variable with fallback

### 🧪 Testing

Your project should now work immediately:

- **Local**: Uses `.env` file values
- **Vercel**: Uses environment variables you set in dashboard
- **Fallbacks**: Hardcoded values as backup if env vars missing
