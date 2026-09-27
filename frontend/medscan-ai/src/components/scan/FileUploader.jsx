import React, { useRef } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, CheckCircle, RefreshCw } from 'lucide-react';

export const FileUploader = ({ selectedImage, onSelectImage, onClearImage }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onSelectImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onSelectImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {selectedImage ? (
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#006859]/30 bg-slate-900 group shadow-lg">
          <img
            src={selectedImage}
            alt="Selected Prescription"
            className="w-full h-80 object-contain bg-slate-900/90"
          />
          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-white text-slate-800 rounded-xl font-semibold text-sm shadow-md hover:bg-slate-100 transition-all"
            >
              <RefreshCw className="w-4 h-4 text-[#006859]" />
              Change Image
            </button>
            <button
              type="button"
              onClick={onClearImage}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl font-semibold text-sm shadow-md hover:bg-red-700 transition-all"
            >
              Remove
            </button>
          </div>
          <div className="absolute top-3 left-3 bg-[#006859] text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
            <CheckCircle className="w-3.5 h-3.5" />
            Image Ready for Clinical Scan
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-[#a3cfc6] hover:border-[#006859] bg-[#f7fbf9] hover:bg-[#edf6f3] rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all duration-200 group flex flex-col items-center justify-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#e0f2ee] group-hover:bg-[#006859] text-[#006859] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs mb-4">
            <UploadCloud className="w-8 h-8" />
          </div>
          
          <h3 className="font-bold text-lg text-slate-800 group-hover:text-[#006859] transition-colors">
            Upload Prescription or Medicine Photo
          </h3>
          <p className="text-slate-500 text-sm mt-1 max-w-md">
            Drag and drop your prescription scan, doctor note, or pill bottle label here, or click to browse.
          </p>

          <div className="flex items-center gap-3 mt-6">
            <span className="px-4 py-2 bg-white border border-[#cce3dd] rounded-xl text-xs font-semibold text-[#006859] shadow-2xs group-hover:border-[#006859]">
              Browse Files (PNG, JPG, WEBP)
            </span>
            <span className="text-xs text-slate-400 font-medium">or</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <Camera className="w-4 h-4 text-slate-500" /> Use Mobile Camera
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
