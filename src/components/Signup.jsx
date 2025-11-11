import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubNavbar from './SubNavbar';
import { toast } from "react-toastify";
function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isEmail = (val) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val.trim());
  const isPhone = (val) =>
    /^(\+?\d{10,13})$/.test(val.trim().replace(/\s/g, ''));

  function validateForm() {
    let err = {};
    if (!form.name.trim()) err.name = "Please enter your name.";
    if (!form.phone.trim()) {
      err.phone = 'Please enter your phone number.';
    } else if (!isPhone(form.phone)) {
      err.phone = 'Enter a valid phone number (10-13 digits, with or without country code).';
    }
    if (form.email.trim() && !isEmail(form.email)) {
      err.email = 'Enter a valid email address or leave blank.';
    }
    if (!form.password.trim()) {
      err.password = 'Please enter a password.';
    } else if (form.password.length < 6) {
      err.password = 'Password must be at least 6 characters.';
    }
    if (!form.confirm.trim()) {
      err.confirm = 'Please confirm your password.';
    } else if (form.password !== form.confirm) {
      err.confirm = 'Passwords do not match.';
    }
    return err;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setSubmitted(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);

    const errs = validateForm();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await response.json();

        if (response.ok) {
          setForm({
            name: "",
            email: "",
            phone: "",
            password: "",
          });
          toast.success("Signup successful! 🎉");
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
        } else {
          toast.error(data.message || "Signup failed. Please try again ❌");
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
        <div className="w-full max-w-[700px] mx-auto bg-white rounded-2xl shadow-xl border border-[#ede8de] flex flex-col md:flex-row overflow-hidden">
          {/* Info/side (hidden on mobile) */}
          <div className="hidden md:flex flex-col justify-between items-center bg-gradient-to-b from-[#d9b382]/90 to-[#b7c6a0]/80 w-2/5 px-6 py-10">
            <div className="w-full text-left">
              <div className="flex items-center mb-6 gap-3">
                <span className="text-[1.65rem] font-extrabold text-[#3e2f26] tracking-tight">Mushvalley</span>
                <span className="px-2 py-0.5 rounded-full bg-[#3e2f26] text-[#b7c6a0] text-xs font-semibold">Since 2025</span>
              </div>
              <h2 className="text-2xl font-bold text-[#3e2f26] mb-3">Join Our Farm Family!</h2>
              <p className="text-[#514636] text-sm">
                Register to order farm-fresh products and claim rewards for loyal customers.
              </p>
            </div>
            <img
              src="https://img.icons8.com/color/96/000000/sprout.png"
              alt="Signup Illustration"
              className="w-24 h-24 object-contain mt-8"
            />
          </div>
          {/* Signup Form */}
          <div className="flex-1 flex flex-col justify-center px-6 py-10">
            <form className="w-full max-w-xs mx-auto" onSubmit={handleSubmit} autoComplete="off">
              <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-[#3e2f26]">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full border-b border-[#b7c6a0] focus:border-[#d9b382] bg-transparent py-2 outline-none transition ${errors.name && submitted ? "border-red-400" : ""}`}
                  placeholder="Your Full Name"
                  autoFocus
                />
                {errors.name && submitted && (
                  <span className="text-xs text-red-500 mt-1">{errors.name}</span>
                )}
              </div>
              <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-[#3e2f26]">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full border-b border-[#b7c6a0] focus:border-[#d9b382] bg-transparent py-2 outline-none transition ${errors.phone && submitted ? "border-red-400" : ""}`}
                  placeholder="+911234567890"
                />
                {errors.phone && submitted && (
                  <span className="text-xs text-red-500 mt-1">{errors.phone}</span>
                )}
              </div>
              <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-[#3e2f26]">Email (optional)</label>
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full border-b border-[#b7c6a0] focus:border-[#d9b382] bg-transparent py-2 outline-none transition ${errors.email && submitted ? "border-red-400" : ""}`}
                  placeholder="you@example.com"
                />
                {errors.email && submitted && (
                  <span className="text-xs text-red-500 mt-1">{errors.email}</span>
                )}
              </div>
              <div className="flex flex-col gap-1 mb-5">
                <label className="text-sm font-medium text-[#3e2f26]">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full border-b border-[#b7c6a0] focus:border-[#d9b382] bg-transparent py-2 outline-none transition ${errors.password && submitted ? "border-red-400" : ""}`}
                  placeholder="Password"
                />
                {errors.password && submitted && (
                  <span className="text-xs text-red-500 mt-1">{errors.password}</span>
                )}
              </div>
              <div className="flex flex-col gap-1 mb-6">
                <label className="text-sm font-medium text-[#3e2f26]">Confirm Password</label>
                <input
                  type="password"
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  className={`w-full border-b border-[#b7c6a0] focus:border-[#d9b382] bg-transparent py-2 outline-none transition ${errors.confirm && submitted ? "border-red-400" : ""}`}
                  placeholder="Retype Password"
                />
                {errors.confirm && submitted && (
                  <span className="text-xs text-red-500 mt-1">{errors.confirm}</span>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-md bg-gradient-to-r from-[#d9b382] to-[#b7c6a0] text-[#3e2f26] font-extrabold text-base shadow hover:from-[#b7c6a0] hover:to-[#d9b382] transition focus:ring-2 focus:ring-[#b7c6a0] focus:ring-offset-2"
              >
                Sign Up
              </button>
              <p className="text-xs text-gray-500 mt-4 mb-3">
                By registering, you agree to Mushvalley's
                <span className="text-[#2176ff] hover:underline cursor-pointer ml-1">Terms of Use</span>
                &nbsp;and&nbsp;
                <span className="text-[#2176ff] hover:underline cursor-pointer ml-1">Privacy Policy</span>.
              </p>
              <div className="text-center text-[#2176ff] text-sm mt-2 cursor-pointer hover:underline" onClick={() => navigate('/login')}>
                Already have an account? Login
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
