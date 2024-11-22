import React, { useState, createContext } from "react";
import Gallery from "./Gallery";

// Create a context if global states are needed
export const AppContext = createContext();

const App = () => {
  // Define global states or context values if necessary
  const [globalState, setGlobalState] = useState("default value");

  return (
    <AppContext.Provider value={{ globalState, setGlobalState }}>
      <Router>
        <div className="App">
          {/* Define routes if navigation is needed */}
          <Routes>
            <Route path="/" element={<Gallery />} />
            {/* Add other routes here if necessary */}
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;