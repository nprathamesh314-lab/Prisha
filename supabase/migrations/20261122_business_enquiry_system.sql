-- ==============================================================================
-- PRISHA XPRESS PVT. LTD. (CIN: U49231PN2023PTC225810)
-- BUSINESS ENQUIRY MANAGEMENT SYSTEM - DATABASE SCHEMA & RLS SECURITY
-- MIGRATION: 20261122_business_enquiry_system.sql
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. BUSINESS ENQUIRIES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.business_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enquiry_number VARCHAR(50) UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    phone_number VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    service_required VARCHAR(100) NOT NULL,
    operational_requirements TEXT NOT NULL,
    preferred_contact_method VARCHAR(50) DEFAULT 'Phone Call',
    status VARCHAR(50) NOT NULL DEFAULT 'New',
    admin_notes TEXT,
    assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    assigned_to_name VARCHAR(255),
    follow_up_date TIMESTAMPTZ,
    email_status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    email_error TEXT,
    customer_email_status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    customer_email_error TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    contacted_at TIMESTAMPTZ
);

-- Ensure backwards-compatibility if columns were missing in older schema
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS enquiry_number VARCHAR(50) UNIQUE;
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS full_name VARCHAR(255);
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS company_name VARCHAR(255);
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS phone_number VARCHAR(50);
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS email VARCHAR(255);
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS service_required VARCHAR(100);
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS operational_requirements TEXT;
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS preferred_contact_method VARCHAR(50) DEFAULT 'Phone Call';
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'New';
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS assigned_to UUID;
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS assigned_to_name VARCHAR(255);
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS follow_up_date TIMESTAMPTZ;
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS email_status VARCHAR(50) DEFAULT 'Pending';
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS email_error TEXT;
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS customer_email_status VARCHAR(50) DEFAULT 'Pending';
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS customer_email_error TEXT;
ALTER TABLE public.business_enquiries ADD COLUMN IF NOT EXISTS contacted_at TIMESTAMPTZ;

-- Performance indexes for fast querying and filtering
CREATE INDEX IF NOT EXISTS idx_business_enquiries_status ON public.business_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_business_enquiries_created_at ON public.business_enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_business_enquiries_enquiry_number ON public.business_enquiries(enquiry_number);
CREATE INDEX IF NOT EXISTS idx_business_enquiries_email ON public.business_enquiries(email);
CREATE INDEX IF NOT EXISTS idx_business_enquiries_phone ON public.business_enquiries(phone_number);

-- ------------------------------------------------------------------------------
-- 2. SEQUENTIAL ENQUIRY NUMBER GENERATOR TRIGGER
-- FORMAT: PXPL-ENQ-YYYY-XXXX (e.g., PXPL-ENQ-2026-0001)
-- ------------------------------------------------------------------------------
CREATE SEQUENCE IF NOT EXISTS public.business_enquiry_seq START 1;

CREATE OR REPLACE FUNCTION public.generate_enquiry_number()
RETURNS TRIGGER AS $$
DECLARE
    current_year TEXT := to_char(now(), 'YYYY');
    seq_val BIGINT;
BEGIN
    IF NEW.enquiry_number IS NULL OR NEW.enquiry_number = '' THEN
        seq_val := nextval('public.business_enquiry_seq');
        NEW.enquiry_number := 'PXPL-ENQ-' || current_year || '-' || lpad(seq_val::text, 4, '0');
    END IF;
    NEW.updated_at := now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_generate_enquiry_number ON public.business_enquiries;
CREATE TRIGGER trigger_generate_enquiry_number
    BEFORE INSERT ON public.business_enquiries
    FOR EACH ROW
    EXECUTE FUNCTION public.generate_enquiry_number();

-- Auto-update updated_at on modify
DROP TRIGGER IF EXISTS trigger_business_enquiries_updated_at ON public.business_enquiries;
CREATE TRIGGER trigger_business_enquiries_updated_at
    BEFORE UPDATE ON public.business_enquiries
    FOR EACH ROW
    EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- ------------------------------------------------------------------------------
-- 3. ACTIVITY HISTORY TABLE (AUDIT TRAIL FOR ENQUIRY ACTIONS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.business_enquiry_activity_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enquiry_id UUID NOT NULL REFERENCES public.business_enquiries(id) ON DELETE CASCADE,
    action_type VARCHAR(50) NOT NULL,
    previous_status VARCHAR(50),
    new_status VARCHAR(50),
    actor_name VARCHAR(255) NOT NULL,
    actor_id UUID,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_enquiry_activity_enquiry_id ON public.business_enquiry_activity_history(enquiry_id);
CREATE INDEX IF NOT EXISTS idx_enquiry_activity_created_at ON public.business_enquiry_activity_history(created_at DESC);

-- ------------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.business_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_enquiry_activity_history ENABLE ROW LEVEL SECURITY;

-- 4.1 PUBLIC WEBSITE VISITORS
-- Can securely submit an enquiry
DROP POLICY IF EXISTS business_enquiries_public_insert ON public.business_enquiries;
CREATE POLICY business_enquiries_public_insert ON public.business_enquiries
    FOR INSERT WITH CHECK (true);

-- Public CANNOT select all enquiries
DROP POLICY IF EXISTS business_enquiries_public_select ON public.business_enquiries;
-- (No SELECT policy for public ensures visitors cannot read other customers' data)

-- 4.2 AUTHENTICATED ADMINISTRATORS
-- Active admins (is_admin() = true) can SELECT, UPDATE, and DELETE all enquiries
DROP POLICY IF EXISTS business_enquiries_admin_select ON public.business_enquiries;
CREATE POLICY business_enquiries_admin_select ON public.business_enquiries
    FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS business_enquiries_admin_update ON public.business_enquiries;
CREATE POLICY business_enquiries_admin_update ON public.business_enquiries
    FOR UPDATE USING (public.is_admin());

DROP POLICY IF EXISTS business_enquiries_admin_delete ON public.business_enquiries;
CREATE POLICY business_enquiries_admin_delete ON public.business_enquiries
    FOR DELETE USING (public.is_admin());

-- 4.3 ACTIVITY HISTORY POLICIES
DROP POLICY IF EXISTS enquiry_activity_admin_all ON public.business_enquiry_activity_history;
CREATE POLICY enquiry_activity_admin_all ON public.business_enquiry_activity_history
    FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS enquiry_activity_public_insert ON public.business_enquiry_activity_history;
CREATE POLICY enquiry_activity_public_insert ON public.business_enquiry_activity_history
    FOR INSERT WITH CHECK (true);
