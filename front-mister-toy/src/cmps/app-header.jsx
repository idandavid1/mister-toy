import { Link } from "react-router-dom";
import logo from '../assets/img/toy-logo.png';

export function AppHeader() {
    return <header className="app-header">
        <div className="header-content layout">
            <Link to="/">
                <img src={logo} />
            </Link>
        </div>
    </header>
}
