import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <header>
            <div className="container">
            <Link to="/">
          {/* <img src="../.././imgs/poll-logo-removebg-preview.png" alt="Logo" className="logo" /> */}
          <h1>Survey Poll Buddy</h1>
        </Link>
            </div>
        </header>
    )
}
export default Navbar