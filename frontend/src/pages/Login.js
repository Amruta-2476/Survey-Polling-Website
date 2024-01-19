import { useState } from "react";
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault();

   await login(email, password);
  };

  return (
    <div className="login">
      <div className="form-container sign-in-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
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
                  <a href="#">Forgot Your Password ?</a>
                  <br></br>
                  <br></br>
                  <button type="submit" disabled={isLoading}>Login</button>
                  {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;

{
  /* <form className="login" onSubmit={handleSubmit}>
<h3>Login</h3>

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

<button>Login</button>
</form> */
}
