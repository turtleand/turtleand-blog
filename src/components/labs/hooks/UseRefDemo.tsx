import React, { useState, useRef, useEffect } from 'react';
import { Button } from "../Button";

const UseRefDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const [internalRefValue, setInternalRefValue] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const renderCount = useRef<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Safely track render count after initial mount
  useEffect(() => {
    // Set mounted flag to avoid observer issues
    setIsMounted(true);

    // Only increment after component is mounted
    if (isMounted) {
      renderCount.current += 1;
    }

    // Cleanup function for component unmounting
    return () => {
      // Cleanup any observers or refs if needed
      setIsMounted(false);
    };
  }, [isMounted, count, internalRefValue]);

  // Safe focus handler with null check
  const handleFocusClick = () => {
    if (inputRef.current instanceof HTMLInputElement) {
      inputRef.current.focus();
    }
  };

  // Safe ref update with state change
  const handleUpdateRef = () => {
    renderCount.current += 1;
    setInternalRefValue(renderCount.current);
  };

  return (
    <section id="refs" className="mb-10 p-6 bg-white rounded-lg shadow-sm" ref={sectionRef}>
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
              onClick={handleFocusClick}
              className="bg-purple-500 hover:bg-purple-600"
            >
              Focus Input (via useRef)
            </Button>
          </div>
        </div>

        <div className="border p-4 rounded-lg flex-1 bg-white shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-gray-800">Persist Value Across Renders</h3>
          <p className="text-gray-700 mb-3">
            <span className="font-medium">Official render count:</span> <span className="font-bold text-purple-600">{renderCount.current}</span>
            <span className="block text-sm text-gray-600 mt-1">
              This is tracked using useRef and automatically increases on every render
            </span>
          </p>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => setCount(c => c + 1)}
              className="bg-purple-500 hover:bg-purple-600"
            >
              Force Re-render (updates count state)
            </Button>

            <div className="mt-3 p-3 bg-gray-100 rounded">
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Manual ref updates:</span> <span className="font-bold text-blue-600">{internalRefValue}</span>
                <span className="block text-sm text-gray-600 mt-1">
                  This is displayed using state but tracks manual ref changes
                </span>
              </p>
              <Button
                onClick={handleUpdateRef}
                className="bg-gray-500 hover:bg-gray-600"
              >
                Update ref manually
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                What happens: (1) We update <code>renderCount.current</code> which doesn't trigger a re-render.
                (2) We update <code>internalRefValue</code> state which does trigger a re-render.
                (3) During this re-render, <code>renderCount.current</code> is displayed with its new value.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add code explanation section before Key Takeaways */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
        <h3 className="font-semibold text-gray-800 mb-3">Behind The Scenes: This Component's Code</h3>
        <p className="text-gray-700 mb-3">
          Here's the key code from this demo that shows how each interaction works:
        </p>
        <pre className="text-sm text-gray-800 overflow-x-auto bg-gray-100 p-3 rounded">
          {`// 1. State and ref declarations
const [inputValue, setInputValue] = useState<string>('');  
const [count, setCount] = useState<number>(0);  
const [internalRefValue, setInternalRefValue] = useState<number>(0);
const [isMounted, setIsMounted] = useState<boolean>(false);

// Create refs - with proper initialization
const inputRef = useRef<HTMLInputElement>(null);  // For DOM access
const renderCount = useRef<number>(0);  // For tracking renders
const sectionRef = useRef<HTMLElement>(null);  // Section reference

// Safe effect with proper cleanup
useEffect(() => {
  setIsMounted(true);
  
  if (isMounted) {
    renderCount.current += 1;
  }
  
  return () => {
    setIsMounted(false);
  };
}, [isMounted, count, internalRefValue]);

// Safe DOM operations with null checks
const handleFocusClick = () => {
  if (inputRef.current instanceof HTMLInputElement) {
    inputRef.current.focus();
  }
};`}
        </pre>

        <h4 className="font-medium text-gray-800 mt-4 mb-2">What Happens When You Click Each Button:</h4>
        <ol className="list-decimal pl-5 text-gray-700 space-y-2">
          <li>
            <strong>"Focus Input" button:</strong> Calls <code>inputRef.current?.focus()</code> which directly manipulates the DOM without re-rendering the component.
          </li>
          <li>
            <strong>"Force Re-render" button:</strong> Updates the <code>count</code> state, triggering a re-render. The useEffect hook runs, incrementing <code>renderCount.current</code>.
          </li>
          <li>
            <strong>"Update ref manually" button:</strong> First updates <code>renderCount.current</code> (no re-render), then updates <code>internalRefValue</code> state (causes re-render).
            After this re-render, useEffect runs again and increments <code>renderCount.current</code> one more time.
            This is why after clicking this button, the official render count increases by 2.
          </li>
        </ol>

        <div className="bg-blue-50 p-3 rounded mt-4 border-l-4 border-blue-300">
          <p className="text-sm text-blue-800">
            <strong>Key understanding:</strong> When you click "Update ref manually", the render count increases by 2 because:
            <br />1. You manually increment <code>renderCount.current</code>
            <br />2. The state update (<code>setInternalRefValue</code>) triggers a re-render
            <br />3. The useEffect runs after this re-render, incrementing <code>renderCount.current</code> again
          </p>
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400 mb-4">
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
};

export default UseRefDemo;
