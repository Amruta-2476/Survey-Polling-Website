// Greeting.js
import React from 'react';
import { motion } from 'framer-motion'
import { Link } from "react-router-dom";

const Greeting = () => {
  return (
      <main style={{ textAlign: 'center', padding: '1em', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#ff3e00', textTransform: 'uppercase', fontSize: '2em', fontWeight: 100 }}>
      Welcome to Survey Poll Buddy!
      </h1>
      <motion.h1 className='heading_1 w-full'
                        whileInView={{ y: [100, 0], opacity: [0, 1] }}
                        transition={{ duration: 0.7 }}
                    >Your Gateway to <br/> <span>Building Surveys and Polls</span>
      </motion.h1>
      <br></br>
      <Link to='/signup' className='getStarted'>Get Started</Link>
    </main>
  );
};

export default Greeting;



