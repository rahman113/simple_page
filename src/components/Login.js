import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

// functional componnets => LoginPage for handling the end points!
var LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Simple validation of username and password!
        if (!username || !password) {
            setError("please provide username and password");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(
                "https://onlineorderapi.warehousingexpress.in/api/we1AppLogin/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                }
            );

            const data = await response.json();

            if (!response.ok || data.status === "FAILED") {
                setError(data.msg);
                throw new Error(data.message || "Login failed");
            }

            console.log("Login successfull:", data);
            navigate("dashboard");
            // Clear username and password  fields after form submission submission
            setUsername("");
            setPassword("");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex items-center content-center justify-center w-full h-screen bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="w-full py-10 sm:w-[24rem] rounded-[18px]"
                style={{
                    background: "rgba(0, 0, 0, 0.5)",
                    border: "0.75px solid #232323",
                    backdropFilter: "blur(26.25px)",
                }}
            >
                <div className="w-full flex text-white flex-col items-center content-center">
                    <div className="flex flex-col gap-3 text-center mx-16">
                        <p className="font-bold text-2xl">Login</p>
                        <p className="font-bold text-red-500">{error}</p>
                    </div>
                    <div className="flex flex-col gap-3 mt-9">
                        <div className="flex rounded-[15px] shadow-sm ring-1 ring-inset ring-[#C4C4C4] focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
                            <span className="flex select-none items-center pl-3 text-white text-xs">
                                Username |
                            </span>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="block flex-1 outline-none border-0 bg-transparent py-3 2xl:py-4 pl-1 text-white placeholder:text-gray-400 text-xs sm:leading-6"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="relative flex rounded-[15px] shadow-sm ring-1 ring-inset ring-[#C4C4C4] focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-full">
                            <span className="flex select-none items-center pl-3 text-white text-xs">
                                Password |
                            </span>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="block flex-1 outline-none border-0 bg-transparent py-3 2xl:py-4 pl-1 text-white placeholder:text-gray-400 text-xs sm:leading-6"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <p className="font-semibold text-xs text-[#5C7FFF]"></p>
                        <div className="w-full mt-8 flex items-center content-normal justify-center">
                            <button
                                className="w-full h-11 text-sm 2xl:text-lg font-medium bg-[#3660F9] rounded-[20px]"
                                style={{ boxShadow: "0px 10px 30px rgba(54, 96, 249, 0.2)" }}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Logging... " : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
