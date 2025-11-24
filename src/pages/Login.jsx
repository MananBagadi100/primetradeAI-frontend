import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import "../styles/LoginStyles.css";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        setServerError("");
        try {
            const response = await axiosInstance.post("/auth/login", data);
            login(response.data.user, response.data.token);
            navigate("/dashboard");
        } catch (error) {
            const message =
                error?.response?.data?.error || "Something went wrong. Please try again.";
            setServerError(message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Welcome back</h1>
                <p className="auth-subtitle">Sign in to your PrimeTrade dashboard</p>

                {serverError && <div className="auth-error">{serverError}</div>}

                <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            {...register("email", {
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
                            placeholder="••••••••"
                            {...register("password", {
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
                        {isSubmitting ? "Signing in..." : "Login"}
                    </button>
                </form>

                <p className="auth-footer-text">
                    Don't have an account?{" "}
                    <Link to="/register" className="auth-link">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;