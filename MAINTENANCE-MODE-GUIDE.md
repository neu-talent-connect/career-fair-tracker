# 🔒 Maintenance Mode Guide

## ✅ What Was Implemented

Your Career Tracker now has a **maintenance mode toggle** for authentication!

When disabled, users see a friendly message instead of login/signup forms.

---

## 🎛️ How to Control Authentication

### **Enable/Disable Authentication**

Edit `.env.local`:

```bash
# Disable authentication (maintenance mode)
NEXT_PUBLIC_ALLOW_AUTH="false"

# Enable authentication (normal operation)
NEXT_PUBLIC_ALLOW_AUTH="true"
```

**Then restart your dev server:**
```bash
# Stop server (Ctrl+C)
npm run dev
```

---

## 🎨 What Users See

### **When NEXT_PUBLIC_ALLOW_AUTH="false"** (Current State)

**Login Page** (`/login`):
```
┌────────────────────────────────────┐
│   🔒 Lock Icon (yellow)           │
│                                    │
│   Login Temporarily Unavailable   │
│                                    │
│   We're currently enhancing our   │
│   authentication and security     │
│   features to better protect      │
│   your data.                      │
│                                    │
│   Login and signup will be        │
│   available again soon.           │
│                                    │
│   [Back to Home]                  │
└────────────────────────────────────┘
```

**Signup Page** (`/signup`):
```
┌────────────────────────────────────┐
│   👤 User Icon (yellow)           │
│                                    │
│   Signups Temporarily Disabled    │
│                                    │
│   We're currently enhancing our   │
│   authentication and security     │
│   features to provide you with    │
│   the best experience.            │
│                                    │
│   New account creation will be    │
│   available again soon.           │
│                                    │
│   [Back to Home]                  │
│   [Existing Users: Login]         │
└────────────────────────────────────┘
```

### **When NEXT_PUBLIC_ALLOW_AUTH="true"**

Normal login and signup forms are shown (once you have email verification configured).

---

## 🚀 Deployment Workflow

### **Step 1: Deploy with Auth Disabled**

Your current setup (`NEXT_PUBLIC_ALLOW_AUTH="false"`):

```bash
# Push to GitHub
git add .
git commit -m "Add maintenance mode for auth"
git push

# Deploy to Vercel
# Set environment variable in Vercel dashboard:
# NEXT_PUBLIC_ALLOW_AUTH = "false"
```

**Result:** Users see maintenance message, can't signup/login

### **Step 2: Complete Email Setup**

When you're ready to enable authentication:

1. Get Resend API key (free at resend.com)
2. Add to Vercel environment variables:
   ```
   RESEND_API_KEY = "re_your_key_here"
   ```
3. Test signup/login flow in production

### **Step 3: Enable Authentication**

When everything works:

1. Update Vercel environment variable:
   ```
   NEXT_PUBLIC_ALLOW_AUTH = "true"
   ```
2. Redeploy (or Vercel auto-redeploys)

**Result:** Users can now signup and login!

---

## 🧪 Testing Locally

### **Test Maintenance Mode (Current)**

1. Make sure `.env.local` has:
   ```bash
   NEXT_PUBLIC_ALLOW_AUTH="false"
   ```

2. Start server:
   ```bash
   npm run dev
   ```

3. Visit pages:
   - http://localhost:3000/login → See maintenance message ✅
   - http://localhost:3000/signup → See maintenance message ✅

### **Test Normal Mode**

1. Update `.env.local`:
   ```bash
   NEXT_PUBLIC_ALLOW_AUTH="true"
   ```

2. Restart server:
   ```bash
   # Ctrl+C to stop
   npm run dev
   ```

3. Visit pages:
   - http://localhost:3000/login → See login form ✅
   - http://localhost:3000/signup → See signup form ✅

---

## 🔍 How It Works

### **Environment Variable**

```bash
NEXT_PUBLIC_ALLOW_AUTH="false"
```

- `NEXT_PUBLIC_` prefix makes it available on client-side
- Read by React components
- Checked before rendering forms

### **Code Check**

In both `login/page.tsx` and `signup/page.tsx`:

```typescript
const AUTH_ENABLED = process.env.NEXT_PUBLIC_ALLOW_AUTH === 'true';

if (!AUTH_ENABLED) {
  return <MaintenanceMode />;  // Show friendly message
}

return <AuthForm />;  // Show login/signup form
```

---

## 📋 Deployment Checklist

### **Before Going Live:**

- [ ] Set `NEXT_PUBLIC_ALLOW_AUTH="false"` in production
- [ ] Deploy to Vercel/hosting
- [ ] Verify maintenance message shows on live site
- [ ] Test that users can't access signup/login

### **Before Enabling Auth:**

- [ ] Add Resend API key to production env vars
- [ ] Test email delivery works
- [ ] Verify email verification flow works
- [ ] Set `NEXT_PUBLIC_ALLOW_AUTH="true"` in production
- [ ] Redeploy
- [ ] Test signup → verification → login flow

---

## ⚙️ Environment Variables Summary

### **Development (`.env.local`):**

```bash
DATABASE_URL="your-supabase-url"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
RESEND_API_KEY="re_your_key"  # Add when ready to test email
NEXT_PUBLIC_ALLOW_AUTH="false"  # Set to "true" to enable auth
```

### **Production (Vercel Dashboard):**

```bash
DATABASE_URL="your-supabase-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-app.vercel.app"
RESEND_API_KEY="re_your_key"  # Add when ready
NEXT_PUBLIC_ALLOW_AUTH="false"  # Change to "true" when ready
```

---

## 💡 Pro Tips

1. **Keep Existing Users Working**
   - Maintenance mode only affects login/signup pages
   - Already logged-in users can still use the app
   - Session remains valid

2. **Customize Messages**
   - Edit `app/login/page.tsx` to change wording
   - Edit `app/signup/page.tsx` to change wording
   - Update icons, colors, or add more info

3. **Add Expected Date**
   - Add "Available starting [date]" to message
   - Helps set user expectations

4. **Monitor Access Attempts**
   - Check analytics for login/signup page views
   - Gauge interest while in maintenance mode

---

## 🐛 Troubleshooting

### **"Still seeing login form after setting to false"**

**Solution:**
1. Check `.env.local` has `NEXT_PUBLIC_ALLOW_AUTH="false"`
2. Make sure you restarted dev server
3. Clear browser cache (Cmd+Shift+R)
4. Check browser console for env var value

### **"Maintenance mode shows in production but shouldn't"**

**Check Vercel environment variable:**
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Find `NEXT_PUBLIC_ALLOW_AUTH`
3. Make sure it's set to `"true"` for production
4. Redeploy

### **"Variable not working in production"**

**Remember:**
- Must include `NEXT_PUBLIC_` prefix for client-side access
- Must redeploy after changing environment variables
- Check Vercel deployment logs

---

## 🎯 Quick Commands

```bash
# View current setting
cat .env.local | grep NEXT_PUBLIC_ALLOW_AUTH

# Enable auth
sed -i '' 's/NEXT_PUBLIC_ALLOW_AUTH="false"/NEXT_PUBLIC_ALLOW_AUTH="true"/' .env.local

# Disable auth
sed -i '' 's/NEXT_PUBLIC_ALLOW_AUTH="true"/NEXT_PUBLIC_ALLOW_AUTH="false"/' .env.local

# Restart server
npm run dev
```

---

## ✅ Current Status

- ✅ Maintenance mode implemented
- ✅ Environment variable configured
- ✅ Both login and signup pages protected
- ✅ Friendly user messages
- ✅ Easy to toggle on/off
- ✅ Ready to deploy!

**Current Setting:** Authentication is **DISABLED** (`NEXT_PUBLIC_ALLOW_AUTH="false"`)

**To enable:** Change to `"true"` and restart server

---

## 🚀 You're All Set!

Your app is ready to deploy with authentication disabled. When you're ready to enable it:

1. Complete email verification setup (get Resend API key)
2. Test the full flow locally
3. Update production environment variable
4. Flip `NEXT_PUBLIC_ALLOW_AUTH` to `"true"`
5. Launch! 🎉
