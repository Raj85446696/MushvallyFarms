import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubNavbar from "./SubNavbar";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isEmail = (val) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val.trim());
  const isPhone = (val) =>
    /^(\+?\d{10,13})$/.test(val.trim().replace(/\s/g, ""));

  function validateForm() {
    let err = {};
    if (!identity.trim()) {
      err.identity = "Please enter your email or phone number.";
    } else if (!isEmail(identity) && !isPhone(identity)) {
      err.identity = "Enter a valid email or phone number.";
    }
    if (!password.trim()) {
      err.password = "Please enter your password.";
    } else if (password.length < 6) {
      err.password = "Password must be at least 6 characters.";
    }
    return err;
  }

  // ✅ Handle Login
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    const errs = validateForm();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      try {
        // Prepare payload based on input type
        const payload = isEmail(identity)
          ? { email: identity, password }
          : { phone: identity, password };
          // http://localhost:8000/user/login
        const response = await fetch("https://mushvallyfarmsbackend.onrender.com/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // include cookies (for JWT)
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
          // ✅ Save user and token in localStorage
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);

          toast.success("Login successful! 🎉");
          navigate("/");
        } else {
          toast.error(data.message || "Invalid credentials ❌");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again later ⚠️");
      }
    }
  }

  return (
    <>
      <SubNavbar />
      <div className="min-h-screen flex items-center justify-center bg-[#f3ede2] px-2">
        <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl border border-[#ede8de] flex flex-col md:flex-row overflow-hidden">
          {/* Left Section */}
          <div className="hidden md:flex flex-col justify-between items-center bg-gradient-to-b from-[#d9b382]/90 to-[#b7c6a0]/80 w-2/5 px-6 py-10">
            <div className="w-full text-left">
              <div className="flex items-center mb-6 gap-3">
                <span className="text-[1.65rem] font-extrabold text-[#3e2f26] tracking-tight">
                  Mushvalley
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#3e2f26] text-[#b7c6a0] text-xs font-semibold">
                  Since 2025
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#3e2f26] mb-3">
                Welcome Back!
              </h2>
              <p className="text-[#514636] text-sm">
                Sign in to track your{" "}
                <span className="font-semibold">orders</span>, manage your{" "}
                <span className="font-semibold">wishlist</span>, and enjoy
                exclusive <span className="font-semibold">farmer offers</span>.
              </p>
            </div>
            <img
              src="https://img.icons8.com/color/96/000000/oak-tree.png"
              alt="Organic Farm Illustration"
              className="w-24 h-24 object-contain mt-8"
            />
          </div>

          {/* Form Section */}
          <div className="flex-1 flex flex-col justify-center px-6 py-10">
            <form
              className="w-full max-w-xs mx-auto"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              {/* Email or Phone */}
              <div className="flex flex-col gap-1 mb-7">
                <label className="text-sm font-medium text-[#3e2f26]">
                  Email or Phone Number
                </label>
                <input
                  type="text"
                  className={`w-full border-b border-[#b7c6a0] focus:border-[#d9b382] bg-transparent py-2 outline-none transition ${
                    errors.identity && submitted ? "border-red-400" : ""
                  }`}
                  placeholder="email or phone "
                  value={identity}
                  onChange={(e) => {
                    setIdentity(e.target.value);
                    setSubmitted(false);
                    setErrors({ ...errors, identity: undefined });
                  }}
                />
                {errors.identity && submitted && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.identity}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1 mb-7">
                <label className="text-sm font-medium text-[#3e2f26]">
                  Password
                </label>
                <input
                  type="password"
                  className={`w-full border-b border-[#b7c6a0] focus:border-[#d9b382] bg-transparent py-2 outline-none transition ${
                    errors.password && submitted ? "border-red-400" : ""
                  }`}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setSubmitted(false);
                    setErrors({ ...errors, password: undefined });
                  }}
                />
                {errors.password && submitted && (
                  <span className="text-xs text-red-500 mt-1">
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-md bg-gradient-to-r from-[#d9b382] to-[#b7c6a0] text-[#3e2f26] font-extrabold text-base shadow hover:from-[#b7c6a0] hover:to-[#d9b382] transition focus:ring-2 focus:ring-[#b7c6a0] focus:ring-offset-2"
              >
                Login
              </button>

              <p className="text-xs text-gray-500 mt-6 mb-2">
                By continuing, you agree to Mushvalley's
                <span className="text-[#2176ff] hover:underline cursor-pointer ml-1">
                  Terms of Use
                </span>
                &nbsp;and&nbsp;
                <span className="text-[#2176ff] hover:underline cursor-pointer ml-1">
                  Privacy Policy
                </span>
                .
              </p>

              <div
                className="text-center text-[#2176ff] text-sm mt-4 cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
              >
                New to Mushvalley? Create an account
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
