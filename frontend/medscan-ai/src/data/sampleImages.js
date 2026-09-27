// Helper SVG images generated as data URIs for instant preview testing

const createPrescriptionSvg = (title, patient, doctor, meds) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800" fill="none">
    <rect width="600" height="800" fill="#FCFDFF" rx="16"/>
    <rect x="20" y="20" width="560" height="760" fill="none" stroke="#E2ECE9" stroke-width="2" stroke-dasharray="6 6" rx="12"/>
    
    <!-- Header -->
    <rect x="40" y="40" width="520" height="100" fill="#F0F7F5" rx="8"/>
    <text x="60" y="75" font-family="Inter, sans-serif" font-size="22" font-weight="700" fill="#006859">ST. JUDE MEDICAL CENTER</text>
    <text x="60" y="98" font-family="Inter, sans-serif" font-size="12" fill="#475569">Clinical Precision Rx • License #MD-94821</text>
    <text x="60" y="118" font-family="Inter, sans-serif" font-size="12" fill="#475569">104 Healthcare Blvd, Suite 400 • Phone: (555) 019-2834</text>
    
    <!-- Rx Symbol -->
    <text x="50" y="190" font-family="Georgia, serif" font-size="48" font-weight="bold" fill="#006859">Rx</text>
    
    <!-- Patient Info -->
    <line x1="40" y1="210" x2="560" y2="210" stroke="#CBD5E1" stroke-width="1"/>
    <text x="40" y="235" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#334155">Patient: ${patient}</text>
    <text x="320" y="235" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#334155">Date: Today, 09:41 AM</text>
    <text x="40" y="258" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#334155">Prescriber: ${doctor}</text>
    <text x="320" y="258" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#334155">Refills: 2 (Two)</text>
    <line x1="40" y1="275" x2="560" y2="275" stroke="#CBD5E1" stroke-width="1"/>
    
    <!-- Prescribed Medications -->
    <text x="40" y="310" font-family="Inter, sans-serif" font-size="15" font-weight="700" fill="#0F172A">PRESCRIBED MEDICATIONS (${title})</text>
    
    ${meds.map((m, idx) => `
      <g transform="translate(40, ${340 + idx * 110})">
        <rect x="0" y="0" width="520" height="90" fill="#FFFFFF" stroke="#E2E8F0" rx="8"/>
        <circle cx="30" cy="30" r="14" fill="#006859" opacity="0.1"/>
        <text x="30" y="35" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="#006859" text-anchor="middle">${idx + 1}</text>
        <text x="60" y="32" font-family="Inter, sans-serif" font-size="16" font-weight="700" fill="#0F172A">${m.name} ${m.dose}</text>
        <text x="60" y="52" font-family="Inter, sans-serif" font-size="13" fill="#475569">Sig: ${m.sig}</text>
        <text x="60" y="70" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#006859">Active ingredient: ${m.active}</text>
      </g>
    `).join('')}

    <!-- Watermark / Stamp -->
    <g transform="translate(400, 640)">
      <circle cx="60" cy="60" r="55" fill="none" stroke="#DC2626" stroke-width="2" stroke-dasharray="4 2" opacity="0.6"/>
      <text x="60" y="55" font-family="Inter, sans-serif" font-size="11" font-weight="800" fill="#DC2626" text-anchor="middle" opacity="0.7">VERIFIED</text>
      <text x="60" y="70" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="#DC2626" text-anchor="middle" opacity="0.7">CLINICAL RX</text>
    </g>
    
    <!-- Footer signature -->
    <line x1="40" y1="720" x2="250" y2="720" stroke="#94A3B8" stroke-width="1.5"/>
    <text x="40" y="740" font-family="Inter, sans-serif" font-size="11" fill="#64748B">Physician Signature</text>
    <text x="380" y="740" font-family="Inter, sans-serif" font-size="11" fill="#64748B">MediScan AI Verified Hash: #9A82B-CLINICAL</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
};

export const SAMPLE_PRESCRIPTIONS = [
  {
    id: 'rx-warfarin-aspirin',
    title: 'High Risk Combination (Warfarin + Aspirin)',
    patient: 'Demo Patient',
    doctor: 'Dr. Robert Chen, MD',
    riskLevel: 'High',
    image: createPrescriptionSvg('Anticoagulant & NSAID', 'Demo Patient', 'Dr. Robert Chen, MD', [
      { name: 'Warfarin', dose: '5 mg', sig: 'Take 1 tablet by mouth daily at 6 PM', active: 'Warfarin Sodium' },
      { name: 'Aspirin', dose: '81 mg', sig: 'Take 1 tablet daily with morning meal', active: 'Acetylsalicylic Acid' },
      { name: 'Lisinopril', dose: '10 mg', sig: 'Take 1 tablet every morning', active: 'Lisinopril Dihydrate' }
    ])
  },
  {
    id: 'rx-amoxicillin-clav',
    title: 'Standard Antibiotic Regimen',
    patient: 'Arthur Pendelton',
    doctor: 'Dr. Sarah Jenkins, MD',
    riskLevel: 'Low',
    image: createPrescriptionSvg('Antibiotic Therapy', 'Arthur Pendelton', 'Dr. Sarah Jenkins, MD', [
      { name: 'Amoxicillin / Clavulanate', dose: '875/125 mg', sig: 'Take 1 tablet twice daily for 10 days', active: 'Amoxicillin trihydrate' },
      { name: 'Probiotic Support', dose: '10 Billion CFU', sig: 'Take 1 capsule daily between meals', active: 'Lactobacillus acidophilus' }
    ])
  },
  {
    id: 'rx-metformin-atorvastatin',
    title: 'Cardio-Metabolic Management',
    patient: 'Maria Rodriguez',
    doctor: 'Dr. Marcus Vance, MD',
    riskLevel: 'Moderate',
    image: createPrescriptionSvg('Diabetes & Cholesterol', 'Maria Rodriguez', 'Dr. Marcus Vance, MD', [
      { name: 'Metformin ER', dose: '1000 mg', sig: 'Take 1 tablet twice daily with meals', active: 'Metformin Hydrochloride' },
      { name: 'Atorvastatin', dose: '40 mg', sig: 'Take 1 tablet at bedtime', active: 'Atorvastatin Calcium' },
      { name: 'Omeprazole', dose: '20 mg', sig: 'Take 1 capsule 30 minutes before breakfast', active: 'Omeprazole Magnesium' }
    ])
  }
];
