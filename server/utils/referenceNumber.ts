export function generateReferenceNumber(prefix: 'RFQ' | 'SRQ'): string {
  const timestamp = Date.now() % 100000;
  const paddedTimestamp = timestamp.toString().padStart(5, '0');
  
  return `${prefix}-${paddedTimestamp}`;
}

export function getReferencePrefix(submissionType: string): 'RFQ' | 'SRQ' {
  if (submissionType === 'service') {
    return 'SRQ';
  }
  return 'RFQ';
}
