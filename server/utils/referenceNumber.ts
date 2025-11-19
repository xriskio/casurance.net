export function generateReferenceNumber(prefix: 'RFQ' | 'SRQ'): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const sequence = timestamp.slice(-6);
  
  return `${prefix}-${sequence}${random}`;
}

export function getReferencePrefix(submissionType: string): 'RFQ' | 'SRQ' {
  if (submissionType === 'service') {
    return 'SRQ';
  }
  return 'RFQ';
}
