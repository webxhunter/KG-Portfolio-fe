'use client';

import React, { useState, useEffect } from 'react';
import { Upload, FileText, Video, ImageIcon, Check, X, Play, AlertCircle } from 'lucide-react';

const defaultTitles = {
  self_initiated_stories: "SELF INITIATED STORIES",
  wedding: "WEDDING", 
  revel_rhythm: "REVEL & RHYTHM",
  food: "FOOD",
  brand_in_frame: "BRAND IN FRAME",
  frame_worthy: "FRAME WORTHY",
};

const placeholder = "https://via.placeholder.com/220x140.png?text=No+Image+or+Video";

const OurService = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState('');

  const serviceOption = [
    "SELF INITIATED STORIES",
    "WEDDING",
    "REVEL & RHYTHM",
    "FOOD",
    "BRAND IN FRAME",
    "FRAME WORTHY",
  ]

  // API URL from environment variables
  const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_API_URL;

  const showToast = (message, type = 'success') => {
    if (type === 'success') {
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } else {
      setError(message);
      setTimeout(() => setError(''), 3000);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/api/services`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setServices(data);
    } catch (err) {
      console.error('Error fetching services:', err);
      showToast('Failed to fetch services. Please check your connection.', 'error');
      
      // Fallback to empty array or handle as needed
      setServices([]);
    }
  };

  useEffect(() => {
    // Check if API_URL is configured
    if (!API_URL) {
      showToast('API URL not configured. Please set NEXT_PUBLIC_API_URL in your environment variables.', 'error');
      return;
    }
    
    fetchServices();
  }, [API_URL]);

  const handleSubmit = async () => {
    if (!selectedService || !file) {
      showToast("Please select a service and a file.", 'error');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append("media", file);
    
    try {
      const response = await fetch(`${API_URL}/api/services/${selectedService}/media`, {
        method: 'POST',
        body: formData,
        // Note: Don't set Content-Type header manually when using FormData
        // The browser will set it automatically with the correct boundary
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} ${errorText}`);
      }
      
      const result = await response.json();
      
      showToast("Service media updated successfully!");
      setFile(null);
      setPreview('');
      setSelectedService('');
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
      // Refresh services data
      await fetchServices();
    } catch (err) {
      console.error('Upload error:', err);
      showToast(`Failed to update service media: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFile(selectedFile);
  };

  const handleFile = (selectedFile) => {
    if (selectedFile && (selectedFile.type.startsWith('image/') || selectedFile.type.startsWith('video/'))) {
      setFile(selectedFile);
      setPreview(selectedFile ? URL.createObjectURL(selectedFile) : '');
      setError('');
    } else if (selectedFile) {
      showToast('Please select a valid image or video file', 'error');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith('video/')) return <Video className="w-5 h-5 text-purple-400" />;
    if (fileType?.startsWith('image/')) return <ImageIcon className="w-5 h-5 text-green-400" />;
    return <FileText className="w-5 h-5 text-blue-400" />;
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Service Media Management
          </h1>
          <p className="text-slate-400 text-lg">
            Upload and manage media content for your services
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Upload className="w-6 h-6 text-cyan-400" />
            Upload Service Media
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Left Column - Service Selection & Upload */}
            <div className="space-y-6">
              
              {/* Service Selection */}
              <div>
                <label className="block text-white font-semibold text-lg mb-3">
                  Select Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-slate-700/50 text-white border border-slate-600 rounded-xl p-4 text-base
                           focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 
                           transition-all duration-300"
                  required
                >
                  <option value="">Choose a service...</option>
                  {serviceOption.map(title => {
                    const key = Object.entries(defaultTitles).find(([k, v]) => v === title)?.[0]
                      || title.toLowerCase().replace(/\s+|&/g, '_');
                    return (
                      <option key={key} value={key}>
                        {title}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* File Upload Area */}
              <div>
                <label className="block text-white font-semibold text-lg mb-3">
                  Media File
                </label>
                
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
                    dragActive
                      ? 'border-cyan-400 bg-cyan-400/10'
                      : file
                      ? 'border-green-400 bg-green-400/10'
                      : 'border-slate-600 hover:border-cyan-400/70 hover:bg-slate-700/30'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                  
                  <div className="text-center">
                    {file ? (
                      <div className="space-y-3">
                        <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                          {getFileIcon(file.type)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{file.name}</p>
                          <p className="text-slate-400 text-sm">{formatFileSize(file.size)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            setPreview('');
                          }}
                          className="text-red-400 hover:text-red-300 text-sm underline"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center">
                          <Upload className="w-8 h-8 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            Drop your media here, or <span className="text-cyan-400">browse</span>
                          </p>
                          <p className="text-slate-400 text-sm mt-2">
                            Supports images (JPG, PNG, WebP) and videos (MP4, MOV, WebM)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || !selectedService || !file}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 
                         text-white font-bold text-lg rounded-xl py-4 px-8 shadow-xl
                         transition-all duration-300 transform hover:scale-[1.02] hover:shadow-cyan-500/25
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                         disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Upload className="w-5 h-5" />
                    <span>Upload Media</span>
                  </div>
                )}
              </button>
            </div>

            {/* Right Column - Preview */}
            <div className="space-y-6">
              {preview && (
                <div>
                  <h3 className="text-white font-semibold text-lg mb-3">Preview</h3>
                  <div className="bg-black/50 rounded-xl p-4">
                    {file?.type.startsWith('video/') ? (
                      <video
                        src={preview}
                        controls
                        className="w-full max-h-64 rounded-lg"
                        style={{ objectFit: 'contain' }}
                      />
                    ) : (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full max-h-64 rounded-lg object-contain"
                      />
                    )}
                  </div>
                </div>
              )}
              
              {/* Upload Guidelines */}
              <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                  Upload Guidelines
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-slate-300">Maximum file size: 50MB for images, 200MB for videos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-slate-300">Recommended image resolution: 1920x1080 or higher</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-slate-300">Supported formats: JPG, PNG, WebP, MP4, MOV, WebM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Service Media Grid */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Current Service Media
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map(service => (
              <div
                key={service.name}
                className="bg-slate-700/30 border border-slate-600/50 rounded-xl overflow-hidden shadow-lg
                         hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300"
              >
                {/* Media Display */}
                <div className="aspect-video bg-slate-900/50 flex items-center justify-center relative overflow-hidden">
                  {service.media_type === 'video' && service.media_url ? (
                    <div className="relative w-full h-full group">
                      <video
                        src={`${API_URL}${service.media_url}`}
                        className="w-full h-full object-cover"
                        poster={placeholder}
                        onError={(e) => {
                          console.error('Video load error:', e);
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-12 h-12 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  ) : service.media_type === 'image' && service.media_url ? (
                    <img
                      src={`${API_URL}${service.media_url}`}
                      alt={defaultTitles[service.name]}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Image load error:', e);
                        e.target.src = placeholder;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800/50">
                      <div className="text-center text-slate-500">
                        <Upload className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No media set</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Service Info */}
                <div className="p-4">
                  <h3 className="font-bold text-white text-center mb-2 text-sm tracking-wide">
                    {defaultTitles[service.name]}
                  </h3>
                  <div className="text-center">
                    {service.media_type && service.media_url ? (
                      <div className="flex items-center justify-center gap-2">
                        {getFileIcon(`${service.media_type}/`)}
                        <span className="text-slate-400 text-xs capitalize">
                          {service.media_type} set
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-500 text-xs">No media set</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-xl p-8 flex flex-col items-center gap-4 shadow-2xl">
              <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
              <p className="text-white font-medium">Uploading media...</p>
              <p className="text-slate-400 text-sm">Please wait while we process your file</p>
            </div>
          </div>
        )}

        {/* Success/Error Messages */}
        {uploadSuccess && (
          <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl border border-green-400 flex items-center gap-3 z-50 animate-in slide-in-from-top duration-300">
            <Check className="w-5 h-5" />
            <span>Service media updated successfully!</span>
          </div>
        )}

        {error && (
          <div className="fixed top-6 right-6 bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl border border-red-400 flex items-center gap-3 z-50 animate-in slide-in-from-top duration-300">
            <X className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OurService;