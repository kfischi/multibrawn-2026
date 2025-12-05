# 🚀 Netlify Deployment Guide for MULTIBRAWN

---

## ✅ **Prerequisites**

1. ✅ GitHub account
2. ✅ Netlify account (free)
3. ✅ Project code ready
4. ✅ Build successful

---

## 📦 **Step 1: Push to GitHub**

### Option A: New Repository

```bash
cd /path/to/multibrawn-next

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "🎉 Initial commit - MULTIBRAWN website"

# Create new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/multibrawn-next.git
git branch -M main
git push -u origin main
```

### Option B: Existing Repository

```bash
cd /path/to/multibrawn-next

# Add files
git add .

# Commit
git commit -m "✨ Add MULTIBRAWN Next.js website"

# Push
git push origin main
```

---

## 🌐 **Step 2: Deploy to Netlify**

### A. Connect to Netlify

1. **Login to Netlify:**
   - Go to: https://app.netlify.com
   - Login with GitHub account

2. **Add new site:**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Authorize Netlify to access your repos

3. **Select repository:**
   - Find `multibrawn-next` repository
   - Click on it

### B. Configure Build Settings

Netlify should auto-detect Next.js, but verify:

```
Build command: npm run build
Publish directory: .next
```

### C. Add Environment Variables

**CRITICAL:** Add these in "Site settings" → "Environment variables":

```bash
GEMINI_API_KEY = AIzaSyAhUtT-EggnCuN3RnvZKJI0ta46_SHdn4Y
NEXT_PUBLIC_WHATSAPP_NUMBER = 972523983394
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = dptyfvwyo
```

**How to add:**
1. Go to Site Settings
2. Click "Environment variables"
3. Click "Add a variable"
4. Add each variable above
5. Click "Save"

### D. Deploy!

1. Click "Deploy site"
2. Wait 2-3 minutes for build
3. Site will be live at: `random-name-123.netlify.app`

---

## 🌍 **Step 3: Custom Domain (multibrawn.co.il)**

### A. Add Domain in Netlify

1. Go to "Domain settings"
2. Click "Add domain"
3. Enter: `multibrawn.co.il`
4. Click "Verify"

### B. Update DNS Records

Netlify will provide DNS records. You need to add them to your domain provider:

**Option 1: Netlify DNS (Recommended)**
```
Nameservers:
dns1.p03.nsone.net
dns2.p03.nsone.net
dns3.p03.nsone.net
dns4.p03.nsone.net
```

**Option 2: CNAME (If using another DNS provider)**
```
Type: CNAME
Name: www
Value: [your-site].netlify.app
```

```
Type: A
Name: @
Value: 75.2.60.5 (Netlify Load Balancer)
```

### C. Wait for DNS Propagation

- Usually takes 24-48 hours
- Check status: https://dnschecker.org

### D. Enable HTTPS

1. Once domain is verified
2. Go to "HTTPS" → "Verify DNS configuration"
3. Click "Provision certificate"
4. Wait 30 seconds
5. ✅ HTTPS enabled!

---

## 🔄 **Step 4: Automatic Deployments**

**Netlify automatically deploys when you push to GitHub!**

```bash
# Make changes
git add .
git commit -m "Update homepage"
git push origin main

# Netlify automatically builds and deploys! 🎉
```

---

## 🛠️ **Useful Netlify Commands**

### Install Netlify CLI (Optional)

```bash
npm install -g netlify-cli

# Login
netlify login

# Link site
netlify link

# Deploy from CLI
netlify deploy --prod
```

---

## 📊 **Monitoring & Analytics**

### Netlify Analytics (Paid)
- Real-time visitor stats
- Bandwidth usage
- Popular pages

### Free Alternatives:
1. **Google Analytics:**
   - Add tracking ID to `.env.local`
   - Netlify will inject it

2. **Cloudflare:**
   - Free analytics
   - DDoS protection
   - CDN

---

## 🐛 **Troubleshooting**

### Build Fails

1. Check build logs in Netlify
2. Verify environment variables
3. Test locally: `npm run build`

### Site is Slow

1. Enable Netlify CDN (automatic)
2. Optimize images with Cloudinary
3. Enable caching headers (already configured)

### HTTPS Not Working

1. Check DNS records
2. Wait 24-48 hours for propagation
3. Re-provision certificate in Netlify

### Environment Variables Not Working

1. Make sure they're added in Netlify UI
2. Redeploy after adding variables
3. Check variable names (case-sensitive)

---

## 📋 **Checklist**

- [ ] Code pushed to GitHub
- [ ] Connected to Netlify
- [ ] Environment variables added
- [ ] First deployment successful
- [ ] Site loads correctly
- [ ] ChatBot working (Gemini API)
- [ ] WhatsApp button working
- [ ] All pages accessible
- [ ] Custom domain added (multibrawn.co.il)
- [ ] DNS records updated
- [ ] HTTPS enabled
- [ ] Mobile responsive
- [ ] Accessibility menu working

---

## 🎉 **You're Live!**

Your MULTIBRAWN website is now live on the internet!

**URLs:**
- Netlify URL: `https://[your-site].netlify.app`
- Custom Domain: `https://multibrawn.co.il` (after DNS)

**Next Steps:**
1. Test everything on live site
2. Share with friends/family
3. Post on social media
4. Start getting bookings! 💰

---

## 📞 **Need Help?**

- Netlify Docs: https://docs.netlify.com
- Netlify Support: https://support.netlify.com
- Next.js Docs: https://nextjs.org/docs

---

**Good luck! 🚀**
