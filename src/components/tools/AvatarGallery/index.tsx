import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const avatars = [
  { src: '/assets/avatar/turtleand-0.0.1-transparent.png', version: 'v0.0.1', date: '2023-09' },
  { src: '/assets/avatar/turtleand-0.0.2-transparent.png', version: 'v0.0.2', date: '2023-10' },
  { src: '/assets/avatar/turtleand-0.0.3-transparent.png', version: 'v0.0.3', date: '2023-11' },
];

const AvatarGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % avatars.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto h-96 md:h-[500px]">
      <h1 className="text-2xl font-bold text-center mb-4">Avatar Evolution Gallery</h1>
      <div className="relative h-full flex items-center justify-center">
        <AnimatePresence>
          <motion.div
            key={avatars[currentIndex].src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute w-full h-full"
          >
            <img src={avatars[currentIndex].src} alt={`Avatar ${avatars[currentIndex].version}`} className="object-contain w-full h-full" />
            <div className="absolute bottom-4 left-0 right-0 text-center bg-black bg-opacity-50 text-white p-2">
              <p>{avatars[currentIndex].version} - {avatars[currentIndex].date}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AvatarGallery;
