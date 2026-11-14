# PRISHA XPRESS PVT. LTD.
## Recruitment Security, Privacy & Access Control Report

**Company:** Prisha Xpress Pvt. Ltd. (`CIN: U49231PN2023PTC225810`)  
**Headquarters:** Pune, Maharashtra, India  
**Scope:** Application Security, RBAC Enforcement, Aadhaar Privacy, and Document Storage Security  
**Audit Date:** November 2026  
**Status:** PASS / PRODUCTION READY  

---

### 1. Single Role RBAC (`admin`) Enforcement

In accordance with Prisha Xpress governance directives, **exactly one administrative role** exists across the entire application ecosystem:

$$\text{Role: } \texttt{admin}$$

- **Public Stealth:** Normal website visitors, customers, staff applicants, and driver applicants are never presented with an "Admin Portal", "Admin Login", or management navigational links.
- **Route Protection:** All `/admin/*` routes are secured using a single-point guard that verifies session identity and validates role `admin`. Unauthorized attempts are redirected immediately to the public home route (`/`).
- **No Fragmented Roles:** No separate HR Admin, Driver Admin, or Verification Officer roles exist. All administrative privileges are consolidated under `admin`, managed directly in Supabase Authentication and the Supabase Dashboard.

---

### 2. Aadhaar Privacy Compliance & Data Minimization

Under Indian privacy directives and the Aadhaar (Targeted Delivery of Financial and Other Subsidies, Benefits and Services) Act:
- **Mandatory Policy:** **Aadhaar cards are never collected or stored by default.**
- **Driver Verification Standard:** Identity and address verification rely exclusively on:
  1. *Driving Licence Front & Back:* Authorized by the Regional Transport Office (RTO) with vehicle endorsement badges.
  2. *Address Proof:* Validated via standard utility bills (Electricity bill), Voter ID, or Ration Card.
- **Form Warnings:** Both Staff and Driver wizards feature explicit notice banners preventing accidental upload of Aadhaar numbers or scans.

---

### 3. Storage Bucket Security & Time-Limited Signed URLs

Document storage is secured through private Supabase Storage buckets:
- `staff-application-documents`
- `driver-application-documents`

#### Key Security Controls:
1. **Zero Public Access:** Both buckets are configured with `public = false`. Public visitors cannot guess, enumerate, or download applicant documents.
2. **Short-Lived Signed URLs:** When an administrator reviews a resume or driving licence inside the Admin Dashboard, the server generates a time-limited signed URL with a lifetime of **600 seconds (10 minutes)**. After expiration, the link invalidates automatically.
3. **Partitioned Storage Paths:** Documents are partitioned into strict directory paths keyed by application reference:
   ```
   staff-application-documents/PX-STF-YYYY-XXXX/{document_type}/{filename}
   driver-application-documents/PX-DRV-YYYY-XXXX/{document_type}/{filename}
   ```
4. **File Type & Size Restrictions:**
   - Allowed MIME types: `application/pdf`, `image/jpeg`, `image/png`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`.
   - Maximum upload size per file: **5 MB**. Files exceeding this limit are blocked on the client and rejected on the API boundary.

---

### 4. Input Sanitization & Anti-Tampering Safeguards

1. **Client-side Sanitization:**
   - Phone numbers are stripped of non-digit formatting characters and validated against 10-digit Indian telecom ranges ($[6\text{--}9][0\text{--}9]^9$).
   - PIN codes are validated strictly against 6-digit postal patterns ($[1\text{--}9][0\text{--}9]^5$).
   - Driving Licence issue and expiry dates are chronologically verified ($\text{expiry} > \text{issue}$).
2. **Expired Licence Handling:**
   - Expired licences are flagged with `is_licence_expired_flag = true` rather than silently rejected, enabling the verification cell to review ongoing RTO renewal slips while preventing automatic clearance.
3. **Cross-Site Scripting (XSS) Prevention:**
   - All rendered candidate details are sanitized and escaped via React JSX virtual DOM rendering. Free-text inputs (e.g. notes, skills) do not support raw HTML injection.
4. **Offline Resilience:**
   - In environments where network access to Supabase is unavailable, an encrypted local storage fallback (`localStorage`) preserves candidate state without data loss, enabling offline testing and verification.
