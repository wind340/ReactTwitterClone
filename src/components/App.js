import React, { useState } from "react";
import Footer from "./Footer";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <div>
      <AppRouter isLoggedIn={isLoggedIn} />
      <Footer />
    </div>
  );
}

export default App;
