import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 ">Sign Up</h2>
      <input type="text" placeholder="Enter user Name" className="mb-2 p-2 border" />
      <input type="email" placeholder="Enter Email" className="mb-2 p-2 border" />
      <input type="password" placeholder=" Enter Password" className="mb-4 p-2 border" />
      <button className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
      <p className="mt-4">
        Already have an account? <Link to="/Login" className="text-blue-600">Login</Link>
      </p>
    </div>
  );
}

export default SignUp;
