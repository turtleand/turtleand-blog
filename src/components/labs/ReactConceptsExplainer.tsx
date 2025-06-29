import React from 'react';

// This is now just a re-export component for backward compatibility
// Import from individual hook demos directly for new code
const ReactConceptsExplainer = () => {
  return (
    <div className="text-center p-8">
      <h1 className="text-xl mb-4">React Hooks Explorer</h1>
      <p>This component has been split into individual hook demos.</p>
      <p className="text-sm text-gray-500 mt-4">
        Please update your import to use the individual hook components:
        <ul className="list-disc list-inside mt-2">
          <li>UseStateDemo</li>
          <li>UseRefDemo</li>
          <li>UseCallbackDemo</li>
          <li>UseMemoDemo</li>
          <li>UseEffectDemo</li>
        </ul>
      </p>
    </div>
  );
};

export default ReactConceptsExplainer;
