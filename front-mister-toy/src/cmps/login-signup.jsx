import { useState } from "react"
import { login, sighup } from "../store/user.action.js"
import { LoginSignUpForm } from "./login-signup-form.jsx"


export function LoginSignUp({ setIsLoginOpen }) {
    const [isSignUp, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        login(credentials)
        .finally(() => setIsLoginOpen(false))
    }

    function onSingUp(credentials) {
        sighup(credentials)
        .finally(() => setIsLoginOpen(false))
    }

    return <div className="login-toy">
            <div className="btn-close-container"><button onClick={() => setIsLoginOpen(false)} className="close">x</button></div>
            <LoginSignUpForm onLogin={onLogin} onSingUp={onSingUp} isSignUp={isSignUp} />
            <a onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Already a member? Login' : 'New user? Signup here'}</a>
        </div >
}
