'use client';

import React, { useEffect, useState, useCallback } from "react";
import { Mail, Loader, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const ContactMessagesPanel = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [globalFilter, setGlobalFilter] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchMessages = useCallback(async () => {
    if (!API_URL) {
      console.error("API URL is not configured.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/contact-messages`);
      const data = await res.json();
      setMessages(data?.data || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const filteredMessages = messages.filter(msg => 
    Object.values(msg).some(value => 
      String(value).toLowerCase().includes(globalFilter.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredMessages.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedMessages = filteredMessages.slice(startIndex, startIndex + pageSize);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const Button = ({ children, disabled, onClick, className = "" }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-2 text-sm rounded-md border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );

  const Select = ({ value, onChange, children, className = "" }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`px-3 py-2 rounded-md border bg-slate-800 border-slate-600 text-slate-200 ${className}`}
    >
      {children}
    </select>
  );

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-2xl">
          <div className="mb-6 flex items-center gap-3">
            <Mail className="h-7 w-7 text-blue-400" />
            <h2 className="text-2xl font-bold text-blue-400">Contact Messages</h2>
          </div>

          <div className="mb-4 flex items-center justify-between gap-4">
            <input
              type="text"
              placeholder="Search messages..."
              value={globalFilter}
              onChange={(e) => {
                setGlobalFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="max-w-sm px-3 py-2 bg-slate-700 border border-slate-600 text-slate-200 rounded-md placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Select
              value={pageSize.toString()}
              onChange={(value) => {
                setPageSize(Number(value));
                setCurrentPage(1);
              }}
              className="w-32"
            >
              <option value="5">5 rows</option>
              <option value="10">10 rows</option>
              <option value="20">20 rows</option>
              <option value="50">50 rows</option>
            </Select>
          </div>

          <div className="rounded-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">First Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Last Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center">
                        <Loader className="mx-auto h-8 w-8 animate-spin text-blue-400" />
                      </td>
                    </tr>
                  ) : paginatedMessages.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">
                        {globalFilter ? "No matching messages found." : "No messages found."}
                      </td>
                    </tr>
                  ) : (
                    paginatedMessages.map((msg, idx) => (
                      <tr key={msg.id} className="hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-400">{startIndex + idx + 1}</td>
                        <td className="px-6 py-4 text-sm font-medium text-white">{msg.first_name}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{msg.last_name}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{msg.email}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{msg.phone}</td>
                        <td className="px-6 py-4 text-sm text-slate-300 max-w-xs break-words">{msg.message}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-slate-400">
              Showing {filteredMessages.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + pageSize, filteredMessages.length)} of {filteredMessages.length} entries
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={() => goToPage(1)}
                disabled={currentPage === 1 || totalPages === 0}
                className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1 || totalPages === 0}
                className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <span className="text-sm text-slate-300 px-2">
                Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
              </span>
              
              <Button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMessagesPanel;