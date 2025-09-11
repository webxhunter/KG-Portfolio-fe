'use client';

import React, { useState, useEffect, useCallback } from "react";
import { UploadCloud } from 'lucide-react';

const categories = [
  "Food",
  "Brand in Frame",
  "Self Initiated Stories",
  "Couple",
  "Models",
  "Events"
];

const defaultImages = {
  "Food": "/photography/Photography-img-1.png",
  "Brand in Frame": "/photography/Photography-img-2.png",
  "Self Initiated Stories": "/photography/Photography-img-3.png",
  "Couple": "/photography/Photography-img-4.png",
  "Models": "/photography/Photography-img-5.png",
  "Events": "/photography/Photography-img-6.png",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const PhotographyAdminPanel = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(categories[0]);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(async () => {
    if (!API_URL) return;
    try {
      const res = await fetch(`${API_URL}/api/photography`);
      if (!res.ok) throw new Error("Failed to fetch images.");
      const data = await res.json();
      const imgMap = {};
      data.forEach(item => {
        imgMap[item.category] = item.image_url;
      });
      setImages(imgMap);
    } catch (err) {
      console.error(err);
      setImages({});
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        setFile(selectedFile);
        setMessage(`${selectedFile.name} selected.`);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select an image file.");
      return;
    }
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", category);

    try {
      const res = await fetch(`${API_URL}/api/photography/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed.");

      setMessage(data.message || "Image uploaded successfully!");
      setFile(null);
      document.getElementById("image-upload").value = "";
      fetchImages();
    } catch (error) {
      setMessage(error.message || "Failed to upload image.");
      console.error(error);
    }
    setLoading(false);
  };

  const currentImg = images[category]
    ? `${API_URL}/uploads/${images[category]}`
    : defaultImages[category];

  return (
    <div className="flex items-center justify-center  text-slate-200  font-sans">
      <div className="w-full max-w-4xl bg-[#1C2135] border border-slate-700/50 rounded-xl shadow-2xl shadow-blue-500/5 p-8">
        <h2 className="text-center text-3xl font-bold mb-8 text-blue-400">
          Update Gallery Image
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-semibold text-slate-300">
                Image Category
              </label>
              <select
                id="category"
                value={category}
                onChange={handleCategoryChange}
                required
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                {categories.map((cat) => (
                  <option className="p-4" value={cat} key={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="image-upload" className="block mb-2 text-sm font-semibold text-slate-300">
                Upload Image
              </label>
              <input
                type="file"
                id="image-upload"
                onChange={handleFileChange}
                accept="image/*"
                required
                className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-5 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition cursor-pointer"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !file}
              className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Uploading...' : 'Upload & Update'}
            </button>
             {message && (
              <p className={`text-center text-sm font-medium pt-2 ${
                message.toLowerCase().includes('success') || message.toLowerCase().includes('selected') ? 'text-green-400' : 'text-red-400'
              }`}>
                {message}
              </p>
            )}
          </form>
          <div className="space-y-4">
             <label className="block text-sm font-semibold text-slate-300 text-center md:text-left">
                Current Image for "{category}"
              </label>
            <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
              <img
                key={currentImg}
                src={currentImg}
                alt={category}
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographyAdminPanel;