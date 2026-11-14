# PRISHA XPRESS PVT. LTD.
## Recruitment System Comprehensive Testing & Verification Report

**Company:** Prisha Xpress Pvt. Ltd. (`CIN: U49231PN2023PTC225810`)  
**Headquarters:** Pune, Maharashtra, India  
**Scope:** Staff Recruitment (Module A) & Driver Registration (Module B) End-to-End Verification  
**Testing Date:** November 2026  
**Test Suite Result:** 100% Passed (All Critical & Boundary Checks Succeeded)  

---

### 1. Test Matrix Overview

| Test ID | Module | Feature Tested | Input / Condition | Expected Outcome | Result |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-STF-01** | Staff | Route Accessibility | Navigation to `/careers/staff` and `/careers/staff-application` | Renders 6-step staff application wizard with official branding | **PASS** |
| **TC-STF-02** | Staff | Fresher Workflow | Select "Fresher" in Step 3 | Experience fields hidden; academic & skill fields prioritized | **PASS** |
| **TC-STF-03** | Staff | Experienced Workflow | Select "Experienced" in Step 3 | Previous employer, designation, salary, and notice period required | **PASS** |
| **TC-STF-04** | Staff | Document Validation | Upload valid Resume (`.pdf`), omit optional certificates | Validation succeeds; Resume uploaded to `staff-application-documents` | **PASS** |
| **TC-STF-05** | Staff | Declarations & Submission | Check all 3 statutory declarations and submit | Record generated with reference `PX-STF-2026-XXXX`; success banner shown | **PASS** |
| **TC-DRV-01** | Driver | Route Accessibility | Navigation to `/careers/driver` and `/careers/driver-registration` | Renders 6-step commercial driver registration wizard | **PASS** |
| **TC-DRV-02** | Driver | Licence Expiry Check | Input issue date `2020-01-01` and expiry date `2024-01-01` (expired) | Form flags `is_licence_expired_flag = true` with compliance warning, allows submission for audit | **PASS** |
| **TC-DRV-03** | Driver | Chronological Date Check | Input expiry date earlier than issue date | Hard validation block: "Licence expiry date must be later than the issue date." | **PASS** |
| **TC-DRV-04** | Driver | Licence Front & Back Upload | Upload separate files for Front and Back of licence | Uploads successfully to `driver-application-documents` | **PASS** |
| **TC-DRV-05** | Driver | Emergency Contact Check | Leave emergency contact blank | Validation block: Emergency contact mandatory for highway safety | **PASS** |
| **TC-DRV-06** | Driver | Declarations & Disclaimer | Verify 4 mandatory declarations and company software disclaimer | Reference `PX-DRV-2026-XXXX` generated; disclaimer displayed | **PASS** |
| **TC-ADM-01** | Admin | Data Isolation | Access `/admin/staff-applications` and `/admin/driver-applications` | Staff data and Driver data isolated in separate tables and views | **PASS** |
| **TC-SEC-01** | Security | Aadhaar Protection | Inspect all wizard steps and forms | Zero requests for Aadhaar card numbers or uploads | **PASS** |

---

### 2. Detailed Test Case Executions & Observations

#### Test Case 1: Staff Application End-to-End Execution
1. **Applicant Profile:** Snehal Deshpande (MBA Logistics, Pune University).
2. **Step Progression:**
   - *Step 1 (Personal):* Validated name, DOB (`1997-04-12`), 10-digit mobile (`98221 44556`), and Pune address (`411038`).
   - *Step 2 (Education):* Input Graduate qualification, degree in Supply Chain Management.
   - *Step 3 (Experience):* Toggled to Experienced with 3 years at Western Express Logistics.
   - *Step 4 (Position):* Selected `Operations` department and `Logistics Operations Lead`.
   - *Step 5 (Documents):* Uploaded `Snehal_Deshpande_Resume.pdf` (320 KB).
   - *Step 6 (Declarations):* Confirmed Accuracy, Recruitment Processing, and Privacy Policy.
3. **Result:** Form submitted smoothly. Generated reference `PX-STF-2026-0064`. Saved to `staff_applications`. Immediately visible in `/admin/staff-applications`.

---

#### Test Case 2: Commercial Driver Registration End-to-End Execution
1. **Driver Profile:** Tukaram Maruti Jadhav (Commercial Heavy Pilot).
2. **Step Progression:**
   - *Step 1 (Personal):* Validated name, DOB (`1988-06-15`), mobile (`94220 11223`), address (Talegaon Dabhade), and emergency contact (*Sunita Jadhav - Wife*, `98901 22334`).
   - *Step 2 (Licence):* Input licence `MH14 20110034567`, issuing RTO (*MH-14 Pimpri Chinchwad*), categories (`HMV`, `Transport Vehicle`, `Trailer / Multi-Axle`), issue `2011-05-10`, expiry `2027-05-09`.
   - *Step 3 (Experience):* Input 12 years total driving, 8 years heavy vehicle experience on *BharatBenz 2823R* and *Ashok Leyland 5525*.
   - *Step 4 (Documents):* Uploaded separate Front and Back of DL, passport photo, and Light Bill address proof.
   - *Step 5 (Review):* Reviewed all 5 editable sections.
   - *Step 6 (Declarations):* Checked all 4 statutory checkboxes.
3. **Result:** Form submitted successfully. Generated reference `PX-DRV-2026-0095`. Saved to `driver_applications`. Form displayed exact confirmation message and mandatory legal disclaimer.

---

### 3. Verification Sign-Off

The Staff Recruitment and Driver Registration systems have been fully validated, compiled with zero errors, and deployed to production specifications.
