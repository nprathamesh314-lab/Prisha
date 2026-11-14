# Prisha Xpress Pvt. Ltd.
## Role-Based Access Control (RBAC) & Security Permissions

**Governance Policy:** Least Privilege & Strict Departmental Segregation  
**Application Scope:** Prisha Xpress Corporate Portal & Admin Operations  

---

### 1. Persona Hierarchy & Access Matrix

| System Action / Resource | Super Admin | HR Admin | Driver Admin | Verification Officer | Authorized Driver Manager | Public (Unauthenticated) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Submit Staff Application** | — | — | — | — | — | ✅ (Wizard) |
| **Submit Driver Registration** | — | — | — | — | — | ✅ (Wizard) |
| **View Staff Applications List** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **View Staff Full Profiles & Resumes** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Update Staff Recruitment Status** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Export Staff Recruitment CSV** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **View Driver Applications List** | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ |
| **View Driver Profiles & Documents** | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ |
| **Execute 10-Point Document Verification** | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ |
| **Approve / Reject Driver Application** | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| **Access Approved Drivers Roster** | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Execute Company Driver Master TMS Integration** | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **View Recruitment Analytics Overview** | ✅ (Full) | ✅ (Staff Only) | ✅ (Driver Only) | ✅ (Verif Only) | ✅ (Approved Only) | ❌ |
| **Inspect System Audit Logs** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

### 2. Role Specifications

#### 2.1 Super Admin (`super_admin`)
- **Default Identity:** Pradeep Sharma (`admin@prishaxpress.com`)
- **Permissions:** Full oversight over all corporate modules, ability to assign permissions, inspect immutable audit logs, review system health, and override exceptions.
- **Constraints:** Any administrative action is automatically stamped with the Super Admin's cryptographic user ID in the audit trail.

#### 2.2 HR Admin (`hr_admin`)
- **Default Identity:** Ananya Deshmukh (`hr@prishaxpress.com`)
- **Department:** Human Resources
- **Permissions:** Full CRUD control over Module A (`staff_applications`, `staff_application_documents`, `staff_application_reviews`, `staff_application_status_history`). Can search, filter, download resumes, schedule interviews, and update candidate stages.
- **Strict Boundary:** **Cannot view or access any driver applications, licences, or fleet verification records.**

#### 2.3 Driver Admin (`driver_admin`)
- **Default Identity:** Vikram Jadhav (`driver.admin@prishaxpress.com`)
- **Department:** Driver Fleet Operations Cell
- **Permissions:** Full workflow management for Module B driver applications. Can search commercial driver registrations, filter by vehicle categories, and review driver qualifications.
- **Strict Boundary:** **Cannot view or access staff candidate resumes or corporate applications.**

#### 2.4 Verification Officer (`verification_officer`)
- **Default Identity:** Suresh Patil (`verification@prishaxpress.com`)
- **Department:** Document Verification Cell
- **Permissions:** Dedicated access to `/admin/driver-verification`. Evaluates driving licences, RTO endorsements, address proofs, and photos against the 10-point checklist. Can set document status to *Verified*, *Unclear*, or *Invalid*.
- **Strict Boundary:** Cannot integrate drivers into the company TMS master software.

#### 2.5 Authorized Driver Manager (`driver_manager`)
- **Default Identity:** Rajesh Kulkarni (`fleet.manager@prishaxpress.com`)
- **Department:** Fleet Master Integration Cell
- **Permissions:** Dedicated access to `/admin/approved-drivers`. Authorized to initiate pre-flight duplicate checks and push cleared drivers into the official Prisha Xpress Driver Master TMS API.
- **Strict Boundary:** Cannot modify staff applications or approve unverified drivers.

---

### 3. Frontend & Backend Enforcement
1. **Frontend Route Guards:** Attempting to access an unauthorized route displays an explicit *Access Restricted* warning banner specifying the required clearance level.
2. **Backend Row Level Security (RLS):** Supabase PostgreSQL policies validate the JWT role on every query. If an HR Admin token queries `driver_applications`, the database returns an empty set or `403 Forbidden`.
3. **Storage Bucket Policies:** Signed URLs for `staff-application-documents` require `hr_admin` claims, while `driver-application-documents` require `driver_admin` or `verification_officer` claims.
