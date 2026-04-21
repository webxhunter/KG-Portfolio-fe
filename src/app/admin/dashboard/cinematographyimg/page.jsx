'use client';

import React, { useState, useEffect, useCallback } from "react";

const categories = [
  "Brand in Frame",
  "Self Initiated Stories",
  "Couple",
  "Food",
  "Event",
  "Fashion Photography"
];

const defaultMedia = {
  "Brand in Frame": "/cinematography/Cinematography-img-1.png",
  "Self Initiated Stories": "/cinematography/Cinematography-img-2.png",
  "Couple": "/cinematography/Cinematography-img-3.png",
  "Food": "/cinematography/Cinematography-img-4.png",
  "Event": "/cinematography/Cinematography-img-5.png",
  "Fashion Photography": "/cinematography/Cinematography-img-6.png",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CinematographyAdminPanel = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(categories[0]);
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchMedia = useCallback(async () => {
    if (!API_URL) return;
    try {
      const res = await fetch(`${API_URL}/api/cinematography`);
      if (!res.ok) throw new Error("Failed to fetch media.");
      const data = await res.json();
      const mediaMap = {};
      data.forEach(item => {
        if (item.category && item.image_url) {
          mediaMap[item.category] = item.image_url;
        }
      });
      setMedia(mediaMap);
    } catch (err) {
      console.error(err);
      setMedia({});
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      setMessage("Please select a valid image file.");
      e.target.value = "";
      return;
    }
    setFile(selectedFile);
    setMessage(`${selectedFile.name} selected.`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { setMessage("Please select an image to upload."); return; }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", category);
    formData.append("location", "main");

    try {
      const res = await fetch(`${API_URL}/api/cinematography/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed.");

      setMessage(data.message || "Image uploaded successfully!");
      setFile(null);
      document.getElementById("media-upload").value = "";
      fetchMedia();
    } catch (error) {
      setMessage(error.message || "Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  const buildImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith("http")) return imageUrl;
    if (imageUrl.startsWith("uploads/") || imageUrl.startsWith("/uploads/")) {
      return `${API_URL}/${imageUrl.replace(/^\//, "")}`;
    }
    return `${API_URL}/uploads/${imageUrl}`;
  };

  const currentImageSrc = buildImageUrl(media[category]) ?? defaultMedia[category];

  return (
    <div className="flex items-center justify-center text-slate-200 p-4 font-sans">
      <div className="w-full max-w-4xl bg-[#1C2135] border border-slate-700/50 rounded-xl shadow-2xl shadow-blue-500/5 p-8">
        <h2 className="text-center text-3xl font-bold mb-8 text-blue-400">
          Update Cinematography Images
        </h2>

        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-semibold text-slate-300">
                Image Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => { setCategory(e.target.value); setMessage(""); }}
                required
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                {categories.map((cat) => (
                  <option value={cat} key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="media-upload" className="block mb-2 text-sm font-semibold text-slate-300">
                Upload Image
              </label>
              <input
                type="file"
                id="media-upload"
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
              {loading ? "Uploading..." : "Upload & Update"}
            </button>

            {message && (
              <p className={`text-center text-sm font-medium pt-2 ${
                message.toLowerCase().includes("success") || message.toLowerCase().includes("selected")
                  ? "text-green-400"
                  : "text-red-400"
              }`}>
                {message}
              </p>
            )}
          </form>

          {/* ── Preview ── */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-300 text-center md:text-left">
              Current Image for "{category}"
            </label>
            <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
              <img
                key={currentImageSrc}
                src={currentImageSrc}
                alt={category}
                className="w-full h-72 object-cover"
                onError={(e) => { e.target.src = defaultMedia[category]; }}
              />
            </div>
            {/* Debug: remove once images load correctly */}
            <p className="text-xs text-slate-500 break-all">{currentImageSrc}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CinematographyAdminPanel;