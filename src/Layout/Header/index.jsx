function Header({ setIsDarkMode }) {
    function themeSwitch() {
        const root = document.querySelector(":root");
        root.classList.toggle('dark-mode');
        setIsDarkMode(prevTheme => !prevTheme)
    }
    return (
        <>
            <header
                className="header"
                style={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    zIndex: 3,
                    backgroundColor: "var(--bg-primary-color)",
                    color: "var(--text-color)",
                    borderBottom: "1px solid var(--border-color)",
                    height: 70,
                    boxShadow: "var(--box-shadow-color)",
                }}
            >
                <div className="grid">
                    <div className="row">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                height: 70,
                            }}
                        >
                            <label
                                htmlFor="open-btn"
                                className="open-nav-btn"
                                style={{
                                    fontSize: "3rem",
                                    marginLeft: 12,
                                    display: "none",
                                }}
                            >
                                <i className="fa-solid fa-bars"></i>
                            </label>
                            <i
                                className="fa-solid fa-clipboard-list"
                                style={{
                                    fontSize: 30,
                                    marginRight: 12,
                                    marginLeft: 24,
                                    color: 'var(--primary-color)'
                                }}
                            ></i>
                            <h1>Quản lý chi tiêu</h1>
                            <div className="switch-mode-btn light-mode"
                                onClick={(e) => {
                                    themeSwitch()
                                    e.currentTarget.classList.toggle('light-mode')
                                }}
                            >
                                <i className="fa-solid fa-moon"></i>
                                <i className="fa-regular fa-sun"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <input type="checkbox" id="open-btn" style={{ display: "none" }} />
        </>
    );
}

export default Header;
