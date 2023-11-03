import { useEffect, useState } from "react";
import Header from "./Layout/Header";
import NavBar from "./Layout/NavBar";
import Content from "./Layout/Content";

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <div className="app">
            <Header setIsDarkMode={setIsDarkMode} />
            <div
                style={{
                    paddingTop: 70,
                    height: "100%",
                    display: "flex",
                }}
            >
                <NavBar />
                <Content isDarkMode={isDarkMode}/>
            </div>
        </div>
    );
}

export default App;
