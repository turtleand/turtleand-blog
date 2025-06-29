import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % avatars.length);
    }, 4000); // Increased interval for readability
    return () => clearInterval(interval);
  }, []);

  const currentAvatar = avatars[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-2 text-skin-base">
        Turtleand Evolution
      </h1>
      <p className="text-center text-skin-muted mb-6">
        A visual timeline for this journey of learning and transformation.
      </p>
      <div className="relative h-[550px] md:h-[600px]">
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
      </div>
    </div>
  );
};

export default AvatarGallery;
