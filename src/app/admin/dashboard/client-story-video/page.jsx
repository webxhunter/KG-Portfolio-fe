'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { UploadCloud, Video } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const ClientStoryVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
  const fileInputRef = useRef(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchCurrentVideo = async () => {
    if (!API_URL) return;
    try {
      const res = await fetch(`${API_URL}/api/client-videos`);
      if (!res.ok) {
        if (res.status === 404) {
          setCurrentVideoUrl(null);
          return;
        }
        throw new Error('Failed to fetch video');
      }
      const data = await res.json();
      setCurrentVideoUrl(data.url);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCurrentVideo();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        toast.error("Please select a video file.");
        e.target.value = '';
        return;
      }
      
      // Check file size (200MB limit)
      if (file.size > 200 * 1024 * 1024) {
        toast.error("File too large. Maximum size is 200MB.");
        e.target.value = '';
        return;
      }
      
      setVideoFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      if (file.size > 200 * 1024 * 1024) {
        toast.error("File too large. Max 200MB.");
        return;
      }
      setVideoFile(file);
      fileInputRef.current.files = e.dataTransfer.files;
    } else if (file && !file.type.startsWith('video/')) {
      toast.error("Please select a video file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const resetForm = () => {
    setVideoFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      toast.error("Please select a video file.");
      return;
    }
    if (!API_URL) {
      toast.error("API URL not configured.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const res = await fetch(`${API_URL}/api/client-videos`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Upload failed' }));
        throw new Error(errorData.message);
      }
      
      toast.success("Video uploaded successfully!");
      resetForm();
      fetchCurrentVideo();
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl shadow-2xl shadow-blue-500/10 p-8">
          <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center flex items-center justify-center gap-3">
            <Video size={28} />
            Client Story Video
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Upload Video</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-700/50 transition-all"
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold text-blue-400">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">MP4, MOV, WebM (MAX. 200MB)</p>
                  {videoFile && (
                    <p className="text-sm text-green-400 font-medium mt-3">{videoFile.name}</p>
                  )}
                </div>
                <input 
                  ref={fileInputRef} 
                  type="file" 
                  className="hidden" 
                  accept="video/*" 
                  onChange={handleFileChange} 
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading || !videoFile} 
              className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-800 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
              {loading ? "Uploading..." : "Upload Video"}
            </button>
          </form>

          {currentVideoUrl && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-blue-400 mb-4 text-center">Current Video</h3>
              <div className="bg-gray-900/70 rounded-lg overflow-hidden border border-gray-700/50">
                <video 
                  controls 
                  className="w-full h-auto max-h-96"
                  preload="metadata"
                  onError={(e) => {
                    console.error('Video loading error:', e);
                    toast.error('Error loading video');
                  }}
                >
                   <source src={`${API_URL}${currentVideoUrl}`}  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer 
        theme="dark" 
        position="bottom-right" 
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default ClientStoryVideo;