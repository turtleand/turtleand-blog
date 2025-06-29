import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "../Button";

const UseEffectDemo: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [effectCounter, setEffectCounter] = useState<number>(0);
  const [effectDependency, setEffectDependency] = useState<string>('initial');
  const [effectToggle, setEffectToggle] = useState<boolean>(false);
  const [effectLogs, setEffectLogs] = useState<string[]>([]);

  // Ref to track if the component is mounted
  const isMounted = useRef<boolean>(true);

  // Force a re-render for demonstration purposes
  const forceRerender = () => {
    setCount(c => c + 1);
  };

  // Function to add logs for effect demonstration
  const addEffectLog = useCallback((message: string) => {
    setEffectLogs(prevLogs => {
      // Keep only the last 6 logs to prevent the list from growing too large
      const newLogs = [...prevLogs, `${new Date().toLocaleTimeString()} - ${message}`];
      return newLogs.slice(Math.max(0, newLogs.length - 6));
    });
  }, []);

  // Clear logs
  const clearEffectLogs = useCallback(() => {
    setEffectLogs([]);
  }, []);

  // Example 1: Effect that runs on every render
  useEffect(() => {
    addEffectLog("🔄 Effect with no dependencies ran (runs on every render)");
  }, [addEffectLog]); // Add dependencies to prevent infinite loop

  // Example 2: Effect that runs only once (on mount)
  useEffect(() => {
    addEffectLog("🏁 Effect with empty dependencies ran (runs once on mount)");

    // Cleanup function runs when component unmounts
    return () => {
      if (isMounted.current) {
        addEffectLog("🧹 Cleanup from empty dependencies effect (runs on unmount)");
      }
    };
  }, [addEffectLog]);

  // Example 3: Effect that runs when specific dependencies change
  useEffect(() => {
    addEffectLog(`📦 Effect with dependency ran (dependency: ${effectDependency})`);

    return () => {
      if (isMounted.current) {
        addEffectLog(`🧹 Cleanup before next effect (previous dependency: ${effectDependency})`);
      }
    };
  }, [effectDependency, addEffectLog]);

  // Example 4: Effect demonstrating lifecycle with toggle
  useEffect(() => {
    if (effectToggle) {
      addEffectLog("🔌 Effect: Subscription started");

      // Simulate a subscription or timer
      const timerId = setInterval(() => {
        setEffectCounter(prev => prev + 1);
      }, 2000);

      // Cleanup function: clear the interval when effectToggle changes or component unmounts
      return () => {
        clearInterval(timerId);
        addEffectLog("🔌 Effect: Subscription stopped");
      };
    }
  }, [effectToggle, addEffectLog]);

  // Component will unmount effect 
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <section id="effect" className="mb-10 p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">useEffect Hook</h2>
      <p className="mb-4 text-gray-700">
        The useEffect hook lets you perform side effects in your components after render.
        Side effects include data fetching, subscriptions, manual DOM manipulations, and more.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
        <pre className="text-sm text-gray-800 overflow-x-auto">
          {`// Basic useEffect syntax
useEffect(() => {
  // This code runs after render
  console.log('Component rendered');
  
  // Optional cleanup function
  return () => {
    // This code runs before the next effect or when unmounting
    console.log('Cleaning up');
  };
}, [dependency1, dependency2]); // Dependency array controls when effect runs`}
        </pre>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border p-4 rounded-lg flex-1 bg-white shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-gray-800">Effect Dependencies Demo</h3>
          <p className="text-sm text-gray-700 mb-3">
            Change the value to trigger effects with dependencies. Watch the logs to see which effects run.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={effectDependency}
                onChange={(e) => setEffectDependency(e.target.value)}
                className="border p-2 rounded flex-grow"
                placeholder="Change this value..."
              />
              <Button
                onClick={() => setEffectDependency(Math.random().toString(36).substring(7))}
                className="bg-indigo-500 hover:bg-indigo-600"
              >
                Random
              </Button>
            </div>
            <Button
              onClick={forceRerender}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Force Re-render
            </Button>
          </div>
        </div>

        <div className="border p-4 rounded-lg flex-1 bg-white shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-gray-800">Subscription Example</h3>
          <p className="text-sm text-gray-700 mb-3">
            Toggle to start/stop a subscription that updates a counter every 2 seconds.
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Counter: {effectCounter}</span>
              <Button
                variant={effectToggle ? "default" : "outline"}
                onClick={() => setEffectToggle(prev => !prev)}
                className={effectToggle ? "bg-indigo-500" : ""}
              >
                {effectToggle ? "Unsubscribe" : "Subscribe"}
              </Button>
            </div>
            <p className="text-xs text-gray-600">
              {effectToggle
                ? "Subscription active - the counter will update every 2 seconds"
                : "Subscription inactive - click Subscribe to start"}
            </p>
          </div>
        </div>
      </div>

      <div className="border p-4 rounded-lg mb-6 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-gray-800">Effect Logs</h3>
          <Button
            variant="outline"
            onClick={clearEffectLogs}
            className="text-xs"
          >
            Clear Logs
          </Button>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg max-h-[200px] overflow-y-auto">
          {effectLogs.length > 0 ? (
            <ul className="text-sm text-gray-700 space-y-1">
              {effectLogs.map((log, index) => (
                <li key={index} className="font-mono">
                  {log}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-2">No effect logs yet. Interact with the examples above.</p>
          )}
        </div>
      </div>

      <div className="border p-4 rounded-lg mb-6 bg-white shadow-sm">
        <h3 className="text-lg font-medium mb-3 text-indigo-800">Common useEffect Patterns</h3>

        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium mb-2">Run on every render (no dependency array)</h4>
            <pre className="text-sm text-gray-800 overflow-x-auto">
              {`useEffect(() => {
  console.log('This runs after every render');
}); // No dependency array`}
            </pre>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium mb-2">Run once on mount (empty dependency array)</h4>
            <pre className="text-sm text-gray-800 overflow-x-auto">
              {`useEffect(() => {
  console.log('This runs once after the initial render');
  
  return () => {
    console.log('This runs once before the component unmounts');
  };
}, []); // Empty dependency array`}
            </pre>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium mb-2">Run when specific values change</h4>
            <pre className="text-sm text-gray-800 overflow-x-auto">
              {`useEffect(() => {
  console.log('This runs when userId or query changes');
  
  fetchData(userId, query);
  
  return () => {
    console.log('This runs before the next effect or unmount');
    cancelFetchData();
  };
}, [userId, query]); // Specific dependencies`}
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
        <h3 className="font-semibold text-indigo-800">Key Takeaways:</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
          <li>useEffect runs after render and is perfect for side effects</li>
          <li>The dependency array controls when your effect runs:
            <ul className="list-circle pl-5 mt-1 mb-1">
              <li>No array: runs on every render</li>
              <li>Empty array []: runs once on mount</li>
              <li>With dependencies [a, b]: runs when dependencies change</li>
            </ul>
          </li>
          <li>Return a cleanup function to prevent memory leaks and handle unsubscriptions</li>
          <li>Common use cases: data fetching, DOM manipulation, subscriptions, and timers</li>
          <li>Always include all values from the component scope that your effect uses in the dependency array</li>
        </ul>
      </div>
    </section>
  );
};

export default UseEffectDemo;
