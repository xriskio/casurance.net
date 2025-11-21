import { Resend } from 'resend';

interface QuoteRequestData {
  referenceNumber: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  insuranceType: string;
  formName?: string;
}

interface ServiceRequestData {
  referenceNumber: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  requestType: string;
  description: string;
}

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set - emails will not be sent');
    return null;
  }
  return new Resend(apiKey);
}

export async function sendQuoteConfirmationEmail(data: QuoteRequestData): Promise<void> {
  try {
    const formTitle = data.formName || data.insuranceType;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              line-height: 1.6;
              color: #1e3a5f;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
              color: white;
              padding: 30px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e2e8f0;
              border-top: none;
            }
            .reference-box {
              background: #f8fafc;
              border: 2px solid #2563eb;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              text-align: center;
            }
            .reference-number {
              font-size: 32px;
              font-weight: 700;
              color: #2563eb;
              letter-spacing: 2px;
              margin: 10px 0;
            }
            .detail-row {
              padding: 10px 0;
              border-bottom: 1px solid #e2e8f0;
            }
            .detail-label {
              font-weight: 600;
              color: #64748b;
              display: inline-block;
              min-width: 150px;
            }
            .next-steps {
              background: #eff6ff;
              border-left: 4px solid #2563eb;
              padding: 20px;
              margin: 20px 0;
            }
            .footer {
              background: #f8fafc;
              padding: 20px;
              border-radius: 0 0 8px 8px;
              text-align: center;
              font-size: 14px;
              color: #64748b;
            }
            .contact-info {
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Quote Request Received</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">Casurance Insurance Agency Services</p>
          </div>
          
          <div class="content">
            <p>Dear ${data.contactName},</p>
            
            <p>Thank you for requesting a quote for <strong>${formTitle}</strong>. We have successfully received your information and our team is reviewing your request.</p>
            
            <div class="reference-box">
              <div style="color: #64748b; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your Reference Number</div>
              <div class="reference-number">${data.referenceNumber}</div>
              <div style="color: #64748b; font-size: 14px; margin-top: 10px;">Please save this number for future correspondence</div>
            </div>
            
            <div style="margin: 20px 0;">
              <div class="detail-row">
                <span class="detail-label">Business Name:</span>
                <span>${data.businessName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Insurance Type:</span>
                <span>${formTitle}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Contact:</span>
                <span>${data.email}</span>
              </div>
              <div class="detail-row" style="border-bottom: none;">
                <span class="detail-label">Phone:</span>
                <span>${data.phone}</span>
              </div>
            </div>
            
            <div class="next-steps">
              <h3 style="margin-top: 0; color: #1e3a5f;">What Happens Next?</h3>
              <ol style="margin: 0; padding-left: 20px;">
                <li>Our licensed insurance agents will review your information within 24 hours</li>
                <li>We'll prepare a customized quote based on your specific needs</li>
                <li>One of our agents will contact you to discuss coverage options and pricing</li>
                <li>We'll answer any questions you have about your coverage</li>
              </ol>
            </div>
            
            <p>If you have any immediate questions or need to update your information, please don't hesitate to contact us using your reference number <strong>${data.referenceNumber}</strong>.</p>
          </div>
          
          <div class="footer">
            <div class="contact-info">
              <strong>Casurance Inc d/b/a Casurance Agency Insurance Services</strong><br>
              California's Trusted Independent Commercial Insurance Agency Since 2010
            </div>
            <div class="contact-info">
              714 W. Olympic Blvd, Suite 906, Los Angeles, CA 90015<br>
              Phone: <a href="tel:323-546-3030" style="color: #2563eb; text-decoration: none;">323-546-3030</a> | 
              Toll Free: <a href="tel:1-888-254-0089" style="color: #2563eb; text-decoration: none;">1-888-254-0089</a><br>
              Email: <a href="mailto:info@casurance.net" style="color: #2563eb; text-decoration: none;">info@casurance.net</a> | 
              Website: <a href="https://www.casurance.net" style="color: #2563eb; text-decoration: none;">www.casurance.net</a>
            </div>
            <div style="margin-top: 15px; font-size: 12px;">
              License #6005562
            </div>
          </div>
        </body>
      </html>
    `;

    const resend = getResendClient();
    if (!resend) {
      console.warn(`Skipping quote confirmation email to ${data.email} - RESEND_API_KEY not configured`);
      return;
    }

    await resend.emails.send({
      from: 'Casurance Insurance <noreply@casurance.net>',
      to: data.email,
      subject: `Quote Request Received - ${data.referenceNumber}`,
      html: htmlContent,
    });

    console.log(`Quote confirmation email sent to ${data.email}`);
  } catch (error) {
    console.error('Failed to send quote confirmation email:', error);
  }
}

export async function sendAgentQuoteNotification(data: QuoteRequestData): Promise<void> {
  try {
    const formTitle = data.formName || data.insuranceType;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              line-height: 1.6;
              color: #1e3a5f;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
              color: white;
              padding: 30px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e2e8f0;
              border-top: none;
            }
            .alert-box {
              background: #fef2f2;
              border: 2px solid #dc2626;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
            .detail-row {
              padding: 10px 0;
              border-bottom: 1px solid #e2e8f0;
            }
            .detail-label {
              font-weight: 600;
              color: #64748b;
              display: inline-block;
              min-width: 150px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>URGENT: New Quote Request</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Action Required - Customer Waiting</p>
          </div>
          
          <div class="content">
            <div class="alert-box">
              <h3 style="margin-top: 0; color: #dc2626;">New ${formTitle} Quote Request</h3>
              <p style="margin: 0; font-size: 18px; font-weight: 600;">Reference: ${data.referenceNumber}</p>
            </div>
            
            <h3 style="color: #1e3a5f;">Customer Information:</h3>
            <div class="detail-row">
              <span class="detail-label">Business Name:</span>
              <span>${data.businessName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Contact Name:</span>
              <span>${data.contactName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span><a href="mailto:${data.email}">${data.email}</a></span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Phone:</span>
              <span><a href="tel:${data.phone}">${data.phone}</a></span>
            </div>
            <div class="detail-row" style="border-bottom: none;">
              <span class="detail-label">Insurance Type:</span>
              <span>${formTitle}</span>
            </div>
            
            <div style="background: #eff6ff; padding: 20px; margin: 20px 0; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #1e3a5f;">Next Steps:</h3>
              <ol style="margin: 0; padding-left: 20px;">
                <li>Review the submission in the agent portal</li>
                <li>Contact the customer within 24 hours</li>
                <li>Prepare and send customized quote</li>
                <li>Update submission status in the portal</li>
              </ol>
            </div>
            
            <p><strong>Customer has been sent confirmation email with reference number ${data.referenceNumber}</strong></p>
          </div>
        </body>
      </html>
    `;

    const resend = getResendClient();
    if (!resend) {
      console.warn(`Skipping agent notification for ${data.referenceNumber} - RESEND_API_KEY not configured`);
      return;
    }

    await resend.emails.send({
      from: 'Casurance Notifications <noreply@casurance.net>',
      to: 'ops@casurance.net',
      subject: `URGENT: New Quote Request - ${formTitle} - ${data.referenceNumber}`,
      html: htmlContent,
    });

    console.log(`Agent notification sent for ${data.referenceNumber}`);
  } catch (error) {
    console.error('Failed to send agent notification:', error);
  }
}

export async function sendServiceRequestConfirmationEmail(data: ServiceRequestData): Promise<void> {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              line-height: 1.6;
              color: #1e3a5f;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%);
              color: white;
              padding: 30px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e2e8f0;
              border-top: none;
            }
            .reference-box {
              background: #f8fafc;
              border: 2px solid #2563eb;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              text-align: center;
            }
            .reference-number {
              font-size: 32px;
              font-weight: 700;
              color: #2563eb;
              letter-spacing: 2px;
            }
            .footer {
              background: #f8fafc;
              padding: 20px;
              border-radius: 0 0 8px 8px;
              text-align: center;
              font-size: 14px;
              color: #64748b;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Service Request Received</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Casurance Insurance Agency Services</p>
          </div>
          
          <div class="content">
            <p>Dear ${data.contactName},</p>
            
            <p>Thank you for contacting Casurance. We have received your ${data.requestType} request and our team will respond shortly.</p>
            
            <div class="reference-box">
              <div style="color: #64748b; font-size: 14px;">Your Reference Number</div>
              <div class="reference-number">${data.referenceNumber}</div>
            </div>
            
            <p>One of our insurance professionals will contact you within 24 business hours to assist with your request.</p>
          </div>
          
          <div class="footer">
            <strong>Casurance Inc d/b/a Casurance Agency Insurance Services</strong><br>
            714 W. Olympic Blvd, Suite 906, Los Angeles, CA 90015<br>
            Phone: <a href="tel:323-546-3030">323-546-3030</a> | <a href="tel:1-888-254-0089">1-888-254-0089</a><br>
            License #6005562
          </div>
        </body>
      </html>
    `;

    const resend = getResendClient();
    if (!resend) {
      console.warn(`Skipping service request confirmation to ${data.email} - RESEND_API_KEY not configured`);
      return;
    }

    await resend.emails.send({
      from: 'Casurance Insurance <noreply@casurance.net>',
      to: data.email,
      subject: `Service Request Received - ${data.referenceNumber}`,
      html: htmlContent,
    });

    console.log(`Service request confirmation sent to ${data.email}`);
  } catch (error) {
    console.error('Failed to send service request confirmation:', error);
  }
}

export async function sendAgentServiceNotification(data: ServiceRequestData): Promise<void> {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              line-height: 1.6;
              color: #1e3a5f;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
              color: white;
              padding: 30px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e2e8f0;
              border-top: none;
            }
            .detail-row {
              padding: 10px 0;
              border-bottom: 1px solid #e2e8f0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>New Service Request</h1>
            <p style="margin: 10px 0 0 0;">Reference: ${data.referenceNumber}</p>
          </div>
          
          <div class="content">
            <h3>Customer Information:</h3>
            <div class="detail-row">Contact: ${data.contactName}</div>
            <div class="detail-row">Email: <a href="mailto:${data.email}">${data.email}</a></div>
            <div class="detail-row">Phone: <a href="tel:${data.phone}">${data.phone}</a></div>
            <div class="detail-row">Request Type: ${data.requestType}</div>
            <div class="detail-row" style="border-bottom: none;">
              <strong>Message:</strong><br>
              ${data.description}
            </div>
            
            <p style="margin-top: 20px;"><strong>Customer has been sent confirmation with reference ${data.referenceNumber}</strong></p>
          </div>
        </body>
      </html>
    `;

    const resend = getResendClient();
    if (!resend) {
      console.warn(`Skipping agent service notification for ${data.referenceNumber} - RESEND_API_KEY not configured`);
      return;
    }

    await resend.emails.send({
      from: 'Casurance Notifications <noreply@casurance.net>',
      to: 'ops@casurance.net',
      subject: `New Service Request: ${data.requestType} - ${data.referenceNumber}`,
      html: htmlContent,
    });

    console.log(`Agent notification sent for service request ${data.referenceNumber}`);
  } catch (error) {
    console.error('Failed to send agent service notification:', error);
  }
}
