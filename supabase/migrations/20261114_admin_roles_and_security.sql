-- ==============================================================================
-- PRISHA XPRESS PVT. LTD. (CIN: U49231PN2023PTC225810)
-- SINGLE ADMIN ROLE SYSTEM & DATABASE ROW LEVEL SECURITY (RLS)
-- EXACT ROLE: 'admin' (ASSIGNED DIRECTLY THROUGH SUPABASE AUTH & SQL)
-- PRESERVES ALL EXISTING APPLICATION DATA WITHOUT DESTRUCTIVE DROPS
-- ==============================================================================

-- Ensure pgcrypto / uuid-ossp for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 1. PROTECTED USER_ROLES TABLE
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role = 'admin'),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT user_roles_user_id_unique UNIQUE (user_id)
);

-- Performance and lookup indexes
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_active_admin ON public.user_roles(user_id, role, is_active);

-- Auto-update updated_at timestamp trigger
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_user_roles_updated_at ON public.user_roles;
CREATE TRIGGER trigger_user_roles_updated_at
    BEFORE UPDATE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- ==============================================================================
-- 2. SECURE ADMIN VERIFICATION FUNCTION (SECURITY DEFINER)
-- ==============================================================================

-- Evaluates if the current requesting session belongs to an active administrator
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = auth.uid()
          AND role = 'admin'
          AND is_active = true
    );
$$;

-- ==============================================================================
-- 3. ADDITIONAL SENSITIVE APPLICATION TABLES
-- ==============================================================================

-- Table: business_enquiries
CREATE TABLE IF NOT EXISTS public.business_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    service_requested VARCHAR(100) NOT NULL,
    origin_city VARCHAR(100),
    destination_city VARCHAR(100),
    fleet_requirement TEXT,
    estimated_monthly_volume VARCHAR(100),
    additional_details TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'New',
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: contact_enquiries
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Unread',
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: administrative_logs
CREATE TABLE IF NOT EXISTS public.administrative_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    admin_email VARCHAR(255) NOT NULL,
    action_type VARCHAR(100) NOT NULL,
    target_module VARCHAR(100) NOT NULL,
    target_id VARCHAR(100),
    details JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table: company_software_integrations (Disabled by default)
CREATE TABLE IF NOT EXISTS public.company_software_integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    integration_name VARCHAR(150) NOT NULL DEFAULT 'Prisha Enterprise TMS / ERP',
    status VARCHAR(50) NOT NULL DEFAULT 'NOT_CONFIGURED',
    api_endpoint TEXT,
    last_sync_at TIMESTAMPTZ,
    last_sync_status VARCHAR(50),
    total_synced_drivers INTEGER NOT NULL DEFAULT 0,
    configuration_notes TEXT DEFAULT 'Integration disabled. Awaiting official company API documentation and credentials.',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default integration state if not present
INSERT INTO public.company_software_integrations (integration_name, status, configuration_notes)
SELECT 'Prisha Enterprise TMS / ERP', 'NOT_CONFIGURED', 'Integration disabled. Awaiting official company API documentation and credentials.'
WHERE NOT EXISTS (
    SELECT 1 FROM public.company_software_integrations WHERE integration_name = 'Prisha Enterprise TMS / ERP'
);

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES - STRICT UNIFIED ADMIN ACCESS
-- ==============================================================================

-- 4.1 Enable RLS on all sensitive tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.administrative_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_software_integrations ENABLE ROW LEVEL SECURITY;

-- If existing careers tables exist, ensure RLS is active
DO $$ BEGIN
    ALTER TABLE public.staff_applications ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.staff_application_documents ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.staff_application_reviews ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.staff_application_status_history ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.driver_applications ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.driver_vehicle_categories ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.driver_vehicle_experience ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.driver_application_documents ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.driver_application_reviews ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.driver_document_verifications ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.driver_application_status_history ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.driver_software_integration_logs ENABLE ROW LEVEL SECURITY;
EXCEPTION
    WHEN undefined_table THEN null;
END $$;

-- ------------------------------------------------------------------------------
-- 4.2 USER_ROLES POLICIES
-- ------------------------------------------------------------------------------
-- Public cannot insert, update, or delete roles. Only direct SQL or service_role can.
DROP POLICY IF EXISTS user_roles_read_own ON public.user_roles;
CREATE POLICY user_roles_read_own ON public.user_roles
    FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

-- ------------------------------------------------------------------------------
-- 4.3 BUSINESS & CONTACT ENQUIRIES POLICIES
-- ------------------------------------------------------------------------------
-- Public can submit enquiries
DROP POLICY IF EXISTS business_enquiries_public_insert ON public.business_enquiries;
CREATE POLICY business_enquiries_public_insert ON public.business_enquiries
    FOR INSERT WITH CHECK (true);

-- Only active admin can read/manage business enquiries
DROP POLICY IF EXISTS business_enquiries_admin_manage ON public.business_enquiries;
CREATE POLICY business_enquiries_admin_manage ON public.business_enquiries
    FOR ALL USING (public.is_admin());

-- Public can submit contact messages
DROP POLICY IF EXISTS contact_enquiries_public_insert ON public.contact_enquiries;
CREATE POLICY contact_enquiries_public_insert ON public.contact_enquiries
    FOR INSERT WITH CHECK (true);

-- Only active admin can read/manage contact messages
DROP POLICY IF EXISTS contact_enquiries_admin_manage ON public.contact_enquiries;
CREATE POLICY contact_enquiries_admin_manage ON public.contact_enquiries
    FOR ALL USING (public.is_admin());

-- Only active admin can view administrative audit logs
DROP POLICY IF EXISTS administrative_logs_admin_manage ON public.administrative_logs;
CREATE POLICY administrative_logs_admin_manage ON public.administrative_logs
    FOR ALL USING (public.is_admin());

-- Only active admin can view integration status
DROP POLICY IF EXISTS company_software_integrations_admin ON public.company_software_integrations;
CREATE POLICY company_software_integrations_admin ON public.company_software_integrations
    FOR ALL USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- 4.4 STAFF APPLICATIONS POLICIES (MIGRATED TO SINGLE 'admin' ROLE)
-- ------------------------------------------------------------------------------
DO $$ BEGIN
    -- Drop obsolete multi-role policies
    DROP POLICY IF EXISTS staff_admin_select ON public.staff_applications;
    DROP POLICY IF EXISTS staff_admin_update ON public.staff_applications;
    DROP POLICY IF EXISTS staff_docs_admin_select ON public.staff_application_documents;
    DROP POLICY IF EXISTS staff_reviews_admin_all ON public.staff_application_reviews;
    DROP POLICY IF EXISTS staff_history_admin_select ON public.staff_application_status_history;

    -- Ensure public submission remains active
    DROP POLICY IF EXISTS staff_public_insert ON public.staff_applications;
    CREATE POLICY staff_public_insert ON public.staff_applications
        FOR INSERT WITH CHECK (true);

    DROP POLICY IF EXISTS staff_docs_public_insert ON public.staff_application_documents;
    CREATE POLICY staff_docs_public_insert ON public.staff_application_documents
        FOR INSERT WITH CHECK (true);

    -- Single admin role management
    CREATE POLICY staff_admin_manage_all ON public.staff_applications
        FOR ALL USING (public.is_admin());

    CREATE POLICY staff_docs_admin_manage ON public.staff_application_documents
        FOR ALL USING (public.is_admin());

    CREATE POLICY staff_reviews_admin_manage ON public.staff_application_reviews
        FOR ALL USING (public.is_admin());

    CREATE POLICY staff_history_admin_manage ON public.staff_application_status_history
        FOR ALL USING (public.is_admin());
EXCEPTION
    WHEN undefined_table THEN null;
END $$;

-- ------------------------------------------------------------------------------
-- 4.5 DRIVER APPLICATIONS POLICIES (MIGRATED TO SINGLE 'admin' ROLE)
-- ------------------------------------------------------------------------------
DO $$ BEGIN
    -- Drop obsolete multi-role policies
    DROP POLICY IF EXISTS driver_admin_select ON public.driver_applications;
    DROP POLICY IF EXISTS driver_admin_update ON public.driver_applications;
    DROP POLICY IF EXISTS driver_docs_admin_select ON public.driver_application_documents;
    DROP POLICY IF EXISTS driver_verif_officer_update ON public.driver_document_verifications;
    DROP POLICY IF EXISTS driver_integration_admin ON public.driver_software_integration_logs;

    -- Ensure public submission remains active
    DROP POLICY IF EXISTS driver_public_insert ON public.driver_applications;
    CREATE POLICY driver_public_insert ON public.driver_applications
        FOR INSERT WITH CHECK (true);

    DROP POLICY IF EXISTS driver_cat_public_insert ON public.driver_vehicle_categories;
    CREATE POLICY driver_cat_public_insert ON public.driver_vehicle_categories
        FOR INSERT WITH CHECK (true);

    DROP POLICY IF EXISTS driver_exp_public_insert ON public.driver_vehicle_experience;
    CREATE POLICY driver_exp_public_insert ON public.driver_vehicle_experience
        FOR INSERT WITH CHECK (true);

    DROP POLICY IF EXISTS driver_docs_public_insert ON public.driver_application_documents;
    CREATE POLICY driver_docs_public_insert ON public.driver_application_documents
        FOR INSERT WITH CHECK (true);

    -- Single admin role management
    CREATE POLICY driver_admin_manage_all ON public.driver_applications
        FOR ALL USING (public.is_admin());

    CREATE POLICY driver_cat_admin_manage ON public.driver_vehicle_categories
        FOR ALL USING (public.is_admin());

    CREATE POLICY driver_exp_admin_manage ON public.driver_vehicle_experience
        FOR ALL USING (public.is_admin());

    CREATE POLICY driver_docs_admin_manage ON public.driver_application_documents
        FOR ALL USING (public.is_admin());

    CREATE POLICY driver_reviews_admin_manage ON public.driver_application_reviews
        FOR ALL USING (public.is_admin());

    CREATE POLICY driver_verif_admin_manage ON public.driver_document_verifications
        FOR ALL USING (public.is_admin());

    CREATE POLICY driver_history_admin_manage ON public.driver_application_status_history
        FOR ALL USING (public.is_admin());

    CREATE POLICY driver_integration_admin_manage ON public.driver_software_integration_logs
        FOR ALL USING (public.is_admin());
EXCEPTION
    WHEN undefined_table THEN null;
END $$;
