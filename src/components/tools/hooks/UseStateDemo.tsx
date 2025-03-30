import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "../Button";

const UseStateDemo: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <section id="state" className="mb-10 p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">useState Hook</h2>
      <p className="mb-4 text-gray-700">
        The useState hook lets you add React state to function components. It returns a stateful value
        and a function to update it.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
        <pre className="text-sm text-gray-800 overflow-x-auto">
          {`const [count, setCount] = useState<number>(0);
const [isVisible, setIsVisible] = useState<boolean>(true);`}
        </pre>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border p-4 rounded-lg flex-1 bg-white shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-gray-800">Simple Counter Example</h3>
          <div className="flex items-center gap-4 justify-center">
            <Button
              onClick={() => setCount(prev => prev - 1)}
              className="bg-red-500 hover:bg-red-600"
            >
              -
            </Button>
            <span className="text-2xl font-bold min-w-[40px] text-center">{count}</span>
            <Button
              onClick={() => setCount(prev => prev + 1)}
              className="bg-green-500 hover:bg-green-600"
            >
              +
            </Button>
          </div>
        </div>

        <div className="border p-4 rounded-lg flex-1 bg-white shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-gray-800">Toggling Visibility</h3>
          <Button
            onClick={() => setIsVisible(prev => !prev)}
            className="w-full"
          >
            {isVisible ? 'Hide Content' : 'Show Content'}
          </Button>

          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-3 bg-blue-50 rounded border border-blue-100"
              >
                This content can be toggled on and off using useState.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <h3 className="font-semibold text-blue-800">Key Takeaways:</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
          <li>Use useState when you need to track values that change over time</li>
          <li>The setter function can accept a new value or a function that provides the previous value</li>
          <li>Each state update causes a re-render of the component</li>
          <li>Use multiple useState calls to manage different pieces of state</li>
        </ul>
      </div>
    </section>
  );
};

export default UseStateDemo;
