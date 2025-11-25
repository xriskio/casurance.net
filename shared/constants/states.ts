/**
 * Official Casurance service states - 15 US states
 * This list should be used consistently across all quote forms
 */

export interface ServiceState {
  value: string;
  label: string;
}

export const SERVICE_STATES: ServiceState[] = [
  { value: "AL", label: "Alabama" },
  { value: "AZ", label: "Arizona" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "IL", label: "Illinois" },
  { value: "NV", label: "Nevada" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "OH", label: "Ohio" },
  { value: "PA", label: "Pennsylvania" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "WA", label: "Washington" },
];

export const SERVICE_STATE_CODES = SERVICE_STATES.map(s => s.value);
export const SERVICE_STATE_NAMES = SERVICE_STATES.map(s => s.label);
