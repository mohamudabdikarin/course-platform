import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Button from '../common/Button';
import Input from '../common/Input';
import Spinner from '../common/Spinner';
import { FiLogIn } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('instructor@email.com'); // Pre-fill for demo
  const [password, setPassword] = useState('password123'); // Pre-fill for demo
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth(); // Get user and login function from context
  const navigate = useNavigate();
  const location = useLocation();

  // Declare 'from' BEFORE the useEffect hook
  const from = location.state?.from?.pathname || '/';
  
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // We no longer need a separate mock API function here.
      // We will call the login function from our AuthContext.
      if (email === 'instructor@email.com' && password === 'password123') {
        const fakeToken = 'jwt-token-from-server-12345';
        const userData = { name: 'John Instructor', email };
        
        login(userData, fakeToken); // Use the context's login function
        
        toast.success('Login successful!');
        navigate(from, { replace: true });
      } else {
        throw new Error('Invalid email or password.');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Don't render the form if we know the user is already logged in
  if (user) {
    return null; 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg p-4">
      <div className="w-full max-w-4xl bg-light-card dark:bg-dark-card rounded-xl shadow-card flex overflow-hidden flex-col md:flex-row">
        
        {/* Left Side: Branding (Hidden on mobile) */}
        <div className="hidden md:flex w-1/2 p-10 flex-col justify-center items-start bg-primary text-white">
           <h1 className="text-4xl font-bold mb-4">MyCourses.io</h1>
           <p className="text-lg text-indigo-200">
             Welcome to your Instructor Portal. Manage your courses, connect with students, and track your success.
           </p>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2 text-light-text dark:text-dark-text">
            Instructor Login
          </h2>
          <p className="text-light-subtext dark:text-dark-subtext mb-6">
            Enter your credentials to access your dashboard.
          </p>
          
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-light-subtext dark:text-dark-subtext">Email Address</label>
              <Input 
                id="email" type="email" placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)} required className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-light-subtext dark:text-dark-subtext">Password</label>
              <Input 
                id="password" type="password" placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)} required className="mt-1"
              />
            </div>
            
            <Button type="submit" variant="primary" className="mt-4 w-full py-3 flex items-center justify-center gap-2" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span>Logging In...</span>
                </>
              ) : (
                <>
                  <FiLogIn /> 
                  <span>Log In</span>
                </>
              )}
            </Button>
          </form>
          
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login; 