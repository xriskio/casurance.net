export function generateReferenceNumber(prefix: 'RFQ' | 'SRQ' | 'PLQ' | 'QQT'): string {
  const timestamp = Date.now() % 100000;
  const paddedTimestamp = timestamp.toString().padStart(5, '0');
  
  return `${prefix}-${paddedTimestamp}`;
}

export function getReferencePrefix(submissionType: string): 'RFQ' | 'SRQ' | 'PLQ' | 'QQT' {
  if (submissionType === 'service') {
    return 'SRQ';
  }
  if (submissionType === 'personal') {
    return 'PLQ';
  }
  if (submissionType === 'quick') {
    return 'QQT';
  }
  return 'RFQ';
}
