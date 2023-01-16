import axios from "axios"
import { useState } from "react"
import { userService } from "../services/user.service.js"

export function LoginSignUpForm({ onLogin, onSingUp, isSignUp }) {
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    async function uploadImg(ev) {
        const CLOUD_NAME = 'du63kkxhl'
        const UPLOAD_PRESET = 'ml_default'
        const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
        const FORM_DATA = new FormData();
        FORM_DATA.append('file', ev.target.files[0])
        FORM_DATA.append('upload_preset', UPLOAD_PRESET);
        try {
            const res = await axios.post(UPLOAD_URL, FORM_DATA)
            const { url } = res.data
            console.log('res.data:', url)
            setCredentials(prevCreds => ({ ...prevCreds, imgUrl: url }))
        } catch (err) {
            console.error(err)
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        console.log('credentials:', credentials)
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
            {isSignUp && <div className="flex column">
                <div>Fullname</div>
                <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                placeholder="Fullname"
                onChange={handleChange}
                required
            />
            <input
                type="file"
                name="file"
                onChange={uploadImg}
                required
                />
            </div>}
            <button className="login-btn" >{isSignUp ? 'SignUp' : 'Login'}</button>
        </form>
}