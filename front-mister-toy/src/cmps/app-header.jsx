import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/img/toy-logo.png';

export function AppHeader() {
    const[toggle, setToggle] = useState(false)
    const user = useSelector((storeState) => storeState.userModule.user)
    const elHeader = useRef()
    
    function onToggle() {
        elHeader.current.classList.toggle('menu-open')
        setToggle(prev => !prev)
    }

    function onClickNav() {
        elHeader.current.classList.remove('menu-open')
        setToggle(false)
    }

    return <header ref={elHeader} className="app-header">
        <div className="header-content layout">
            <Link to="/">
                <img src={logo} />
            </Link>
            <nav onClick={onClickNav}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">toys</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink> 
                <NavLink to="/reviewExplore">Reviews</NavLink> 
                {user && <NavLink to="/userDetails">User-details</NavLink>} 
            </nav>
            <div className="btn-container">
                {toggle && <button onClick={onToggle}>x</button>}
                {!toggle && <button onClick={onToggle}>☰</button>}
            </div>
        </div>
    </header>
}
