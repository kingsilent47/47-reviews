import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="py-16">
      <div className="container-editorial max-w-2xl">
        <h1 className="font-serif text-5xl font-bold mb-8">Contact</h1>

        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              Have a suggestion for what I should review next? Want to discuss a review? Send me a message.
            </p>

            <div className="space-y-2 text-lg">
              <p>
                <strong>Email:</strong> hello@47reviews.com
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <h2 className="font-serif text-2xl font-bold mb-6">Send a Message</h2>
            
            {submitted ? (
              <div className="p-6 bg-gray-50 border border-gray-200">
                <p className="text-ink">Thanks for reaching out. I will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-ink focus:outline-none transition-colors rounded-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-ink focus:outline-none transition-colors rounded-none"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows="6"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-ink focus:outline-none transition-colors resize-none rounded-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 bg-ink text-paper font-medium hover:bg-gray-800 transition-colors rounded-none"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;