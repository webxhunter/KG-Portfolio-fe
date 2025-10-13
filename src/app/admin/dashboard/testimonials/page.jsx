'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Plus, Edit, Trash2 } from 'lucide-react';

const Testimonials = () => {
  const [form, setForm] = useState({
    client_name: '',
    location: '',
    star_rating: 5,
    review: '',
    instagram_link: '',
  });
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL 

  const fetchTestimonials = useCallback(async () => {
    try {
        const res = await fetch(`${API_URL}/api/testimonials`);
      if (!res.ok) throw new Error('Failed to fetch testimonials');
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      toast.error(error.message);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  
  const resetForm = () => {
    setForm({ client_name: '', location: '', star_rating: 5, review: '', instagram_link: '' });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = editingId ? `${API_URL}/api/testimonials/${editingId}` : `${API_URL}/api/testimonials`;
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Failed to ${editingId ? 'update' : 'add'} testimonial`);
      
      toast.success(`Testimonial ${editingId ? 'updated' : 'added'} successfully!`);
      resetForm();
      fetchTestimonials();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial) => {
    setForm({
      client_name: testimonial.client_name,
      location: testimonial.location,
      star_rating: testimonial.star_rating,
      review: testimonial.review,
      instagram_link: testimonial.instagram_link || '',
    });
    setEditingId(testimonial.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/testimonials/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete testimonial');
      
      toast.success('Testimonial deleted!');
      fetchTestimonials();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowDeleteConfirm(null);
    }
  };

  const DeleteConfirmationModal = ({ testimonial, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 border border-blue-500/30">
        <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
        <p className="text-gray-300 mb-6">Are you sure you want to delete the testimonial from <strong className="font-semibold text-blue-400">{testimonial.client_name}</strong>?</p>
        <div className="flex justify-end gap-4">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors">Cancel</button>
          <button onClick={() => onConfirm(testimonial.id)} className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-[0_0_12px_rgba(239,68,68,0.5)]">Delete</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl shadow-2xl shadow-blue-500/10 p-6 sm:p-8 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-6 text-center flex items-center justify-center gap-3">
            {editingId ? <Edit size={28} /> : <Plus size={28} />}
            {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2" htmlFor="client_name">Client Name</label>
                <input id="client_name" type="text" name="client_name" value={form.client_name} onChange={handleChange} placeholder="Enter client name" required className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2" htmlFor="location">Location</label>
                <input id="location" type="text" name="location" value={form.location} onChange={handleChange} placeholder="e.g., New York, USA" required className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2" htmlFor="review">Review</label>
              <textarea id="review" name="review" value={form.review} onChange={handleChange} placeholder="Write the client's feedback here..." required rows={4} className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-y" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2" htmlFor="star_rating">Star Rating (1-5)</label>
                    <input id="star_rating" type="number" name="star_rating" value={form.star_rating} onChange={handleChange} min={1} max={5} required className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-3 text-yellow-400 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2" htmlFor="instagram_link">Instagram Link</label>
                    <input id="instagram_link" type="url" name="instagram_link" value={form.instagram_link} onChange={handleChange} placeholder="https://instagram.com/username" className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button type="submit" disabled={loading} className="w-full sm:w-auto flex-grow px-6 py-3 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-blue-800 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                {loading ? 'Submitting...' : (editingId ? 'Update Testimonial' : 'Add Testimonial')}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl shadow-2xl shadow-blue-500/10 p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-6 text-center">All Testimonials</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="bg-gray-900/70 border-b-2 border-blue-500/30">
                  <th className="p-4 text-sm font-bold uppercase text-gray-400 rounded-tl-lg">#</th>
                  <th className="p-4 text-sm font-bold uppercase text-gray-400">Client</th>
                  <th className="p-4 text-sm font-bold uppercase text-gray-400">Location</th>
                  <th className="p-4 text-sm font-bold uppercase text-gray-400">Rating</th>
                  <th className="p-4 text-sm font-bold uppercase text-gray-400">Review</th>
                  <th className="p-4 text-sm font-bold uppercase text-gray-400">Instagram</th>
                  <th className="p-4 text-sm font-bold uppercase text-gray-400 text-center rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t, idx) => (
                  <tr key={t.id} className="border-b border-gray-700/50 hover:bg-gray-800/60 transition-colors">
                    <td className="p-4 font-semibold text-gray-400">{idx + 1}</td>
                    <td className="p-4 font-bold text-white">{t.client_name}</td>
                    <td className="p-4 text-gray-300">{t.location}</td>
                    <td className="p-4 text-yellow-400 font-bold text-lg">{'★'.repeat(t.star_rating)}</td>
                    <td className="p-4 text-gray-300 max-w-xs truncate" title={t.review}>{t.review}</td>
                    <td className="p-4">
                      {t.instagram_link ? <a href={t.instagram_link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-semibold">View Profile</a> : <span className="text-gray-500">-</span>}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-3">
                        <button onClick={() => handleEdit(t)} className="p-2 rounded-full bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 transition-colors" aria-label="Edit">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => setShowDeleteConfirm(t)} className="p-2 rounded-full bg-red-600/20 text-red-400 hover:bg-red-600/40 transition-colors" aria-label="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer theme="dark" position="bottom-right" autoClose={3000} hideProgressBar={false} />
      {showDeleteConfirm && <DeleteConfirmationModal testimonial={showDeleteConfirm} onConfirm={handleDelete} onCancel={() => setShowDeleteConfirm(null)} />}
    </div>
  );
};

export default Testimonials;
