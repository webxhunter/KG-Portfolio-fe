'use client';

import React, { useState, useRef, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Upload, X, Edit, Trash2, AlertTriangle, Image } from 'lucide-react';

const ImageCard = ({ image, onEdit, onDelete, apiUrl }) => {
  return (
    <div className="relative group bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
      <img
        src={`${apiUrl}/uploads/${image.image_url}`}
        alt=""
        className="w-full h-32 object-cover"
      />
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => onEdit(image)} 
          className="p-1.5 bg-blue-600/80 hover:bg-blue-700 rounded-full text-white" 
          title="Edit image"
        >
          <Edit size={12} />
        </button>
        <button 
          onClick={() => onDelete(image.id)} 
          className="p-1.5 bg-red-600/80 hover:bg-red-700 rounded-full text-white"
          title="Delete image"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  );
};

const EditModal = ({ isOpen, onClose, image, onSave, apiUrl }) => {
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
  }, [image]);

  if (!isOpen || !image) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file.");
      return;
    }

    setNewFile(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setLoading(true);
    await onSave(image.id, newFile);
    setLoading(false);
    onClose();
  };

  const currentImageUrl = `${apiUrl}/uploads/${image.image_url}`;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1C2135] border border-slate-700/50 rounded-xl w-full max-w-lg p-6 space-y-4 relative">
        <h3 className="text-xl font-bold text-blue-400">Edit Footer Image</h3>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X />
        </button>
        <div className="h-48 bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
          <img src={previewUrl || currentImageUrl} alt="" className="w-full h-full object-cover" />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-5 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
        />
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="py-2 px-4 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition">
            Cancel
          </button>
          <button 
            onClick={handleSave} 
            disabled={loading || !newFile} 
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1C2135] border border-slate-700/50 rounded-xl w-full max-w-md p-6 space-y-4 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-900/50">
          <AlertTriangle className="h-6 w-6 text-red-400" />
        </div>
        <h3 className="text-xl font-bold text-red-400">Delete Image</h3>
        <p className="text-slate-300">Are you sure you want to delete this image? This action cannot be undone.</p>
        <div className="flex justify-center gap-4 pt-4">
          <button onClick={onClose} className="py-2 px-6 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition">
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            disabled={loading} 
            className="py-2 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

const FooterImageUploader = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [images, setImages] = useState([]);
  const [editingImage, setEditingImage] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [imageToDeleteId, setImageToDeleteId] = useState(null);
  
  const fileInputRef = useRef(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
  const MAX_IMAGES = 6;

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const fetchImages = async () => {
    try {
      const res = await fetch(`${API_URL}/api/footerimage`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setImages(data);
      }
    } catch (e) {
      console.error("Error fetching images:", e);
      toast.error("Failed to fetch images.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, [API_URL]);

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    if (!selectedFile.type.startsWith('image/')) {
      return toast.error('Please select a valid image file');
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
    if (!file) return toast.warn('Please select an image');
    if (images.length >= MAX_IMAGES) return toast.error(`Maximum ${MAX_IMAGES} images allowed`);
    if (!API_URL) return toast.error('Configuration error');
    
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch(`${API_URL}/api/footerimage/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      toast.success('Image uploaded successfully!');
      resetUploadForm();
      await fetchImages();
    } catch (error) {
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (image) => {
    setEditingImage(image);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (id, updatedFile) => {
    if (!updatedFile) {
      toast.warn("Please select a new file to update.");
      return;
    }
    const formData = new FormData();
    formData.append('file', updatedFile);
    try {
      const res = await fetch(`${API_URL}/api/footerimage/${id}`, { method: 'PUT', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      toast.success('Image updated successfully!');
      await fetchImages();
    } catch (error) {
      toast.error(error.message || "Failed to update image");
    }
  };
  
  const handleDeleteClick = (id) => {
    setImageToDeleteId(id);
    setIsConfirmModalOpen(true);
  };

  const executeDelete = async () => {
    if (!imageToDeleteId) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/footerimage/${imageToDeleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Deletion failed");
      toast.success("Image deleted successfully!");
      await fetchImages();
    } catch (error) {
      toast.error(error.message || "Failed to delete image");
    } finally {
      setDeleteLoading(false);
      setIsConfirmModalOpen(false);
      setImageToDeleteId(null);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-[#0F172A] font-sans text-slate-200 p-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="w-full rounded-xl border border-slate-700/50 bg-[#1C2135] p-8 shadow-2xl shadow-blue-500/10">
            <h2 className="mb-8 flex items-center justify-center gap-3 text-3xl font-bold text-blue-400">
              <Image />
              Footer Image Manager
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-300">
                    Upload Footer Image ({images.length}/{MAX_IMAGES})
                  </label>
                  <input 
                    ref={fileInputRef} 
                    type="file" 
                    onChange={handleFileSelect} 
                    accept="image/*"
                    disabled={images.length >= MAX_IMAGES}
                    className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-5 file:rounded-md file:border-0 file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition cursor-pointer disabled:opacity-50"
                  />
                  {images.length >= MAX_IMAGES && (
                    <p className="mt-1 text-xs text-red-400">Maximum images reached. Delete some to upload more.</p>
                  )}
                </div>
                <button 
                  onClick={handleSubmit} 
                  disabled={!file || loading || images.length >= MAX_IMAGES} 
                  className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
                >
                  <Upload size={20}/>
                  {loading ? 'Uploading...' : 'Upload Image'}
                </button>
              </div>
              <div className="bg-slate-900 rounded-lg border border-slate-700 h-72 flex items-center justify-center">
                {previewUrl ? (
                  <img src={previewUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-slate-500">
                    <Image size={48} className="opacity-50" />
                    <p>Image Preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {images.length > 0 && (
            <div className="w-full rounded-xl border border-slate-700/50 bg-[#1C2135] p-8">
              <h3 className="mb-6 text-2xl font-bold text-blue-400">Footer Images ({images.length}/{MAX_IMAGES})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {images.map((image) => (
                  <ImageCard 
                    key={image.id} 
                    image={image} 
                    onEdit={handleEditClick} 
                    onDelete={handleDeleteClick} 
                    apiUrl={API_URL} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <ToastContainer theme="dark" position="bottom-right" autoClose={3000}/>
      </div>

      <EditModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        image={editingImage} 
        onSave={handleUpdate} 
        apiUrl={API_URL}
      />
      
      <ConfirmationModal 
        isOpen={isConfirmModalOpen} 
        onClose={() => setIsConfirmModalOpen(false)} 
        onConfirm={executeDelete} 
        loading={deleteLoading}
      />
    </>
  );
};

export default FooterImageUploader;