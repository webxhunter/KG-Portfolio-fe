'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { UploadCloud, Video } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import toastify CSS

const ClientStoryVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
  const fileInputRef = useRef(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchCurrentVideo = useCallback(async () => {
    if (!API_URL) return; // Don't fetch if URL is not set
    try {
      const res = await fetch(`${API_URL}/api/client-videos`);
      if (!res.ok) {
        if (res.status === 404) {
          setCurrentVideoUrl(null);
          return;
        }
        throw new Error('Failed to fetch current video');
      }
      const data = await res.json();
      // Assuming the backend returns { url: '...' } or similar
      setCurrentVideoUrl(data.url); 
    } catch (error) {
      toast.error(error.message);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchCurrentVideo();
  }, [fetchCurrentVideo]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 200 * 1024 * 1024) { // 200MB limit
        toast.error("File is too large. Maximum size is 200MB.");
        return;
      }
      setVideoFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      toast.error("Please select a video file to upload.");
      return;
    }
    if (!API_URL) {
      toast.error("API URL is not configured. Please check your environment variables.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      // ✅ CORRECTED LINE: Pointing to the specific API endpoint
      const res = await fetch(`${API_URL}/api/client-videos`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Failed to upload video' }));
        throw new Error(errorData.message);
      }
      
      toast.success("Client video updated successfully!");
      setVideoFile(null);
      if(fileInputRef.current) fileInputRef.current.value = '';
      fetchCurrentVideo(); // Re-fetch to show the new video
    } catch (err) {
      toast.error(err.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl shadow-2xl shadow-blue-500/10 p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-6 text-center flex items-center justify-center gap-3">
            <Video size={28} />
            Client Story Video
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Upload New Video</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-800/60 transition-all"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                  <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold text-blue-400">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">MP4, MOV, WebM (MAX. 200MB)</p>
                </div>
                <input ref={fileInputRef} id="file-upload" type="file" className="hidden" accept="video/*" onChange={handleFileChange} />
                {videoFile && <p className="text-sm text-green-400 font-medium mt-2 absolute bottom-4">{videoFile.name}</p>}
              </div>
            </div>
            <div className="pt-2">
              <button type="submit" disabled={loading || !videoFile} className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                {loading ? "Uploading..." : "Upload / Update Video"}
              </button>
            </div>
          </form>
          {currentVideoUrl && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-blue-400 mb-4 text-center">Current Video Preview</h3>
              <div className="bg-gray-900/70 rounded-lg overflow-hidden border border-gray-700">
                <video key={currentVideoUrl} controls className="w-full h-auto max-h-96">
                  <source src={currentVideoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer theme="dark" position="bottom-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default ClientStoryVideo;