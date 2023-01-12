import { useState } from "react"
import { userService } from "../services/user.service.js"

export function LoginSignUpForm({ onLogin, onSingUp, isSignUp }) {
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        isSignUp ? onSingUp(credentials) : onLogin(credentials)
    }

    return <form className="login-signUp-form" onSubmit={handleSubmit}>
            <div>
                <div>Username</div>
                <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
                autoFocus
            />
            </div>
            <div>
                <div>Password</div>
                <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
            />
            </div>
            {isSignUp && <div>
                <div>Fullname</div>
                <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                placeholder="Fullname"
                onChange={handleChange}
                required
            />
            </div>}
            <button className="login-btn" >{isSignUp ? 'SignUp' : 'Login'}</button>
        </form>
}