import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
      }

    return (
        <header>
            <div className="container">
            <Link to="/">
          {/* <img src="../.././imgs/poll-logo-removebg-preview.png" alt="Logo" className="logo" /> */}
          <h1>Survey Poll Buddy</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button className="logout-button" onClick={handleClick}>
                                    <span className="material-symbols-outlined">Logout</span>
                                    Log Out
                            </button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">
                               <button className="loginSignUp">Login</button>
                            </Link>
                            <Link to="/signup">
                            <button className="loginSignUp">Sign Up</button>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}
export default Navbar