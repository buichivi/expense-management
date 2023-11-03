import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./NavBar.scss";
function NavBar() {
    const location = useLocation();
    const [url, setUrl] = useState("/");
    
    useEffect(() => {
        setUrl(location.pathname)
    }, [location]);

    const handleLinkOnClick = (e) => {
        document.querySelector(".active").classList.remove("active");
        const navLink = e.target.closest(`.nav_item`);
        if (navLink) navLink.classList.add("active");
    };

    return (
        <>
            <nav className="nav_">
                <ul className="nav_list">
                    <li
                        className={`nav_item ${url === "/" ? "active" : ""}`}
                        onClick={handleLinkOnClick}
                    >
                        <Link className="nav_link" to="/">
                            <i className="fa-solid fa-chart-line"></i>
                            Thống kê
                        </Link>
                    </li>
                    <li
                        className={`nav_item ${
                            url === "/expense-types" ? "active" : ""
                        }`}
                        onClick={handleLinkOnClick}
                    >
                        <Link className="nav_link" to="/expense-types">
                            <i className="fa-solid fa-filter-circle-dollar"></i>
                            Loại khoản chi
                        </Link>
                    </li>
                    <li
                        className={`nav_item ${
                            url === "/expense" ? "active" : ""
                        }`}
                        onClick={handleLinkOnClick}
                    >
                        <Link className="nav_link" to="/expense">
                            <i className="fa-solid fa-circle-dollar-to-slot"></i>
                            Khoản chi
                        </Link>
                    </li>
                </ul>
            </nav>
            <label htmlFor="open-btn" className="fade_"></label>
        </>
    );
}

export default NavBar;
