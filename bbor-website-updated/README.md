# BBOR Website - Beautiful Beginnings Outreach Relief

A modern, responsive website for BBOR orphanage in Lusaka, Zambia.

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP, Framer Motion
- **Deployment**: Vercel (Frontend)
- **Backend**: Node.js/Express (To be deployed on Railway)
- **Database**: PostgreSQL (To be setup on Railway)
- **Payment**: NowPayments API (To be integrated)

## Setup Instructions

### 1. Install Dependencies

```bash
cd bbor-website
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project to Vercel
3. Connect your custom domain (bbor.org)
4. Deploy!

### Backend (Railway) - Coming Next

Will handle:
- Contact form submissions
- Donation tracking
- Admin panel authentication
- NowPayments API integration

## Project Structure

```
bbor-website/
├── app/
│   ├── about/          # About page with testimonials
│   ├── gallery/        # Photo gallery
│   ├── news/           # News & updates
│   ├── donate/         # Donation page
│   ├── contact/        # Contact form
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/
│   ├── Navigation.tsx  # Header navigation
│   └── Footer.tsx      # Footer
├── public/
│   └── images/         # All website images
└── package.json
```

## Features

- ✅ Responsive mobile-first design
- ✅ Smooth GSAP scroll animations
- ✅ Beautiful UI components from Uiverse
- ✅ Donation system (frontend ready for NowPayments)
- ✅ Contact form
- ✅ Photo gallery with polaroid effects
- ✅ News section
- ✅ Full about page with testimonials
- ⏳ Backend API (coming next)
- ⏳ Admin panel (coming next)
- ⏳ NowPayments integration (coming next)

## Colors

- Primary: #a941d4 (Purple)
- Black: #000000
- White: #FFFFFF

## Contact

Jameelah Ohl - Director
Phone: +260 973 158 210
Email: bborzambia@gmail.com
