import { useState } from "react";
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup, error, isLoading} = useSignup()
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, email, password)
  };

  return (
    <div className="signup">
      <div className="form-container sign-up-container">
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
                  <button type="submit" disabled={isLoading}>Sign Up</button>
                  {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
{
  /* <form className="signup" onSubmit={handleSubmit}>
<h3>Sign Up</h3>
<label>Email address:</label>
<input 
  type="email" 
  onChange={(e) => setEmail(e.target.value)} 
  value={email} 
/>
<label>Password:</label>
<input 
  type="password" 
  onChange={(e) => setPassword(e.target.value)} 
  value={password} 
/>
<button>Sign up</button>
</form> */
}
