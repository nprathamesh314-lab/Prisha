# Prisha Xpress Pvt. Ltd.
## Driver Document Verification Workflow & Standard Operating Procedure (SOP)

**Operating Unit:** Prisha Xpress Document Verification Cell (Pune HQ & Regional Service Stations)  
**Workspace Route:** `/admin/driver-verification`  
**Applicability:** Commercial vehicle drivers applying for interstate container, trailer, and heavy truck operations.  

---

### 1. 10-Point Verification Checklist Protocol

Every commercial driver registered through the portal must undergo the standard 10-point inspection protocol before status can be advanced to *Approved – Ready for Company Software*:

```mermaid
flowchart TD
    A["Driver Submits Registration\n(/careers/driver-registration)"] --> B["Record Inserted with Status: 'Submitted'\nDocs in 'driver-application-documents'"]
    B --> C["Verification Officer Opens Workspace\n(/admin/driver-verification)"]
    C --> D{"Execute 10-Point Inspection"}
    
    D --> E1["1. Personal Information Check"]
    D --> E2["2. Contact & Emergency Phone Validation"]
    D --> E3["3. Driving Licence Authenticity & Format"]
    D --> E4["4. Licence Issue Date Verification"]
    D --> E5["5. Active Expiry Date Check"]
    D --> E6["6. Vehicle Category Endorsement (HMV/HGMV/TRANS)"]
    D --> E7["7. Commercial Driving Track Record"]
    D --> E8["8. Address Proof (Utility Bill / Voter ID)"]
    D --> E9["9. Face Matching with Driver Photo"]
    D --> E10["10. Duplicate Licence Cross-Check"]

    E1 & E2 & E3 & E4 & E5 & E6 & E7 & E8 & E9 & E10 --> F{"All 10 Items Valid?"}

    F -- "Yes (All Checked)" --> G["Mark Verification Status: 'Verified'\nApp Status: 'Approved – Ready for Company Software'"]
    F -- "Document Illegible" --> H["Mark Doc Status: 'Unclear'\nTrigger Request for Rescan"]
    F -- "Expired / Forged" --> I["Mark Doc Status: 'Invalid'\nApp Status: 'Rejected'"]
    
    G --> J["Transferred to Authorized Driver Manager Roster\n(/admin/approved-drivers)"]
```

---

### 2. Document Status Definitions & Actions

| Document Status | Operational Meaning | Action by Verification Officer | Candidate Impact |
| :--- | :--- | :--- | :--- |
| **Pending** | Default initial state upon submission. | Review high-resolution scan in preview pane. | Under routine queue processing. |
| **Verified** | Verified legible, authentic, stamped by authorized RTO, and within active validity. | Log verification notes and mark green check. | Counts toward driver final approval threshold. |
| **Unclear** | Image blurred, corners cut off, or serial number illegible. | Mark amber warning with specific replacement note (e.g., *"Reverse side showing HGMV stamp is blurred"*). | Applicant notified to upload rescan. |
| **Invalid** | Fake watermark, expired validity without grace receipt, or non-commercial private badge only. | Mark red rejection with formal reason. | Application flagged; status updated to *Rejected*. |

---

### 3. Verification Governance & Anti-Impersonation Rules
1. **No Unsubstantiated Government Claims:** The platform does not claim automated government Parivahan Sarathi API authentication without an authorized contracted API integration. All checks are recorded as manual physical and documental checks by named company verification officers.
2. **Mandatory Dual-Signoff:**
   - Step 1: Verification Officer certifies documents at `/admin/driver-verification`.
   - Step 2: Driver Manager executes final TMS induction at `/admin/approved-drivers`.
3. **Audit Trail Logging:** Every document status change creates an entry in `driver_document_verifications` and `driver_application_status_history` capturing reviewer name, timestamp, and notes.
