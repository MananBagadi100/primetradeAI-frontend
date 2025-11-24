import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "../styles/RegisterStyles.css";

const Register = () => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register: formRegister,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        setServerError("");
        setSuccessMessage("");
        try {
            await axiosInstance.post("/auth/register", data);
            setSuccessMessage("Account created successfully. You can now login.");
            setTimeout(() => navigate("/login"), 1200);
        } catch (error) {
            const message =
                error?.response?.data?.error || "Something went wrong. Please try again.";
            setServerError(message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Create your account</h1>
                <p className="auth-subtitle">Join PrimeTrade and start managing your trades</p>

                {serverError && <div className="auth-error">{serverError}</div>}
                {successMessage && (
                    <div className="auth-success">{successMessage}</div>
                )}

                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Manan Bagadi"
                            {...formRegister("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters"
                                }
                            })}
                        />
                        {errors.name && (
                            <p className="input-error">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...formRegister("email", {
                                required: "Email is required"
                            })}
                        />
                        {errors.email && (
                            <p className="input-error">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            {...formRegister("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                        />
                        {errors.password && (
                            <p className="input-error">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Creating account..." : "Register"}
                    </button>
                </form>

                <p className="auth-footer-text">
                    Already have an account?{" "}
                    <Link to="/login" className="auth-link">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;