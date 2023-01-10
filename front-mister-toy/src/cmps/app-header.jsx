import { Link, NavLink } from "react-router-dom";
import logo from '../assets/img/toy-logo.png';

export function AppHeader() {
    return <header className="app-header">
        <div className="header-content layout">
            <Link to="/">
                <img src={logo} />
            </Link>
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">toys</NavLink> |
                <NavLink to="/about">About</NavLink> |
            </nav>
        </div>
    </header>
}
