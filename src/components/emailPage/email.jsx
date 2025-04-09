import React, { useState } from 'react';
import './EmailInputPage.css';

const EmailInputPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email submitted: ${email}`);
  };

  return (
    <div className="email-page-container">
      <form className="email-form" onSubmit={handleSubmit}>
        <h2>Enter your email</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="email-input"
        />
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default EmailInputPage;