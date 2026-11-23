// PRISHA XPRESS PVT. LTD. - TRANSACTIONAL EMAIL SERVICE
// RESEND INTEGRATION WITH AUTOMATIC NOTIFICATIONS
// RULE: DATABASE FIRST, EMAIL SECOND. EMAIL FAILURE NEVER DESTROYS SAVED DATA.

import { BusinessEnquiry } from '../types/enquiry';

interface EmailSendResult {
  adminSuccess: boolean;
  adminError?: string;
  customerSuccess: boolean;
  customerError?: string;
}

class EmailService {
  private resendApiKey: string;
  private adminEmail: string;
  private emailFrom: string;

  constructor() {
    const env = (import.meta as any).env || {};
    this.resendApiKey = env.VITE_RESEND_API_KEY || env.RESEND_API_KEY || '';
    this.adminEmail = env.VITE_ADMIN_NOTIFICATION_EMAIL || env.ADMIN_NOTIFICATION_EMAIL || 'enquiries@prishaxpress.com';
    this.emailFrom = env.VITE_EMAIL_FROM || env.EMAIL_FROM || 'Prisha Xpress <onboarding@resend.dev>';
  }

  public isConfigured(): boolean {
    return Boolean(this.resendApiKey && !this.resendApiKey.includes('your-resend-api-key'));
  }

  /**
   * Generates Company Admin Notification HTML
   */
  private buildAdminNotificationHtml(enquiry: BusinessEnquiry): string {
    const formattedDate = new Date(enquiry.created_at).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const adminPortalUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/admin/enquiries`
      : 'https://www.prishaxpress.com/admin/enquiries';

    const reqText = enquiry.requirements || enquiry.operational_requirements || 'No specific requirements specified.';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F6FB; color: #1E0433; margin: 0; padding: 24px; }
          .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E9D5FF; overflow: hidden; box-shadow: 0 4px 20px rgba(112, 47, 138, 0.08); }
          .header { background: linear-gradient(135deg, #200336 0%, #4A154B 100%); padding: 32px 28px; text-align: center; color: #ffffff; }
          .badge { display: inline-block; padding: 4px 12px; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #E9D5FF; margin-bottom: 8px; }
          .title { margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; }
          .ref { font-family: monospace; font-size: 14px; background: #ffffff; color: #702F8A; padding: 3px 10px; border-radius: 6px; font-weight: bold; display: inline-block; margin-top: 8px; }
          .body { padding: 28px; }
          .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #702F8A; border-bottom: 1px solid #F3E8FF; padding-bottom: 6px; margin: 20px 0 12px 0; }
          .row { display: flex; padding: 8px 0; border-bottom: 1px solid #F9FAFB; font-size: 14px; }
          .label { width: 180px; font-weight: 600; color: #6B7280; }
          .value { flex: 1; font-weight: 700; color: #111827; }
          .requirements-box { background: #FAF5FF; border: 1px solid #E9D5FF; border-radius: 10px; padding: 14px; font-size: 14px; color: #1E0433; line-height: 1.6; margin-top: 8px; }
          .cta-wrap { text-align: center; margin: 30px 0 10px 0; }
          .btn { display: inline-block; background: #702F8A; color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; }
          .footer { background: #F8F6FB; padding: 16px 28px; text-align: center; font-size: 12px; color: #6B7280; border-top: 1px solid #E5E7EB; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">New Business Enquiry</span>
            <h1 class="title">Corporate Lead Notification</h1>
            <div class="ref">${enquiry.enquiry_id || enquiry.enquiry_number}</div>
          </div>
          <div class="body">
            <div class="section-title">Customer Details</div>
            <div class="row"><div class="label">Customer Name:</div><div class="value">${enquiry.full_name}</div></div>
            <div class="row"><div class="label">Company Name:</div><div class="value">${enquiry.company_name || 'Not specified'}</div></div>
            <div class="row"><div class="label">Phone Number:</div><div class="value"><a href="tel:${enquiry.phone || enquiry.phone_number}">${enquiry.phone || enquiry.phone_number}</a></div></div>
            <div class="row"><div class="label">Email Address:</div><div class="value"><a href="mailto:${enquiry.email}">${enquiry.email}</a></div></div>
            <div class="row"><div class="label">Submission Date & Time:</div><div class="value">${formattedDate}</div></div>

            <div class="section-title">Service Requested</div>
            <div class="row"><div class="label">Service Required:</div><div class="value" style="color: #702F8A;">${enquiry.service_required}</div></div>

            <div class="section-title">Requirements</div>
            <div class="requirements-box">${reqText.replace(/\n/g, '<br/>')}</div>

            <div class="cta-wrap">
              <a href="${adminPortalUrl}" class="btn">Open Enquiry in Admin Dashboard &rarr;</a>
            </div>
          </div>
          <div class="footer">
            Prisha Xpress Pvt. Ltd. &bull; Pune Corporate Operations Hub &bull; Kharadi, Pune, Maharashtra 411014
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Generates Customer Acknowledgement Email HTML
   */
  private buildCustomerConfirmationHtml(enquiry: BusinessEnquiry): string {
    const enqId = enquiry.enquiry_id || enquiry.enquiry_number;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F6FB; color: #1E0433; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #E9D5FF; overflow: hidden; box-shadow: 0 4px 20px rgba(112, 47, 138, 0.08); }
          .header { background: linear-gradient(135deg, #200336 0%, #702F8A 100%); padding: 32px 28px; text-align: center; color: #ffffff; }
          .logo-text { font-size: 20px; font-weight: 900; letter-spacing: 0.5px; }
          .logo-sub { font-size: 11px; opacity: 0.85; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 2px; }
          .body { padding: 32px 28px; line-height: 1.7; font-size: 15px; color: #374151; }
          .ref-card { background: #FAF5FF; border: 1px solid #D8B4FE; border-radius: 12px; padding: 16px 20px; text-align: center; margin: 24px 0; }
          .ref-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #702F8A; }
          .ref-num { font-size: 18px; font-weight: 900; font-family: monospace; color: #200336; margin-top: 4px; }
          .highlight { color: #702F8A; font-weight: 700; }
          .footer { background: #F8F6FB; padding: 20px 28px; font-size: 12px; color: #6B7280; border-top: 1px solid #E5E7EB; text-align: center; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo-text">PRISHA XPRESS PVT. LTD.</div>
            <div class="logo-sub">Commercial Transport &amp; Fleet Management</div>
          </div>
          <div class="body">
            <p>Hello <strong>${enquiry.full_name}</strong>,</p>
            <p>Thank you for contacting <strong>Prisha Xpress Pvt. Ltd.</strong></p>
            <p>We have successfully received your business enquiry.</p>
            <p>Our team will review your requirements and contact you using the phone number or email address you provided.</p>

            <div class="ref-card">
              <div class="ref-label">Your Enquiry ID</div>
              <div class="ref-num">${enqId}</div>
            </div>

            <p>If you have an urgent transport requirement, you can also connect directly with our desk:</p>
            <p style="margin-top: 4px;">
              &bull; Official Helpline: <a href="tel:+917276879727" style="color: #702F8A; font-weight: bold;">+91 7276879727</a><br/>
              &bull; WhatsApp Desk: <a href="https://wa.me/917276879727" style="color: #059669; font-weight: bold;">Chat on WhatsApp</a>
            </p>
            <p style="margin-top: 24px;">Thank you for considering Prisha Xpress.</p>
            <p style="margin-bottom: 0;">Regards,<br/><strong>Prisha Xpress Pvt. Ltd.</strong><br/><span style="font-size: 13px; color: #6B7280;">Kharadi, Pune &bull; Maharashtra</span></p>
          </div>
          <div class="footer">
            CIN: U49231PN2023PTC225810 &bull; Reg. Office: Kharadi, Pune 411014<br/>
            This is an automated confirmation of your enquiry.
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Dispatches both company notification and customer confirmation via Resend REST API
   */
  public async sendEnquiryEmails(enquiry: BusinessEnquiry): Promise<EmailSendResult> {
    const result: EmailSendResult = {
      adminSuccess: false,
      customerSuccess: false,
    };

    if (!this.isConfigured()) {
      const msg = 'Awaiting RESEND_API_KEY environment variable. Saved safely to database.';
      result.adminError = msg;
      result.customerError = msg;
      return result;
    }

    // 1. Dispatch Email 1: Company Admin Notification
    try {
      const adminRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.emailFrom,
          to: [this.adminEmail],
          subject: `New Business Enquiry – Prisha Xpress`,
          html: this.buildAdminNotificationHtml(enquiry),
        }),
      });

      if (adminRes.ok) {
        result.adminSuccess = true;
      } else {
        const errJson = await adminRes.json().catch(() => ({}));
        result.adminError = errJson.message || `Resend error status: ${adminRes.status}`;
      }
    } catch (e: any) {
      result.adminError = e.message || 'Network error reaching Resend API';
    }

    // 2. Dispatch Email 2: Customer Confirmation
    try {
      const customerRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.emailFrom,
          to: [enquiry.email],
          subject: `We Have Received Your Enquiry – Prisha Xpress`,
          html: this.buildCustomerConfirmationHtml(enquiry),
        }),
      });

      if (customerRes.ok) {
        result.customerSuccess = true;
      } else {
        const errJson = await customerRes.json().catch(() => ({}));
        result.customerError = errJson.message || `Resend error status: ${customerRes.status}`;
      }
    } catch (e: any) {
      result.customerError = e.message || 'Network error reaching Resend API';
    }

    return result;
  }
}

export const emailService = new EmailService();
