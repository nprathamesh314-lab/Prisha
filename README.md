# Prisha Xpress Pvt. Ltd. — Enterprise Logistics Platform

> **Official Web Platform & Fleet Management Portal**  
> **CIN:** `U49231PN2023PTC225810`  
> **Headquarters:** Kharadi, Pune, Maharashtra, India  

---

## 1. Overview

**Prisha Xpress Pvt. Ltd.** is an Indian corporate logistics, transportation, and fleet management enterprise. The company delivers end-to-end supply chain services across key industrial corridors, operating an integrated network spanning driver placement, dedicated fleet management, freight transit, automated service stations, and OEM auto spare distribution.

This repository hosts the official Prisha Xpress digital platform, featuring a modern web interface, interactive recruitment portals, dynamic application workflows, role-based administration, and WCAG AA-compliant typography.

---

## 2. Core Service Verticals

1. **Driver Solutions:** Sourcing, rigorous background vetting, credential verification, and ongoing training for heavy commercial vehicle (HCV) drivers.
2. **Fleet Management:** Full-lifecycle fleet leasing, real-time telematics tracking, compliance monitoring, and preventative maintenance.
3. **Transportation & Logistics:** Scheduled FTL (Full Truck Load) and PTL (Part Truck Load) freight transport with guaranteed SLAs and cargo security.
4. **Service Station:** Dedicated heavy commercial vehicle workshops providing computerised diagnostics, engine overhauls, wheel alignment, and routine servicing.
5. **Auto Spare Parts:** Genuine OEM-certified truck spare parts, commercial batteries, lubricants, and rapid dispatch across regional hubs.

---

## 3. Technology Stack

- **Frontend Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 5](https://vitejs.dev/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom brand theme tokens
- **Typography:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database & Backend:** [Supabase](https://supabase.com/) (PostgreSQL with Row-Level Security, Storage & Auth)
- **Deployment Target:** [Vercel](https://vercel.com/) / Production static hosting

---

## 4. Key Platform Features

- **Mobile-First Responsive Header:** Features a custom CSS-animated delivery truck centered in the mobile header (`< sm`), operating without third-party GIF/canvas overhead.
- **Enterprise Design System:** Built on the official brand palette:
  - Primary Purple: `#68139A`
  - Deep Purple: `#35065C`
  - Violet Accent: `#A44BC0`
  - Lavender Tint: `#F2E8F8`
  - Dark Corporate Text: `#21152A`
  - High-Contrast Body: `#374151`
- **Driver Recruitment Portal (`/careers/driver-registration`):**
  - Multi-step onboarding: Personal details, driving license (HCV/LCV), badge verification, vehicle experience, route preferences, and document uploads.
  - Form validation with error states and feedback.
- **Staff Application Portal (`/careers/staff-application`):**
  - Departmental hiring workflows (Fleet Operations, Dispatch, Workshop, Accounts, Logistics Tech).
  - Resume upload and skill mapping.
- **Role-Based Admin Console (`/admin`):**
  - Application review pipeline (Under Review, Shortlisted, Verified, Rejected).
  - Document viewer with audit trail and recruiter notes.
  - Master settings and corporate data management.
- **WCAG 2.1 AA Accessibility:** 
  - All body text maintains >= 9.0:1 contrast on white and >= 8.1:1 on lavender.
  - Headings feature `text-wrap: balance` to prevent awkward splits on mobile viewports (320px–430px).
  - High-contrast focus rings (`:focus-visible`) for keyboard navigation.

---

## 5. Directory Structure

```
PrishaApp/
├── public/                     # Static assets, logos, and photography
│   ├── assets/images/          # Optimized WebP/JPEG images
│   ├── favicon.png             # Site favicon
│   └── logo.svg                # Prisha Xpress brand SVG logo
├── src/
│   ├── components/
│   │   ├── about/              # About page sliders & strength showcases
│   │   ├── common/             # Reusable UI primitives (Button, SectionHeading, PageHero, CTA)
│   │   ├── layout/             # Navbar, Footer, MobileAnimatedTruck
│   │   ├── sections/           # Homepage sections (HeroSlider, Services, Network, etc.)
│   │   └── services/           # Service-specific hero and feature components
│   ├── context/                # React context providers (AuthContext)
│   ├── data/                   # Static content & route configurations
│   ├── lib/                    # Supabase client and external utility wrappers
│   ├── pages/                  # Route views (Home, About, Services, Careers, Contact, CSR)
│   │   ├── admin/              # Admin console and verification dashboards
│   │   └── careers/            # Driver registration & staff recruitment forms
│   ├── styles/
│   │   └── index.css           # Global Tailwind base styles, typography & animations
│   ├── App.tsx                 # Root router and layout container
│   └── main.tsx                # Application bootstrap entry point
├── supabase/
│   └── migrations/             # Database schema migrations & RLS policies
├── package.json                # Project dependencies and npm scripts
├── tailwind.config.js          # Tailwind theme extensions and brand colors
├── tsconfig.json               # TypeScript compiler configuration
├── vercel.json                 # Vercel SPA routing rewrites
└── vite.config.ts              # Vite bundler configuration
```

---

## 6. Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or pnpm

### Installation
```bash
# Clone repository
git clone https://github.com/nprathamesh314-lab/Prisha.git
cd Prisha

# Install dependencies
npm install
```

### Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Development Server
```bash
npm run dev
# Starts local development server at http://localhost:3000
```

### Production Build
```bash
npm run build
# Compiles TypeScript and builds optimized production bundles into dist/
```

### Preview Production Build
```bash
npm run preview
# Serves the dist/ directory locally
```

---

## 7. Database & Security Model

The Supabase PostgreSQL database implements Row-Level Security (RLS) across all tables:
- `driver_applications`: Captures driver registrations with encrypted PII.
- `staff_applications`: Captures staff candidate resumes and profiles.
- `admin_users`: Manages authorized roles (`super_admin`, `recruiter`, `fleet_manager`, `viewer`).
- Documents (licenses, Aadhaar, PAN, resumes) are secured in private Supabase Storage buckets with time-limited signed URLs.

---

## 8. License & Corporate Rights

© 2023–2026 **Prisha Xpress Pvt. Ltd.** All Rights Reserved.  
Unauthorized copying, modification, or distribution of this software and brand assets is strictly prohibited.
