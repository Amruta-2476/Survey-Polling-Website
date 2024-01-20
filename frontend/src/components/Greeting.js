// Greeting.js
import React from 'react';

const Greeting = () => {
  return (
      <main style={{ textAlign: 'center', padding: '1em', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#ff3e00', textTransform: 'uppercase', fontSize: '2em', fontWeight: 100 }}>
      Welcome !
      </h1>
          <p>This is a friendly greeting for users who are not logged in.</p>
          <p>Click on Login or SignUp</p>
    </main>
  );
};

export default Greeting;



