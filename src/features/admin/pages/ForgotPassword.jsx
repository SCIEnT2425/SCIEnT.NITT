import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { User, KeyRound, Lock, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Username, 2: OTP, 3: New Password
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');

  const { API_BASE } = useAuth();
  const navigate = useNavigate();

  // Step 1: Send OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error('Please enter your username');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/api/admin/forgot-password`, { username });
      toast.success(response.data.message || 'OTP sent to your registered email!');
      setRecipientEmail(response.data.email || '');
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error('Please enter the 6-digit OTP code');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/api/admin/verify-otp`, { username, otp });
      toast.success(response.data.message || 'OTP verified successfully!');
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in both password fields');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/api/admin/reset-password`, {
        username,
        otp,
        newPassword,
      });
      toast.success(response.data.message || 'Password reset successfully!');
      setTimeout(() => {
        navigate('/admin/login');
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/admin/login"
              className="p-2 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
              title="Back to login"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="text-xs font-semibold px-3 py-1 bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 rounded-full">
              Step {step} of 3
            </span>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
              Reset <span className="text-yellow-400">Password</span>
            </h1>
            <p className="text-zinc-400 text-sm">
              {step === 1 && 'Enter your username to receive a 6-digit OTP'}
              {step === 2 && `Enter the OTP sent to ${recipientEmail || 'your email'}`}
              {step === 3 && 'Enter your new account password'}
            </p>
          </div>

          {/* STEP 1: Enter Username */}
          {step === 1 && (
            <form onSubmit={handleRequestOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-zinc-500" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-colors"
                    placeholder="Enter admin username"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <KeyRound className="w-5 h-5" />
                    <span>Send Verification OTP</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: Enter OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">6-Digit Verification OTP</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-zinc-500" />
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="block w-full pl-10 pr-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white text-center tracking-[8px] text-lg placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-colors font-mono"
                    placeholder="123456"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Verify OTP</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={loading}
                  className="text-xs text-yellow-400 hover:underline bg-transparent border-0 cursor-pointer"
                >
                  Didn't get the code? Resend OTP
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Reset Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-zinc-500" />
                  </div>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-colors"
                    placeholder="At least 6 characters"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">Confirm New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-zinc-500" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-colors"
                    placeholder="Re-enter new password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Reset Password</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
