# Prisha Xpress Pvt. Ltd.
## Complete Careers & Recruitment Management System Report

**Company:** PRISHA XPRESS PVT. LTD. (`CIN: U49231PN2023PTC225810`)  
**Headquarters:** Pune, Maharashtra, India  
**Official Website:** [https://www.prishaxpress.com/](https://www.prishaxpress.com/)  
**Branding Palette:** Primary Purple (`#68139A`), Deep Purple (`#35065C`), Violet (`#A44BC0`), Lavender (`#F2E8F8`), White (`#FFFFFF`), Dark Text (`#21152A`), Background (`#FAF7FC`)  

---

### 1. Executive Summary

In accordance with master project requirements, we have implemented a production-grade, enterprise-scale **Careers & Recruitment Management System** featuring two completely independent recruitment modules housed within a unified application:

1. **Module A: Staff Recruitment System** (Corporate HR Management)
   - Public Application Wizard: `/careers/staff-application`
   - Private Admin Dashboard: `/admin/staff-applications`
   - Purpose: Administration, Human Resources, Logistics Operations, Accounts & Finance, IT & Technical.
   - Reference Format: `PX-STF-2026-XXXX`
   - Storage Bucket: `staff-application-documents/` (Private S3/Supabase Storage)

2. **Module B: Driver Registration & Verification System** (Fleet Operations & Driver Admin)
   - Public Registration Wizard: `/careers/driver-registration`
   - Private Admin Dashboard: `/admin/driver-applications`
   - Verification Bay: `/admin/driver-verification`
   - Approved TMS Master: `/admin/approved-drivers`
   - Purpose: Long-haul container captains, multi-axle trailers, HMV/HGMV commercial truck operators.
   - Reference Format: `PX-DRV-2026-XXXX`
   - Storage Bucket: `driver-application-documents/` (Private S3/Supabase Storage)

---

### 2. Strict Architectural Separation

| Architecture Dimension | Module A: Staff Recruitment | Module B: Driver Registration |
| :--- | :--- | :--- |
| **Primary Database Table** | `staff_applications` | `driver_applications` |
| **Supporting Relational Tables** | `staff_application_documents`, `staff_application_reviews`, `staff_application_status_history` | `driver_vehicle_categories`, `driver_vehicle_experience`, `driver_application_documents`, `driver_application_reviews`, `driver_document_verifications`, `driver_application_status_history`, `driver_software_integration_logs` |
| **Reference Sequence** | `staff_app_ref_seq` (`PX-STF-2026-XXXX`) | `driver_app_ref_seq` (`PX-DRV-2026-XXXX`) |
| **Private Document Storage** | `staff-application-documents/` | `driver-application-documents/` |
| **Application Statuses** | Submitted, Under Review, Shortlisted, Interview Scheduled, Selected, Rejected, On Hold | Submitted, Pending Verification, Information Required, Under Review, Approved – Ready for Company Software, Rejected, Adding to Company Software, Added to Company Software, Integration Failed |
| **Department / Scope** | Corporate Office Departments | Fleet & Highway Transportation Cell |
| **Authorized Persona** | HR Admin, Super Admin | Driver Admin, Verification Officer, Driver Manager, Super Admin |
| **Software Master Target** | Company HRMS Payroll | Prisha Xpress Driver Master TMS ERP |

---

### 3. Careers Hub Landing Page (`/careers`)

- **Hero Typography & Visuals:** "Build Your Future with Prisha Xpress", subtitle: *"Explore professional opportunities and become part of our growing transportation and logistics operations."*
- **Two Distinct Pathways:**
  - Card 1: **Staff Application** featuring corporate office personnel photography, Pune HQ perks, and direct CTA to `/careers/staff-application`.
  - Card 2: **Driver Registration** featuring heavy commercial truck captain photography, route incentives, driver rest lounge highlights, and direct CTA to `/careers/driver-registration`.
- **Mandatory Statutory Disclaimer:**
  > *"Submitting an application does not guarantee employment or driver approval. All applications are subject to company review, background screening, and physical document verification."*

---

### 4. Module A: Staff Application Wizard (`/careers/staff-application`)

A 6-step responsive wizard equipped with interactive progress indicator:
1. **Personal Information:** Full Name, DOB, Gender, Mobile Number, Email Address, Address, City, State, PIN Code.
2. **Educational Details:** Highest Qualification, Degree/Course, College/University, Passing Year, CGPA/Score, Additional Certifications.
3. **Job Details:** Position Applied For, Department, Preferred Location, Employment Type, Fresher toggle (Yes/No).
4. **Work Experience (Conditional Fresher Logic):**
   - When candidate selects **Fresher (Yes)**: Employer, past role, and past salary are marked optional/hidden; focus shifts to core skills and salary expectations.
   - When candidate selects **Experienced (No)**: Past employer, job role, past CTC, notice period, and relevant logistics experience fields are validated.
5. **Document Upload:** Mandatory Resume / CV (PDF/DOCX) and Educational Certificates with real-time size & format validation.
6. **Final Review & Statutory Declarations:** Mandatory accuracy declaration and recruitment privacy consent. Generates unique reference e.g., `PX-STF-2026-0042`.

---

### 5. Module B: Driver Registration Wizard (`/careers/driver-registration`)

A 6-step transportation-tailored wizard:
1. **Personal Information:** Driver Name, DOB, Mobile, Alternate Phone, Address, and Highway Safety Emergency Contact Name & Phone.
2. **Driving Licence Details:** Licence Number, Type (TRANS/HMV), Multi-select authorized categories (`HMV`, `HGMV`, `Trailer / Multi-Axle`, `Container Vehicle`, `LMV`), Issue Date, Expiry Date (with validation `expiry > issue`), Issuing RTO, and Issuing State.
3. **Commercial Driving Experience:** Total Driving Exp, Heavy Commercial Exp, Prior Transporter, Vehicle Models Driven (BharatBenz, Tata Signa, Ashok Leyland, Eicher Pro), Route Preference, Availability to Join.
4. **Document Upload:** Mandatory Driving Licence (Front & Back), Recent Photograph, and Address Proof (Electricity Bill / Voter ID). **No Aadhaar collected by default** for strict data minimization and regulatory privacy.
5. **Review Information:** 5 distinct review summary cards (Personal, Contact, Licence, Experience, Documents) each with an **"Edit"** shortcut button allowing drivers to modify any section prior to submission.
6. **Submit Registration:** Mandatory driver truthfulness declaration and document verification consent. Generates unique reference e.g., `PX-DRV-2026-0112`.

---

### 6. Admin Portal & Role-Based Access Control (`/admin`)

- **Interactive RBAC Switcher:** Allows toggling between 5 live personas to test permissions:
  1. `super_admin`: Full system oversight, audit logs, and settings.
  2. `hr_admin`: Exclusive access to Staff Recruitment (`/admin/staff-applications`). Cannot approve drivers.
  3. `driver_admin`: Exclusive access to Driver Applications (`/admin/driver-applications`).
  4. `verification_officer`: Access to Driver Verification Bay (`/admin/driver-verification`).
  5. `driver_manager`: Authorized Driver Manager for TMS Master induction (`/admin/approved-drivers`).
- **Dedicated Workspaces:**
  - `/admin/staff-applications`: Search, department/status filters, candidate profile modal, secure document download, HR review logging, CSV export.
  - `/admin/driver-applications`: Search, vehicle class/verification filters, masked licence viewing, driver profile modal, CSV export.
  - `/admin/driver-verification`: 10-point highway checklist inspection, document review actions (Mark Verified, Mark Unclear, Mark Invalid), timestamped verification remarks.
  - `/admin/approved-drivers`: Roster of verified drivers, pre-integration checks (duplicate licence guard, expiry check, completeness check), and TMS API integration gateway assigning External Driver IDs (e.g., `PX-EXT-DRV-0891`).
  - `/admin/reports`: Independent staff and driver compliance export generators.
  - `/admin/audit-logs`: Immutable log tracking every status transition, document verification, and integration event.

---

### 7. Verification Status

- **TypeScript Strict Compilation:** Built cleanly with `tsc -b && vite build` (0 errors).
- **Vite Production Bundle:** Packaged cleanly in `dist/`.
- **Preview Server:** Active on `http://localhost:3001/` (or port 3000).
