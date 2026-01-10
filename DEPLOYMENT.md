# Deployment Guide

## Quick Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications and it's free for personal projects.

### Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Phase 1: Next.js migration complete"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Done!** 
   Your app will be live at `https://your-project-name.vercel.app`

### Custom Domain (Optional)
- In Vercel dashboard, go to Settings → Domains
- Add your custom domain
- Follow DNS configuration instructions

---

## Alternative: Deploy to Netlify

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click "Deploy"

---

## Manual Deployment (VPS/Server)

### Requirements:
- Node.js 18+
- npm or yarn
- Process manager (PM2 recommended)

### Steps:

1. **Clone and install**
   ```bash
   git clone <your-repo>
   cd career-fair-tracker
   npm install
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Install PM2**
   ```bash
   npm install -g pm2
   ```

4. **Start the app**
   ```bash
   pm2 start npm --name "career-tracker" -- start
   pm2 save
   pm2 startup
   ```

5. **Setup Nginx reverse proxy**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Environment Variables

Currently, the app uses localStorage and doesn't need environment variables.

In Phase 2 (with database and auth), you'll need:

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://yourdomain.com
GOOGLE_CLIENT_ID=your-google-id
GOOGLE_CLIENT_SECRET=your-google-secret
```

---

## Post-Deployment Checklist

- [ ] Test all features (Dashboard, Career Fairs, Applications, Networking, Resources)
- [ ] Test dark mode toggle
- [ ] Test responsive design on mobile
- [ ] Test data persistence (add/edit/delete)
- [ ] Test CSV export
- [ ] Verify all animations work
- [ ] Check console for errors
- [ ] Test in different browsers (Chrome, Firefox, Safari)

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Deployment Issues on Vercel
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `dependencies`, not `devDependencies`
- Verify Node.js version matches (18+)

---

## Performance Optimization

Already included:
- ✅ Static page generation
- ✅ Code splitting
- ✅ Image optimization (when images are added)
- ✅ Minified CSS/JS
- ✅ Tree-shaking

Future optimizations:
- Add Redis caching (Phase 2)
- CDN for static assets
- Database query optimization
- Real-time updates via WebSockets

---

## Monitoring

Recommended tools:
- **Vercel Analytics**: Built-in, free for hobby projects
- **Sentry**: Error tracking
- **Google Analytics**: User analytics
- **PostHog**: Product analytics

---

## Questions?

For deployment help:
- Next.js Docs: https://nextjs.org/docs/deployment
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
