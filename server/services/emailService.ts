import { getUncachableAgentMailClient } from "../utils/agentmail";

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

let cachedInboxId: string | null = null;

async function getOrCreateInbox(): Promise<string> {
  if (cachedInboxId) {
    return cachedInboxId;
  }

  try {
    const client = await getUncachableAgentMailClient();
    
    const inboxesResponse = await client.inboxes.list();
    
    if (inboxesResponse.inboxes && inboxesResponse.inboxes.length > 0) {
      const firstInboxId = inboxesResponse.inboxes[0].inboxId;
      if (!firstInboxId) {
        throw new Error("Inbox ID is null or undefined");
      }
      cachedInboxId = firstInboxId;
      return cachedInboxId;
    }
    
    const newInbox = await client.inboxes.create({});
    
    if (!newInbox.inboxId) {
      throw new Error("Failed to create inbox: inbox ID is null or undefined");
    }
    
    cachedInboxId = newInbox.inboxId;
    return cachedInboxId;
  } catch (error) {
    console.error("Failed to get or create inbox:", error);
    throw error;
  }
}

export async function sendQuoteConfirmationEmail(data: QuoteRequestData): Promise<void> {
  try {
    const client = await getUncachableAgentMailClient();
    const inboxId = await getOrCreateInbox();
    
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
              border-radius: 4px;
            }
            .next-steps h3 {
              margin-top: 0;
              color: #1e3a5f;
            }
            .footer {
              background: #f8fafc;
              padding: 20px;
              text-align: center;
              font-size: 14px;
              color: #64748b;
              border-radius: 0 0 8px 8px;
            }
            .contact-info {
              margin: 20px 0;
              text-align: center;
            }
            .contact-info a {
              color: #2563eb;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Quote Request Confirmation</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Casurance Commercial Insurance Agency</p>
          </div>
          
          <div class="content">
            <p>Dear ${data.contactName},</p>
            
            <p>Thank you for requesting a quote from Casurance! We've received your ${formTitle} quote request and are reviewing your information.</p>
            
            <div class="reference-box">
              <p style="margin: 0; font-size: 14px; color: #64748b;">Your Reference Number</p>
              <div class="reference-number">${data.referenceNumber}</div>
              <p style="margin: 0; font-size: 12px; color: #64748b;">Please save this number for your records</p>
            </div>
            
            <h3 style="color: #1e3a5f; margin-top: 30px;">Submission Details</h3>
            <div class="detail-row">
              <span class="detail-label">Business Name:</span>
              <span>${data.businessName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Contact Person:</span>
              <span>${data.contactName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span>${data.email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Phone:</span>
              <span>${data.phone}</span>
            </div>
            <div class="detail-row" style="border-bottom: none;">
              <span class="detail-label">Insurance Type:</span>
              <span>${formTitle}</span>
            </div>
            
            <div class="next-steps">
              <h3>What Happens Next?</h3>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Our team will review your quote request within 24-48 business hours</li>
                <li>An agent will contact you to discuss your coverage needs and options</li>
                <li>We'll provide you with a customized quote tailored to your business</li>
                <li>You can track your request status using reference number <strong>${data.referenceNumber}</strong></li>
              </ul>
            </div>
            
            <div class="contact-info">
              <p><strong>Need immediate assistance?</strong></p>
              <p>
                Call us at <a href="tel:1-888-254-0089">1-888-254-0089</a><br>
                Email us at <a href="mailto:info@casurance.net">info@casurance.net</a>
              </p>
            </div>
          </div>
          
          <div class="footer">
            <p style="margin: 10px 0;"><strong>Casurance Commercial Insurance Agency</strong></p>
            <p style="margin: 5px 0;">Serving businesses across 15 states</p>
            <p style="margin: 5px 0; font-size: 12px;">This is an automated confirmation email. Please do not reply directly to this message.</p>
          </div>
        </body>
      </html>
    `;

    await client.inboxes.messages.send(inboxId, {
      to: [data.email],
      subject: `Quote Request Confirmation - Reference #${data.referenceNumber}`,
      html: htmlContent
    });

    console.log(`✓ Quote confirmation email sent to ${data.email} (${data.referenceNumber})`);
  } catch (error) {
    console.error(`✗ Failed to send quote confirmation email to ${data.email}:`, error);
  }
}

export async function sendServiceRequestConfirmationEmail(data: ServiceRequestData): Promise<void> {
  try {
    const client = await getUncachableAgentMailClient();
    const inboxId = await getOrCreateInbox();
    
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
              border-radius: 4px;
            }
            .next-steps h3 {
              margin-top: 0;
              color: #1e3a5f;
            }
            .footer {
              background: #f8fafc;
              padding: 20px;
              text-align: center;
              font-size: 14px;
              color: #64748b;
              border-radius: 0 0 8px 8px;
            }
            .contact-info {
              margin: 20px 0;
              text-align: center;
            }
            .contact-info a {
              color: #2563eb;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Service Request Confirmation</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Casurance Commercial Insurance Agency</p>
          </div>
          
          <div class="content">
            <p>Dear ${data.contactName},</p>
            
            <p>Thank you for submitting a service request to Casurance! We've received your ${data.requestType.toLowerCase()} request and our team is on it.</p>
            
            <div class="reference-box">
              <p style="margin: 0; font-size: 14px; color: #64748b;">Your Reference Number</p>
              <div class="reference-number">${data.referenceNumber}</div>
              <p style="margin: 0; font-size: 12px; color: #64748b;">Please save this number for your records</p>
            </div>
            
            <h3 style="color: #1e3a5f; margin-top: 30px;">Request Details</h3>
            <div class="detail-row">
              <span class="detail-label">Business Name:</span>
              <span>${data.businessName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Contact Person:</span>
              <span>${data.contactName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span>${data.email}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Phone:</span>
              <span>${data.phone}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Request Type:</span>
              <span>${data.requestType}</span>
            </div>
            <div class="detail-row" style="border-bottom: none;">
              <span class="detail-label">Description:</span>
              <span>${data.description}</span>
            </div>
            
            <div class="next-steps">
              <h3>What Happens Next?</h3>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Our team will review your service request within 24 business hours</li>
                <li>An agent will contact you to address your needs</li>
                <li>We'll keep you updated on the status of your request</li>
                <li>You can reference request number <strong>${data.referenceNumber}</strong> in all communications</li>
              </ul>
            </div>
            
            <div class="contact-info">
              <p><strong>Need immediate assistance?</strong></p>
              <p>
                Call us at <a href="tel:1-888-254-0089">1-888-254-0089</a><br>
                Email us at <a href="mailto:info@casurance.net">info@casurance.net</a>
              </p>
            </div>
          </div>
          
          <div class="footer">
            <p style="margin: 10px 0;"><strong>Casurance Commercial Insurance Agency</strong></p>
            <p style="margin: 5px 0;">Serving businesses across 15 states</p>
            <p style="margin: 5px 0; font-size: 12px;">This is an automated confirmation email. Please do not reply directly to this message.</p>
          </div>
        </body>
      </html>
    `;

    await client.inboxes.messages.send(inboxId, {
      to: [data.email],
      subject: `Service Request Confirmation - Reference #${data.referenceNumber}`,
      html: htmlContent
    });

    console.log(`✓ Service request confirmation email sent to ${data.email} (${data.referenceNumber})`);
  } catch (error) {
    console.error(`✗ Failed to send service request confirmation email to ${data.email}:`, error);
  }
}

export async function sendAgentQuoteNotification(data: QuoteRequestData): Promise<void> {
  try {
    const client = await getUncachableAgentMailClient();
    const inboxId = await getOrCreateInbox();
    
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
            .alert-box {
              background: #fef2f2;
              border: 2px solid #dc2626;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              text-align: center;
            }
            .reference-number {
              font-size: 32px;
              font-weight: 700;
              color: #dc2626;
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
            .action-button {
              display: inline-block;
              background: #dc2626;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              margin: 20px 0;
            }
            .footer {
              background: #f8fafc;
              padding: 20px;
              text-align: center;
              font-size: 14px;
              color: #64748b;
              border-radius: 0 0 8px 8px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🔔 New Quote Request</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Agent Notification</p>
          </div>
          
          <div class="content">
            <p><strong>A new quote request has been submitted and requires your attention.</strong></p>
            
            <div class="alert-box">
              <p style="margin: 0; font-size: 14px; color: #64748b;">Reference Number</p>
              <div class="reference-number">${data.referenceNumber}</div>
              <p style="margin: 0; font-size: 12px; color: #64748b;">${formTitle}</p>
            </div>
            
            <h3 style="color: #1e3a5f; margin-top: 30px;">Client Information</h3>
            <div class="detail-row">
              <span class="detail-label">Business Name:</span>
              <span>${data.businessName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Contact Person:</span>
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
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.casurance.net/agent/portal" class="action-button">View in Agent Portal</a>
            </div>
            
            <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
              <strong>Action Required:</strong> Please review this quote request in the agent portal and contact the client within 24-48 business hours.
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 10px 0;"><strong>Casurance Agent Portal</strong></p>
            <p style="margin: 5px 0; font-size: 12px;">This is an automated notification. Do not reply to this email.</p>
          </div>
        </body>
      </html>
    `;

    await client.inboxes.messages.send(inboxId, {
      to: ['admin@casurance.net'],
      subject: `🔔 New Quote Request #${data.referenceNumber} - ${formTitle}`,
      html: htmlContent
    });

    console.log(`✓ Agent notification email sent for quote ${data.referenceNumber}`);
  } catch (error) {
    console.error(`✗ Failed to send agent notification email for quote ${data.referenceNumber}:`, error);
  }
}

export async function sendAgentServiceNotification(data: ServiceRequestData): Promise<void> {
  try {
    const client = await getUncachableAgentMailClient();
    const inboxId = await getOrCreateInbox();
    
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
            .alert-box {
              background: #fef2f2;
              border: 2px solid #dc2626;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              text-align: center;
            }
            .reference-number {
              font-size: 32px;
              font-weight: 700;
              color: #dc2626;
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
            .action-button {
              display: inline-block;
              background: #dc2626;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              margin: 20px 0;
            }
            .footer {
              background: #f8fafc;
              padding: 20px;
              text-align: center;
              font-size: 14px;
              color: #64748b;
              border-radius: 0 0 8px 8px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🔔 New Service Request</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Agent Notification</p>
          </div>
          
          <div class="content">
            <p><strong>A new service request has been submitted and requires your attention.</strong></p>
            
            <div class="alert-box">
              <p style="margin: 0; font-size: 14px; color: #64748b;">Reference Number</p>
              <div class="reference-number">${data.referenceNumber}</div>
              <p style="margin: 0; font-size: 12px; color: #64748b;">${data.requestType}</p>
            </div>
            
            <h3 style="color: #1e3a5f; margin-top: 30px;">Client Information</h3>
            <div class="detail-row">
              <span class="detail-label">Business Name:</span>
              <span>${data.businessName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Contact Person:</span>
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
            <div class="detail-row">
              <span class="detail-label">Request Type:</span>
              <span>${data.requestType}</span>
            </div>
            <div class="detail-row" style="border-bottom: none;">
              <span class="detail-label">Description:</span>
              <span>${data.description}</span>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.casurance.net/agent/portal" class="action-button">View in Agent Portal</a>
            </div>
            
            <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
              <strong>Action Required:</strong> Please review this service request in the agent portal and contact the client within 24 business hours.
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 10px 0;"><strong>Casurance Agent Portal</strong></p>
            <p style="margin: 5px 0; font-size: 12px;">This is an automated notification. Do not reply to this email.</p>
          </div>
        </body>
      </html>
    `;

    await client.inboxes.messages.send(inboxId, {
      to: ['admin@casurance.net'],
      subject: `🔔 New Service Request #${data.referenceNumber} - ${data.requestType}`,
      html: htmlContent
    });

    console.log(`✓ Agent notification email sent for service request ${data.referenceNumber}`);
  } catch (error) {
    console.error(`✗ Failed to send agent notification email for service request ${data.referenceNumber}:`, error);
  }
}
