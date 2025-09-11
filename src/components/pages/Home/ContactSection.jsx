"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ContactSection = () => {
  const [contactForm, setContactForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [contactLoading, setContactLoading] = useState(false);

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      await axios.post(`${API_URL}/api/contact-messages`, contactForm);
      toast.success("Message sent successfully!");
      setContactForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      toast.error("Failed to send message.");
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <section className="bg-black text-white py-12 overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-5" data-aos="fade-right">
            <h5 className="text-2xl sm:text-3xl font-semibold text-gray-400 uppercase mb-4 break-words">
              Contact Information
            </h5>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Feel free to reach out to us through various channels. We are
              available by phone, email, and social media for your convenience.
            </p>
          </div>
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8" data-aos="fade-left">
            <a
              href="tel:+447466648842"
              className="text-white border-b border-gray-600 hover:border-white transition-colors text-sm sm:text-base break-all"
            >
              +44 7466 648842 ↗
            </a>
            <a
              href="mailto:shotsbykg1@gmail.com"
              className="text-white border-b border-gray-600 hover:border-white transition-colors text-sm sm:text-base break-all"
            >
              Shotsbykg1@gmail.com ↗
            </a>
          </div>
        </div>

        <hr className="border-gray-700 mb-12" data-aos="fade-up" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5" data-aos="fade-right">
            <h5 className="text-2xl sm:text-3xl font-semibold text-gray-400 uppercase mb-4 break-words">
              Send Me a Message
            </h5>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Have a specific inquiry or message for us? Please use the contact
              form below, and we'll get back to you promptly.
            </p>
          </div>
          <div className="lg:col-span-7 w-full" data-aos="fade-left">
            <form onSubmit={handleContactSubmit} className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 lg:gap-x-8 gap-y-6">
                <div className="w-full">
                  <label htmlFor="first_name" className="block text-xs text-gray-400 uppercase mb-2">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="First Name"
                    value={contactForm.first_name}
                    onChange={handleContactChange}
                    required
                    className="w-full bg-transparent border-b border-gray-600 text-white py-2 focus:outline-none focus:border-white text-sm sm:text-base"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="last_name" className="block text-xs text-gray-400 uppercase mb-2">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                    value={contactForm.last_name}
                    onChange={handleContactChange}
                    required
                    className="w-full bg-transparent border-b border-gray-600 text-white py-2 focus:outline-none focus:border-white text-sm sm:text-base"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="email" className="block text-xs text-gray-400 uppercase mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    required
                    className="w-full bg-transparent border-b border-gray-600 text-white py-2 focus:outline-none focus:border-white text-sm sm:text-base"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="phone" className="block text-xs text-gray-400 uppercase mb-2">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone Number"
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    required
                    className="w-full bg-transparent border-b border-gray-600 text-white py-2 focus:outline-none focus:border-white text-sm sm:text-base"
                  />
                </div>
                <div className="md:col-span-2 w-full">
                  <label htmlFor="message" className="block text-xs text-gray-400 uppercase mb-2">Your Message</label>
                  <textarea
                    name="message"
                    id="message"
                    rows="3"
                    placeholder="Message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                    className="w-full bg-transparent border-b border-gray-600 text-white py-2 focus:outline-none focus:border-white resize-none text-sm sm:text-base"
                  ></textarea>
                </div>
                <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl uppercase font-semibold break-words">Send Message</h3>
                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-black rounded-full shadow-[inset_0_5px_15px_rgba(255,255,255,0.1),0_5px_15px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_5px_15px_rgba(255,255,255,0.2),0_5px_15px_rgba(0,0,0,0.7)] transition-all disabled:opacity-50 flex-shrink-0"
                  >
                    <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="6" y1="18" x2="18" y2="6" />
                      <polyline points="7 6 18 6 18 17" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;