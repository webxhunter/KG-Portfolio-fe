'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { User, Award, Heart, Users, Percent, Image as ImageIcon } from 'lucide-react';

const AboutUsAdminPanel = () => {
    const [formData, setFormData] = useState({
        name: '',
        happy_clients: '',
        photography_awards: '',
        social_media_followers: '',
        client_retention_rate: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [oldImageUrl, setOldImageUrl] = useState('');
    const [preview, setPreview] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const fetchAboutData = useCallback(async () => {
        if (!API_URL) return;
        try {
            const res = await fetch(`${API_URL}/api/about`);
            if (!res.ok) throw new Error('Failed to fetch data.');
            const data = await res.json();

            setFormData({
                name: data.name || '',
                happy_clients: data.happy_clients || '',
                photography_awards: data.photography_awards || '',
                social_media_followers: data.social_media_followers || '',
                client_retention_rate: data.client_retention_rate || '',
            });
            
            if (data.image) {
                const fullImageUrl = `${API_URL}${data.image}`;
                setOldImageUrl(data.image);
                setPreview(fullImageUrl);
            }
        } catch (error) {
            setMessage(error.message);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchAboutData();
    }, [fetchAboutData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        
        if (imageFile) {
            data.append('image', imageFile);
        }
        data.append('oldImage', oldImageUrl);

        try {
            const res = await fetch(`${API_URL}/api/about`, {
                method: 'PUT',
                body: data,
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || 'Update failed.');
            
            setMessage('About section updated successfully!');
            fetchAboutData();
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const inputFields = [
        { name: 'name', label: 'Name', icon: <User size={18} className="text-slate-400" /> },
        { name: 'happy_clients', label: 'Happy Clients', icon: <Heart size={18} className="text-slate-400" /> },
        { name: 'photography_awards', label: 'Photography Awards', icon: <Award size={18} className="text-slate-400" /> },
        { name: 'social_media_followers', label: 'Social Media Followers', icon: <Users size={18} className="text-slate-400" /> },
        { name: 'client_retention_rate', label: 'Client Retention Rate', icon: <Percent size={18} className="text-slate-400" /> },
    ];

    return (
        <div className="flex min-h-screen w-full items-center justify-center font-sans text-slate-200">
            <div className="w-full max-w-2xl bg-[#1C2135] border border-slate-700/50 rounded-xl shadow-2xl shadow-blue-500/5 p-8">
                <h2 className="mb-8 text-center text-3xl font-bold tracking-wide text-blue-400">
                    Update About Section
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {inputFields.map(field => (
                            <div key={field.name}>
                                <label htmlFor={field.name} className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                                    {field.icon}
                                    {field.label}
                                </label>
                                <input
                                    type="text"
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 block w-full rounded-md border border-slate-700 bg-slate-900 p-2.5 text-white placeholder-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}
                    </div>

                     <div>
                        <label htmlFor="image" className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                            <ImageIcon size={18} className="text-slate-400" />
                            Company Image
                        </label>
                        <input 
                            type="file" 
                            id="image" 
                            name="image" 
                            onChange={handleFileChange} 
                            accept="image/*"
                            className="mt-2 block w-full text-sm text-slate-400 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-5 file:py-2 file:text-sm file:font-semibold file:text-white transition hover:file:bg-blue-700"
                        />
                    </div>
                    {preview && (
                        <div className="flex justify-center pt-2">
                            <div className="bg-slate-900 p-2 rounded-lg border border-slate-700">
                                <img src={preview} alt="Preview" className="max-h-40 rounded-md" />
                            </div>
                        </div>
                    )}
                    <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 py-3 text-lg font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
                        {loading ? 'Updating...' : 'Update Section'}
                    </button>
                </form>
                {message && (
                    <p className={`mt-4 text-center font-semibold ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default AboutUsAdminPanel;