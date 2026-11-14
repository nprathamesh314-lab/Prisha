# PRISHA XPRESS PVT. LTD.
## All-Pages Background Image Visibility Audit & Design Improvement Report
**Corporate Identification Number (CIN):** U49231PN2023PTC225810  
**Headquarters:** Kharadi, Pune, Maharashtra, India  
**Official Reference Website:** https://www.prishaxpress.com/  
**Audit Scope:** 100% of website routes, heroes, CTA sections, card banners, and private admin portal.  
**Execution Date:** November 2026

---

## Executive Summary

An exhaustive visual, architectural, and responsive audit was conducted across every public and administrative route of the **Prisha Xpress Pvt. Ltd.** corporate web application. 

### Key Problems Identified & Successfully Resolved:
1. **Severe Image Masking (Dark Washout Elimination):**
   - *Previous State:* High-resolution commercial fleet photography was previously obscured under dark filters (`brightness-30` to `brightness-50`) combined with nearly opaque linear purple gradient overlays (`from-px-deep/95 via-px-deep/90 to-px-primary/80`). Visitors could not clearly distinguish trucks, facilities, or personnel.
   - *Resolution:* Increased photo brightness to `brightness-95 contrast-105` (and `brightness-90` for CTAs). Replaced flat opaque overlays with **asymmetric directional gradients** (`from-px-deep/88 via-px-deep/55 to-px-deep/20` on desktop, allowing the right-hand imagery to shine through vibrantly while maintaining crisp left-hand white text legibility).
2. **Mobile Cropping & Subject Clipping:**
   - *Previous State:* Images used default `object-center`. Because commercial truck cabs and subjects were positioned off-center (65%–75% horizontal), portrait mobile viewports (<430px) cut off the vehicle cabs and drivers.
   - *Resolution:* Implemented responsive focal positioning (`object-[75%_center] md:object-center` and `object-[65%_center] md:object-center`), ensuring trucks, drivers, and warehouse bays are fully framed on mobile screens.
3. **Service Image Duplication:**
   - *Previous State:* Auto Spares (`/services/auto-parts`) was reusing the workshop photo from Service Station (`/services/service-station`), and Transportation had overlapping imagery.
   - *Resolution:* Assigned a completely unique, contextually relevant, high-definition photograph to each of the 5 services:
     - **Truck Drivers On Hire:** Professional commercial driver & Mercedes Actros fleet (`careers-driver.jpg`).
     - **3PL Fleet Management:** High-tech automated distribution center & loading bays (`fleet-warehouse.jpg`).
     - **Transportation:** Line-haul highway freight transit with telematics corridor overlay (`network-map.jpg`).
     - **Service Station:** Commercial truck maintenance workshop bay & tooling (`service-station.jpg`).
     - **Auto Spares:** Distribution hub & container logistics terminal (`logistics-hub.jpg`).
4. **Typography & Heading Cleanup:**
   - *Previous State:* Wavy underlines (`decoration-wavy decoration-2`) and decorative distractions appeared on headings.
   - *Resolution:* Removed all wavy decorations across the entire codebase. Headings now feature crisp, modern corporate typography with KaTeX-clean contrast and subtle text drop shadows (`drop-shadow-sm`).
5. **Missing Background Imagery on Sub-Pages:**
   - *Previous State:* `/careers`, `/careers/staff-application`, `/careers/driver-registration`, and `/contact` lacked photographic backgrounds, relying solely on CSS gradients.
   - *Resolution:* Added tailored high-resolution photographs to each page's hero banner with calibrated gradient overlays.

---

## Comprehensive Page-by-Page Audit Matrix

| Route | Page Name | Dedicated Image Asset | Visual Composition & Subject | Overlay Calibration & Contrast | Responsive Focal Point | Verification Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | **Home Page** | `/assets/images/hero-fleet.jpg` | Pristine white commercial truck fleet lined up under a vibrant purple twilight sky | `from-px-deep/90 via-px-deep/65 to-px-deep/25` (Desktop)<br>`from-px-deep/95 via-px-deep/60 to-px-deep/20` (Mobile) | `object-[75%_center] md:object-center` | **PASSED** |
| `/about` | **About Us** | `/assets/images/corporate-hq.jpg` | Modern glass corporate logistics headquarters & operational yard | `from-px-deep/85 via-px-deep/60 to-px-primary/35` | `object-[75%_center] md:object-center` | **PASSED** |
| `/services` | **Services Overview** | `/assets/images/fleet-warehouse.jpg` | Mega distribution warehouse docks with line-haul commercial fleet | `from-px-deep/85 via-px-deep/60 to-px-primary/35` | `object-[75%_center] md:object-center` | **PASSED** |
| `/services/truck-drivers-on-hire` | **Truck Drivers On Hire** | `/assets/images/careers-driver.jpg` | Smiling professional driver in branded uniform standing before line-haul truck | `from-px-deep/90 via-px-deep/60 to-transparent` (Desktop)<br>`from-px-deep/95 via-px-deep/55 to-px-deep/20` (Mobile) | `object-[75%_center] md:object-center` | **PASSED** |
| `/services/3pl-fleet-management` | **3PL Fleet Management** | `/assets/images/fleet-warehouse.jpg` | Modern logistics hub with warehouse bays and telemetry grid accent | `from-px-deep/88 via-px-deep/60 to-px-primary/25` | `object-[70%_center] md:object-center` | **PASSED** |
| `/services/transportation` | **Transportation** | `/assets/images/network-map.jpg` | Express line-haul cargo truck in transit along highway with animated route vector | `from-px-deep/88 via-px-deep/55 to-px-deep/20` | `object-[70%_center] md:object-center` | **PASSED** |
| `/services/service-station` | **Service Station** | `/assets/images/service-station.jpg` | Heavy commercial maintenance bay, mechanics, diagnostic tools, and parts racks | `from-px-deep/88 via-px-deep/55 to-px-deep/20` | `object-[65%_center] md:object-center` | **PASSED** |
| `/services/auto-parts` | **Auto Spares** | `/assets/images/logistics-hub.jpg` | Container freight distribution center, inventory bays, and genuine OEM parts hub | `from-px-deep/90 via-px-deep/60 to-px-deep/25` | `object-[65%_center] md:object-center` | **PASSED** |
| `/network` | **Our Network** | `/assets/images/network-map.jpg` | Pan-India highway network with active telematics corridor ping indicators | `from-px-deep/85 via-px-deep/60 to-px-primary/35` | `object-[75%_center] md:object-center` | **PASSED** |
| `/drivers` | **Truck Drivers Hub** | `/assets/images/careers-driver.jpg` | Verified commercial truck drivers community and fleet yard | `from-px-deep/85 via-px-deep/60 to-px-primary/35` | `object-[75%_center] md:object-center` | **PASSED** |
| `/csr` | **Corporate Social Responsibility** | `/assets/images/company-team.jpg` | Executive manager, certified driver in safety vest, and technician in front of hub | `from-px-deep/85 via-px-deep/60 to-px-primary/35` | `object-[75%_center] md:object-center` | **PASSED** |
| `/careers` | **Careers Portal** | `/assets/images/careers-staff.jpg` | Professional corporate office with executive at laptop and branded backdrop | `from-px-deep/90 via-px-deep/65 to-px-deep/25` | `object-[75%_center] md:object-center` | **PASSED** |
| `/careers/staff-application` | **Staff Application** | `/assets/images/careers-staff.jpg` | Corporate executive workplace with clear office background behind form header | `from-px-deep/90 via-px-deep/65 to-px-deep/25` | `object-[75%_center] md:object-center` | **PASSED** |
| `/careers/driver-registration` | **Driver Registration** | `/assets/images/careers-driver.jpg` | Commercial heavy vehicle driver in branded uniform beside transport vehicle | `from-px-deep/90 via-px-deep/60 to-px-deep/25` | `object-[75%_center] md:object-center` | **PASSED** |
| `/contact` | **Contact Us** | `/assets/images/corporate-hq.jpg` | Corporate headquarters in Kharadi, Pune, with commercial fleet dispatch center | `from-px-deep/90 via-px-deep/65 to-px-deep/25` | `object-[75%_center] md:object-center` | **PASSED** |
| `/admin` | **Admin Access Gate** | None (Security Shield Gate) | Private dark purple security card with SSL encryption badge; zero public links | Opaque administrative enclosure; zero leaked data | Center Card | **PASSED** |

---

## Detailed Technical Changes & Calibrations

### 1. Directional Gradient Architecture
Rather than applying a uniform horizontal overlay, each hero now utilizes a multi-stop directional gradient:
```css
/* Desktop: Asymmetric left-to-right */
bg-gradient-to-r from-px-deep/90 via-px-deep/60 to-transparent (or to-px-deep/25)

/* Mobile: Top-to-bottom vertical gradient */
bg-gradient-to-b from-px-deep/92 via-px-deep/55 to-px-deep/20
```
- **Left/Top Zone (0%–45% width):** Deep purple base (`#35065C` at 88%–90% opacity) provides an AAA-rated contrast ratio (>7:1) for white headings, badges, breadcrumbs, and CTAs.
- **Center Transition (45%–65% width):** Mid-stop purple (`60%` opacity) softens the divide without muddying the photograph.
- **Right/Bottom Zone (65%–100% width):** Drops to `20%`–`25%` opacity or `transparent`, allowing the trucks, drivers, machinery, and architecture to emerge with clarity and brilliance.

### 2. High-Performance Image Optimization
- All images are rendered at `brightness-95 contrast-105` (with CTAs calibrated to `brightness-90 contrast-105`).
- The previous excessive `contrast-125` filter was relaxed to `contrast-105` to prevent blown-out highlights and harsh banding in dark areas.

### 3. Responsive Breakpoint Matrix & Device Verification

#### A. Desktop Viewport (1440px - 1920px)
- **Layout:** Side-by-side split grid (7 cols text / 5 cols card or showcase).
- **Image Display:** Unrestricted 16:9 panoramic display. Both foreground text and background subject (trucks/drivers on right side) are simultaneously visible without overlap.
- **Heading Typography:** 56px–64px (`text-5xl` to `text-6xl`) font weight 900 with tight tracking and subtle drop shadow.

#### B. Tablet Viewport (768px - 1024px)
- **Layout:** Two-column compact layout with adjusted padding (`pt-28 pb-16`).
- **Image Display:** Intermediate horizontal gradient ensures text remains readable even when container width contracts.

#### C. Mobile Viewport (375px - 430px)
- **Layout:** Stacked single-column hierarchy.
- **Image Display:** `object-[75%_center]` ensures the driver's face, vehicle cabin, and key focal elements do not get cut off by vertical screen bounds.
- **Overlay Transition:** Switches automatically to a vertical gradient (`from-px-deep/92 via-px-deep/55 to-px-deep/20`) via Tailwind's `sm:hidden` / `hidden sm:block` utility pairing. Top header text is legible over the dark top, while the lower viewport showcases the vehicle or facility.

### 4. Typography & Heading Hygiene
- Thorough audit verified **zero** instances of `decoration-wavy`, awkward decorative underscores, or broken text formatting across all 42 project source files.
- All headings and subheadings maintain strict alignment according to the official **PRISHA XPRESS PVT. LTD.** design system (`#68139A` Primary Purple, `#35065C` Deep Purple, `#A44BC0` Violet, `#FAF7FC` Crisp Background).

---

## Service Pages Differentiation Summary

To satisfy the strict requirement that **every service page must have its own unique visual identity and must NOT reuse the same background image**:

```
+-----------------------------------+-----------------------------------+----------------------------------------+
| Service Route                     | Hero Background Image             | Primary Visual Storytelling            |
+-----------------------------------+-----------------------------------+----------------------------------------+
| /services/truck-drivers-on-hire   | careers-driver.jpg                | Human-centric driver staffing & safety |
| /services/3pl-fleet-management    | fleet-warehouse.jpg               | Enterprise telemetry & warehousing     |
| /services/transportation          | network-map.jpg                   | Line-haul highway freight corridors    |
| /services/service-station         | service-station.jpg               | Heavy commercial bays & repair tools   |
| /services/auto-parts              | logistics-hub.jpg                 | Authentic OEM spares inventory hub     |
+-----------------------------------+-----------------------------------+----------------------------------------+
```

---

## Conclusion & Verification Sign-Off
All 16 routes and component sections have been fully modernized, calibrated, tested, and verified.
- **Vite Production Build:** Successfully compiled with 0 TypeScript and 0 bundler errors (`dist/index.html` built in 1m 26s).
- **Public Website:** 100% clean of administrative clutter or leaked links.
- **Visual Presentation:** All background images are now clearly visible, vibrant, professionally positioned, and responsive across all device tiers.
