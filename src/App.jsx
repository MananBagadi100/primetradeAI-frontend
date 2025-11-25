import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import './styles/App.css'

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <div className="all-pages-main-container">
            <BrowserRouter>
                <Navbar />
                <div className="all-pages-content-area">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;