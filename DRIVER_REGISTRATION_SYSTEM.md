# PRISHA XPRESS PVT. LTD.
## Module B: Commercial Driver Registration System Documentation

**Company:** Prisha Xpress Pvt. Ltd. (`CIN: U49231PN2023PTC225810`)  
**Headquarters:** Pune, Maharashtra, India  
**Module:** Commercial Truck Driver Registration & Document Verification System (Module B)  
**Routes:** `/careers/driver` and `/careers/driver-registration`  
**Target Storage Bucket:** `driver-application-documents`  
**Primary Database Table:** `driver_applications`  

---

### 1. Executive Summary & Regulatory Purpose

The **Commercial Driver Registration System** at Prisha Xpress Pvt. Ltd. is an independent, compliance-driven onboarding portal designed specifically for commercial heavy vehicle and multi-axle freight pilots. It strictly separates operational driver credentials and RTO licensing data from corporate employee records, ensuring compliance with the Indian Motor Vehicles Act, RTO commercial endorsement standards, and corporate data governance.

---

### 2. Driver Onboarding Workflow (6-Step Progressive Wizard)

```
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│  1. Personal  │ ──> │ 2. Licence &  │ ──> │ 3. Commercial │
│ & Emergency   │     │  Endorsements │     │  Experience   │
└───────────────┘     └───────────────┘     └───────────────┘
        │
        v
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ 4. Mandatory  │ ──> │ 5. Detailed   │ ──> │ 6. Statutory  │
│ Document Staging    │    Review     │     │ Declarations  │
└───────────────┘     └───────────────┘     └───────────────┘
```

#### Step 1: Personal & Emergency Contact Information
- **Driver Full Name:** Required, matching driving licence exactly (minimum 3 characters).
- **Date of Birth:** Required, past date validation with mandatory age checks (minimum 20 years for commercial transport licences).
- **Gender:** Radio/Select (`Male`, `Female`, `Other`).
- **Mobile Number:** Required, valid 10-digit primary mobile.
- **Alternate Mobile Number:** Optional 10-digit family contact.
- **Residential Address:** Street address, city, state, and 6-digit Indian PIN code.
- **Highway Safety Emergency Contact:** **MANDATORY**
  - Emergency contact full name and relation (e.g., spouse, parent, sibling).
  - Emergency 10-digit contact phone number.

#### Step 2: Driving Licence Details & RTO Endorsements
- **Driving Licence Number:** Required alphanumeric format (e.g., `MH14 20120045612`).
- **Licence Type:** Commercial Heavy Transport (TRANS), Heavy Goods Motor Vehicle (HGMV), Medium Goods Vehicle (MGV), Light Motor Vehicle (LMV - Commercial).
- **Authorized Vehicle Categories (Multi-Select):**
  - `LMV`
  - `HMV`
  - `HGMV`
  - `Transport Vehicle`
  - `Trailer / Multi-Axle`
  - `Container Vehicle`
  - `Other`
- **Issuing RTO Authority:** Name of RTO (e.g., *MH-14 Pimpri Chinchwad RTO*).
- **Licence Issue Date & Expiry Date:** Validated such that expiry is strictly greater than issue date.
- **Expired Licence Flagging:** If a driver's licence expiry date is past, the application is **not** hard-blocked; instead, an automated `is_licence_expired_flag = true` is set, and a compliance warning banner is displayed so the verification cell can review RTO renewal receipts during audit.

#### Step 3: Commercial Experience & Route Preferences
- **Total Driving Experience:** `3-5 Years`, `5-8 Years`, `8-10 Years`, `10-15 Years`, `15+ Years`.
- **Heavy Vehicle Experience:** `2-3 Years`, `4-6 Years`, `7-10 Years`, `10+ Years`.
- **Previous Transporter / Operator:** Name of previous fleet owner or transport agency.
- **Preferred Work Corridor:** Highway route preferences (e.g., *Pune – Mumbai – Gujarat Corridor*, *Chakan Hub Interstate*, *Talegaon Depot Regional*).
- **Expected Monthly Salary (₹):** Desired monthly remuneration in INR.
- **Commercial Fleet Models Driven (Multi-Select):**
  - BharatBenz 2823R (Heavy Rigid)
  - Tata Signa 4825.TK (Multi-Axle)
  - Ashok Leyland 5525 (Tractor Trailer)
  - Eicher Pro 6028 (Container Body)
  - Tata 1613 / 1109 (Medium Goods)
  - Mahindra Blazo X 35
- **Availability to Join:** `Immediate`, `Within 7 Days`, `Within 15 Days`.

#### Step 4: Document Uploads & Storage Isolation
- **Driving Licence Front Side:** **MANDATORY** (`.pdf`, `.jpg`, `.jpeg`, `.png`, max 5MB). Shows driver photograph, licence number, validity, and name.
- **Driving Licence Back Side:** **MANDATORY** (`.pdf`, `.jpg`, `.jpeg`, `.png`, max 5MB). Shows authorized vehicle classes (TRANS / HGV / LMV) and badge numbers.
- **Recent Driver Photograph:** **MANDATORY** (`.jpg`, `.jpeg`, `.png`, max 5MB). Clear front-facing portrait.
- **Address Proof:** **MANDATORY** (`.pdf`, `.jpg`, `.jpeg`, `.png`, max 5MB). Electricity bill, Voter ID, or Ration Card.
- **Driver Bio-Data / Resume:** Optional.
- **Previous Experience Certificate:** Optional.
- **PAN Card:** Optional (for bank account linking).
- **AADHAAR PRIVACY SAFEGUARD:** **Aadhaar cards are never requested or collected by default**, ensuring statutory privacy compliance and preventing unauthorized identity harvesting.
- *Storage Isolation:* All files are stored in the private bucket `driver-application-documents` partitioned under `PX-DRV-YYYY-XXXX` paths.

#### Step 5: Detailed Review & Sectional Editing
- Clean review breakdown into 5 dedicated sections:
  - *A. Personal Information* (with 1-click edit button)
  - *B. Contact & Emergency Details* (with 1-click edit button)
  - *C. Driving Licence Details* (with 1-click edit button)
  - *D. Driving Experience & Vehicles* (with 1-click edit button)
  - *E. Uploaded Documents Status* (with 1-click edit button)

#### Step 6: Four Statutory Declarations & Final Submission
Candidates must review and actively check all 4 mandatory declarations:
1. **Driver Accuracy Declaration:**  
   *"I declare that all details provided in this application and all documents submitted are true, complete, and authentic."*
2. **RTO & Licence Review Authorization:**  
   *"I authorize Prisha Xpress Pvt. Ltd. to review my application, verify my driving licence with the issuing RTO or relevant authorities, and conduct necessary background verification."*
3. **Recruitment Evaluation Consent:**  
   *"I understand and agree that this registration is for recruitment evaluation and does not constitute an offer of employment or a contract."*
4. **Privacy Policy Agreement:**  
   *"I have read, understood, and agree to the Prisha Xpress Recruitment Privacy Policy."*

---

### 3. Application Generation & Success Confirmation

Upon successful submission:
1. A unique driver reference number is generated in format:
   $$\text{PX-DRV-YYYY-XXXX} \quad (\text{e.g., } \texttt{PX-DRV-2026-0094})$$
2. The record is persisted in `driver_applications` with initial status `Submitted` and verification status `Pending`.
3. Confirmation banner displayed to the applicant:
   > *"Thank you for registering with Prisha Xpress. Your driver application has been submitted successfully. Our team will review your details and documents."*
4. **Prominent Legal & Software Disclaimer:**
   > *"Application submission does not constitute an offer of employment or registration in official company software. Induction is subject to driving assessment, document verification, and background clearance."*

---

### 4. Admin Document Verification Cell (Single Role: `admin`)

Within `/admin/driver-applications` and `/admin/approved-drivers`:
- **Document Inspection:** Admin reviews both Front and Back of the driving licence via short-lived signed URLs.
- **Verification Actions:** Individual verification toggles for Licence Front, Licence Back, Photo, and Address Proof in `driver_document_verifications`.
- **Licence Expiry Alerting:** Visual warning badges for expired or expiring licences.
- **Audit Logging:** Every verification decision, rejection reason, or status update is permanently recorded in `driver_application_status_history` and `driver_application_reviews`.
