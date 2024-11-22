// Task 1: Root Component

// Import necessary modules and components from React and other files
import React, { useState, createContext } from "react";
import Gallery from './gallery';

// Create a context to share state globally if needed
export const AppContext = createContext();

const App = () => {
  // Initialize a state variable and its setter for managing global state
  const [globalState, setGlobalState] = useState("default value");

  return (
    // Provide the global state and its setter to all components via context
    <AppContext.Provider value={{ globalState, setGlobalState }}>
      <div className="App">
        {/* Include the Gallery component, where main functionality resides */}
        <Gallery />
      </div>
    </AppContext.Provider>
  );
};

// Export the App component as the default export for use in the main entry file
export default App;