import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Loading } from "../cmps/loading"
import { toyService } from "../services/toy-local-service"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId).then(setToy)
        .catch((err) => {
            console.log('can not load toy', err)
            navigate('/')
        })
    }
    
    if(!toy) return <Loading />
    return (
    <section className="toy-details">
        <div className="details-container">
                <h3>{toy.name}</h3>
                <img src={toy.imgUrl} />
                <div>price: {toy.price}</div>
                <div>labels: {toy.labels.join(', ')}</div>
                <div>create: {toy.createAt}</div>
                <div>inStock: {toy.createAt ? 'yes' : 'no'}</div>
        </div>
    </section>
    )
}
