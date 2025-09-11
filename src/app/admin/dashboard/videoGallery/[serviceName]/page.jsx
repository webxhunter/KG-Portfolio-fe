'use client';
import React, { useState, useRef, useEffect } from 'react';
// Note: Ensure you add this stylesheet to your main HTML file's <head> section:
// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-toastify@9.1.3/dist/ReactToastify.min.css">
import { toast, ToastContainer } from 'react-toastify';
import { Video, Play, Upload, X, Edit, Trash2, AlertTriangle } from 'lucide-react';

// Reusable component for displaying a single video with edit/delete controls
const VideoCard = ({ video, onEdit, onDelete, apiUrl }) => (
  <div className="relative group bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
    <video
      src={`${apiUrl}/uploads/${video.video_url}`}
      controls
      className="w-full h-48 object-cover"
    />
    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button onClick={() => onEdit(video)} className="p-2 bg-blue-600/80 hover:bg-blue-700 rounded-full text-white" title="Edit video">
        <Edit size={16} />
      </button>
      <button onClick={() => onDelete(video.id)} className="p-2 bg-red-600/80 hover:bg-red-700 rounded-full text-white" title="Delete video">
        <Trash2 size={16} />
      </button>
    </div>
  </div>
);

// Modal for editing an existing video
const EditModal = ({ isOpen, onClose, video, onSave, apiUrl }) => {
  const [newFile, setNewFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  
  // Reset state when a new video is passed in
  useEffect(() => {
    setNewFile(null);
    setPreviewUrl(null);
  }, [video]);

  if (!isOpen || !video) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setNewFile(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    } else if (file) {
      toast.error("Please select a valid video file.");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    await onSave(video.id, newFile);
    setLoading(false);
    onClose();
  };

  const currentVideoUrl = `${apiUrl}/uploads/${video.video_url}`;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1C2135] border border-slate-700/50 rounded-xl w-full max-w-lg p-6 space-y-4 relative">
        <h3 className="text-xl font-bold text-blue-400">Edit Video</h3>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X />
        </button>
        <div className="h-56 bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
          <video src={previewUrl || currentVideoUrl} controls className="w-full h-full object-cover" />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="video/*"
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

// Modal for confirming deletion
const ConfirmationModal = ({ isOpen, onClose, onConfirm, loading }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1C2135] border border-slate-700/50 rounded-xl w-full max-w-md p-6 space-y-4 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-900/50">
                    <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-red-400">Delete Video</h3>
                <p className="text-slate-300">Are you sure you want to delete this video? This action cannot be undone.</p>
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

const VideoUpload = () => {
  const [serviceName, setServiceName] = useState('');
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState('gallery');
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [videos, setVideos] = useState([]);
  const [hero, setHero] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [videoToDeleteId, setVideoToDeleteId] = useState(null);
  
  const fileInputRef = useRef(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    // This replaces useParams for environments where it's not available.
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
      const res = await fetch(`${API_URL}/api/cinematography/gallery`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setHero(data.find(item => item.location === "hero" && item.category === serviceName) || null);
        setVideos(data.filter(item => item.location === "gallery" && item.category === serviceName));
      }
    } catch (e) {
      console.error("Error fetching gallery:", e);
      toast.error("Failed to fetch videos.");
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [serviceName, API_URL]);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith('video/')) {
      return toast.error('Please select a valid video file');
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
    if (!file) return toast.warn('Please select a video file');
    if (!serviceName || !API_URL) return toast.error('Configuration error');
    
    setLoading(true);
    const formData = new FormData();
    formData.append('video', file);
    formData.append('category', serviceName);
    formData.append('location', location);
    try {
      const res = await fetch(`${API_URL}/api/cinematography/add`, { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      toast.success('Video uploaded successfully!');
      resetUploadForm();
      await fetchGallery();
    } catch (error) {
      toast.error(error.message || 'Failed to upload video');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (video) => {
    setEditingVideo(video);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (id, updatedFile) => {
    if (!updatedFile) {
        toast.warn("Please select a new video file to update.");
        return;
    }
    const formData = new FormData();
    formData.append('video', updatedFile);
    try {
        const res = await fetch(`${API_URL}/api/cinematography/gallery/${id}`, { method: 'PUT', body: formData });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Update failed");
        toast.success("Video updated successfully!");
        await fetchGallery();
    } catch (error) {
        toast.error(error.message || "Failed to update video");
    }
  };
  
  const handleDeleteClick = (id) => {
    setVideoToDeleteId(id);
    setIsConfirmModalOpen(true);
  };

  const executeDelete = async () => {
    if (!videoToDeleteId) return;
    setDeleteLoading(true);
    try {
        const res = await fetch(`${API_URL}/api/cinematography/gallery/${videoToDeleteId}`, { method: 'DELETE' });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Deletion failed");
        toast.success("Video deleted successfully!");
        await fetchGallery();
    } catch (error) {
        toast.error(error.message || "Failed to delete video");
    } finally {
        setDeleteLoading(false);
        setIsConfirmModalOpen(false);
        setVideoToDeleteId(null);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-[#0F172A] font-sans text-slate-200 p-6">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="w-full rounded-xl border border-slate-700/50 bg-[#1C2135] p-8 shadow-2xl shadow-blue-500/10">
            <h2 className="mb-8 flex items-center justify-center gap-3 text-3xl font-bold text-blue-400 capitalize">
              <Video />Video Management - {serviceName}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-6">
                 <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-300">
                      Target Location
                    </label>
                    <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-blue-500 transition">
                        <option value="gallery">Gallery</option>
                        <option value="hero">Hero</option>
                    </select>
                </div>
                 <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-300">
                      Upload New Video
                    </label>
                    <input ref={fileInputRef} type="file" onChange={handleFileSelect} accept="video/*" className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-5 file:rounded-md file:border-0 file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition cursor-pointer"/>
                </div>
                <button onClick={handleSubmit} disabled={!file || loading} className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition">
                  <Upload size={20}/>{loading ? 'Uploading...' : 'Upload Video'}
                </button>
              </div>
              <div className="bg-slate-900 rounded-lg border border-slate-700 h-72 flex items-center justify-center">
                  {previewUrl ? <video src={previewUrl} controls className="w-full h-full object-cover"/> : <div className="flex flex-col items-center text-slate-500"><Play size={48} className="opacity-50" /><p>Video Preview</p></div>}
              </div>
            </div>
          </div>

          {(hero || videos.length > 0) && (
            <div className="w-full rounded-xl border border-slate-700/50 bg-[#1C2135] p-8">
              <h3 className="mb-6 text-2xl font-bold text-blue-400">Current Videos</h3>
              {hero && (
                <div className="mb-8">
                  <h4 className="mb-4 text-lg font-semibold text-slate-300">Hero Video</h4>
                    <VideoCard video={hero} onEdit={handleEditClick} onDelete={handleDeleteClick} apiUrl={API_URL} />
                </div>
              )}
              {videos.length > 0 && (
                <div>
                  <h4 className="mb-4 text-lg font-semibold text-slate-300">Gallery Videos ({videos.length})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video) => <VideoCard key={video.id} video={video} onEdit={handleEditClick} onDelete={handleDeleteClick} apiUrl={API_URL} />)}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <ToastContainer theme="dark" position="bottom-right" autoClose={3000}/>
      </div>

      <EditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} video={editingVideo} onSave={handleUpdate} apiUrl={API_URL}/>
      <ConfirmationModal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} onConfirm={executeDelete} loading={deleteLoading}/>
    </>
  );
};

export default VideoUpload;

