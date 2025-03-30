import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "../Button";

// Define interface for ItemForm props
interface ItemFormProps {
  onAddItem: () => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  label: string;
}

// ItemForm component with React.memo
const ItemForm = React.memo(({ onAddItem, inputValue, setInputValue, label }: ItemFormProps) => {
  const renderCountRef = useRef(0);

  // Increase render count on each render
  useEffect(() => {
    renderCountRef.current += 1;
  });

  return (
    <div className="border p-3 rounded-lg bg-white">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-sm">{label}</h4>
        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
          Renders: {renderCountRef.current}
        </span>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="border p-2 rounded flex-grow"
          placeholder="Add new item..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onAddItem()}
        />
        <Button
          onClick={onAddItem}
          className="bg-green-500 hover:bg-green-600"
        >
          Add
        </Button>
      </div>
    </div>
  );
});

ItemForm.displayName = 'ItemForm';

const UseCallbackDemo: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [items, setItems] = useState<string[]>(['Item 1', 'Item 2', 'Item 3']);
  const [inputValue, setInputValue] = useState<string>('');
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  // Force a re-render for demonstration purposes
  const forceRerender = () => {
    setCount(c => c + 1);
  };

  const addItem = useCallback(() => {
    if (inputValue.trim()) {
      setItems(prevItems => [...prevItems, inputValue.trim()]);
      setInputValue('');

      // Focus back on input after adding
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [inputValue]);

  const removeItem = useCallback((index: number) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  }, []);

  // Non-memoized version of addItem (recreated on every render)
  const addItemNonMemoized = () => {
    if (inputValue.trim()) {
      setItems(prevItems => [...prevItems, inputValue.trim()]);
      setInputValue('');

      // Focus back on input after adding
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <section id="callback" className="mb-10 p-6 bg-white rounded-lg shadow-sm">
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
            ref={inputRef}
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

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-blue-800">useCallback Performance Demo</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">useCallback:</span>
            <Button
              onClick={() => setUseCallbackEnabled(!useCallbackEnabled)}
              variant={useCallbackEnabled ? "default" : "outline"}
              className={useCallbackEnabled ? "bg-green-500" : ""}
            >
              {useCallbackEnabled ? "Enabled" : "Disabled"}
            </Button>
          </div>
        </div>

        <div className="grid gap-4 mb-4">
          <ItemForm
            onAddItem={useCallbackEnabled ? addItem : addItemNonMemoized}
            inputValue={inputValue}
            setInputValue={setInputValue}
            label={useCallbackEnabled ? "With useCallback (stable reference)" : "Without useCallback (new reference each render)"}
          />

          <div className="text-center">
            <Button onClick={forceRerender} className="bg-gray-500 hover:bg-gray-600">
              Force Parent Re-render (watch render count)
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Click to trigger parent re-render. The component using the non-memoized callback will re-render even though its props didn't actually change.
            </p>
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-blue-100">
          <h4 className="font-medium text-blue-800 mb-2">What's happening?</h4>
          <p className="text-sm text-gray-700">
            React.memo makes a component only re-render if its props have changed. Without useCallback, a new function is created on every render,
            causing React.memo to detect a prop change even though the function does the same thing.
            With useCallback, the function reference stays the same between renders, so React.memo works as expected.
          </p>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
        <h3 className="font-semibold text-green-800">Key Takeaways:</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
          <li>useCallback is essential for performance optimization</li>
          <li>It prevents recreation of function references on each render</li>
          <li>Particularly useful when passing callbacks to optimized child components</li>
          <li>Include all values from the component scope in the dependency array</li>
          <li>React.memo + useCallback prevents unnecessary child re-renders</li>
        </ul>
      </div>
    </section>
  );
};

export default UseCallbackDemo;
