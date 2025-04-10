import React, { useState } from 'react';
import styles from './email.module.css';
import sendRequest from '../../assets/store';
import { useNavigate } from 'react-router-dom';

const EmailInputPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(`Email submitted: ${email}`);
    const response = await sendRequest('/register','POST',JSON.stringify({email}),{'Content-Type' : 'application/json'});
    if(response.error){
      alert('Error in saving email');
      return;
    }
    navigate('/generateCertificates')
  };

  return (
    <div className={styles.emailpagecontainer}>
      <form className={styles.emailform} onSubmit={handleSubmit}>
        <h2>Enter your email</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className={styles.emailinput}
        />
        <button type="submit" className={styles.submitbtn}>Submit</button>
      </form>
    </div>
  );
};

export default EmailInputPage;