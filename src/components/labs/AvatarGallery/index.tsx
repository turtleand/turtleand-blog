import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const avatars = [
  {
    src: "/assets/avatar/turtleand-0.0.1-transparent-2025-03-10.png",
    name: "The Genesis Shell",
    version: "v0.0.1",
    date: "2025-03-10",
    description:
      "The beginning of the journey with innocence and wonder."
  },
  {
    src: "/assets/avatar/turtleand-0.0.2-transparent-2025-04-21.png",
    name: "The Quantum Shell",
    version: "v0.0.2",
    date: "2025-04-21",
    description:
      "Glowing lines hint inner transformation.",
  },
  {
    src: "/assets/avatar/turtleand-0.0.3-transparent-2025-05-17.png",
    name: "The Tech Nomad",
    version: "v0.0.3",
    date: "2025-05-17",
    description:
      "A digital adventurer on the move, wearing its interface.",
  },
  {
    src: "/assets/avatar/turtleand-0.0.4-transparent-2025-06-29.png",
    name: "The Network Visitor",
    version: "v0.0.4",
    date: "2025-06-29",
    description:
      "Uplink node transmission: From observer to participant.",
  },
];

const AvatarGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [resetTimerTrigger, setResetTimerTrigger] = useState(0); // New state to trigger timer reset
  const galleryRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % avatars.length);
    setResetTimerTrigger(prev => prev + 1); // Trigger timer reset
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + avatars.length) % avatars.length);
    setResetTimerTrigger(prev => prev + 1); // Trigger timer reset
  };

  const togglePlayPause = () => {
    setIsPaused(prev => !prev);
  };

  useEffect(() => {
    if (isPaused) {
      return; // Do nothing if paused
    }

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % avatars.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused, resetTimerTrigger]); // Re-run effect when isPaused or resetTimerTrigger changes

  const handleMouseEnter = () => {
    setShowControls(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 1000); // Hide controls after 1 second
  };

  const currentAvatar = avatars[currentIndex];

  return (
    <div
      ref={galleryRef}
      className="w-full max-w-2xl mx-auto relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h1 className="text-3xl font-bold text-center mb-2 text-skin-base">
        Avatar Evolution
      </h1>
      <p className="text-center text-skin-muted mb-6">
        A visual journey through the history of the Turtleand avatar.
      </p>
      <div className="relative h-[550px] md:h-[600px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAvatar.src}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 flex flex-col items-center justify-start p-4"
          >
            <div className="bg-skin-card-muted/50 rounded-xl shadow-lg overflow-hidden w-full">
              <div className="h-80 md:h-96 flex items-center justify-center p-4">
                <img
                  src={currentAvatar.src}
                  alt={currentAvatar.name}
                  className="object-contain max-w-full max-h-full"
                />
              </div>
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-skin-accent mb-2">
                  {currentAvatar.name}
                </h2>
                <p className="text-sm text-skin-muted mb-4">
                  {currentAvatar.version} &bull; {currentAvatar.date}
                </p>
                <p className="text-skin-base leading-relaxed">
                  {currentAvatar.description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-between p-4"
            >
              <button
                onClick={handlePrev}
                className="bg-black/50 text-white p-3 rounded-full hover:bg-black/75 transition-colors"
                aria-label="Previous Avatar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="bg-black/50 text-white p-3 rounded-full hover:bg-black/75 transition-colors"
                aria-label="Next Avatar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play/Pause Button */}
        <AnimatePresence>
          {showControls && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={togglePlayPause}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors z-10"
              aria-label={isPaused ? "Play Slideshow" : "Pause Slideshow"}
            >
              {isPaused ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="none"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="none"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                </svg>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AvatarGallery;
