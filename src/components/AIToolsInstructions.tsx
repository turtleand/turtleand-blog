import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "./tools/Button";
import { cn } from "./tools/utils";

const AIToolsInstructions = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="default"
        className="absolute top-4 left-4 z-10 text-xs bg-blue-500 text-white hover:bg-blue-600"
        onClick={() => setIsOpen(true)}
      >
        How to Use
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/40"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg mx-4 overflow-y-auto max-h-[80vh]"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                How to Use the AI Tools Explorer
              </h2>

              <div className="space-y-4 text-gray-700 dark:text-gray-300 text-sm">
                <section>
                  <h3 className="font-semibold text-base mb-1 dark:text-white">Exploring the Graph</h3>
                  <p>
                    This visualization shows AI tools organized by category. Larger circles represent
                    categories, while smaller connected circles represent individual tools.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-base mb-1 dark:text-white">Interactions</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Click on a category</strong> to filter and focus on just those tools</li>
                    <li><strong>Click on a tool</strong> to visit its website</li>
                    <li><strong>Hover over any node</strong> to see its description</li>
                    <li><strong>Scroll or pinch</strong> to zoom in and out</li>
                    <li><strong>Drag the background</strong> to pan around</li>
                    <li><strong>Switch to List View</strong> using the button in the top-right corner</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-base mb-1 dark:text-white">Color Coding</h3>
                  <p>
                    Each category has its own color. The color indicates the type of AI tool,
                    making it easier to identify related tools at a glance.
                  </p>
                </section>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="default"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  Got it
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIToolsInstructions;
