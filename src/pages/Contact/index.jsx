import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-base-100 dark:bg-gray-900 flex flex-col items-center py-16 px-6 mt-5">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 text-primary">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Have questions, feedback, or just want to say hello?  
          We'd love to hear from you!
        </p>
      </div>

      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-10">
        <div className="card bg-white dark:bg-gray-800 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-lg mb-4 dark:text-gray-100">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text dark:text-gray-300">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="input input-bordered w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text dark:text-gray-300">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text dark:text-gray-300">Message</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                  rows="4"
                  placeholder="Type your message..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col justify-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Get in Touch</h2>
          <p className="mb-2 dark:text-gray-300">
            <span className="font-medium dark:text-gray-200">📍 Address:</span>  
            17 El-sadat street El-marg
          </p>
          <p className="mb-2 dark:text-gray-300">
            <span className="font-medium dark:text-gray-200">📞 Phone:</span>  
            +0111 111 111
          </p>
          <p className="mb-2 dark:text-gray-300">
            <span className="font-medium dark:text-gray-200">✉️ Email:</span>  
            FullSnack@tastehub.com
          </p>
          <div className="mt-6">
            <h3 className="font-medium mb-2 dark:text-gray-200">Opening Hours</h3>
            <p className="dark:text-gray-300">Mon - Fri: 10:00 AM - 10:00 PM</p>
            <p className="dark:text-gray-300">Sat - Sun: 12:00 PM - 11:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
