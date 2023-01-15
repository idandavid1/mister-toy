import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userService }  from "../services/user.service.js"


export function UserDetails() {
    const [reviews, setReviews] = useState([])
    const user = useSelector((storeState) => storeState.userModule.user)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user) navigate('/toy')
        loadReviews()
    }, [])

    async function loadReviews() {
        try {
            const reviews = await userService.getReviews(user._id)
            setReviews(reviews)
        } catch (err) {
            console.log('can not load reviews', err)
            navigate('/toy')
        }
    }

    return (
        <section className="user-details">
            <div className="details-container">
                <h3>{user.fullname}</h3>
                <img src={user.imgUrl} alt="" />
                <ul>
                    {
                    reviews.map((review, idx) => {
                    return <li key={idx} className="user-reviews">
                        <div>{review?.toy?.name}</div>
                        <div>{review?.txt}</div>
                    </li>
                    }) }   
                </ul>
            </div>
        </section>
    )
}