'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Plus, Edit, Trash2, UploadCloud } from 'lucide-react';

const AddBlog = () => {
  const [form, setForm] = useState({ date: '', question: '', answer: '', image: null });
  const [preview, setPreview] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ date: '', question: '', answer: '', image: null });
  const [editPreview, setEditPreview] = useState(null);
  const [loading, setLoading] = useState({ add: false, edit: false });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const addImageRef = useRef(null);
  const editImageRef = useRef(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL ;

  const fetchBlogs = useCallback(async () => {
    try {
        const res = await fetch(`${API_URL}/api/blogs`);
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      toast.error(error.message);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("Image is too large. Maximum size is 5MB.");
      return;
    }

    const set = type === 'add' ? setForm : setEditForm;
    const setPrev = type === 'add' ? setPreview : setEditPreview;

    set(prev => ({ ...prev, image: file }));
    setPrev(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm({ date: '', question: '', answer: '', image: null });
    setPreview(null);
    if(addImageRef.current) addImageRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, add: true }));
    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));

    try {
      const res = await fetch(API_URL, { method: 'POST', body: data });
      if (!res.ok) throw new Error('Failed to add blog');
      toast.success('Blog added successfully!');
      resetForm();
      fetchBlogs();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(prev => ({ ...prev, add: false }));
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete blog');
      toast.success('Blog deleted!');
      fetchBlogs();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setShowDeleteConfirm(null);
    }
  };

  const startEdit = (blog) => {
    setEditId(blog.id);
    setEditForm({ date: blog.date, question: blog.question, answer: blog.answer, image: null });
    setEditPreview(`${API_URL}/uploads/${blog.image}`); // Assuming this is how image URLs are formed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const cancelEdit = () => {
    setEditId(null);
    setEditForm({ date: '', question: '', answer: '', image: null });
    setEditPreview(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, edit: true }));
    const data = new FormData();
    Object.keys(editForm).forEach(key => data.append(key, editForm[key]));

    try {
      const res = await fetch(`${API_URL}/${editId}`, { method: 'PUT', body: data });
      if (!res.ok) throw new Error('Failed to update blog');
      toast.success('Blog updated successfully!');
      cancelEdit();
      fetchBlogs();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(prev => ({ ...prev, edit: false }));
    }
  };

  const DeleteConfirmationModal = ({ blog, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 border border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete the blog post: <strong className="font-semibold text-blue-400">"{blog.question}"</strong>?</p>
            <div className="flex justify-end gap-4">
                <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors">Cancel</button>
                <button onClick={() => onConfirm(blog.id)} className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-[0_0_12px_rgba(239,68,68,0.5)]">Delete</button>
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl shadow-2xl shadow-blue-500/10 p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-6 text-center flex items-center justify-center gap-3">
            {editId ? <Edit size={28} /> : <Plus size={28} />}
            {editId ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h2>
          <form onSubmit={editId ? handleEditSubmit : handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2" htmlFor="date">Date</label>
                <input id="date" type="date" name="date" value={editId ? editForm.date : form.date} onChange={(e) => editId ? setEditForm({...editForm, date: e.target.value}) : setForm({...form, date: e.target.value})} required className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2" htmlFor="question">Question</label>
                <input id="question" type="text" name="question" placeholder="Blog title or question" value={editId ? editForm.question : form.question} onChange={(e) => editId ? setEditForm({...editForm, question: e.target.value}) : setForm({...form, question: e.target.value})} required className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2" htmlFor="answer">Answer</label>
              <textarea id="answer" name="answer" placeholder="Content of the blog post..." value={editId ? editForm.answer : form.answer} onChange={(e) => editId ? setEditForm({...editForm, answer: e.target.value}) : setForm({...form, answer: e.target.value})} required rows={5} className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" />
            </div>
            <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Blog Image</label>
                <div onClick={() => (editId ? editImageRef : addImageRef).current?.click()} className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-800/60 transition-all bg-cover bg-center" style={{backgroundImage: `url(${editId ? editPreview : preview})`}}>
                    {!((editId ? editPreview : preview)) && <div className="flex flex-col items-center justify-center text-center">
                        <UploadCloud className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-400"><span className="font-semibold text-blue-400">Click to upload</span></p>
                        <p className="text-xs text-gray-500">PNG, JPG, WebP (MAX. 5MB)</p>
                    </div>}
                    <input ref={editId ? editImageRef : addImageRef} type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, editId ? 'edit' : 'add')} />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button type="submit" disabled={loading.add || loading.edit} className="w-full sm:w-auto flex-grow px-6 py-3 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-800 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                {loading.add || loading.edit ? 'Saving...' : (editId ? 'Update Blog Post' : 'Add Blog Post')}
              </button>
              {editId && <button type="button" onClick={cancelEdit} className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors">Cancel Edit</button>}
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
                <div key={blog.id} className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl shadow-lg shadow-blue-500/10 flex flex-col overflow-hidden">
                    <img src={`${API_URL}/uploads/${blog.image}`} alt={blog.question} className="w-full h-48 object-cover"/>
                    <div className="p-6 flex flex-col flex-grow">
                        <p className="text-sm text-yellow-400 font-semibold mb-2">{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <h3 className="text-xl font-bold text-white mb-3 flex-grow">{blog.question}</h3>
                        <p className="text-gray-400 text-sm mb-4">{blog.answer.substring(0, 100)}{blog.answer.length > 100 && '...'}</p>
                        <div className="flex justify-end gap-3 mt-auto pt-4 border-t border-gray-700/50">
                            <button onClick={() => startEdit(blog)} className="p-2 rounded-full bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 transition-colors" aria-label="Edit"><Edit size={18} /></button>
                            <button onClick={() => setShowDeleteConfirm(blog)} className="p-2 rounded-full bg-red-600/20 text-red-400 hover:bg-red-600/40 transition-colors" aria-label="Delete"><Trash2 size={18} /></button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
      <ToastContainer theme="dark" position="bottom-right" autoClose={3000} hideProgressBar={false} />
      {showDeleteConfirm && <DeleteConfirmationModal blog={showDeleteConfirm} onConfirm={handleDelete} onCancel={() => setShowDeleteConfirm(null)} />}
    </div>
  );
};

export default AddBlog;
