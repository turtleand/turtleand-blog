import React, { useState, useEffect, useMemo } from 'react';
import { Button } from "../Button";
import { cn } from "../utils";

const UseMemoDemo: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [items, setItems] = useState<string[]>(['Item 1', 'Item 2', 'Item 3']);
  const [inputValue, setInputValue] = useState<string>('');
  const [showPerformanceExample, setShowPerformanceExample] = useState<boolean>(false);
  const [heavyComputationToggle, setHeavyComputationToggle] = useState<boolean>(false);
  const [memoLastCalculatedAt, setMemoLastCalculatedAt] = useState<string>('Not yet calculated');
  const [nonMemoLastCalculatedAt, setNonMemoLastCalculatedAt] = useState<string>('Not yet calculated');
  const [nonMemoizedResult, setNonMemoizedResult] = useState<number>(0);

  // Force a re-render for demonstration purposes
  const forceRerender = () => {
    setCount(c => c + 1);
  };

  // Simulate an expensive calculation
  const expensiveCalculation = (num: number): number => {
    console.log('Performing expensive calculation...');
    // Update last calculation timestamp for non-memoized version
    setNonMemoLastCalculatedAt(new Date().toLocaleTimeString());

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

  // Update timestamps when calculations happen
  useEffect(() => {
    if (showPerformanceExample) {
      setMemoLastCalculatedAt(new Date().toLocaleTimeString());
    }
  }, [memoizedValue, showPerformanceExample]);

  // For non-memoized calculation, update result and timestamp on any render when example is shown
  useEffect(() => {
    if (showPerformanceExample) {
      // Calculate non-memoized value and update timestamp
      setNonMemoizedResult(expensiveCalculation(heavyComputationToggle ? 100 : 50));
      setNonMemoLastCalculatedAt(new Date().toLocaleTimeString());
    }
  }, [showPerformanceExample, heavyComputationToggle, count]); // Include count to update on force re-render

  // Derived State with useMemo
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [items, inputValue]);

  return (
    <section id="memo" className="mb-10 p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 text-amber-700">useMemo Hook</h2>
      <p className="mb-4 text-gray-700">
        The useMemo hook memoizes expensive calculations so they are only recomputed when dependencies change,
        improving performance by avoiding unnecessary recalculations.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
        <pre className="text-sm text-gray-800 overflow-x-auto">
          {`// Memoize expensive calculation
const memoizedValue = useMemo(() => {
  return expensiveCalculation(inputValue);
}, [inputValue]); // Only recalculate when inputValue changes

// Memoize derived state
const filteredItems = useMemo(() => {
  return items.filter(item => 
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [items, searchQuery]);`}
        </pre>
      </div>

      <div className="border p-4 rounded-lg mb-6 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-amber-800">Performance Example</h3>
          <Button
            onClick={() => setShowPerformanceExample(!showPerformanceExample)}
            variant={showPerformanceExample ? "default" : "outline"}
            className={cn(
              showPerformanceExample ? "bg-amber-500 hover:bg-amber-600" : ""
            )}
          >
            {showPerformanceExample ? "Disable Example" : "Enable Example"}
          </Button>
        </div>

        {showPerformanceExample && (
          <>
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-gray-700">Calculation input:</span>
              <Button
                onClick={() => setHeavyComputationToggle(!heavyComputationToggle)}
                className="bg-amber-500 hover:bg-amber-600"
              >
                Toggle Input: {heavyComputationToggle ? "100" : "50"}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Memoized Calculation */}
              <div className="border p-4 rounded-lg bg-green-50">
                <h4 className="font-medium mb-2 text-green-800 flex items-center justify-between">
                  <span>With useMemo</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Optimized</span>
                </h4>

                <div className="bg-white p-3 rounded border border-green-100 mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Input:</span>
                    <span className="font-medium">{heavyComputationToggle ? "100" : "50"}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Result:</span>
                    <span className="font-medium">{memoizedValue}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2 pt-2 border-t">
                    <span>Last calculated:</span>
                    <span>{memoLastCalculatedAt}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  Only recalculates when input changes or example is enabled/disabled.
                  <div className="mt-2 text-xs text-green-700">
                    Dependencies: [showPerformanceExample, heavyComputationToggle]
                  </div>
                </div>
              </div>

              {/* Non-Memoized Calculation */}
              <div className="border p-4 rounded-lg bg-red-50">
                <h4 className="font-medium mb-2 text-red-800 flex items-center justify-between">
                  <span>Without useMemo</span>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Recalculates Every Render</span>
                </h4>

                <div className="bg-white p-3 rounded border border-red-100 mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Input:</span>
                    <span className="font-medium">{heavyComputationToggle ? "100" : "50"}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Result:</span>
                    <span className="font-medium">{nonMemoizedResult}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2 pt-2 border-t">
                    <span>Last calculated:</span>
                    <span>{nonMemoLastCalculatedAt}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  Recalculates on every render, even when inputs haven't changed.
                  <div className="mt-2 text-xs text-red-700">
                    Try toggling another state or clicking "Force Re-render" to see the difference.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-2 mb-4">
              <Button
                onClick={forceRerender}
                className="bg-gray-500 hover:bg-gray-600"
              >
                Force Re-render (Watch timestamps)
              </Button>
            </div>

            <div className="text-sm text-gray-600 p-3 bg-amber-50 rounded-lg">
              <strong>Notice:</strong> When you click "Force Re-render", only the timestamp for the
              non-memoized calculation updates, showing it recalculates on every render. The memoized version
              only updates when its dependencies (the input value or example state) change.
            </div>
          </>
        )}
      </div>

      {/* Derived State Example */}
      <div className="border p-4 rounded-lg mb-6 bg-white shadow-sm">
        <h3 className="text-lg font-medium mb-3 text-amber-800">Derived State Example</h3>
        <p className="mb-3 text-gray-700">
          useMemo is also useful for derived state, like filtering lists based on a search query.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Items
          </label>
          <input
            type="text"
            className="w-full border rounded-md p-2"
            placeholder="Filter items..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <h4 className="font-medium mb-2 text-gray-800">Filtered Items</h4>
          <div className="text-xs text-gray-500 mb-2">
            Only recalculated when items list or input changes.
          </div>
          <ul className="divide-y divide-gray-200">
            {filteredItems.map((item, index) => (
              <li key={index} className="py-2">{item}</li>
            ))}
            {filteredItems.length === 0 && (
              <li className="py-2 text-gray-500 text-center">No matching items</li>
            )}
          </ul>
        </div>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
        <h3 className="font-semibold text-amber-800">Key Takeaways:</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
          <li>Use useMemo for expensive calculations that should be skipped when inputs haven't changed</li>
          <li>Memoization caches the result of a calculation between renders</li>
          <li>Perfect for derived state (filtering, sorting, transforming data)</li>
          <li>Don't overuse - simple calculations may be faster without memoization</li>
          <li>Remember that useMemo is for values, useCallback is for functions</li>
        </ul>
      </div>
    </section>
  );
};

export default UseMemoDemo;
