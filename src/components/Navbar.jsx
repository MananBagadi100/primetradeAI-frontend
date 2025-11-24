import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/NavbarStyles.css";

const Navbar = () => {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="nav-container">
            <div className="nav-content">
                <h2 className="nav-logo">PrimeTrade</h2>

                <div className="nav-links">
                    {!token && (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    )}

                    {token && (
                        <>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <Link to="/profile" className="nav-link">Profile</Link>
                            <button className="nav-logout" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;