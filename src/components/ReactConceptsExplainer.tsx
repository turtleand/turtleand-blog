import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "./tools/utils";
import { Button } from "./tools/Button";

/**
 * ReactConceptsExplainer
 * 
 * An educational component that demonstrates React concepts used in our visualization components.
 * This component focuses on teaching React patterns through simple interactive examples.
 */
const ReactConceptsExplainer: React.FC = () => {
  // Section 1: State Management
  const [activeSection, setActiveSection] = useState<string>('state');
  const [count, setCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [items, setItems] = useState<string[]>(['Item 1', 'Item 2', 'Item 3']);
  const [inputValue, setInputValue] = useState<string>('');
  const [showPerformanceExample, setShowPerformanceExample] = useState<boolean>(false);
  const [heavyComputationToggle, setHeavyComputationToggle] = useState<boolean>(false);

  // Section 2: Refs
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCount = useRef<number>(0);

  // Section 3: Callbacks
  const handleButtonClick = useCallback(() => {
    setCount(prevCount => prevCount + 1);
    console.log('Button clicked!');
  }, []);

  const addItem = useCallback(() => {
    if (inputValue.trim()) {
      setItems(prevItems => [...prevItems, inputValue.trim()]);
      setInputValue('');

      // Focus back on input after adding - demonstrating useRef
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [inputValue]);

  const removeItem = useCallback((index: number) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  }, []);

  // Section 4: Memoization
  // Simulate an expensive calculation
  const expensiveCalculation = (num: number): number => {
    console.log('Performing expensive calculation...');
    // Artificially make this slow
    const start = Date.now();
    while (Date.now() - start < 100) {
      // Busy wait to simulate work
    }
    return num * 2;
  };

  // Memoize the expensive calculation
  const memoizedValue = useMemo(() => {
    if (!showPerformanceExample) return 0;
    return expensiveCalculation(heavyComputationToggle ? 100 : 50);
  }, [showPerformanceExample, heavyComputationToggle]);

  // Section 5: Effects
  useEffect(() => {
    // Runs on mount
    console.log('Component mounted');

    // Cleanup function runs on unmount
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  useEffect(() => {
    // This runs when count changes
    document.title = `Count: ${count}`;

    return () => {
      document.title = 'React Concepts';
    };
  }, [count]);

  useEffect(() => {
    // Example of tracking renders with useRef
    renderCount.current += 1;
    console.log(`Component has rendered ${renderCount.current} times`);
  });

  // Scroll the active section into view when it changes
  useEffect(() => {
    const element = document.getElementById(activeSection);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeSection]);

  // Section 6: Derived State with useMemo
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [items, inputValue]);

  // Section Content Rendering
  const renderStateSection = () => (
    <section id="state" className={`mb-10 p-6 bg-white rounded-lg shadow-sm ${activeSection !== 'state' ? 'opacity-70' : ''}`}>
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

  const renderRefsSection = () => (
    <section id="refs" className={`mb-10 p-6 bg-white rounded-lg shadow-sm ${activeSection !== 'refs' ? 'opacity-70' : ''}`}>
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">useRef Hook</h2>
      <p className="mb-4 text-gray-700">
        The useRef hook provides a way to access DOM nodes directly, and can also be
        used to persist values across renders without causing re-renders.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
        <pre className="text-sm text-gray-800 overflow-x-auto">
          {`const inputRef = useRef<HTMLInputElement>(null);
const renderCount = useRef<number>(0);

// Access the DOM element
inputRef.current?.focus();

// Track values between renders without causing re-renders
renderCount.current += 1;`}
        </pre>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border p-4 rounded-lg flex-1 bg-white shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-gray-800">DOM Access Example</h3>
          <div className="flex flex-col gap-2">
            <input
              ref={inputRef}
              type="text"
              className="border p-2 rounded"
              placeholder="Type something..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              onClick={() => inputRef.current?.focus()}
              className="bg-purple-500 hover:bg-purple-600"
            >
              Focus Input (via useRef)
            </Button>
          </div>
        </div>

        <div className="border p-4 rounded-lg flex-1 bg-white shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-gray-800">Persist Value Across Renders</h3>
          <p className="text-gray-700 mb-3">
            This component has rendered <span className="font-bold text-purple-600">{renderCount.current}</span> times.
          </p>
          <p className="text-sm text-gray-600 mb-3">
            Unlike state, changing renderCount.current doesn't cause re-renders.
          </p>
          <Button
            ref={buttonRef}
            onClick={() => setCount(c => c + 1)}
            className="bg-purple-500 hover:bg-purple-600"
          >
            Force Re-render (updates count state)
          </Button>
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
        <h3 className="font-semibold text-purple-800">Key Takeaways:</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
          <li>useRef creates a mutable reference that persists for the full lifetime of the component</li>
          <li>Changes to .current don't trigger re-renders</li>
          <li>It's perfect for storing DOM elements or values that need to persist between renders</li>
          <li>Common uses include: focus management, imperative animations, previous value tracking</li>
        </ul>
      </div>
    </section>
  );

  const renderCallbackSection = () => (
    <section id="callback" className={`mb-10 p-6 bg-white rounded-lg shadow-sm ${activeSection !== 'callback' ? 'opacity-70' : ''}`}>
      <h2 className="text-2xl font-semibold mb-4 text-green-700">useCallback Hook</h2>
      <p className="mb-4 text-gray-700">
        The useCallback hook returns a memoized callback that only changes if one of its
        dependencies has changed, preventing unnecessary rerenders.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
        <pre className="text-sm text-gray-800 overflow-x-auto">
          {`const addItem = useCallback(() => {
  if (inputValue.trim()) {
    setItems(prevItems => [...prevItems, inputValue.trim()]);
    setInputValue('');
  }
}, [inputValue]); // Dependency array - recreates only when inputValue changes`}
        </pre>
      </div>

      <div className="border p-4 rounded-lg mb-6 bg-white shadow-sm">
        <h3 className="text-lg font-medium mb-3 text-gray-800">List Management Example</h3>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="border p-2 rounded flex-grow"
            placeholder="Add new item..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
          />
          <Button
            onClick={addItem}
            className="bg-green-500 hover:bg-green-600"
          >
            Add
          </Button>
        </div>

        <div>
          <h4 className="font-medium mb-2 text-gray-800">Items:</h4>
          <ul className="bg-gray-50 rounded-lg p-2 divide-y divide-gray-100">
            {items.map((item, index) => (
              <li key={index} className="flex justify-between items-center py-2 px-1">
                <span>{item}</span>
                <Button
                  variant="outline"
                  onClick={() => removeItem(index)}
                  className="text-xs p-1 h-auto text-red-500 hover:text-red-700"
                >
                  Remove
                </Button>
              </li>
            ))}
            {items.length === 0 && (
              <li className="py-2 text-gray-500 text-center">No items added yet</li>
            )}
          </ul>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
        <h3 className="font-semibold text-green-800">Key Takeaways:</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
          <li>useCallback is essential for performance optimization</li>
          <li>It prevents recreation of function references on each render</li>
          <li>Particularly useful when passing callbacks to optimized child components</li>
          <li>Include all values from the component scope in the dependency array</li>
        </ul>
      </div>
    </section>
  );

  // Render the selected section content based on activeSection
  const renderContent = () => {
    switch (activeSection) {
      case 'state':
        return renderStateSection();
      case 'refs':
        return renderRefsSection();
      case 'callback':
        return renderCallbackSection();
      case 'memo':
        return (
          <section id="memo" className="mb-10 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-amber-700">useMemo Hook</h2>
            {/* Memo section content */}
            <p className="text-gray-700">
              useMemo lets you cache expensive calculations between renders when
              dependencies haven't changed.
            </p>
            {/* Additional content for memo section */}
          </section>
        );
      case 'effect':
        return (
          <section id="effect" className="mb-10 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">useEffect Hook</h2>
            {/* Effect section content */}
            <p className="text-gray-700">
              useEffect lets you perform side effects in your components after render.
            </p>
            {/* Additional content for effect section */}
          </section>
        );
      case 'animations':
        return (
          <section id="animations" className="mb-10 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-rose-700">Animations</h2>
            {/* Animations section content */}
            <p className="text-gray-700">
              Using Framer Motion with React for smooth animations and transitions.
            </p>
            {/* Additional content for animations section */}
          </section>
        );
      default:
        return renderStateSection();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg mb-6">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-white">React Concepts Explorer</h1>
          <p className="text-white/90">
            An interactive guide to React hooks and patterns used in our visualization components
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="mb-8 flex flex-wrap gap-2 sticky top-4 z-10 bg-white p-3 rounded-lg shadow-md">
        <Button
          variant={activeSection === 'state' ? 'default' : 'outline'}
          onClick={() => setActiveSection('state')}
          className={activeSection === 'state' ? 'bg-blue-500' : ''}
        >
          useState
        </Button>
        <Button
          variant={activeSection === 'refs' ? 'default' : 'outline'}
          onClick={() => setActiveSection('refs')}
          className={activeSection === 'refs' ? 'bg-purple-500' : ''}
        >
          useRef
        </Button>
        <Button
          variant={activeSection === 'callback' ? 'default' : 'outline'}
          onClick={() => setActiveSection('callback')}
          className={activeSection === 'callback' ? 'bg-green-500' : ''}
        >
          useCallback
        </Button>
        <Button
          variant={activeSection === 'memo' ? 'default' : 'outline'}
          onClick={() => setActiveSection('memo')}
          className={activeSection === 'memo' ? 'bg-amber-500' : ''}
        >
          useMemo
        </Button>
        <Button
          variant={activeSection === 'effect' ? 'default' : 'outline'}
          onClick={() => setActiveSection('effect')}
          className={activeSection === 'effect' ? 'bg-indigo-500' : ''}
        >
          useEffect
        </Button>
        <Button
          variant={activeSection === 'animations' ? 'default' : 'outline'}
          onClick={() => setActiveSection('animations')}
          className={activeSection === 'animations' ? 'bg-rose-500' : ''}
        >
          Animations
        </Button>
      </div>

      {/* Render the selected section */}
      {renderContent()}

      {/* Footer info */}
      <div className="text-center text-gray-500 text-sm mt-8 mb-4">
        This component demonstrates React hooks and patterns used in our visualization components.
        <br />
        Open your browser console to see additional logs from the various effects.
      </div>
    </div>
  );
};

export default ReactConceptsExplainer;
