# BBOR Website Deployment Guide

## 🚀 PHASE 1: DEPLOY FRONTEND (TODAY)

### Step 1: Initialize Git Repository

```bash
cd /home/claude/bbor-website
git init
git add .
git commit -m "Initial commit - BBOR website"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com
2. Click "New Repository"
3. Name it: `bbor-website`
4. Don't initialize with README (we already have one)
5. Click "Create repository"

### Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/bbor-website.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your `bbor-website` repository
4. Configure:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. Click "Deploy"
6. Wait 2-3 minutes for deployment

### Step 5: Connect Custom Domain

1. In Vercel project settings, go to "Domains"
2. Add `bbor.org` and `www.bbor.org`
3. Vercel will give you DNS records
4. Go to your domain registrar (where you bought bbor.org)
5. Add the DNS records Vercel provided:
   - Type: A Record
   - Name: @
   - Value: 76.76.21.21 (Vercel's IP)
   
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com
6. Wait 24-48 hours for DNS propagation

### Step 6: Test the Site

Visit your Vercel URL (they give you something like `bbor-website-xyz.vercel.app`)
- ✅ Check all pages load
- ✅ Check navigation works
- ✅ Check mobile responsiveness
- ✅ Check images display correctly

---

## 🔧 PHASE 2: BACKEND SETUP (NEXT)

### What We Need to Build:

1. **Express API Server**
   - Contact form endpoint
   - Donation tracking
   - Admin authentication
   - NowPayments webhook handling

2. **PostgreSQL Database**
   - Users table (for account-based donors)
   - Donations table
   - Contact messages table
   - Admin users table
   - News posts table (for admin to create/edit)
   - Gallery images table (for admin to upload)

3. **NowPayments Integration**
   - Create NowPayments account
   - Get API keys (sandbox for testing, live for production)
   - Implement payment flow
   - Handle webhooks
   - White-label the interface

### Backend Deployment (Railway)

1. Create Express server
2. Deploy to Railway
3. Connect PostgreSQL database on Railway
4. Set environment variables
5. Connect frontend to backend API

---

## 📋 CURRENT STATUS

✅ **COMPLETED:**
- Frontend design and development
- All 6 pages (Home, About, Gallery, News, Donate, Contact)
- Responsive mobile-first design
- GSAP animations
- Component styling from Uiverse
- Image optimization

⏳ **TODO (PHASE 2):**
- Backend API development
- Database setup
- NowPayments integration
- Admin panel
- Contact form functionality
- Email notifications

---

## 🎯 TESTING CHECKLIST

Before launching to public:

### Desktop Testing
- [ ] Home page loads and animations work
- [ ] About page shows all testimonials
- [ ] Gallery displays all images
- [ ] News page shows articles
- [ ] Donate page currency switching works
- [ ] Contact form fields animate
- [ ] Navigation works on all pages
- [ ] Footer links work

### Mobile Testing
- [ ] Hamburger menu works
- [ ] All pages are readable on phone
- [ ] Images load properly
- [ ] Buttons are easily tappable
- [ ] Forms work on mobile
- [ ] No horizontal scrolling

### Cross-Browser Testing
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge

---

## 🔐 SECURITY NOTES

1. **Never commit API keys to GitHub**
   - Use environment variables
   - Add `.env` to `.gitignore`

2. **NowPayments Sandbox vs Live**
   - Test with sandbox keys first
   - Only switch to live keys after thorough testing

3. **Admin Panel**
   - Use strong passwords
   - Implement JWT authentication
   - Rate limit login attempts

---

## 📞 SUPPORT

If you encounter any errors during deployment:

1. Check Vercel deployment logs
2. Check browser console for errors
3. Test on localhost first before deploying

---

## 🎨 CUSTOMIZATION NOTES

To change colors in the future:
- Edit `tailwind.config.js` → colors section
- Primary color: #a941d4 (purple)

To add/remove pages:
- Create folder in `/app` directory
- Add `page.tsx` file
- Update Navigation.tsx links

---

## 📦 FINAL DELIVERABLES

Once backend is complete, you will have:

1. **Public Website** (bbor.org)
   - All pages functional
   - Donation system live
   - Contact form working

2. **Admin Panel** (bbor.org/admin)
   - View donations
   - Manage content
   - Respond to messages
   - Create news posts
   - Upload gallery photos
   - White-labeled payment dashboard

3. **Database**
   - All donations tracked
   - User accounts managed
   - Content stored securely

---

## 🚀 LAUNCH DAY CHECKLIST

- [ ] Frontend deployed to Vercel
- [ ] Custom domain working (bbor.org)
- [ ] All pages tested
- [ ] Backend API live on Railway
- [ ] Database connected
- [ ] NowPayments integrated
- [ ] Test donation processed successfully
- [ ] Contact form sends emails
- [ ] Admin panel accessible
- [ ] SSL certificate active (https://)
- [ ] Social media links work
- [ ] All images optimized and loading

---

## 📈 AFTER LAUNCH

Monitor:
- Website uptime
- Donation success rate
- Contact form submissions
- Page load speeds
- Mobile traffic

Update regularly:
- News section
- Gallery photos
- Testimonials
- Impact numbers

---

**Questions?** Review this guide step-by-step and let me know where you need help!
