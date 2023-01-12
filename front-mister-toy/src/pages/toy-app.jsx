import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Loading } from "../cmps/loading"
import { LoginSignUp } from "../cmps/login-signup"
import { ToyFilter } from "../cmps/toy-filter-sort"
import { ToyList } from "../cmps/toy-list"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { loadToys, removeToy } from "../store/toy.action"
import { onLogOut } from "../store/user.action"


export function ToyApp() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filter = useSelector((storeState) => storeState.toyModule.filter)
    const user = useSelector((storeState) => storeState.userModule.user)
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    useEffect(() => {
        loadToys(filter)
    }, [])

    function onRemove(toyId) {
        removeToy(toyId)
        .then(() => {
            showSuccessMsg('toy remove')
        })
        .catch((err) => {
            console.log('err:', err)
            showErrorMsg('cant remove toy')
        })
    }

    if(!toys) return <Loading />
    return <section className="toy-app">
        <div className='user'>
        {user && <div>
                <h2>Hello {user.fullname}</h2>
                <button onClick={onLogOut}>Logout</button>
            </div>}
        {!user && <div>
                <button onClick={() => setIsLoginOpen(true)}>login</button>
                {isLoginOpen && <LoginSignUp setIsLoginOpen={setIsLoginOpen}/>}
            </div>}
        </div>
        <ToyFilter />
        {user?.isAdmin && <Link to={`/toy/edit/`}><button>add toy</button></Link>}
        <ToyList onRemove={onRemove} toys={toys}/>
    </section>
}