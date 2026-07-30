import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [theme] = useState(() => localStorage.getItem("theme") || "dark");

    if (!isLoggedIn) {
        return <Login onLogin={() => setIsLoggedIn(true)} theme={theme} />;
    }

    return <Dashboard />;
}

export default App;