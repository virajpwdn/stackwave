import React from "react";

import AppRoutes from "./Router/AppRoutes";

const App = () => {
  return (
    <div className="min-h-screen bg-white text-black transition-all dark:bg-[#0e0e0e] dark:text-white">
      <AppRoutes />
    </div>
  );
};

export default App;
