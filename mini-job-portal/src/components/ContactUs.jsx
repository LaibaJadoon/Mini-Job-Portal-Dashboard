import React from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

export default function ContactUs() {
  return (
    <section
      id="contact"
      className="bg-white text-[#064420] px-6 md:px-20 py-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-sm md:text-base max-w-xl mx-auto">
          Have questions, suggestions, or need support? Reach out to us and
          we’ll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <form className="space-y-6 w-full max-w-xl mx-auto md:mx-0">
          <div>
            <label className="block mb-1 text-sm font-medium">Your Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md bg-[#f0f0e9] text-[#064420] focus:outline-none"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Your Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-[#f0f0e9] text-[#064420] focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Message</label>
            <textarea
              className="w-full px-4 py-2 rounded-md bg-[#f0f0e9] text-[#064420] h-32 resize-none focus:outline-none"
              placeholder="Write your message..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#064420] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#053a1d] transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col space-y-6 max-w-xl mx-auto md:mx-0">
          <div className="flex items-start gap-4">
            <FaEnvelope size={20} className="mt-1 text-[#064420]" />
            <div>
              <h4 className="font-semibold">Email Us</h4>
              <p className="text-sm">support@careerconnects.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt size={20} className="mt-1 text-[#064420]" />
            <div>
              <h4 className="font-semibold">Visit Us</h4>
              <p className="text-sm">
                123 Career Street, JobCity, Workland 12345
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaFacebookF size={20} className="mt-1 text-[#064420]" />
            <div>
              <h4 className="font-semibold">Facebook</h4>
              <p className="text-sm">@careerconnectsofficial</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <FaInstagram size={20} className="mt-1 text-[#064420]" />
            <div>
              <h4 className="font-semibold">Instagram</h4>
              <p className="text-sm">@careerconnects.official</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
