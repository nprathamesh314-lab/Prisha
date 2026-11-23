-- ==============================================================================
-- PRISHA XPRESS PVT. LTD. (CIN: U49231PN2023PTC225810)
-- DRIVER REGISTRATION & VERIFICATION SYSTEM - 3-STEP FLOW
-- MIGRATION: 20261123_driver_registration_flow.sql
-- ==============================================================================

-- Enable UUID and pgcrypto extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. DRIVER APPLICATIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.driver_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_code TEXT UNIQUE,
    full_name TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    whatsapp_number TEXT,
    date_of_birth DATE NOT NULL,
    city TEXT NOT NULL,
    pincode TEXT NOT NULL,
    emergency_contact TEXT,
    dl_number TEXT NOT NULL,
    vehicle_categories TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    dl_front_url TEXT NOT NULL,
    dl_back_url TEXT NOT NULL,
    aadhaar_front_url TEXT NOT NULL,
    aadhaar_back_url TEXT NOT NULL,
    pan_card_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    admin_remarks TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Ensure backwards-compatibility if driver_applications table previously existed
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS application_code TEXT UNIQUE;
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS mobile_number TEXT;
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS pincode TEXT;
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS emergency_contact TEXT;
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS dl_number TEXT;
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS vehicle_categories TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS dl_front_url TEXT;
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS dl_back_url TEXT;
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS aadhaar_front_url TEXT;
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS aadhaar_back_url TEXT;
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS pan_card_url TEXT;
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS admin_remarks TEXT;
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now();
ALTER TABLE public.driver_applications ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- Drop obsolete strict constraints if migrating from legacy prototype
DO $$ BEGIN
    ALTER TABLE public.driver_applications ALTER COLUMN gender DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL; END $$;

DO $$ BEGIN
    ALTER TABLE public.driver_applications ALTER COLUMN licence_type DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL; END $$;

DO $$ BEGIN
    ALTER TABLE public.driver_applications ALTER COLUMN state DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL; END $$;

DO $$ BEGIN
    ALTER TABLE public.driver_applications ALTER COLUMN declaration_accepted DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL; END $$;

DO $$ BEGIN
    ALTER TABLE public.driver_applications ALTER COLUMN consent_accepted DROP NOT NULL;
EXCEPTION WHEN OTHERS THEN NULL; END $$;

-- ------------------------------------------------------------------------------
-- 2. INDEXES FOR PERFORMANCE
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_driver_applications_code ON public.driver_applications(application_code);
CREATE INDEX IF NOT EXISTS idx_driver_applications_mobile ON public.driver_applications(mobile_number);
CREATE INDEX IF NOT EXISTS idx_driver_applications_dl ON public.driver_applications(dl_number);
CREATE INDEX IF NOT EXISTS idx_driver_applications_status ON public.driver_applications(status);
CREATE INDEX IF NOT EXISTS idx_driver_applications_created ON public.driver_applications(created_at DESC);

-- ------------------------------------------------------------------------------
-- 3. STORAGE BUCKET: driver-documents
-- ------------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'driver-documents',
    'driver-documents',
    false,
    5242880, -- 5 MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
    public = false,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

-- ------------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.driver_applications ENABLE ROW LEVEL SECURITY;

-- Anonymous public applicants can submit new driver applications
DROP POLICY IF EXISTS "Allow anonymous driver application insert" ON public.driver_applications;
CREATE POLICY "Allow anonymous driver application insert"
ON public.driver_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Authenticated admins can view all driver applications
DROP POLICY IF EXISTS "Allow admins to view driver applications" ON public.driver_applications;
CREATE POLICY "Allow admins to view driver applications"
ON public.driver_applications
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = auth.uid()
          AND user_roles.role = 'admin'
          AND user_roles.is_active = true
    )
    OR auth.jwt() ->> 'role' = 'service_role'
);

-- Authenticated admins can update driver application status and remarks
DROP POLICY IF EXISTS "Allow admins to update driver applications" ON public.driver_applications;
CREATE POLICY "Allow admins to update driver applications"
ON public.driver_applications
FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = auth.uid()
          AND user_roles.role = 'admin'
          AND user_roles.is_active = true
    )
    OR auth.jwt() ->> 'role' = 'service_role'
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = auth.uid()
          AND user_roles.role = 'admin'
          AND user_roles.is_active = true
    )
    OR auth.jwt() ->> 'role' = 'service_role'
);

-- STORAGE RLS: Allow applicants to upload documents into driver-documents bucket
DROP POLICY IF EXISTS "Allow public uploads to driver-documents" ON storage.objects;
CREATE POLICY "Allow public uploads to driver-documents"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'driver-documents');

-- STORAGE RLS: Allow admins to read driver-documents
DROP POLICY IF EXISTS "Allow admins to read driver-documents" ON storage.objects;
CREATE POLICY "Allow admins to read driver-documents"
ON storage.objects
FOR SELECT
TO authenticated
USING (
    bucket_id = 'driver-documents'
    AND (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_roles.user_id = auth.uid()
              AND user_roles.role = 'admin'
              AND user_roles.is_active = true
        )
        OR auth.jwt() ->> 'role' = 'service_role'
    )
);
