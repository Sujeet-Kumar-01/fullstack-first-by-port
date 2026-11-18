import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: 'Sending...' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ type: 'status-success', text: '✓ Message saved directly to MongoDB!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'status-error', text: 'Failed to send. Please check your backend.' });
      }
    } catch {
      setStatus({ type: 'status-error', text: 'Backend unreachable (localhost:5000 offline).' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="e.g. Sujee"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="sujee@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Drop a note or project idea..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Send Message'}
          </button>
        </form>

        {status.text && <p className={`status-msg ${status.type}`}>{status.text}</p>}
      </div>
    </section>
  );
}