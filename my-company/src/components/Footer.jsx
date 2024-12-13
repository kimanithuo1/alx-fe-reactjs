import React from 'react';

function Footer() {
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      padding: '15px 0',
      textAlign: 'center',
      backgroundColor: '#333',
      color: '#fff',
      boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
    }}>
      <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
