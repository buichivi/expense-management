import { useState, useEffect } from "react";
import storage from "./store/storage";
import Header from "./Layout/Header";
import NavBar from "./Layout/NavBar";
import Content from "./Layout/Content";

function App() {
    const [isDarkMode, setIsDarkMode] = useState(storage.getTheme());

    useEffect(() => {
        const root = document.querySelector(":root");
        if (isDarkMode) {
            root.classList.add('dark-mode');
        }
        else root.classList.remove('dark-mode');
        storage.setTheme(isDarkMode);
    }, [isDarkMode]);

    return (
        <div className="app">
            <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <div
                style={{
                    paddingTop: 70,
                    height: "100%",
                    display: "flex",
                }}
            >
                <NavBar />
                <Content isDarkMode={isDarkMode} />
            </div>
        </div>
    );
}

export default App;
