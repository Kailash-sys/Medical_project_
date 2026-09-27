/**
 * MediScan AI - Backend API Integration & Service Abstraction Layer
 * 
 * ============================================================================
 * HACKATHON TEAM INSTRUCTIONS FOR BACKEND INTEGRATION:
 * ============================================================================
 * 1. Change `USE_MOCK_DATA` to `false` below when your backend API is ready.
 * 2. Set `API_BASE_URL` to your backend server URL (e.g., http://localhost:8000/api).
 * 3. Update the endpoint paths inside each function below to match your API routes.
 * ============================================================================
 */

import { INITIAL_ANALYSES, INITIAL_STATS, MOCK_PATIENTS, MOCK_MEDICATIONS } from '../data/mockData';

// TOGGLE THIS FLAG TO SWITCH BETWEEN MOCK DATA AND YOUR REAL BACKEND API
export const USE_MOCK_DATA = false;

// YOUR REAL BACKEND BASE URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Helper fetch wrapper with authentication and error handling
 */
const fetchAPI = async (endpoint, options = {}) => {
  const apiKey = localStorage.getItem('mediscan_api_key') || '';
  
  const headers = {
    'Authorization': apiKey ? `Bearer ${apiKey}` : '',
    ...options.headers,
  };

  // Only set application/json if it's not a FormData payload
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[MediScan API Error] ${endpoint}:`, error);
    throw error;
  }
};

export const apiService = {
  /**
   * Analyze a uploaded prescription image or sample
   * HACKATHON ENDPOINT: POST /api/scan
   */
  analyzePrescription: async (imageData, patientName = 'Prescription Patient') => {
    if (USE_MOCK_DATA) {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const isHighRisk = imageData.includes('Warfarin') || imageData.includes('High');
      return {
        id: `analysis-${Date.now()}`,
        patientName: patientName || 'Prescription Patient',
        patientId: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
        age: 65,
        gender: 'Female',
        date: 'Just now',
        timestamp: new Date().toISOString(),
        image: imageData,
        medicines: isHighRisk ? [
          { name: 'Warfarin', dose: '5 mg', class: 'Anticoagulant', tag: 'Warfarin' },
          { name: 'Aspirin', dose: '81 mg', class: 'NSAID', tag: 'Aspirin' },
          { name: 'Lisinopril', dose: '10 mg', class: 'ACE Inhibitor', tag: 'Lisinopril' }
        ] : [
          { name: 'Amoxicillin / Clavulanate', dose: '875/125 mg', class: 'Antibiotic', tag: 'Amoxicillin' },
          { name: 'Probiotic Support', dose: '10B CFU', class: 'Supplement', tag: 'Probiotic' }
        ],
        riskLevel: isHighRisk ? 'High' : 'Low',
        riskScore: isHighRisk ? 88 : 12,
        summary: isHighRisk
          ? 'Severe hemorrhagic risk identified due to concurrent Warfarin and Aspirin administration. Immediate clinical review required.'
          : 'Standard prescription scan completed. No critical drug-drug interactions detected.',
        activeIngredients: isHighRisk ? [
          { name: 'Warfarin Sodium', purpose: 'Anticoagulant', dose: '5 mg daily' },
          { name: 'Acetylsalicylic Acid', purpose: 'Antiplatelet', dose: '81 mg daily' }
        ] : [
          { name: 'Amoxicillin Trihydrate', purpose: 'Antibacterial', dose: '875 mg BID' }
        ],
        clinicalInteractions: isHighRisk ? [
          {
            severity: 'Critical / High Risk',
            drugs: ['Warfarin', 'Aspirin'],
            mechanism: 'Synergistic bleeding risk elevation (3.8x baseline risk).',
            recommendation: 'Evaluate whether dual antiplatelet/anticoagulation is strictly necessary.'
          }
        ] : [],
        precautions: [
          'Take medication as prescribed by attending physician.',
          'Store in a cool, dry place away from direct sunlight.'
        ],
        sideEffects: [
          'Mild nausea or stomach discomfort',
          'Headache or lightheadedness'
        ]
      };
    }

    // REAL BACKEND INTEGRATION:
    const formData = new FormData();
    
    let blob;
    let filename = 'prescription.jpg';
    if (imageData.startsWith('data:image/svg+xml')) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = () => {
          canvas.width = img.width || 600;
          canvas.height = img.height || 800;
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((b) => { blob = b; resolve(); }, 'image/png');
        };
        img.onerror = reject;
        img.src = imageData;
      });
      filename = 'prescription.png';
    } else {
      const arr = imageData.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      blob = new Blob([u8arr], {type:mime});
      filename = `prescription.${mime.split('/')[1]}`;
    }

    formData.append('files', blob, filename);
    formData.append('patient_name', patientName);

    const backendResult = await fetchAPI('/analysis/analyze-images', {
      method: 'POST',
      body: formData,
    });

    // Adapt backend response to frontend expected format
    return {
      id: `analysis-${Date.now()}`,
      patientName: patientName,
      patientId: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Just now',
      timestamp: new Date().toISOString(),
      image: imageData,
      medicines: backendResult.medicines.map((m, idx) => ({
        name: m,
        dose: 'N/A',
        class: 'Unknown',
        tag: m
      })),
      riskLevel: backendResult.interactions.some(i => i.result.interaction_found) ? 'High' : 'Low',
      riskScore: backendResult.interactions.some(i => i.result.interaction_found) ? 85 : 10,
      summary: backendResult.interactions.some(i => i.result.interaction_found) 
        ? 'Interactions identified. Clinical review required.'
        : 'Scan completed. No critical drug-drug interactions detected.',
      activeIngredients: backendResult.medicines.map((m) => ({ name: m, purpose: 'Unknown', dose: 'N/A' })),
      clinicalInteractions: backendResult.interactions.filter(i => i.result.interaction_found).map(i => ({
        severity: i.result.severity || 'Critical',
        drugs: [i.drug_a, i.drug_b],
        mechanism: i.result.description,
        recommendation: 'Clinical review recommended.'
      })),
      precautions: ['Review interactions with a healthcare professional.'],
      sideEffects: []
    };
  },

  /**
   * Fetch all past prescription analyses
   * HACKATHON ENDPOINT: GET /api/analyses
   */
  getAnalyses: async () => {
    if (USE_MOCK_DATA) {
      const saved = localStorage.getItem('mediscan_analyses');
      return saved ? JSON.parse(saved) : INITIAL_ANALYSES;
    }
    return await fetchAPI('/analyses');
  },

  /**
   * Fetch clinical dashboard statistics
   * HACKATHON ENDPOINT: GET /api/stats
   */
  getDashboardStats: async () => {
    if (USE_MOCK_DATA) {
      return INITIAL_STATS;
    }
    return await fetchAPI('/stats');
  },

  /**
   * Send query to AI Clinical Copilot API (Gemini / OpenAI / Custom LLM)
   * HACKATHON ENDPOINT: POST /api/chat
   */
  queryAICopilot: async (userMessage, patientContext = null) => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const q = userMessage.toLowerCase();

      if (q.includes('warfarin') && q.includes('aspirin')) {
        return `Clinical Alert regarding ${patientContext?.patientName || 'Demo Patient'}: Warfarin (5mg) combined with Aspirin (81mg) causes double antiplatelet/anticoagulation blockade. Studies indicate a 3.8-fold elevation in major gastrointestinal hemorrhage risks. If dual therapy is non-negotiable for cardioprotection, PPI co-prescribing (e.g., Omeprazole) and weekly INR target checks (2.0-2.5) are strongly advised.`;
      } else if (q.includes('lisinopril') || q.includes('cough')) {
        return `Lisinopril is an ACE inhibitor. A persistent dry, non-productive cough occurs in 5-20% of patients due to bradykinin accumulation in lung tissue. If troublesome, switching to an ARB (such as Losartan or Valsartan) is recommended.`;
      } else if (q.includes('food') || q.includes('diet') || q.includes('vitamin k')) {
        return `For patients taking Vitamin K antagonists like Warfarin, high dietary fluctuations in Vitamin K (leafy greens like spinach, kale, broccoli) will directly alter INR. The key clinical guidance is consistency in diet rather than complete exclusion.`;
      }
      return `Based on the active clinical profile for ${patientContext?.patientName || 'the patient'}, all prescribed compounds have been screened against the MediScan AI pharmacology database. Always confirm dosing adjustments against kidney function (eGFR) and liver enzyme panels before final dispensing.`;
    }

    // REAL BACKEND INTEGRATION:
    const backendResult = await fetchAPI('/analysis/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: userMessage,
        patient_context: patientContext
      })
    });
    return backendResult.response;
  },

  /**
   * Fetch patient list
   * HACKATHON ENDPOINT: GET /api/patients
   */
  getPatients: async () => {
    if (USE_MOCK_DATA) return MOCK_PATIENTS;
    return await fetchAPI('/patients');
  },

  /**
   * Fetch medication index
   * HACKATHON ENDPOINT: GET /api/medications
   */
  getMedications: async () => {
    if (USE_MOCK_DATA) return MOCK_MEDICATIONS;
    return await fetchAPI('/medications');
  }
};
