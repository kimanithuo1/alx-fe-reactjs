// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer style={{ 
      padding: '10px 20px', 
      textAlign: 'center', 
      backgroundColor: '#333', 
      color: '#fff', 
      marginTop: '20px' 
    }}>
      <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
