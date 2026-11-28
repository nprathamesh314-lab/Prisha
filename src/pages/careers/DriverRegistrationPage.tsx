// PRISHA XPRESS PVT. LTD. - 3-STEP DRIVER REGISTRATION FLOW
// ROUTE: /careers/driver & /careers/driver-registration
// CONNECTED TO SUPABASE (PostgreSQL Database + Storage bucket 'driver-documents')

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../../components/animations/PageTransition';
import {
  driverApplicationService,
} from '../../services/driverApplicationService';
import {
  DriverApplicationFormData,
  DriverUploadedFiles,
  DriverApplicationRecord,
  DriverVehicleCategory,
} from '../../types/driverApplication';
import {
  Truck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Trash2,
  AlertCircle,
  Copy,
  Printer,
  Edit,
  ShieldCheck,
  UploadCloud,
  Camera,
  FileText,
  MessageSquare,
  Check,
  RotateCcw,
  X,
  RefreshCw,
} from 'lucide-react';

const MAHARASHTRA_CITIES = [
  'Pune',
  'Mumbai',
  'Thane',
  'Nashik',
  'Nagpur',
  'Kolhapur',
  'Chhatrapati Sambhajinagar',
  'Solapur',
  'Satara',
  'Other',
];

const VEHICLE_CATEGORIES: DriverVehicleCategory[] = [
  'LMV',
  'HMV',
  'HGMV',
  'Transport Vehicle',
  'Trailer / Multi-Axle',
  'Container Vehicle',
];

export const DriverRegistrationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedDriver, setSubmittedDriver] = useState<DriverApplicationRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sameAsMobile, setSameAsMobile] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState<DriverApplicationFormData>({
    full_name: '',
    mobile_number: '',
    whatsapp_number: '',
    date_of_birth: '',
    city: 'Pune',
    pincode: '',
    emergency_contact: '',
    dl_number: '',
    vehicle_categories: ['HMV', 'Transport Vehicle'],
    declaration_accepted: false,
  });

  // Document Files State
  const [files, setFiles] = useState<DriverUploadedFiles>({
    dl_front: null,
    dl_back: null,
    aadhaar_front: null,
    aadhaar_back: null,
    pan_card: null,
  });

  // Preview URLs for instant thumbnail render
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});

  // Camera Capture Modal State
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [cameraTargetKey, setCameraTargetKey] = useState<keyof DriverUploadedFiles | null>(null);
  const [cameraTargetTitle, setCameraTargetTitle] = useState<string>('');
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedBlobUrl, setCapturedBlobUrl] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  // Synchronize video element with stream
  useEffect(() => {
    if (cameraModalOpen && cameraStream && videoRef.current && !capturedBlobUrl) {
      videoRef.current.srcObject = cameraStream;
      videoRef.current.play().catch(() => {});
    }
  }, [cameraModalOpen, cameraStream, capturedBlobUrl]);

  const startCamera = async (mode: 'user' | 'environment' = facingMode) => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setCameraError(null);
    setCapturedBlobUrl(null);
    setCapturedFile(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera is not supported on this browser. Please upload an image file from your device.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: mode },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    } catch {
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setCameraStream(fallbackStream);
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
          videoRef.current.play().catch(() => {});
        }
      } catch {
        setCameraError('Camera permission was denied or camera is unavailable. Please allow camera permissions in your browser or upload an image file from your device.');
      }
    }
  };

  const openCameraModal = (key: keyof DriverUploadedFiles, title: string) => {
    setCameraTargetKey(key);
    setCameraTargetTitle(title);
    setCameraModalOpen(true);
    setCapturedBlobUrl(null);
    setCapturedFile(null);
    setFacingMode('environment');
    startCamera('environment');
  };

  const closeCameraModal = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    if (capturedBlobUrl && capturedBlobUrl.startsWith('blob:')) {
      URL.revokeObjectURL(capturedBlobUrl);
    }
    setCapturedBlobUrl(null);
    setCapturedFile(null);
    setCameraTargetKey(null);
    setCameraModalOpen(false);
    setCameraError(null);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, width, height);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const filename = `${cameraTargetKey || 'document'}_${Date.now()}.jpg`;
        const file = new File([blob], filename, { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        setCapturedBlobUrl(url);
        setCapturedFile(file);
      },
      'image/jpeg',
      0.92
    );
  };

  const retakePhoto = () => {
    if (capturedBlobUrl && capturedBlobUrl.startsWith('blob:')) {
      URL.revokeObjectURL(capturedBlobUrl);
    }
    setCapturedBlobUrl(null);
    setCapturedFile(null);
    if (videoRef.current && cameraStream) {
      videoRef.current.play().catch(() => {});
    }
  };

  const confirmCapturedPhoto = () => {
    if (capturedFile && cameraTargetKey) {
      handleFileSelect(cameraTargetKey, capturedFile);
    }
    closeCameraModal();
  };

  const toggleCameraFacingMode = () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newMode);
    startCamera(newMode);
  };

  // Restore draft on mount
  useEffect(() => {
    const draft = driverApplicationService.loadDraft();
    if (draft) {
      setFormData((prev) => ({
        ...prev,
        ...draft,
      }));
      if (draft.whatsapp_number && draft.whatsapp_number === draft.mobile_number) {
        setSameAsMobile(true);
      }
    }
  }, []);

  // Save draft on formData change
  useEffect(() => {
    if (!submittedDriver) {
      driverApplicationService.saveDraft(formData);
    }
  }, [formData, submittedDriver]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrls]);

  // Validation Helpers
  const isMobileValid = (num: string): boolean => {
    const clean = num.replace(/\D/g, '');
    return clean.length === 10 && /^[6-9]/.test(clean);
  };

  const isPinValid = (pin: string): boolean => {
    return /^[1-9][0-9]{5}$/.test(pin.trim());
  };

  const calculateAge = (dobString: string): number => {
    if (!dobString) return 0;
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  // Field change handlers
  const handleInputChange = (field: keyof DriverApplicationFormData, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'mobile_number' && sameAsMobile) {
        updated.whatsapp_number = value;
      }
      return updated;
    });

    // Clear error for that field
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSameAsMobileToggle = (checked: boolean) => {
    setSameAsMobile(checked);
    if (checked) {
      setFormData((prev) => ({ ...prev, whatsapp_number: prev.mobile_number }));
      if (fieldErrors.whatsapp_number) {
        setFieldErrors((prev) => {
          const next = { ...prev };
          delete next.whatsapp_number;
          return next;
        });
      }
    } else {
      setFormData((prev) => ({ ...prev, whatsapp_number: '' }));
    }
  };

  const toggleCategory = (cat: DriverVehicleCategory) => {
    setFormData((prev) => {
      const exists = prev.vehicle_categories.includes(cat);
      const updated = exists
        ? prev.vehicle_categories.filter((c) => c !== cat)
        : [...prev.vehicle_categories, cat];
      return { ...prev, vehicle_categories: updated };
    });

    if (fieldErrors.vehicle_categories) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.vehicle_categories;
        return next;
      });
    }
  };

  // File change handler
  const handleFileSelect = (key: keyof DriverUploadedFiles, file: File | null) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFieldErrors((prev) => ({
        ...prev,
        [key]: 'File size exceeds 5 MB limit. Please upload a smaller file.',
      }));
      return;
    }

    setFiles((prev) => ({ ...prev, [key]: file }));

    // Revoke previous URL if exists
    if (previewUrls[key] && previewUrls[key].startsWith('blob:')) {
      URL.revokeObjectURL(previewUrls[key]);
    }

    // Set new preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrls((prev) => ({ ...prev, [key]: url }));

    // Clear field error
    if (fieldErrors[key]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleRemoveFile = (key: keyof DriverUploadedFiles) => {
    setFiles((prev) => ({ ...prev, [key]: null }));
    if (previewUrls[key] && previewUrls[key].startsWith('blob:')) {
      URL.revokeObjectURL(previewUrls[key]);
    }
    setPreviewUrls((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  // Step Validation
  const validateStep1 = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.full_name.trim()) {
      errors.full_name = 'Full name as per Driving Licence is required.';
    } else if (formData.full_name.trim().length < 3) {
      errors.full_name = 'Please enter a valid full name (minimum 3 characters).';
    }

    if (!formData.mobile_number.trim()) {
      errors.mobile_number = 'Mobile number is required.';
    } else if (!isMobileValid(formData.mobile_number)) {
      errors.mobile_number = 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (formData.whatsapp_number && formData.whatsapp_number.trim()) {
      if (!isMobileValid(formData.whatsapp_number)) {
        errors.whatsapp_number = 'Please enter a valid 10-digit WhatsApp number.';
      }
    }

    if (!formData.date_of_birth) {
      errors.date_of_birth = 'Date of birth is required.';
    } else {
      const age = calculateAge(formData.date_of_birth);
      if (age < 18) {
        errors.date_of_birth = 'Driver must be at least 18 years old to apply.';
      } else if (age > 65) {
        errors.date_of_birth = 'Maximum driver recruitment age is 65 years.';
      }
    }

    if (!formData.city) {
      errors.city = 'Please select your current city or district.';
    }

    if (!formData.pincode.trim()) {
      errors.pincode = 'PIN code is required.';
    } else if (!isPinValid(formData.pincode)) {
      errors.pincode = 'Please enter a valid 6-digit PIN code.';
    }

    if (!formData.dl_number.trim()) {
      errors.dl_number = 'Driving Licence number is required.';
    } else if (formData.dl_number.trim().length < 8) {
      errors.dl_number = 'Please enter a valid Driving Licence number (e.g. MH14 20120045612).';
    }

    if (!formData.vehicle_categories || formData.vehicle_categories.length === 0) {
      errors.vehicle_categories = 'Please select at least one authorized vehicle category.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: Record<string, string> = {};

    if (!files.dl_front) {
      errors.dl_front = 'Please upload Driving Licence (Front Side).';
    }
    if (!files.dl_back) {
      errors.dl_back = 'Please upload Driving Licence (Back Side).';
    }
    if (!files.aadhaar_front) {
      errors.aadhaar_front = 'Please upload Aadhaar Card (Front Side).';
    }
    if (!files.aadhaar_back) {
      errors.aadhaar_back = 'Please upload Aadhaar Card (Back Side).';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    setErrorMsg(null);
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    }
  };

  const handlePrev = () => {
    setErrorMsg(null);
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  // Final Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.declaration_accepted) {
      setFieldErrors((prev) => ({
        ...prev,
        declaration_accepted: 'You must confirm the declaration to submit your application.',
      }));
      return;
    }

    setIsSubmitting(true);
    try {
      const record = await driverApplicationService.submitDriverApplication(formData, files);
      setSubmittedDriver(record);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Error submitting driver registration:', err);
      setErrorMsg(err.message || 'Failed to submit application. Please check your network and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (submittedDriver?.application_code) {
      navigator.clipboard.writeText(submittedDriver.application_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Reusable File Upload Box Component
  const FileUploadBox: React.FC<{
    idKey: keyof DriverUploadedFiles;
    title: string;
    required?: boolean;
    helperText?: string;
  }> = ({ idKey, title, required, helperText }) => {
    const file = files[idKey];
    const preview = previewUrls[idKey];
    const fileInputRef = useRef<HTMLInputElement>(null);
    const hasError = Boolean(fieldErrors[idKey]);

    return (
      <div className={`rounded-xl border p-4 transition-all duration-200 ${
        hasError
          ? 'border-red-400 bg-red-50/50'
          : file
          ? 'border-emerald-300 bg-emerald-50/30'
          : 'border-gray-200 bg-white hover:border-purple-300'
      }`}>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
            {title} {required && <span className="text-red-500 font-bold">*</span>}
          </label>
          {file && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              <Check className="w-3 h-3" /> Ready
            </span>
          )}
        </div>

        {helperText && <p className="text-xs text-gray-500 mb-3">{helperText}</p>}

        {/* Regular file picker for device storage / PDF */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0] || null;
            handleFileSelect(idKey, f);
            e.target.value = '';
          }}
        />

        {file ? (
          <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-gray-100 shadow-sm">
            {/* Thumbnail Preview */}
            <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center border border-gray-200">
              {file.type === 'application/pdf' ? (
                <FileText className="w-7 h-7 text-red-500" />
              ) : preview ? (
                <img src={preview} alt={title} className="w-full h-full object-cover" />
              ) : (
                <FileText className="w-7 h-7 text-purple-600" />
              )}
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 truncate">{file.name}</p>
              <p className="text-[11px] text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
            </div>

            {/* Action Buttons: Camera Retake / Replace Upload / Remove */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => openCameraModal(idKey, title)}
                className="text-[11px] font-bold text-purple-700 hover:text-purple-900 px-2.5 py-1.5 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors flex items-center gap-1"
                title="Retake photo using camera"
              >
                <Camera className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Camera</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] font-bold text-gray-700 hover:text-gray-900 px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-1"
                title="Choose different file from device"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Upload</span>
              </button>
              <button
                type="button"
                onClick={() => handleRemoveFile(idKey)}
                className="text-xs font-medium text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                title="Remove document"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Primary Action: Take Photo with Camera */}
            <button
              type="button"
              onClick={() => openCameraModal(idKey, title)}
              className="flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-purple-300 hover:border-px-primary bg-purple-50/60 hover:bg-purple-100/70 transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-px-primary text-white flex items-center justify-center flex-shrink-0 shadow group-hover:scale-105 transition-transform">
                <Camera className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-purple-950 flex items-center gap-1">
                  Take Photo
                </p>
                <p className="text-[11px] text-purple-700/90 font-medium">Use Camera</p>
              </div>
            </button>

            {/* Secondary Action: Upload Document / File */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-gray-500 bg-gray-50 hover:bg-gray-100/80 transition-all text-left group"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-700 text-white flex items-center justify-center flex-shrink-0 shadow group-hover:scale-105 transition-transform">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-gray-900">Upload File</p>
                <p className="text-[11px] text-gray-500 font-medium">Device, Gallery or PDF</p>
              </div>
            </button>
          </div>
        )}

        {hasError && (
          <p className="mt-2 text-xs font-medium text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {fieldErrors[idKey]}
          </p>
        )}
      </div>
    );
  };

  return (
    <PageTransition>
      {/* 1. Compact Hero Banner (All Devices: ~180px desktop, ~150px mobile) */}
      <section className="relative pt-16 pb-6 sm:pt-20 sm:pb-8 text-white overflow-hidden bg-[#160424] flex items-center justify-center min-h-[150px] sm:min-h-[180px]">
        {/* Background Driver & Truck Photograph with subtle purple tint */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/careers-driver.jpg"
            alt="Prisha Xpress Driver Operations"
            className="w-full h-full object-cover object-center brightness-90"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#160424]/90 via-[#26053D]/80 to-[#160424]/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-300/30 text-purple-200 text-xs font-extrabold uppercase tracking-wider mb-2">
            <Truck className="w-3.5 h-3.5 text-purple-300" />
            DRIVING JOBS
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
            Join Prisha Xpress as a Driver
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-purple-100/90 max-w-xl mx-auto leading-relaxed">
            Apply to drive with Maharashtra's trusted logistics team. Good monthly pay, incentives, and rest rooms.
          </p>
        </div>
      </section>

      {/* 2. Form Wrapper Container */}
      <div className="min-h-screen bg-gray-50/70 py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Top Form Navigation & Autosave Status */}
          <div className="flex items-center justify-between mb-4 px-1">
            <Link
              to="/careers"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-purple-800 hover:text-purple-950 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Careers
            </Link>

            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Draft saved automatically
            </span>
          </div>

          {/* SUCCESS SCREEN */}
          {submittedDriver ? (
            <div className="bg-white rounded-2xl border border-emerald-200 shadow-xl p-6 sm:p-10 text-center animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-extrabold text-xs uppercase tracking-wider mb-2 border border-emerald-200">
                Application Submitted!
              </span>

              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Welcome to Prisha Xpress
              </h2>

              <p className="mt-2 text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
                Our Pune fleet team will verify your documents and call you within 24 hours.
              </p>

              {/* Generated Application ID Box */}
              <div className="mt-6 max-w-md mx-auto p-4 rounded-xl bg-purple-50/70 border-2 border-dashed border-purple-200 flex items-center justify-between">
                <div className="text-left">
                  <p className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">
                    Your Application ID
                  </p>
                  <p className="text-xl font-black text-purple-950 font-mono tracking-tight">
                    {submittedDriver.application_code}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-px-primary hover:bg-px-deep rounded-lg transition-colors shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy ID
                    </>
                  )}
                </button>
              </div>

              {/* Summary Details */}
              <div className="mt-6 max-w-md mx-auto bg-gray-50 rounded-xl p-4 text-left border border-gray-100 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Applicant:</span>
                  <span className="font-bold text-gray-900">{submittedDriver.full_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Mobile:</span>
                  <span className="font-bold text-gray-900">+91 {submittedDriver.mobile_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Driving Licence:</span>
                  <span className="font-bold text-gray-900 font-mono">{submittedDriver.dl_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">City / District:</span>
                  <span className="font-bold text-gray-900">{submittedDriver.city}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/917276897727?text=${encodeURIComponent(
                    `Hello Prisha Xpress Fleet Team, I have submitted my driver application (Application ID: ${submittedDriver.application_code}). Please verify my details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat on WhatsApp (+91 7276897727)
                </a>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 font-bold text-sm transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedDriver(null);
                    setCurrentStep(1);
                    setFormData({
                      full_name: '',
                      mobile_number: '',
                      whatsapp_number: '',
                      date_of_birth: '',
                      city: 'Pune',
                      pincode: '',
                      emergency_contact: '',
                      dl_number: '',
                      vehicle_categories: ['HMV', 'Transport Vehicle'],
                      declaration_accepted: false,
                    });
                    setFiles({
                      dl_front: null,
                      dl_back: null,
                      aadhaar_front: null,
                      aadhaar_back: null,
                      pan_card: null,
                    });
                  }}
                  className="text-xs text-purple-700 hover:text-purple-900 font-bold underline inline-flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Submit another application
                </button>
              </div>
            </div>
          ) : (
            /* 3-STEP APPLICATION WIZARD CARD */
            <div className="bg-white rounded-2xl border border-purple-100 shadow-xl overflow-hidden">
              {/* Stepper Header */}
              <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-50/80 via-white to-purple-50/80 border-b border-purple-100">
                {/* Progress Indicators */}
                <div className="flex items-center justify-between text-xs font-bold text-gray-600 mb-3">
                  <span>Step {currentStep} of 3</span>
                  <span className="text-px-primary">
                    {currentStep === 1 ? '33% Complete (Takes 1 min)' : currentStep === 2 ? '66% Complete' : 'Almost Done!'}
                  </span>
                </div>

                {/* Progress Bar Line */}
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mb-4">
                  <div
                    className="bg-px-primary h-full transition-all duration-300"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>

                {/* 3 Interactive Step Pills */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { step: 1, label: '1. Personal & Licence' },
                    { step: 2, label: '2. Upload Documents' },
                    { step: 3, label: '3. Review & Submit' },
                  ].map((s) => {
                    const isPassed = currentStep > s.step;
                    const isCurrent = currentStep === s.step;

                    return (
                      <button
                        key={s.step}
                        type="button"
                        onClick={() => {
                          if (isPassed) setCurrentStep(s.step);
                        }}
                        disabled={!isPassed && !isCurrent}
                        className={`py-2 px-2 rounded-xl text-center text-xs font-extrabold transition-all border ${
                          isCurrent
                            ? 'bg-px-primary text-white border-px-primary shadow-md'
                            : isPassed
                            ? 'bg-purple-100 text-purple-900 border-purple-200 hover:bg-purple-200 cursor-pointer'
                            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        }`}
                      >
                        <span className="block truncate">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Content Body */}
              <form onSubmit={handleSubmit} className="p-4 sm:p-8">
                {errorMsg && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* STEP 1: Personal & Driving Licence Details */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    {/* Section A: Personal Information */}
                    <div>
                      <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-100 text-px-primary flex items-center justify-center text-xs">
                          A
                        </span>
                        Personal Information
                      </h2>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Please enter your details exactly as shown on your Driving Licence.
                      </p>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Full Name (As per Driving Licence) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.full_name}
                            onChange={(e) => handleInputChange('full_name', e.target.value)}
                            placeholder="e.g. Ramesh Kumar Patil"
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                              fieldErrors.full_name
                                ? 'border-red-400 bg-red-50/40 text-gray-900 focus:border-red-500'
                                : formData.full_name.trim().length >= 3
                                ? 'border-emerald-400 bg-emerald-50/20 text-gray-900 focus:border-emerald-500'
                                : 'border-gray-300 focus:border-px-primary'
                            } outline-none`}
                          />
                          {fieldErrors.full_name && (
                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> {fieldErrors.full_name}
                            </p>
                          )}
                        </div>

                        {/* Mobile Number (+91) with Green Check inside */}
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Mobile Number (+91) <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              maxLength={10}
                              value={formData.mobile_number}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                handleInputChange('mobile_number', val);
                              }}
                              placeholder="e.g. 98220 45610"
                              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium pr-10 transition-all ${
                                fieldErrors.mobile_number
                                  ? 'border-red-400 bg-red-50/40 focus:border-red-500'
                                  : isMobileValid(formData.mobile_number)
                                  ? 'border-emerald-400 bg-emerald-50/20 focus:border-emerald-500'
                                  : 'border-gray-300 focus:border-px-primary'
                              } outline-none`}
                            />
                            {isMobileValid(formData.mobile_number) && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          {fieldErrors.mobile_number && (
                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> {fieldErrors.mobile_number}
                            </p>
                          )}
                        </div>

                        {/* WhatsApp Number (Optional) + Same as Mobile Checkbox */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-bold text-gray-700">
                              WhatsApp Number <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-bold text-purple-800">
                              <input
                                type="checkbox"
                                checked={sameAsMobile}
                                onChange={(e) => handleSameAsMobileToggle(e.target.checked)}
                                className="w-3.5 h-3.5 rounded text-px-primary focus:ring-purple-400 accent-px-primary"
                              />
                              Same as Mobile
                            </label>
                          </div>
                          <input
                            type="tel"
                            maxLength={10}
                            disabled={sameAsMobile}
                            value={sameAsMobile ? formData.mobile_number : formData.whatsapp_number}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              handleInputChange('whatsapp_number', val);
                            }}
                            placeholder={sameAsMobile ? 'Same as Mobile' : 'e.g. 98220 45610'}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                              sameAsMobile
                                ? 'bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed'
                                : fieldErrors.whatsapp_number
                                ? 'border-red-400 bg-red-50/40 focus:border-red-500'
                                : 'border-gray-300 focus:border-px-primary'
                            } outline-none`}
                          />
                          {fieldErrors.whatsapp_number && (
                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> {fieldErrors.whatsapp_number}
                            </p>
                          )}
                        </div>

                        {/* Date of Birth (dd-mm-yyyy picker, 18+ validation) */}
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Date of Birth <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            value={formData.date_of_birth}
                            max={new Date().toISOString().split('T')[0]}
                            onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                              fieldErrors.date_of_birth
                                ? 'border-red-400 bg-red-50/40 focus:border-red-500'
                                : 'border-gray-300 focus:border-px-primary'
                            } outline-none`}
                          />
                          {formData.date_of_birth && !fieldErrors.date_of_birth && (
                            <p className="mt-1 text-[11px] text-gray-500">
                              Age: <span className="font-bold text-purple-900">{calculateAge(formData.date_of_birth)} years</span>
                            </p>
                          )}
                          {fieldErrors.date_of_birth && (
                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> {fieldErrors.date_of_birth}
                            </p>
                          )}
                        </div>

                        {/* City / District Dropdown */}
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Current City / District <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium bg-white transition-all ${
                              fieldErrors.city ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-px-primary'
                            } outline-none`}
                          >
                            {MAHARASHTRA_CITIES.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                          {fieldErrors.city && (
                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> {fieldErrors.city}
                            </p>
                          )}
                        </div>

                        {/* PIN Code */}
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            PIN Code <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            maxLength={6}
                            value={formData.pincode}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, '');
                              handleInputChange('pincode', val);
                            }}
                            placeholder="e.g. 411018"
                            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                              fieldErrors.pincode
                                ? 'border-red-400 bg-red-50/40 focus:border-red-500'
                                : isPinValid(formData.pincode)
                                ? 'border-emerald-400 bg-emerald-50/20 focus:border-emerald-500'
                                : 'border-gray-300 focus:border-px-primary'
                            } outline-none`}
                          />
                          {fieldErrors.pincode && (
                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> {fieldErrors.pincode}
                            </p>
                          )}
                        </div>

                        {/* Emergency Contact Name & Phone (Optional) */}
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Emergency Contact <span className="text-gray-400 font-normal">(Optional)</span>
                          </label>
                          <input
                            type="text"
                            value={formData.emergency_contact}
                            onChange={(e) => handleInputChange('emergency_contact', e.target.value)}
                            placeholder="e.g. Sunita Patil (Wife) - 98220 45611"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium focus:border-px-primary outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section B: Driving Licence Details */}
                    <div className="pt-4 border-t border-gray-100">
                      <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-100 text-px-primary flex items-center justify-center text-xs">
                          B
                        </span>
                        Driving Licence Details
                      </h2>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Enter your Driving Licence details for instant verification.
                      </p>

                      <div className="mt-4 space-y-4">
                        {/* DL Number (Auto Uppercase) */}
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Driving Licence Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.dl_number}
                            onChange={(e) => handleInputChange('dl_number', e.target.value.toUpperCase())}
                            placeholder="e.g. MH14 20120045612"
                            className={`w-full px-3.5 py-2.5 rounded-xl border font-mono uppercase text-sm font-bold tracking-wider transition-all ${
                              fieldErrors.dl_number
                                ? 'border-red-400 bg-red-50/40 focus:border-red-500'
                                : formData.dl_number.trim().length >= 8
                                ? 'border-emerald-400 bg-emerald-50/20 focus:border-emerald-500'
                                : 'border-gray-300 focus:border-px-primary'
                            } outline-none`}
                          />
                          {fieldErrors.dl_number && (
                            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> {fieldErrors.dl_number}
                            </p>
                          )}
                        </div>

                        {/* Vehicle Categories Authorized (Multi-Select Tappable Pills) */}
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-2">
                            Vehicle Categories Authorized <span className="text-red-500">*</span>
                            <span className="text-gray-400 font-normal ml-1">(Tap all that apply)</span>
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {VEHICLE_CATEGORIES.map((cat) => {
                              const isSelected = formData.vehicle_categories.includes(cat);
                              return (
                                <button
                                  key={cat}
                                  type="button"
                                  onClick={() => toggleCategory(cat)}
                                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 border ${
                                    isSelected
                                      ? 'bg-purple-900 text-white border-purple-900 shadow-sm'
                                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-purple-50 hover:border-purple-200'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3.5 h-3.5" />}
                                  {cat}
                                </button>
                              );
                            })}
                          </div>
                          {fieldErrors.vehicle_categories && (
                            <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" /> {fieldErrors.vehicle_categories}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Upload Documents */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                        <UploadCloud className="w-5 h-5 text-px-primary" />
                        Upload Your Documents
                      </h2>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Take clear photos or upload files from your mobile phone or computer.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* DL Front */}
                      <FileUploadBox
                        idKey="dl_front"
                        title="Driving Licence (Front Side)"
                        required
                        helperText="Ensure name, photo and DL number are clearly visible."
                      />

                      {/* DL Back */}
                      <FileUploadBox
                        idKey="dl_back"
                        title="Driving Licence (Back Side)"
                        required
                        helperText="Ensure vehicle category authorization and address are visible."
                      />

                      {/* Aadhaar Front */}
                      <FileUploadBox
                        idKey="aadhaar_front"
                        title="Aadhaar Card (Front Side)"
                        required
                        helperText="Ensure 12-digit Aadhaar number and photo are visible."
                      />

                      {/* Aadhaar Back */}
                      <FileUploadBox
                        idKey="aadhaar_back"
                        title="Aadhaar Card (Back Side)"
                        required
                        helperText="Ensure permanent home address is clearly readable."
                      />

                      {/* PAN Card (Optional) */}
                      <div className="sm:col-span-2">
                        <FileUploadBox
                          idKey="pan_card"
                          title="PAN Card"
                          helperText="Optional – Helps in fast-track salary processing."
                        />
                      </div>
                    </div>

                    {/* Security & Privacy Reassurance */}
                    <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-100 flex items-center gap-2.5 text-xs text-purple-900 font-medium">
                      <ShieldCheck className="w-5 h-5 text-px-primary flex-shrink-0" />
                      <span>
                        🔒 Your documents are safe and used only for official driver verification with Prisha Xpress.
                      </span>
                    </div>
                  </div>
                )}

                {/* STEP 3: Review & Submit */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div>
                      <h2 className="text-base sm:text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-px-primary" />
                        Review Your Details
                      </h2>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Please review your application details before final submission.
                      </p>
                    </div>

                    {/* Summary Card 1: Personal Details */}
                    <div className="rounded-xl border border-gray-200 p-4 bg-gray-50/50">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Personal Information
                        </h3>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-px-primary hover:text-px-deep"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <p className="text-gray-500">Full Name</p>
                          <p className="font-bold text-gray-900">{formData.full_name}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Mobile Number</p>
                          <p className="font-bold text-gray-900">+91 {formData.mobile_number}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">WhatsApp</p>
                          <p className="font-bold text-gray-900">
                            {formData.whatsapp_number ? `+91 ${formData.whatsapp_number}` : 'Same as Mobile'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Date of Birth</p>
                          <p className="font-bold text-gray-900">
                            {formData.date_of_birth} ({calculateAge(formData.date_of_birth)} yrs)
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">City & PIN</p>
                          <p className="font-bold text-gray-900">
                            {formData.city} - {formData.pincode}
                          </p>
                        </div>
                        {formData.emergency_contact && (
                          <div>
                            <p className="text-gray-500">Emergency Contact</p>
                            <p className="font-bold text-gray-900">{formData.emergency_contact}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Summary Card 2: Driving Licence */}
                    <div className="rounded-xl border border-gray-200 p-4 bg-gray-50/50">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Driving Licence
                        </h3>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-px-primary hover:text-px-deep"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div>
                          <p className="text-gray-500">Licence Number</p>
                          <p className="font-bold font-mono text-gray-900 text-sm">{formData.dl_number}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Authorized Categories</p>
                          <div className="flex flex-wrap gap-1.5">
                            {formData.vehicle_categories.map((c) => (
                              <span
                                key={c}
                                className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 font-bold text-[11px]"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Summary Card 3: Uploaded Documents */}
                    <div className="rounded-xl border border-gray-200 p-4 bg-gray-50/50">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                          Uploaded Documents
                        </h3>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-px-primary hover:text-px-deep"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className="p-2 bg-white rounded-lg border border-gray-200 text-center">
                          <p className="font-bold text-gray-800 text-[11px] truncate">DL Front</p>
                          <span className="text-[10px] text-emerald-600 font-bold">✓ Attached</span>
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-gray-200 text-center">
                          <p className="font-bold text-gray-800 text-[11px] truncate">DL Back</p>
                          <span className="text-[10px] text-emerald-600 font-bold">✓ Attached</span>
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-gray-200 text-center">
                          <p className="font-bold text-gray-800 text-[11px] truncate">Aadhaar Front</p>
                          <span className="text-[10px] text-emerald-600 font-bold">✓ Attached</span>
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-gray-200 text-center">
                          <p className="font-bold text-gray-800 text-[11px] truncate">Aadhaar Back</p>
                          <span className="text-[10px] text-emerald-600 font-bold">✓ Attached</span>
                        </div>
                      </div>
                    </div>

                    {/* Declaration Checkbox */}
                    <div className={`p-4 rounded-xl border transition-all ${
                      fieldErrors.declaration_accepted
                        ? 'border-red-400 bg-red-50/50'
                        : 'border-purple-200 bg-purple-50/50'
                    }`}>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.declaration_accepted}
                          onChange={(e) => {
                            handleInputChange('declaration_accepted', e.target.checked);
                          }}
                          className="mt-0.5 w-4 h-4 rounded text-px-primary focus:ring-purple-400 accent-px-primary cursor-pointer"
                        />
                        <span className="text-xs font-bold text-gray-800 leading-relaxed">
                          I confirm that my Driving Licence is valid and all details shared above are true. <span className="text-red-500">*</span>
                        </span>
                      </label>
                      {fieldErrors.declaration_accepted && (
                        <p className="mt-2 text-xs text-red-600 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {fieldErrors.declaration_accepted}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Bottom Navigation & Action Buttons (Thumb-friendly mobile layout) */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-sm font-bold transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Previous
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-px-primary hover:bg-px-deep text-white text-sm font-bold shadow-md transition-all"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black shadow-lg transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Uploading & Submitting...
                        </>
                      ) : (
                        <>
                          Submit Driver Application <Check className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Live Camera Viewfinder & Photo Capture Modal */}
      {cameraModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[92vh] animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#160424] text-white">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-purple-300" />
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">Document Camera</h3>
                  <p className="text-[11px] text-purple-200 truncate max-w-[240px] sm:max-w-xs">
                    {cameraTargetTitle || 'Take Document Photo'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeCameraModal}
                className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Close Camera"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Camera Viewfinder or Captured Preview */}
            <div className="p-4 flex-1 flex flex-col items-center justify-center bg-gray-950 overflow-hidden relative min-h-[300px] sm:min-h-[380px]">
              {cameraError ? (
                <div className="text-center p-6 text-white max-w-sm">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 mx-auto flex items-center justify-center mb-3">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold mb-1">Camera Not Available</h4>
                  <p className="text-xs text-gray-300 mb-4 leading-relaxed">
                    {cameraError}
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => startCamera(facingMode)}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Try Again
                    </button>
                    <label className="px-4 py-2 bg-white/15 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5">
                      <UploadCloud className="w-3.5 h-3.5" /> Select from Gallery / Files
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f && cameraTargetKey) {
                            handleFileSelect(cameraTargetKey, f);
                            closeCameraModal();
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              ) : capturedBlobUrl ? (
                // Captured Photo Preview
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <div className="relative max-h-[340px] sm:max-h-[380px] w-full rounded-xl overflow-hidden border-2 border-emerald-500/80 shadow-lg bg-black flex items-center justify-center">
                    <img
                      src={capturedBlobUrl}
                      alt="Captured Document"
                      className="max-h-[340px] sm:max-h-[380px] w-full object-contain"
                    />
                    <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow flex items-center gap-1">
                      <Check className="w-3 h-3" /> Photo Captured
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-300 text-center mt-2.5">
                    Please ensure document details (name, photo, numbers) are clearly readable.
                  </p>
                </div>
              ) : (
                // Live Video Stream Viewfinder
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-[320px] sm:h-[380px] object-cover rounded-xl"
                  />

                  {/* Document Alignment Frame Guide */}
                  <div className="absolute inset-4 sm:inset-6 border-2 border-dashed border-white/70 rounded-xl pointer-events-none flex flex-col justify-between p-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-white bg-black/60 px-2 py-0.5 rounded self-start backdrop-blur-sm">
                      Align document inside box
                    </span>
                    <span className="text-[10px] text-white/90 bg-black/60 px-2 py-0.5 rounded self-center text-center backdrop-blur-sm">
                      Keep steady & in good light
                    </span>
                  </div>

                  {/* Flip Camera Switch Button (Mobile devices with front/back camera) */}
                  <button
                    type="button"
                    onClick={toggleCameraFacingMode}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all border border-white/20 shadow-md"
                    title="Flip camera (Front / Rear)"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Hidden Canvas for Frame Capture */}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Modal Controls / Footer */}
            <div className="p-3 sm:p-4 bg-gray-50 border-t border-gray-200">
              {capturedBlobUrl ? (
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={retakePhoto}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" /> Retake Photo
                  </button>
                  <button
                    type="button"
                    onClick={confirmCapturedPhoto}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Check className="w-4 h-4" /> Use This Photo
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={closeCameraModal}
                    className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={capturePhoto}
                    disabled={Boolean(cameraError)}
                    className="flex-1 py-3 px-6 rounded-xl bg-px-primary hover:bg-px-deep text-white text-xs sm:text-sm font-black transition-all inline-flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Camera className="w-4 h-4" />
                    </div>
                    Take Photo Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
};
