
import { toyService } from "../services/toy-local-service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if(toyId) {
            toyService.getById(toyId)
            .then((toy) => {
                setToyToEdit(toy)
                showSuccessMsg('load toy')
            })
            .catch((err) => {
                console.log('err:', err)
                showSuccessMsg('cant load toy')
                navigate('/')
            })
        }
    }, [])

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        toyService.save(toyToEdit)
            .then(() => {
                showSuccessMsg('toy saved!')
                navigate('/')
            })
            .catch((err) => {
                console.log('err', err)
                showErrorMsg('cant save toy')
            })
    }

    return (
        <section className="toy-edit">
        <form onSubmit={onSaveToy}>
            <label htmlFor="name">name : </label>
            <input type="text"
                name="name"
                id="name"
                placeholder="Enter name"
                value={toyToEdit.name}
                onChange={handleChange}
            />
            <label htmlFor="price">Price: </label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter price"
                value={toyToEdit.price}
                onChange={handleChange}
            />
            <div>
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
            </div>
        </form>
        </section>
    )
}