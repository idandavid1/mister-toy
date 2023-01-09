
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { saveToy } from "../store/toy.action.js"

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
        value = field === 'labels' ? value.split(', ')  : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if(!toyToEdit._id) toyToEdit.createdAt = Date.now()
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('toy saved!')
                navigate('/')
            })
            .catch((err) => {
                console.log('err', err)
                showErrorMsg('cant save toy')
                navigate('/')
            })
    }

    return (
        <section className="toy-edit">
        <form onSubmit={onSaveToy}>
            <div>
                <label htmlFor="name">name : </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name"
                    value={toyToEdit.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="price">price: </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="imgUrl">imgUrl: </label>
                <input type="url"
                    name="imgUrl"
                    id="imgUrl"
                    placeholder="Enter imgUrl"
                    value={toyToEdit.imgUrl}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="labels">labels: </label>
                <input type="text"
                    name="labels"
                    id="labels"
                    placeholder="Enter labels"
                    value={toyToEdit.labels.join(', ')}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
            </div>
        </form>
        </section>
    )
}