import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { Loading } from "../cmps/loading"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [msg, setMsg] = useState({txt: ''})
    const { toyId } = useParams()
    const user = useSelector((storeState) => storeState.userModule.user)
    const navigate = useNavigate()

    useEffect(()=>{
        loadToy()
    }, [])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            console.log('toy:', toy)
            setToy(toy)
        } catch (err) {
            console.log('can not load toy', err)
            navigate('/toy')
        }
    }

    function handleChange({ target }) {
        let { value } = target
        setMsg((prevMsg) => ({ ...prevMsg, txt: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        try {
            await toyService.addMsg(msg.txt, toyId)
            loadToy()
            msg.txt = ''
            showSuccessMsg('msg save')
        } catch (err) {
            showErrorMsg('cant save msg')
            console.log('err', err)
        }
    }
    
    if(!toy) return <Loading />
    return (
    <section className="toy-details">
        <div className="details-container">
                <h3>{toy.name}</h3>
                <img src={toy.imgUrl} />
                <div>price: {utilService.getPrice(toy.price)}</div>
                <div>labels: {toy.labels.join(', ')}</div>
                <div>create: {`  ${new Date(toy.createdAt).getDate()}  ${utilService.getMonthName(new Date(toy.createdAt))}`}</div>
                <div>inStock: {toy.inStock ? 'yes' : 'no'}</div>
                {user && 
                <form onSubmit={onSubmit}>
                    <input type="text"
                    name="txt"
                    placeholder="add review"
                    value={msg.txt}
                    onChange={handleChange}
                />
                <button>Save</button>
                </form>}
                <ul>
                    {
                    toy.msgs.map((msg, idx) => {
                    return <li key={idx} className="toy-reviews">
                        <div>{msg?.by?.fullname}</div>
                        <div>{msg?.txt}</div>
                    </li>
                    }) }   
                </ul>
               
            </div>
    </section>
    )
}
