import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);
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
          <button type="submit">LogIn</button>
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
