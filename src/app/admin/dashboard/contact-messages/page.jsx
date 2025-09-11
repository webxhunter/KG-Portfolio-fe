'use client';

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail, Trash2, Loader } from "lucide-react";

const ContactMessagesPanel = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const fetchMessages = useCallback(async () => {
        if (!API_URL) {
            toast.error("API URL is not configured.");
            setLoading(false);
            return;
        }
        try {
            // Changed to axios.get
            const res = await axios.get(`${API_URL}/api/contact-messages`);
            setMessages(res.data);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to fetch messages.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this message?")) return;

        try {
            // Changed to axios.delete
            await axios.delete(`${API_URL}/api/contact-messages/${id}`);
            toast.success("Message deleted successfully!");
            setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id));
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to delete message.";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="flex min-h-screen w-full justify-center bg-[#0A0E1A] p-4 font-sans text-slate-200">
            <div className="w-full max-w-7xl">
                <div className="w-full rounded-xl border border-slate-700/50 bg-[#1C2135] p-6 shadow-2xl shadow-blue-500/5 md:p-8">
                    <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-blue-400 md:text-3xl">
                        <Mail size={28} />
                        Contact Form Messages
                    </h2>
                    <div className="overflow-x-auto rounded-lg border border-slate-700">
                        <table className="w-full text-left text-sm text-slate-300">
                            <thead className="bg-slate-900 text-xs uppercase tracking-wider text-slate-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">#</th>
                                    <th scope="col" className="px-6 py-3">First Name</th>
                                    <th scope="col" className="px-6 py-3">Last Name</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Phone</th>
                                    <th scope="col" className="px-6 py-3">Message</th>
                                    <th scope="col" className="px-6 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr className="border-slate-700">
                                        <td colSpan="7" className="py-12 text-center">
                                            <Loader className="mx-auto h-8 w-8 animate-spin text-blue-400" />
                                        </td>
                                    </tr>
                                ) : messages.length === 0 ? (
                                    <tr className="border-slate-700">
                                        <td colSpan="7" className="py-8 text-center text-slate-500">
                                            No messages found.
                                        </td>
                                    </tr>
                                ) : (
                                    messages.map((msg, idx) => (
                                        <tr key={msg.id} className="border-b border-slate-700 odd:bg-[#1C2135] even:bg-slate-800">
                                            <td className="px-6 py-4 text-slate-400">{idx + 1}</td>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium text-white">{msg.first_name}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{msg.last_name}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{msg.email}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{msg.phone}</td>
                                            <td className="max-w-xs px-6 py-4" style={{ wordBreak: 'break-word' }}>{msg.message}</td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleDelete(msg.id)}
                                                    className="rounded-md bg-red-600/80 p-2 text-white transition hover:bg-red-600"
                                                    aria-label="Delete message"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer theme="dark" position="bottom-right" autoClose={3000} />
        </div>
    );
};

export default ContactMessagesPanel;