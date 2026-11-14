-- ==============================================================================
-- PRISHA XPRESS PVT. LTD. (CIN: U49231PN2023PTC225810)
-- CAREERS & RECRUITMENT DATABASE MIGRATION
-- TWO STRICTLY SEPARATED RECRUITMENT MODULES:
--   MODULE A: STAFF RECRUITMENT SYSTEM (HR Management)
--   MODULE B: DRIVER REGISTRATION & VERIFICATION SYSTEM (Driver Operations)
-- ==============================================================================

-- Enable UUID and Cryptographic extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. ENUMS AND CUSTOM TYPES
-- ==============================================================================

-- Staff Application Status
DO $$ BEGIN
    CREATE TYPE staff_app_status AS ENUM (
        'Submitted',
        'Under Review',
        'Shortlisted',
        'Interview Scheduled',
        'Selected',
        'Rejected',
        'On Hold'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Staff Department Type
DO $$ BEGIN
    CREATE TYPE staff_department_enum AS ENUM (
        'Administration',
        'Human Resources',
        'Operations',
        'Transport & Logistics',
        'Accounts & Finance',
        'IT & Technical',
        'Other'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Driver Application Status
DO $$ BEGIN
    CREATE TYPE driver_app_status AS ENUM (
        'Submitted',
        'Pending Verification',
        'Information Required',
        'Under Review',
        'Approved – Ready for Company Software',
        'Rejected',
        'Adding to Company Software',
        'Added to Company Software',
        'Integration Failed'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Driver Document Verification Status
DO $$ BEGIN
    CREATE TYPE driver_doc_verif_status AS ENUM (
        'Pending',
        'Verified',
        'Unclear',
        'Invalid'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Role-Based Access Roles
DO $$ BEGIN
    CREATE TYPE admin_role_enum AS ENUM (
        'super_admin',
        'hr_admin',
        'driver_admin',
        'verification_officer',
        'driver_manager'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 2. SEQUENCES FOR UNIQUE APPLICATION REFERENCES
-- ==============================================================================

CREATE SEQUENCE IF NOT EXISTS staff_app_ref_seq START 1001;
CREATE SEQUENCE IF NOT EXISTS driver_app_ref_seq START 1001;

-- Reference generator functions
CREATE OR REPLACE FUNCTION generate_staff_reference()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.application_reference IS NULL OR NEW.application_reference = '' THEN
        NEW.application_reference := 'PX-STF-2026-' || LPAD(nextval('staff_app_ref_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_driver_reference()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.application_reference IS NULL OR NEW.application_reference = '' THEN
        NEW.application_reference := 'PX-DRV-2026-' || LPAD(nextval('driver_app_ref_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 3. MODULE A: STAFF RECRUITMENT DATABASE TABLES
-- ==============================================================================

-- Table 1: staff_applications
CREATE TABLE IF NOT EXISTS staff_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_reference VARCHAR(50) UNIQUE NOT NULL,
    -- Step 1: Personal Information
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    current_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pin_code VARCHAR(10) NOT NULL,
    -- Step 2: Educational Details
    qualification VARCHAR(100) NOT NULL,
    course_degree VARCHAR(200) NOT NULL,
    college_university VARCHAR(255) NOT NULL,
    passing_year INTEGER NOT NULL,
    percentage_cgpa VARCHAR(20) NOT NULL,
    additional_qualification TEXT,
    -- Step 3: Job Details
    position_applied_for VARCHAR(150) NOT NULL,
    department staff_department_enum NOT NULL,
    preferred_location VARCHAR(150) NOT NULL,
    employment_type VARCHAR(50) NOT NULL DEFAULT 'Full-time',
    is_fresher BOOLEAN NOT NULL DEFAULT FALSE,
    -- Step 4: Work Experience
    total_experience VARCHAR(50),
    previous_company VARCHAR(255),
    previous_job_role VARCHAR(150),
    previous_salary VARCHAR(100),
    key_skills TEXT,
    notice_period VARCHAR(50),
    expected_salary NUMERIC(12, 2),
    -- Step 6: Final Submission
    additional_message TEXT,
    declaration_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    consent_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    application_status staff_app_status NOT NULL DEFAULT 'Submitted',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for staff reference auto-generation
DROP TRIGGER IF EXISTS trg_generate_staff_reference ON staff_applications;
CREATE TRIGGER trg_generate_staff_reference
BEFORE INSERT ON staff_applications
FOR EACH ROW
EXECUTE FUNCTION generate_staff_reference();

-- Table 2: staff_application_documents
CREATE TABLE IF NOT EXISTS staff_application_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    staff_application_id UUID NOT NULL REFERENCES staff_applications(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL, -- 'resume', 'educational_certificate', 'experience_certificate', 'profile_photograph'
    storage_path TEXT NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 3: staff_application_reviews
CREATE TABLE IF NOT EXISTS staff_application_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    staff_application_id UUID NOT NULL REFERENCES staff_applications(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL,
    reviewer_name VARCHAR(255) NOT NULL,
    review_status staff_app_status NOT NULL,
    reviewer_comments TEXT NOT NULL,
    reviewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 4: staff_application_status_history
CREATE TABLE IF NOT EXISTS staff_application_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    staff_application_id UUID NOT NULL REFERENCES staff_applications(id) ON DELETE CASCADE,
    previous_status staff_app_status NOT NULL,
    new_status staff_app_status NOT NULL,
    changed_by VARCHAR(255) NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 4. MODULE B: DRIVER REGISTRATION DATABASE TABLES
-- ==============================================================================

-- Table 1: driver_applications
CREATE TABLE IF NOT EXISTS driver_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_reference VARCHAR(50) UNIQUE NOT NULL,
    -- Step 1: Personal Information
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    alternate_mobile_number VARCHAR(20),
    email VARCHAR(255),
    current_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pin_code VARCHAR(10) NOT NULL,
    emergency_contact_name VARCHAR(255) NOT NULL,
    emergency_contact_number VARCHAR(20) NOT NULL,
    -- Step 2: Driving Licence Details
    licence_number VARCHAR(100) NOT NULL,
    licence_type VARCHAR(50) NOT NULL,
    licence_issue_date DATE NOT NULL,
    licence_expiry_date DATE NOT NULL,
    issuing_rto VARCHAR(100) NOT NULL,
    licence_issuing_state VARCHAR(100) NOT NULL,
    -- Step 3: Driving Experience
    total_driving_experience VARCHAR(50) NOT NULL,
    heavy_vehicle_experience VARCHAR(50) NOT NULL,
    previous_company_name VARCHAR(255),
    previous_job_role VARCHAR(150),
    preferred_work_location VARCHAR(150) NOT NULL,
    expected_monthly_salary NUMERIC(10, 2),
    availability_to_join VARCHAR(50) NOT NULL,
    willingness_to_travel BOOLEAN NOT NULL DEFAULT TRUE,
    -- Step 6: Final Submission
    declaration_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    consent_accepted BOOLEAN NOT NULL DEFAULT FALSE,
    application_status driver_app_status NOT NULL DEFAULT 'Submitted',
    verification_status driver_doc_verif_status NOT NULL DEFAULT 'Pending',
    -- Software integration fields
    external_driver_id VARCHAR(100),
    is_integrated_with_driver_master BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT check_licence_dates CHECK (licence_expiry_date > licence_issue_date)
);

-- Trigger for driver reference auto-generation
DROP TRIGGER IF EXISTS trg_generate_driver_reference ON driver_applications;
CREATE TRIGGER trg_generate_driver_reference
BEFORE INSERT ON driver_applications
FOR EACH ROW
EXECUTE FUNCTION generate_driver_reference();

-- Table 2: driver_vehicle_categories
CREATE TABLE IF NOT EXISTS driver_vehicle_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driver_application_id UUID NOT NULL REFERENCES driver_applications(id) ON DELETE CASCADE,
    vehicle_category VARCHAR(100) NOT NULL
);

-- Table 3: driver_vehicle_experience
CREATE TABLE IF NOT EXISTS driver_vehicle_experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driver_application_id UUID NOT NULL REFERENCES driver_applications(id) ON DELETE CASCADE,
    vehicle_type VARCHAR(100) NOT NULL
);

-- Table 4: driver_application_documents
CREATE TABLE IF NOT EXISTS driver_application_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driver_application_id UUID NOT NULL REFERENCES driver_applications(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL, -- 'driving_licence', 'recent_photograph', 'address_proof', 'resume', 'experience_certificate', 'pan_card'
    storage_path TEXT NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    document_status driver_doc_verif_status NOT NULL DEFAULT 'Pending',
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 5: driver_application_reviews
CREATE TABLE IF NOT EXISTS driver_application_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driver_application_id UUID NOT NULL REFERENCES driver_applications(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL,
    reviewer_name VARCHAR(255) NOT NULL,
    review_status driver_app_status NOT NULL,
    reviewer_comments TEXT NOT NULL,
    reviewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 6: driver_document_verifications
CREATE TABLE IF NOT EXISTS driver_document_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driver_application_id UUID NOT NULL REFERENCES driver_applications(id) ON DELETE CASCADE,
    document_id UUID NOT NULL REFERENCES driver_application_documents(id) ON DELETE CASCADE,
    verification_status driver_doc_verif_status NOT NULL DEFAULT 'Pending',
    verified_by VARCHAR(255) NOT NULL,
    verification_notes TEXT,
    verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 7: driver_application_status_history
CREATE TABLE IF NOT EXISTS driver_application_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driver_application_id UUID NOT NULL REFERENCES driver_applications(id) ON DELETE CASCADE,
    previous_status driver_app_status NOT NULL,
    new_status driver_app_status NOT NULL,
    changed_by VARCHAR(255) NOT NULL,
    reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 8: driver_software_integration_logs
CREATE TABLE IF NOT EXISTS driver_software_integration_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    driver_application_id UUID NOT NULL REFERENCES driver_applications(id) ON DELETE CASCADE,
    integration_status VARCHAR(50) NOT NULL, -- 'SUCCESS', 'FAILED', 'PENDING', 'NOT_CONFIGURED'
    external_driver_id VARCHAR(100),
    initiated_by VARCHAR(255) NOT NULL,
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 5. INDEXES FOR PERFORMANCE AND SEARCH
-- ==============================================================================

-- Staff Indexes
CREATE INDEX IF NOT EXISTS idx_staff_app_ref ON staff_applications(application_reference);
CREATE INDEX IF NOT EXISTS idx_staff_app_status ON staff_applications(application_status);
CREATE INDEX IF NOT EXISTS idx_staff_app_dept ON staff_applications(department);
CREATE INDEX IF NOT EXISTS idx_staff_app_created ON staff_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_staff_docs_app_id ON staff_application_documents(staff_application_id);

-- Driver Indexes
CREATE INDEX IF NOT EXISTS idx_driver_app_ref ON driver_applications(application_reference);
CREATE INDEX IF NOT EXISTS idx_driver_app_status ON driver_applications(application_status);
CREATE INDEX IF NOT EXISTS idx_driver_verif_status ON driver_applications(verification_status);
CREATE INDEX IF NOT EXISTS idx_driver_app_licence ON driver_applications(licence_number);
CREATE INDEX IF NOT EXISTS idx_driver_app_created ON driver_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_driver_docs_app_id ON driver_application_documents(driver_application_id);
CREATE INDEX IF NOT EXISTS idx_driver_cat_app_id ON driver_vehicle_categories(driver_application_id);

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE staff_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_application_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_application_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_application_status_history ENABLE ROW LEVEL SECURITY;

ALTER TABLE driver_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_vehicle_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_vehicle_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_application_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_application_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_document_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_application_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_software_integration_logs ENABLE ROW LEVEL SECURITY;

-- STAFF POLICIES:
-- 1. Public can insert staff application
CREATE POLICY staff_public_insert ON staff_applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY staff_docs_public_insert ON staff_application_documents
    FOR INSERT WITH CHECK (true);

-- 2. Only HR Admin and Super Admin can select / update staff records
CREATE POLICY staff_admin_select ON staff_applications
    FOR SELECT USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'hr_admin')
    );

CREATE POLICY staff_admin_update ON staff_applications
    FOR UPDATE USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'hr_admin')
    );

CREATE POLICY staff_docs_admin_select ON staff_application_documents
    FOR SELECT USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'hr_admin')
    );

CREATE POLICY staff_reviews_admin_all ON staff_application_reviews
    FOR ALL USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'hr_admin')
    );

CREATE POLICY staff_history_admin_select ON staff_application_status_history
    FOR SELECT USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'hr_admin')
    );

-- DRIVER POLICIES:
-- 1. Public can insert driver application
CREATE POLICY driver_public_insert ON driver_applications
    FOR INSERT WITH CHECK (true);

CREATE POLICY driver_cat_public_insert ON driver_vehicle_categories
    FOR INSERT WITH CHECK (true);

CREATE POLICY driver_exp_public_insert ON driver_vehicle_experience
    FOR INSERT WITH CHECK (true);

CREATE POLICY driver_docs_public_insert ON driver_application_documents
    FOR INSERT WITH CHECK (true);

-- 2. Driver Admin, Verification Officer, Driver Manager and Super Admin can view driver records
CREATE POLICY driver_admin_select ON driver_applications
    FOR SELECT USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'driver_admin', 'verification_officer', 'driver_manager')
    );

-- Only Driver Admin, Driver Manager and Super Admin can change overall application status
CREATE POLICY driver_admin_update ON driver_applications
    FOR UPDATE USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'driver_admin', 'driver_manager')
    );

CREATE POLICY driver_docs_admin_select ON driver_application_documents
    FOR SELECT USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'driver_admin', 'verification_officer', 'driver_manager')
    );

-- Verification officers can update document verification status
CREATE POLICY driver_verif_officer_update ON driver_document_verifications
    FOR ALL USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'driver_admin', 'verification_officer')
    );

-- Integration logs restricted to Authorized Driver Manager & Super Admin
CREATE POLICY driver_integration_admin ON driver_software_integration_logs
    FOR ALL USING (
        auth.jwt() ->> 'role' IN ('super_admin', 'driver_manager')
    );

-- ==============================================================================
-- 7. SUPABASE STORAGE BUCKETS CONFIGURATION (METADATA)
-- ==============================================================================
-- Storage Bucket 1: staff-application-documents (Private)
-- Storage Bucket 2: driver-application-documents (Private)
-- Sub-folders are partitioned by application reference:
--   staff-application-documents/PX-STF-2026-XXXX/resume/
--   driver-application-documents/PX-DRV-2026-XXXX/driving-licence/
