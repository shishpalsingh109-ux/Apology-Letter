import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    
    // Strict password validation
    if (password !== '244566') {
      setError('Incorrect password');
      return;
    }
    
    // Authenticate using the password as the key (mocking the email requirement)
    await login('dushman@heart.com');
    
    const from = (location.state as any)?.from?.pathname || '/';
    navigate(from, { replace: true });
  };

  // Prevent flash of login content while checking session
  if (loading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff]">
        <Loader2 className="w-8 h-8 text-slate-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f9ff] p-4 transition-colors duration-500">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
          <label className="text-slate-600 text-lg font-medium tracking-wide font-serif opacity-80">
            Please enter my phone Password
          </label>
          
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full max-w-xs group">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(''); // Clear error when user types
                }}
                className={`block w-full px-6 py-4 text-center text-lg bg-white rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  error ? 'border-2 border-red-100 focus:ring-red-100 ring-2 ring-red-50' : 'border-0 focus:ring-slate-200'
                }`}
                placeholder="••••••"
                autoFocus
              />
              
              <button
                type="submit"
                disabled={loading || !password}
                className={`absolute right-2 top-1.5 bottom-1.5 aspect-square rounded-full flex items-center justify-center transition-all duration-300 ${
                  password ? 'bg-slate-800 text-white shadow-md hover:bg-slate-700' : 'bg-transparent text-transparent pointer-events-none'
                }`}
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <ArrowRight size={16} />
                )}
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-3 animate-fade-in font-medium opacity-80">
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;