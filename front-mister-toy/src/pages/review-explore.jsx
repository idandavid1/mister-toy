import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reviewService } from "../services/review.service.js"

export function ReviewExplore() {
    const [reviews, setReviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        loadReviews()
    }, [])

    async function loadReviews() {
        try {
            const reviews = await reviewService.query()
            setReviews(reviews)
        } catch (err) {
            console.log('can not load reviews', err)
            navigate('/toy')
        }
    }

    return (
        <section className="review-explore">
                <ul>
                    {
                    reviews.map((review, idx) => {
                    return <li key={idx}>
                        <div>
                            <div>{review?.toy?.name}</div>
                            <div>{review?.toy?.price}</div>
                        </div>
                        <div>
                            <div>{review?.user?.fullname}</div>
                            <div>{review?.txt}</div>
                        </div> 
                    </li>
                    }) }   
                </ul>
               
        </section>
    )
}