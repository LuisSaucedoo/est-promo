import { Link } from 'react-router-dom';
import '../styles/navBar.css'

export const Navbar = () => {
    return (
        <nav className="navbar">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Supervisor
            </Link>

            <Link
                className='navbar-brand'
                to='data'
            >
            Historial
            </Link>
        </nav>
    )
}