import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input type="email" placeholder=" Enter email" className="mb-2 p-2 border" />
      <input type="password" placeholder=" Enter password" className="mb-4 p-2 border" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      <p className="mt-4">
        Don't have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
