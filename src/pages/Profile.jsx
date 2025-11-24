import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import "../styles/ProfileStyles.css";

const Profile = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: ""
    });

    const [newName, setNewName] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch profile on mount
    const getProfile = async () => {
        try {
            const res = await axiosInstance.get("/user/profile");
            setProfile(res.data);
            setNewName(res.data.name);
        } catch (err) {
            console.log("Error fetching profile:", err);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!newName.trim()) return;

        setLoading(true);
        setMessage("");

        try {
            const res = await axiosInstance.put("/user/profile", {
                name: newName
            });

            setMessage("Profile updated successfully!");
            setProfile((prev) => ({ ...prev, name: newName }));
        } catch (err) {
            setMessage("Failed to update profile");
        }

        setLoading(false);
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">Your Profile</h1>

            <div className="profile-card">
                <h2 className="card-title">Account Details</h2>

                <p className="profile-label">Email:</p>
                <p className="profile-value">{profile.email}</p>

                <form className="profile-form" onSubmit={handleUpdate}>
                    <label className="profile-label">Full Name</label>
                    <input
                        type="text"
                        className="input-field"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />

                    <button className="save-btn" disabled={loading}>
                        {loading ? "Updating..." : "Save Changes"}
                    </button>
                </form>

                {message && <p className="update-message">{message}</p>}
            </div>
        </div>
    );
};

export default Profile;