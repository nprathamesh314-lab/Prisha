# PRISHA XPRESS PVT. LTD.
## Module A: Staff Application System Documentation

**Company:** Prisha Xpress Pvt. Ltd. (`CIN: U49231PN2023PTC225810`)  
**Headquarters:** Pune, Maharashtra, India  
**Module:** Staff Application & Recruitment Management System (Module A)  
**Routes:** `/careers/staff` and `/careers/staff-application`  
**Target Storage Bucket:** `staff-application-documents`  
**Primary Database Table:** `staff_applications`  

---

### 1. Executive Summary & Purpose

The **Staff Application System** at Prisha Xpress Pvt. Ltd. provides a dedicated, enterprise-grade intake portal for corporate, technical, administrative, and operations personnel. It operates as an independent module strictly decoupled from commercial driver onboarding, ensuring sensitive corporate career data, educational credentials, and compensation expectations are stored separately and accessed exclusively by authorized administrators.

---

### 2. Candidate Workflow (6-Step Progressive Wizard)

The application features a responsive, accessible 6-step progress wizard that provides real-time validation, intuitive error handling, and session state persistence:

```
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│  1. Personal  │ ──> │ 2. Education  │ ──> │ 3. Experience │
│    Details    │     │  & Academics  │     │ & Employment  │
└───────────────┘     └───────────────┘     └───────────────┘
        │
        v
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ 4. Position & │ ──> │  5. Document  │ ──> │ 6. Review &   │
│ Compensation  │     │    Upload     │     │ Declarations  │
└───────────────┘     └───────────────┘     └───────────────┘
```

#### Step 1: Personal Details
- **Full Name:** Required, minimum 3 characters.
- **Date of Birth:** Required, past date validation with automatic minimum age checks.
- **Gender:** Radio/Select (`Male`, `Female`, `Other`).
- **Mobile Number:** Required, Indian standard 10-digit mobile number validation.
- **Alternate Mobile Number:** Optional 10-digit secondary contact.
- **Email Address:** Required, standard RFC 5322 regex validation.
- **Residential Address:** Required street address, city, state, and 6-digit Indian PIN code.

#### Step 2: Educational Details
- **Highest Qualification:** Select (`10th`, `12th`, `ITI`, `Diploma`, `Graduate`, `Postgraduate`, `Other`).
- **Course / Degree Name:** Required, specialization field.
- **University / Board:** Required institution name.
- **Year of Passing:** Numeric input (valid range: 1980 – current year).
- **Percentage / CGPA:** Required academic scoring representation.
- **Additional Certifications:** Optional field for specialized logistics, ERP, Six Sigma, or accounting credentials.

#### Step 3: Professional Experience & Career Track
- **Career Stage Toggle:** `Fresher` vs `Experienced` dynamic switch.
  - *Fresher:* Hides prior employment requirements and focuses on academic projects, internships, and core skills.
  - *Experienced:* Requires total years of experience, current/previous employer, previous job designation, previous CTC, and official notice period.
- **Key Skills & Competencies:** Multi-input tags and free text for domain capabilities (e.g., Fleet Telematics, SAP ERP, Route Optimization, GST Invoicing).

#### Step 4: Position Applied & Compensation Expectations
- **Target Department:** Single-select dropdown:
  - *Administration*
  - *Human Resources*
  - *Operations*
  - *Transport & Logistics*
  - *Accounts & Finance*
  - *IT & Technical*
  - *Customer Support*
  - *Other*
- **Position Title:** Dynamically updated based on selected department (e.g., Logistics Operations Lead, Fleet Dispatch Controller, Accounts Executive).
- **Preferred Work Location:** Pune Corporate Office, Chakan Hub, Talegaon Depot, or Field Transit Centers.
- **Employment Type:** `Full-time`, `Part-time`, `Contract`, `Internship`.
- **Expected Annual CTC (₹):** Numeric salary expectation in INR.
- **Availability to Join:** Immediate, 15 days, 30 days, or custom notice period.

#### Step 5: Document Uploads
- **Resume / Curriculum Vitae:** **MANDATORY** (`.pdf`, `.doc`, `.docx`, maximum 5MB).
- **Educational Certificates:** Optional (`.pdf`, `.jpg`, `.jpeg`, `.png`, maximum 5MB).
- **Experience Certificates / Relieving Letters:** Optional (`.pdf`, `.jpg`, `.jpeg`, `.png`, maximum 5MB).
- **Professional Certifications:** Optional (`.pdf`, `.jpg`, `.jpeg`, `.png`, maximum 5MB).
- **Recent Photograph:** Optional passport-size formal photograph.
- *Storage Isolation:* All files are uploaded into the private Supabase Storage bucket `staff-application-documents` organized by application reference folders (`PX-STF-YYYY-XXXX`).

#### Step 6: Review & Statutory Declarations
- Comprehensive read-only review with one-click **Edit** triggers linking directly back to respective wizard steps.
- **Mandatory Declarations:**
  1. *Accuracy Declaration:* "I declare that all information submitted in this application is true, complete, and accurate to the best of my knowledge."
  2. *Recruitment Processing Consent:* "I authorize Prisha Xpress Pvt. Ltd. to process my application and verify my credentials for employment consideration."
  3. *Privacy Policy Agreement:* "I agree to the Prisha Xpress Recruitment Privacy Policy."

---

### 3. Application Generation & Success Confirmation

Upon successful submission:
1. An official, human-readable reference number is generated in format:
   $$\text{PX-STF-YYYY-XXXX} \quad (\text{e.g., } \texttt{PX-STF-2026-0189})$$
2. The record is persisted in `staff_applications` with initial status `Submitted`.
3. Candidate is shown the confirmation banner:
   > *"Thank you for applying to Prisha Xpress. Your staff application has been submitted successfully. Our recruitment team will review your application."*
4. One-click reference copy button and printable application receipt are provided.

---

### 4. Admin Management Features (Single Role: `admin`)

Within `/admin/staff-applications`:
- **Real-time Pipeline Overview:** Total applications, Freshers vs Experienced, Department-wise breakdown.
- **Search & Filter:** Search by candidate name, mobile, reference number, or qualification; filter by department and status.
- **Status Workflow:** Transition through `Submitted` $\rightarrow$ `Under Review` $\rightarrow$ `Shortlisted` $\rightarrow$ `Interview Scheduled` $\rightarrow$ `Selected` $\rightarrow$ `Rejected`.
- **Private Document Viewer:** Generates temporary short-lived signed URLs for reviewing resumes without exposing private bucket permissions.
- **Audit Trails:** Logs every status transition and reviewer comment into `staff_application_status_history` and `staff_application_reviews`.
