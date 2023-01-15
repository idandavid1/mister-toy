import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { Loading } from "../cmps/loading"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { reviewService } from "../services/review.service"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [msg, setMsg] = useState(reviewService.getEmptyReview())
    const [reviews, setReviews] = useState([])
    const { toyId } = useParams()
    const user = useSelector((storeState) => storeState.userModule.user)
    const navigate = useNavigate()

    useEffect(()=>{
        loadToy()
        loadReviews()
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

    async function loadReviews() {
        try {
            const reviews = await toyService.getReviews(toyId)
            setReviews(reviews)
        } catch (err) {
            console.log('can not load reviews', err)
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
            await reviewService.add(msg, toyId)
            loadToy()
            loadReviews()
            setMsg(reviewService.getEmptyReview())
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
                    reviews.map((review, idx) => {
                    return <li key={idx} className="toy-reviews">
                        <div>{review?.byUser?.fullname}</div>
                        <div>{review?.txt}</div>
                    </li>
                    }) }   
                </ul>
               
            </div>
    </section>
    )
}
