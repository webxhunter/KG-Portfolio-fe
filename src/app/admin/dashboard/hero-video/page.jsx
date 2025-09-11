'use client';

import React, { useState } from 'react';
import { Upload, Video, FileText, Check, X } from 'lucide-react';

const HeroVideo = () => {
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  const showToast = (message, type = 'success') => {
    if (type === 'success') {
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } else {
      setError(message);
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleSubmit = async () => {
    if (!video) {
      showToast('Please select a video file', 'error');
      return;
    }
    
    if (!description.trim()) {
      showToast('Please enter a description', 'error');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('video', video);
    formData.append('description', description);
    
    try {
      const response = await fetch(`${API_URL}/api/hero-video`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      showToast('Hero video uploaded successfully!');
      setVideo(null);
      setDescription('');
      setPreview('');
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    } catch (err) {
      showToast('Failed to upload hero video. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('video/')) {
      setVideo(file);
      setPreview(file ? URL.createObjectURL(file) : '');
      setError('');
    } else if (file) {
      showToast('Please select a valid video file', 'error');
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

  const isSubmitDisabled = loading || !video || !description.trim();

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
            Add Hero Video
          </h1>
          <p className="text-slate-400 text-lg">
            Upload and manage your website's hero video content
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold text-lg mb-4">
                    <Video className="w-5 h-5 text-cyan-400" />
                    Video File
                  </label>
                  
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
                      dragActive
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : video
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
                      accept="video/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                    
                    <div className="text-center">
                      {video ? (
                        <div className="space-y-3">
                          <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                            <Check className="w-8 h-8 text-green-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{video.name}</p>
                            <p className="text-slate-400 text-sm">{formatFileSize(video.size)}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setVideo(null);
                              setPreview('');
                              const fileInput = document.querySelector('input[type="file"]');
                              if (fileInput) fileInput.value = '';
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
                              Drop your video here, or <span className="text-cyan-400">browse</span>
                            </p>
                            <p className="text-slate-400 text-sm mt-2">
                              Supports MP4, MOV, AVI, WebM formats
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {preview && (
                  <div className="space-y-3">
                    <h3 className="text-white font-semibold">Preview</h3>
                    <div className="bg-black/50 rounded-xl p-4">
                      <video
                        src={preview}
                        controls
                        className="w-full max-h-64 rounded-lg"
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold text-lg mb-4">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    Description
                  </label>
                  <textarea
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Enter a detailed description of your hero video..."
                    className="w-full bg-slate-700/50 text-white border border-slate-600 rounded-xl p-4 text-base resize-none
                             placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 
                             focus:ring-cyan-400/20 transition-all duration-300"
                  />
                  <div className="flex justify-between items-center mt-2 text-sm text-slate-400">
                    <span>Provide context and details about your video</span>
                    <span>{description.length}/500</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700">
              <button
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 
                         text-white font-bold text-lg rounded-xl py-4 px-8 shadow-xl
                         transition-all duration-300 transform hover:scale-[1.02] hover:shadow-cyan-500/25
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                         disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Uploading Video...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <Upload className="w-5 h-5" />
                    <span>Upload Hero Video</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {uploadSuccess && (
          <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl border border-green-400 flex items-center gap-3 z-50">
            <Check className="w-5 h-5" />
            <span>Hero video uploaded successfully!</span>
          </div>
        )}

        {error && (
          <div className="fixed top-6 right-6 bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl border border-red-400 flex items-center gap-3 z-50">
            <X className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroVideo;