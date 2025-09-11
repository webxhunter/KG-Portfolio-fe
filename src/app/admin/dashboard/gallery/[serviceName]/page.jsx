'use client';

import React, { useState, useRef, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Camera, Upload, X, Edit, Trash2, AlertTriangle, Image, Video } from 'lucide-react';

const MediaCard = ({ media, onEdit, onDelete, apiUrl }) => {
  const isHeroVideo = media.location === 'hero';
  
  return (
    <div className="relative group bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
      {isHeroVideo ? (
        <video
          src={`${apiUrl}/uploads/${media.image_url}`}
          className="w-full h-48 object-cover"
          muted
          loop
          autoPlay
          playsInline
        />
      ) : (
        <img
          src={`${apiUrl}/uploads/${media.image_url}`}
          alt=""
          className="w-full h-48 object-cover"
        />
      )}
      <div className="absolute top-2 left-2">
        <span className="px-2 py-1 bg-black/70 text-xs text-white rounded">
          {isHeroVideo ? 'Video' : 'Image'}
        </span>
      </div>
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(media)} className="p-2 bg-blue-600/80 hover:bg-blue-700 rounded-full text-white" title={`Edit ${isHeroVideo ? 'video' : 'image'}`}>
          <Edit size={16} />
        </button>
        <button onClick={() => onDelete(media.id)} className="p-2 bg-red-600/80 hover:bg-red-700 rounded-full text-white" title={`Delete ${isHeroVideo ? 'video' : 'image'}`}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

const EditModal = ({ isOpen, onClose, media, onSave, apiUrl, serviceName }) => {
  const [newFile, setNewFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  
  useEffect(() => {
    setNewFile(null);
    setPreviewUrl(null);
  }, [media]);

  if (!isOpen || !media) return null;

  const isHeroVideo = media.location === 'hero';
  const isNewFileVideo = newFile && newFile.type.startsWith('video/');
  const acceptTypes = media.location === 'hero' ? 'video/*' : 'image/*';

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (media.location === 'hero' && !file.type.startsWith('video/')) {
      toast.error("Please select a valid video file for hero.");
      return;
    }

    if (media.location === 'gallery' && !file.type.startsWith('image/')) {
      toast.error("Please select a valid image file for gallery.");
      return;
    }

    setNewFile(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setLoading(true);
    // Pass the media object (containing location) and serviceName to onSave
    await onSave(media.id, newFile, media.location, serviceName);
    setLoading(false);
    onClose();
  };

  const currentMediaUrl = `${apiUrl}/uploads/${media.image_url}`;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1C2135] border border-slate-700/50 rounded-xl w-full max-w-lg p-6 space-y-4 relative">
        <h3 className="text-xl font-bold text-blue-400">Edit {isHeroVideo ? 'Video' : 'Image'}</h3>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X />
        </button>
        <div className="h-56 bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
          {(isHeroVideo && (isNewFileVideo || !newFile)) ? (
            <video 
              src={previewUrl || currentMediaUrl} 
              className="w-full h-full object-cover" 
              controls 
              muted
            />
          ) : (
            <img src={previewUrl || currentMediaUrl} alt="" className="w-full h-full object-cover" />
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={acceptTypes}
          className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-5 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
        />
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="py-2 px-4 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition">Cancel</button>
          <button onClick={handleSave} disabled={loading || !newFile} className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, loading, mediaType = 'media' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1C2135] border border-slate-700/50 rounded-xl w-full max-w-md p-6 space-y-4 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-900/50">
          <AlertTriangle className="h-6 w-6 text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-red-400">Delete {mediaType}</h3>
        <p className="text-slate-300">Are you sure you want to delete this {mediaType.toLowerCase()}? This action cannot be undone.</p>
        <div className="flex justify-center gap-4 pt-4">
          <button onClick={onClose} className="py-2 px-6 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition">Cancel</button>
          <button onClick={onConfirm} disabled={loading} className="py-2 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition">
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

const GalleryAdminPanel = () => {
  const [serviceName, setServiceName] = useState('');
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState('gallery');
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [images, setImages] = useState([]);
  const [hero, setHero] = useState(null);
  const [editingMedia, setEditingMedia] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [mediaToDeleteId, setMediaToDeleteId] = useState(null);
  
  const fileInputRef = useRef(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    // Extract serviceName from URL parameters
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments.pop() || 'general';
    setServiceName(decodeURIComponent(lastSegment));
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const fetchGallery = async () => {
    if (!serviceName) return;
    try {
      const res = await fetch(`${API_URL}/api/photographygallery`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setHero(data.find(item => item.location === "hero" && item.category === serviceName) || null);
        setImages(data.filter(item => item.location === "gallery" && item.category === serviceName));
      }
    } catch (e) {
      console.error("Error fetching gallery:", e);
      toast.error("Failed to fetch media.");
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [serviceName, API_URL]);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    const isImage = selectedFile.type.startsWith('image/');
    const isVideo = selectedFile.type.startsWith('video/');
    
    if (location === 'hero' && !isVideo) {
      return toast.error('Please select a valid video file for hero');
    }
    
    if (location === 'gallery' && !isImage) {
      return toast.error('Please select a valid image file for gallery');
    }
    
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const resetUploadForm = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!file) return toast.warn('Please select a file');
    if (!serviceName || !API_URL) return toast.error('Configuration error');
    
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', serviceName);
    formData.append('location', location);
    try {
      const res = await fetch(`${API_URL}/api/photographygallery/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      const fileType = location === 'hero' ? 'Video' : 'Image';
      toast.success(`${fileType} uploaded successfully!`);
      resetUploadForm();
      await fetchGallery();
    } catch (error) {
      toast.error(error.message || 'Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (media) => {
    setEditingMedia(media);
    setIsEditModalOpen(true);
  };

  // Updated handleUpdate function to use location from previous image and category from params
  const handleUpdate = async (id, updatedFile, previousLocation, categoryFromParams) => {
    if (!updatedFile) {
      toast.warn("Please select a new file to update.");
      return;
    }
    
    const formData = new FormData();
    formData.append('file', updatedFile);
    formData.append('location', previousLocation); // Use location from previous image
    formData.append('category', categoryFromParams); // Use category from params
    
    try {
      const res = await fetch(`${API_URL}/api/photographygallery/${id}`, { method: 'PUT', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      const fileType = updatedFile.type.startsWith('video/') ? 'Video' : 'Image';
      toast.success(`${fileType} updated successfully!`);
      await fetchGallery();
    } catch (error) {
      toast.error(error.message || "Failed to update file");
    }
  };
  
  const handleDeleteClick = (id) => {
    setMediaToDeleteId(id);
    setIsConfirmModalOpen(true);
  };

  const executeDelete = async () => {
    if (!mediaToDeleteId) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/photographygallery/${mediaToDeleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Deletion failed");
      toast.success("Media deleted successfully!");
      await fetchGallery();
    } catch (error) {
      toast.error(error.message || "Failed to delete media");
    } finally {
      setDeleteLoading(false);
      setIsConfirmModalOpen(false);
      setMediaToDeleteId(null);
    }
  };

  const isFileVideo = file && file.type.startsWith('video/');
  const isPreviewVideo = previewUrl && isFileVideo;
  const acceptedFileTypes = location === 'hero' ? 'video/*' : 'image/*';

  const getMediaTypeFromFile = (media) => {
    if (!media) return 'Media';
    return media.location === 'hero' ? 'Video' : 'Image';
  };

  return (
    <>
      <div className="min-h-screen w-full bg-[#0F172A] font-sans text-slate-200 p-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="w-full rounded-xl border border-slate-700/50 bg-[#1C2135] p-8 shadow-2xl shadow-blue-500/10">
            <h2 className="mb-8 flex items-center justify-center gap-3 text-3xl font-bold text-blue-400 capitalize">
              <Camera />Photography Management - {serviceName}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-300">
                    Target Location
                  </label>
                  <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-blue-500 transition">
                    <option value="gallery">Gallery (Images Only)</option>
                    <option value="hero">Hero (Videos Only)</option>
                  </select>
                  {location === 'hero' && (
                    <p className="mt-1 text-xs text-slate-400">Hero section only supports videos</p>
                  )}
                  {location === 'gallery' && (
                    <p className="mt-1 text-xs text-slate-400">Gallery section only supports images</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-300">
                    Upload New {location === 'hero' ? 'Video' : 'Image'}
                  </label>
                  <input 
                    ref={fileInputRef} 
                    type="file" 
                    onChange={handleFileSelect} 
                    accept={acceptedFileTypes}
                    className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-5 file:rounded-md file:border-0 file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition cursor-pointer"
                  />
                </div>
                <button onClick={handleSubmit} disabled={!file || loading} className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition">
                  <Upload size={20}/>{loading ? 'Uploading...' : `Upload ${location === 'hero' ? 'Video' : 'Image'}`}
                </button>
              </div>
              <div className="bg-slate-900 rounded-lg border border-slate-700 h-72 flex items-center justify-center">
                {previewUrl ? (
                  isPreviewVideo ? (
                    <video src={previewUrl} className="w-full h-full object-cover" controls muted />
                  ) : (
                    <img src={previewUrl} alt="" className="w-full h-full object-cover" />
                  )
                ) : (
                  <div className="flex flex-col items-center text-slate-500">
                    {location === 'hero' ? <Video size={48} className="opacity-50" /> : <Image size={48} className="opacity-50" />}
                    <p>{location === 'hero' ? 'Video Preview' : 'Image Preview'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {(hero || images.length > 0) && (
            <div className="w-full rounded-xl border border-slate-700/50 bg-[#1C2135] p-8">
              <h3 className="mb-6 text-2xl font-bold text-blue-400">Current Media</h3>
              {hero && (
                <div className="mb-8">
                  <h4 className="mb-4 text-lg font-semibold text-slate-300">Hero Video</h4>
                  <MediaCard media={hero} onEdit={handleEditClick} onDelete={handleDeleteClick} apiUrl={API_URL} />
                </div>
              )}
              {images.length > 0 && (
                <div>
                  <h4 className="mb-4 text-lg font-semibold text-slate-300">Gallery Images ({images.length})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.map((image) => <MediaCard key={image.id} media={image} onEdit={handleEditClick} onDelete={handleDeleteClick} apiUrl={API_URL} />)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <ToastContainer theme="dark" position="bottom-right" autoClose={3000}/>
      </div>

      <EditModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        media={editingMedia} 
        onSave={handleUpdate} 
        apiUrl={API_URL}
        serviceName={serviceName}
      />
      <ConfirmationModal 
        isOpen={isConfirmModalOpen} 
        onClose={() => setIsConfirmModalOpen(false)} 
        onConfirm={executeDelete} 
        loading={deleteLoading}
        mediaType={editingMedia ? getMediaTypeFromFile(editingMedia) : 'Media'}
      />
    </>
  );
};

export default GalleryAdminPanel;