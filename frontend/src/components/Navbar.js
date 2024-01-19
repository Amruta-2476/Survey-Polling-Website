import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
    const { logout } = useLogout()

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
                    <div>
                        <button onClick={handleClick}>
                            Log Out
                        </button>
                    </div>
                    <div>
                        <Link to="/login">
                            Login 
                        </Link>
                        <Link to="/signup">
                            Signup
                        </Link>

                    </div>
                </nav>
            </div>
        </header>
    )
}
export default Navbar