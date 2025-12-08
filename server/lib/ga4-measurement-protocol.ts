/**
 * Google Analytics 4 Measurement Protocol
 * 
 * Sends server-side events to GA4 for accurate conversion tracking.
 * This augments client-side gtag tracking with server-verified events.
 * 
 * @see https://developers.google.com/analytics/devguides/collection/protocol/ga4
 */

const GA4_ENDPOINT = 'https://www.google-analytics.com/mp/collect';
const GA4_DEBUG_ENDPOINT = 'https://www.google-analytics.com/debug/mp/collect';

interface GA4EventParams {
  [key: string]: string | number | boolean | undefined;
}

interface GA4Event {
  name: string;
  params?: GA4EventParams;
}

interface GA4Payload {
  client_id: string;
  user_id?: string;
  timestamp_micros?: number;
  non_personalized_ads?: boolean;
  events: GA4Event[];
}

interface GA4ValidationMessage {
  fieldPath: string;
  description: string;
  validationCode: string;
}

interface GA4ValidationResult {
  validationMessages: GA4ValidationMessage[];
}

/**
 * Send events to Google Analytics 4 via Measurement Protocol
 */
export async function sendGA4Event(
  clientId: string,
  events: GA4Event[],
  options?: {
    userId?: string;
    debug?: boolean;
    nonPersonalizedAds?: boolean;
  }
): Promise<{ success: boolean; validationMessages?: GA4ValidationMessage[] }> {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;

  if (!measurementId || !apiSecret) {
    console.warn('[GA4] Missing GA4_MEASUREMENT_ID or GA4_API_SECRET');
    return { success: false };
  }

  const payload: GA4Payload = {
    client_id: clientId,
    events: events,
  };

  if (options?.userId) {
    payload.user_id = options.userId;
  }

  if (options?.nonPersonalizedAds) {
    payload.non_personalized_ads = true;
  }

  const endpoint = options?.debug ? GA4_DEBUG_ENDPOINT : GA4_ENDPOINT;
  const url = `${endpoint}?measurement_id=${measurementId}&api_secret=${apiSecret}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (options?.debug) {
      const result: GA4ValidationResult = await response.json();
      if (result.validationMessages && result.validationMessages.length > 0) {
        console.warn('[GA4 Debug] Validation messages:', result.validationMessages);
        return { success: false, validationMessages: result.validationMessages };
      }
    }

    console.log(`[GA4] Event sent successfully: ${events.map(e => e.name).join(', ')}`);
    return { success: true };
  } catch (error) {
    console.error('[GA4] Error sending event:', error);
    return { success: false };
  }
}

/**
 * Track quote form submission
 */
export async function trackQuoteSubmission(
  clientId: string,
  params: {
    formType: string;
    insuranceType: string;
    state?: string;
    businessType?: string;
    submissionId?: number;
  }
): Promise<void> {
  await sendGA4Event(clientId, [
    {
      name: 'generate_lead',
      params: {
        form_type: params.formType,
        insurance_type: params.insuranceType,
        state: params.state || '',
        business_type: params.businessType || '',
        submission_id: params.submissionId,
        currency: 'USD',
        value: 1,
      },
    },
  ]);
}

/**
 * Track service request submission
 */
export async function trackServiceRequest(
  clientId: string,
  params: {
    serviceType: string;
    policyNumber?: string;
    submissionId?: number;
  }
): Promise<void> {
  await sendGA4Event(clientId, [
    {
      name: 'service_request',
      params: {
        service_type: params.serviceType,
        policy_number: params.policyNumber || '',
        submission_id: params.submissionId,
      },
    },
  ]);
}

/**
 * Track contact form submission
 */
export async function trackContactSubmission(
  clientId: string,
  params: {
    contactType: string;
    subject?: string;
    submissionId?: number;
  }
): Promise<void> {
  await sendGA4Event(clientId, [
    {
      name: 'contact_form_submission',
      params: {
        contact_type: params.contactType,
        subject: params.subject || '',
        submission_id: params.submissionId,
      },
    },
  ]);
}

/**
 * Track page view (server-side)
 */
export async function trackPageView(
  clientId: string,
  params: {
    pageLocation: string;
    pageTitle: string;
    pageReferrer?: string;
  }
): Promise<void> {
  await sendGA4Event(clientId, [
    {
      name: 'page_view',
      params: {
        page_location: params.pageLocation,
        page_title: params.pageTitle,
        page_referrer: params.pageReferrer || '',
      },
    },
  ]);
}

/**
 * Generate a client ID for server-side tracking
 * Format: xxxxxxxxxx.yyyyyyyyyy (random number . timestamp)
 */
export function generateClientId(): string {
  const randomPart = Math.floor(Math.random() * 2147483647);
  const timestampPart = Math.floor(Date.now() / 1000);
  return `${randomPart}.${timestampPart}`;
}

/**
 * Extract client ID from GA cookie or generate new one
 */
export function getClientIdFromCookie(gaCookie?: string): string {
  if (gaCookie) {
    // GA cookie format: GA1.1.xxxxxxxxxx.yyyyyyyyyy
    const parts = gaCookie.split('.');
    if (parts.length >= 4) {
      return `${parts[2]}.${parts[3]}`;
    }
  }
  return generateClientId();
}
