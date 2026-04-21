'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const ClientStoryImage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const fileInputRef = useRef(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchCurrentImage = async () => {
    if (!API_URL) return;
    try {
      const res = await fetch(`${API_URL}/api/client-videos`);
      if (!res.ok) {
        if (res.status === 404) { setCurrentImageUrl(null); return; }
        throw new Error('Failed to fetch image');
      }
      const data = await res.json();
      setCurrentImageUrl(data.image_url);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCurrentImage();
  }, []);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file.');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 20MB.');
      return;
    }
    setImageFile(file);
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const resetForm = () => {
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) { toast.error('Please select an image file.'); return; }
    if (!API_URL) { toast.error('API URL not configured.'); return; }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const res = await fetch(`${API_URL}/api/client-videos`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Upload failed' }));
        throw new Error(errorData.message);
      }

      toast.success('Image uploaded successfully!');
      resetForm();
      fetchCurrentImage();
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
            <ImageIcon size={28} />
            Client Story Image
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Upload Image</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-700/50 transition-all"
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold text-blue-400">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">JPG, PNG, WebP, AVIF (MAX. 20MB)</p>
                  {imageFile && (
                    <p className="text-sm text-green-400 font-medium mt-3">{imageFile.name}</p>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !imageFile}
              className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-800 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
              {loading ? 'Uploading...' : 'Upload Image'}
            </button>
          </form>

          {/* ── Current image preview ── */}
          {currentImageUrl && (
            <div className="mt-8">
              <h3 className="text-lg font-bold text-blue-400 mb-4 text-center">Current Image</h3>
              <div className="bg-gray-900/70 rounded-lg overflow-hidden border border-gray-700/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${API_URL}${currentImageUrl}`}
                  alt="Client story"
                  className="w-full h-auto max-h-96 object-contain"
                  onError={() => toast.error('Error loading image')}
                />
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

export default ClientStoryImage;