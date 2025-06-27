import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function LoginForm() {
  const [username, setUsername] = useState('Aliiza');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please Fill Out the Form Below!');
    } else {
      setError('');
      navigate('/success');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <div className="w-[800px] h-[500px] bg-[#2e003e] bg-opacity-80 rounded-xl flex overflow-hidden shadow-lg">
        {/* Left Side */}
        <div className="w-1/2 p-10 flex flex-col justify-center items-start bg-opacity-10 relative">
           <div className="text-4xl font-bold mb-4">Welcome Long In Page!</div>
           <p className="text-sm mb-6 text-gray-300">
                This form is designed to help you easily submit your information to us. 
                Kindly complete all required fields so we can assist you as quickly as possible.
           </p>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-[#3a003f] bg-opacity-90 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4 text-center">Log In</h2>
          {error && <div className="text-white text-sm text-center mb-4">{error}</div>}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm">User Name</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-md bg-[#4a004f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="text-sm">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-md bg-[#4a004f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <button type="submit" className="mt-4 py-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:opacity-90">Submit</button>
          </form>
          <div className="flex justify-center gap-4 mt-6 text-l">
            <a href="#" className="hover:text-pink-400"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-pink-400"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-pink-400"><i className="fab fa-pinterest"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
}


export default  LoginForm;
