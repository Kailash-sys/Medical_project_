import { SAMPLE_PRESCRIPTIONS } from './sampleImages';

export const INITIAL_STATS = {
  totalPatients: 12482,
  prescriptionsAnalyzed: 45910,
  medicinesAnalyzed: 184302,
  potentialInteractions: 3421,
  riskDistribution: {
    lowRisk: 65,
    moderate: 25,
    highRisk: 8,
    critical: 2
  }
};

export const INITIAL_ANALYSES = [
  {
    id: 'analysis-101',
    patientName: 'Demo Patient',
    patientId: 'PT-9821',
    age: 68,
    gender: 'Female',
    date: 'Today, 09:41 AM',
    timestamp: new Date().toISOString(),
    medicines: [
      { name: 'Warfarin', dose: '5 mg', class: 'Anticoagulant', tag: 'Warfarin' },
      { name: 'Aspirin', dose: '81 mg', class: 'NSAID / Antiplatelet', tag: 'Aspirin' },
      { name: 'Lisinopril', dose: '10 mg', class: 'ACE Inhibitor', tag: 'Lisinopril' }
    ],
    riskLevel: 'High', // High, Moderate, Low, Critical
    riskScore: 88,
    status: 'Flagged for Physician Review',
    prescriber: 'Dr. Robert Chen, MD',
    image: SAMPLE_PRESCRIPTIONS[0].image,
    summary: 'Severe hemorrhagic risk identified due to concurrent administration of Warfarin (5mg) and Aspirin (81mg). Dual antiplatelet/anticoagulant therapy increases gastrointestinal bleeding risk by 3.8x.',
    activeIngredients: [
      { name: 'Warfarin Sodium', purpose: 'Thrombosis prophylaxis', dose: '5 mg daily' },
      { name: 'Acetylsalicylic Acid (Aspirin)', purpose: 'Cardioprotection', dose: '81 mg daily' },
      { name: 'Lisinopril Dihydrate', purpose: 'Hypertension control', dose: '10 mg daily' }
    ],
    clinicalInteractions: [
      {
        severity: 'Critical / High Risk',
        drugs: ['Warfarin', 'Aspirin'],
        mechanism: 'Synergistic inhibition of hemostasis (platelet inhibition by Aspirin + factor synthesis reduction by Warfarin).',
        recommendation: 'Re-evaluate clinical indication for aspirin. If antiplatelet therapy is required, consider gastroprotection with PPI (e.g., Omeprazole) or closer INR monitoring.'
      },
      {
        severity: 'Moderate Risk',
        drugs: ['Aspirin', 'Lisinopril'],
        mechanism: 'NSAIDs may decrease the antihypertensive efficacy of ACE inhibitors and increase renal impairment risk.',
        recommendation: 'Monitor blood pressure and serum creatinine periodically.'
      }
    ],
    precautions: [
      'Gastrointestinal Bleeding Alert: Monitor for dark tarry stools or hematemesis.',
      'Frequent INR Monitoring required (target INR 2.0 - 3.0).',
      'Avoid OTC NSAIDs like Ibuprofen, Naproxen, or high-dose Aspirin.',
      'Limit Vitamin K rich foods (spinach, kale) consistency.'
    ],
    sideEffects: [
      'Unusual bruising or bleeding from gums',
      'Persistent headache or dizziness',
      'Mild dry cough (Lisinopril related)',
      'Gastrointestinal upset or heartburn'
    ]
  },
  {
    id: 'analysis-102',
    patientName: 'Arthur Pendelton',
    patientId: 'PT-4102',
    age: 52,
    gender: 'Male',
    date: 'Today, 08:15 AM',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    medicines: [
      { name: 'Amoxicillin / Clavulanate', dose: '875/125 mg', class: 'Antibiotic', tag: 'Amoxicillin' },
      { name: 'Probiotic Support', dose: '10B CFU', class: 'Supplement', tag: 'Probiotic' }
    ],
    riskLevel: 'Low',
    riskScore: 12,
    status: 'Verified Clear',
    prescriber: 'Dr. Sarah Jenkins, MD',
    image: SAMPLE_PRESCRIPTIONS[1].image,
    summary: 'Standard antibiotic treatment protocol for bacterial sinusitis. No severe drug-drug interactions detected.',
    activeIngredients: [
      { name: 'Amoxicillin Trihydrate', purpose: 'Bacterial cell wall inhibition', dose: '875 mg BID' },
      { name: 'Clavulanate Potassium', purpose: 'Beta-lactamase inhibitor', dose: '125 mg BID' }
    ],
    clinicalInteractions: [],
    precautions: [
      'Complete the full 10-day course even if symptoms resolve.',
      'Take with meals to minimize gastrointestinal discomfort.',
      'Separate probiotic administration by at least 2 hours from antibiotic dose.'
    ],
    sideEffects: [
      'Mild diarrhea or loose stools',
      'Nausea or abdominal discomfort',
      'Transient mild rash'
    ]
  },
  {
    id: 'analysis-103',
    patientName: 'Maria Rodriguez',
    patientId: 'PT-7719',
    age: 61,
    gender: 'Female',
    date: 'Yesterday, 04:30 PM',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    medicines: [
      { name: 'Metformin ER', dose: '1000 mg', class: 'Antidiabetic', tag: 'Metformin' },
      { name: 'Atorvastatin', dose: '40 mg', class: 'Statin', tag: 'Atorvastatin' },
      { name: 'Omeprazole', dose: '20 mg', class: 'Proton Pump Inhibitor', tag: 'Omeprazole' }
    ],
    riskLevel: 'Moderate',
    riskScore: 45,
    status: 'Monitoring Advised',
    prescriber: 'Dr. Marcus Vance, MD',
    image: SAMPLE_PRESCRIPTIONS[2].image,
    summary: 'Long-term Omeprazole use may reduce Vitamin B12 absorption in diabetic patients taking Metformin. Monitor B12 levels annually.',
    activeIngredients: [
      { name: 'Metformin Hydrochloride', purpose: 'Glycemic management', dose: '1000 mg BID' },
      { name: 'Atorvastatin Calcium', purpose: 'HMG-CoA reductase inhibitor', dose: '40 mg QD' },
      { name: 'Omeprazole Magnesium', purpose: 'Acid suppression', dose: '20 mg QD' }
    ],
    clinicalInteractions: [
      {
        severity: 'Moderate Risk',
        drugs: ['Omeprazole', 'Metformin'],
        mechanism: 'Proton pump inhibitors may exacerbate Metformin-induced Vitamin B12 deficiency.',
        recommendation: 'Assess Vitamin B12 status periodically and consider sublingual B12 supplementation.'
      }
    ],
    precautions: [
      'Take Metformin with food to reduce GI upset.',
      'Take Omeprazole 30 minutes before the morning meal.',
      'Report muscle soreness or dark urine immediately (Statin safety).'
    ],
    sideEffects: [
      'Flatulence or stomach fullness',
      'Headache or fatigue',
      'Mild metallic taste'
    ]
  },
  {
    id: 'analysis-104',
    patientName: 'James Montgomery',
    patientId: 'PT-3382',
    age: 74,
    gender: 'Male',
    date: 'Yesterday, 02:10 PM',
    timestamp: new Date(Date.now() - 100000000).toISOString(),
    medicines: [
      { name: 'Digoxin', dose: '0.125 mg', class: 'Cardiac Glycoside', tag: 'Digoxin' },
      { name: 'Furosemide', dose: '40 mg', class: 'Loop Diuretic', tag: 'Furosemide' },
      { name: 'Spironolactone', dose: '25 mg', class: 'K-Sparing Diuretic', tag: 'Spironolactone' }
    ],
    riskLevel: 'Critical',
    riskScore: 94,
    status: 'Critical Alert',
    prescriber: 'Dr. Robert Chen, MD',
    image: SAMPLE_PRESCRIPTIONS[0].image,
    summary: 'High toxicity alert: Furosemide-induced hypokalemia significantly enhances Digoxin toxicity risk. Immediate serum electrolyte and Digoxin level lab panel required.',
    activeIngredients: [
      { name: 'Digoxin', purpose: 'Inotropic support', dose: '0.125 mg daily' },
      { name: 'Furosemide', purpose: 'Edema & diuresis', dose: '40 mg daily' },
      { name: 'Spironolactone', purpose: 'Aldosterone antagonist', dose: '25 mg daily' }
    ],
    clinicalInteractions: [
      {
        severity: 'Critical / High Risk',
        drugs: ['Furosemide', 'Digoxin'],
        mechanism: 'Diuretic-induced hypokalemia sensitizes the myocardium to Digoxin, risking fatal arrhythmias.',
        recommendation: 'Order STAT Serum Potassium and Digoxin assay. Maintain K+ levels > 4.0 mEq/L.'
      }
    ],
    precautions: [
      'Check resting heart rate before each Digoxin dose (hold if HR < 60 bpm).',
      'Urgent serum potassium and renal function panel.'
    ],
    sideEffects: [
      'Visual disturbances (yellow/green halos)',
      'Bradycardia or palpitations',
      'Severe nausea or vomiting'
    ]
  }
];

export const MOCK_PATIENTS = [
  { id: 'PT-9821', name: 'Demo Patient', age: 68, gender: 'Female', primaryCondition: 'Atrial Fibrillation & Hypertension', allergies: ['Penicillin', 'Sulfa drugs'], activePrescriptions: 3, lastScan: 'Today, 09:41 AM' },
  { id: 'PT-4102', name: 'Arthur Pendelton', age: 52, gender: 'Male', primaryCondition: 'Acute Bacterial Sinusitis', allergies: ['None known'], activePrescriptions: 2, lastScan: 'Today, 08:15 AM' },
  { id: 'PT-7719', name: 'Maria Rodriguez', age: 61, gender: 'Female', primaryCondition: 'Type 2 Diabetes & Hyperlipidemia', allergies: ['Codeine'], activePrescriptions: 3, lastScan: 'Yesterday, 04:30 PM' },
  { id: 'PT-3382', name: 'James Montgomery', age: 74, gender: 'Male', primaryCondition: 'Heart Failure & Hypertension', allergies: ['Aspirin (Severe asthma)'], activePrescriptions: 3, lastScan: 'Yesterday, 02:10 PM' },
  { id: 'PT-5541', name: 'David Kim', age: 45, gender: 'Male', primaryCondition: 'Asthma & GERD', allergies: ['NSAIDs'], activePrescriptions: 2, lastScan: '3 days ago' },
  { id: 'PT-8820', name: 'Sophia Martinez', age: 34, gender: 'Female', primaryCondition: 'Migraine & Anxiety', allergies: ['Latex'], activePrescriptions: 2, lastScan: '5 days ago' }
];

export const MOCK_MEDICATIONS = [
  { name: 'Warfarin Sodium', brandName: 'Coumadin', category: 'Anticoagulant', riskTier: 'High', description: 'Vitamin K antagonist indicated for prevention and treatment of venous thrombosis and pulmonary embolism.' },
  { name: 'Aspirin', brandName: 'Bayer / Ecotrin', category: 'Antiplatelet / NSAID', riskTier: 'Moderate', description: 'Inhibits cyclooxygenase, suppressing platelet aggregation and vascular inflammation.' },
  { name: 'Lisinopril', brandName: 'Zestril / Prinivil', category: 'ACE Inhibitor', riskTier: 'Low', description: 'Angiotensin-converting enzyme inhibitor used for management of hypertension and congestive heart failure.' },
  { name: 'Amoxicillin', brandName: 'Amoxil', category: 'Aminopenicillin', riskTier: 'Low', description: 'Bactericidal antibiotic targeting bacterial cell wall synthesis.' },
  { name: 'Metformin ER', brandName: 'Glucophage XR', category: 'Biguanide', riskTier: 'Low', description: 'Reduces hepatic glucose production, decreases intestinal absorption, and increases insulin sensitivity.' },
  { name: 'Atorvastatin', brandName: 'Lipitor', category: 'Statin', riskTier: 'Low', description: 'Competitive HMG-CoA reductase inhibitor for cardiovascular risk reduction and hyperlipidemia.' },
  { name: 'Digoxin', brandName: 'Lanoxin', category: 'Cardiac Glycoside', riskTier: 'High', description: 'Inotropic drug with narrow therapeutic index used in heart failure and ventricular rate control in atrial fibrillation.' },
  { name: 'Furosemide', brandName: 'Lasix', category: 'Loop Diuretic', riskTier: 'Moderate', description: 'Potent loop diuretic inhibiting sodium and chloride reabsorption in the loop of Henle.' }
];

export const MOCK_AI_SUGGESTIONS = [
  "What are the major drug interactions for Demo Patient's current prescription?",
  "Why is Warfarin + Aspirin classified as High Risk?",
  "Are there safer antiplatelet alternatives for patients taking Warfarin?",
  "What dietary restrictions apply to Vitamin K antagonists?",
  "How should renal dosage adjustments be calculated for Lisinopril?"
];
