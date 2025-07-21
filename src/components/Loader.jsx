import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <motion.div
        className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
