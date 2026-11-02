import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    requestType: 'Music',
    title: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // 1. Input Sanitization: Strip HTML tags to prevent XSS
  const sanitizeInput = (str) => {
    return str.replace(/<[^>]*>?/gm, ''); 
  };

  // 2. Basic Email Validation
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setSubmitted(false);

    // 3. Sanitize inputs before sending
    const cleanData = {
      ...formData,
      name: sanitizeInput(formData.name),
      title: sanitizeInput(formData.title),
      message: sanitizeInput(formData.message),
    };

    // 4. Validate email if provided
    if (formData.email && !validateEmail(formData.email)) {
      setError(true);
      return;
    }

    // 5. Encode form data for Netlify Forms
    const formBody = Object.keys(cleanData)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(cleanData[key]))
      .join('&');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `form-name=review-request&${formBody}`
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', requestType: 'Music', title: '', message: '' });
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="py-16">
      <div className="container-editorial max-w-2xl">
        <h1 className="font-serif text-5xl font-bold mb-8">Contact & Requests</h1>

        <div className="space-y-8">
          <div>
            <h2 className="font-serif text-2xl font-bold mb-4">Request a Review</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              Have a suggestion for what I should review next? Fill out the form below. I read every request.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-200">
            {submitted ? (
              <div className="p-8 border border-ink bg-gray-50 text-center">
                <h3 className="font-serif text-2xl font-bold mb-2">Request Received</h3>
                <p className="text-muted">Thanks for the suggestion. I will check it out.</p>
              </div>
            ) : (
              <form 
                name="review-request" 
                method="POST" 
                data-netlify="true" 
                data-netlify-recaptcha="true" 
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                {/* Hidden inputs required by Netlify */}
                <input type="hidden" name="form-name" value="review-request" />
                
                {/* 6. Honeypot field: Catches bots that auto-fill all fields. Hidden from humans. */}
                <p hidden>
                  <label>
                    Don’t fill this out if you’re human: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      maxLength={50}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-ink focus:outline-none transition-colors rounded-none bg-paper"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      maxLength={100}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-ink focus:outline-none transition-colors rounded-none bg-paper"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="requestType" className="block text-xs font-bold uppercase tracking-widest mb-2">
                    Category
                  </label>
                  <select
                    id="requestType"
                    name="requestType"
                    value={formData.requestType}
                    onChange={(e) => setFormData({ ...formData, requestType: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-ink focus:outline-none transition-colors rounded-none bg-paper"
                  >
                    <option value="Music">Music</option>
                    <option value="Film">Film</option>
                    <option value="Game">Game</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="title" className="block text-xs font-bold uppercase tracking-widest mb-2">
                    Title / Artist / Developer
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    maxLength={100}
                    placeholder="e.g., Kendrick Lamar, Dune: Part Two, etc."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-ink focus:outline-none transition-colors rounded-none bg-paper"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest mb-2">
                    Why should I review it?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={1000}
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-ink focus:outline-none transition-colors resize-none rounded-none bg-paper"
                  />
                </div>

                {/* 7. Netlify reCAPTCHA Widget */}
                <div data-netlify-recaptcha="true"></div>

                {error && (
                  <p className="text-red-600 text-sm">Something went wrong. Please check your email format and try again.</p>
                )}

                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-ink text-paper text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-none"
                >
                  Submit Request
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
