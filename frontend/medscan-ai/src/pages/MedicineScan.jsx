import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalysis } from '../context/AnalysisContext';
import { apiService } from '../services/api';
import { FileUploader } from '../components/scan/FileUploader';
import { ScanProgress } from '../components/scan/ScanProgress';
import { SamplePrescriptions } from '../components/scan/SamplePrescriptions';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';
import { FileScan, Sparkles, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';

export const MedicineScan = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [patientName, setPatientName] = useState('Demo Patient');
  const { addAnalysis } = useAnalysis();
  const navigate = useNavigate();

  const handleSelectSample = (sample) => {
    setSelectedImage(sample.image);
    setPatientName(sample.patient);
  };

  const handleStartAnalysis = () => {
    if (!selectedImage) return;
    setIsScanning(true);
  };

  const handleScanComplete = async () => {
    try {
      const newRecord = await apiService.analyzePrescription(selectedImage, patientName);
      addAnalysis(newRecord);
      setIsScanning(false);
      navigate(`/results/${newRecord.id}`);
    } catch (err) {
      console.error('Scan error:', err);
      alert(`Scan failed: ${err.message}. If it's an API Key error, please update your .env file.`);
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-200/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
              <FileScan className="w-8 h-8 text-[#006859]" />
              Analyze Prescription
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-0.5">
              Upload prescription images for instant AI drug identification and interaction screening.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-[#e6f4f1] text-[#006859] px-3.5 py-1.5 rounded-full text-xs font-semibold border border-[#bce3db]">
          <Zap className="w-4 h-4 fill-current" />
          <span>Clinical OCR Engine v2.4</span>
        </div>
      </div>

      {isScanning ? (
        <ScanProgress image={selectedImage} onComplete={handleScanComplete} />
      ) : (
        <div className="space-y-6">
          <div className="glass rounded-3xl border border-[#e2e8f0]/60 p-6 md:p-8 shadow-sm space-y-6 hover-lift">
            
            {/* Patient Context Input */}
            <div className="max-w-md">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Target Patient Context (Optional)
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient name..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006859]"
              />
            </div>

            {/* Main File Uploader */}
            <FileUploader
              selectedImage={selectedImage}
              onSelectImage={(img) => setSelectedImage(img)}
              onClearImage={() => setSelectedImage(null)}
            />

            {/* Analyze Action Button */}
            {selectedImage && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleStartAnalysis}
                  className="flex items-center gap-2 px-8 py-3.5 bg-[#006859] hover:bg-[#005044] text-white font-extrabold text-base rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Analyze Prescription Now</span>
                </button>
              </div>
            )}

            {/* Sample Prescriptions Section for Hackathon Demo */}
            <SamplePrescriptions onSelectSample={handleSelectSample} />
          </div>

          <MedicalDisclaimer />
        </div>
      )}
    </div>
  );
};
