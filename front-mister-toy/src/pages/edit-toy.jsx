
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { saveToy } from "../store/toy.action.js"
import { MultiSelect } from "react-multi-select-component"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState([])
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        loadLabels()
        if(toyId) {
            loadToy()
        }
    }, [])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToyToEdit(toy)
            setSelected(toy.labels.map(label => ({label, value: label })))
        } catch (err) {
            console.log('err:', err)
            showSuccessMsg('cant load toy')
            navigate('/')
        }
    }

    async function loadLabels() {
        try {
          const labels = await toyService.getLabels()
          setOptions(labels.map(label => ({label, value: label })))
        } catch (err) {
            console.log('Error:', err)
        }
    }

    function handleChange({ target }) {
        let { value, type, name: field, checked } = target
        value = type === 'number' ? +value : value
        value = field === 'inStock' ? checked : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    async function onSaveToy(ev) {
        ev.preventDefault()
        if(!toyToEdit._id) toyToEdit.createdAt = Date.now()
        try {
            await saveToy(toyToEdit)
            showSuccessMsg('toy saved!')
            navigate('/toy')
        } catch (err) {
                console.log('err', err)
                showErrorMsg('cant save toy')
                navigate('/toy')
            }
    }

    function onMultiSelected(selected){
        setSelected(selected)
        const labels = selected.map(select => select.label)
        setToyToEdit((prevToy) => ({ ...prevToy, labels }))
    }

    console.log('options:', options)
    console.log('selected:', selected)
    if(!options) return <div>loading..</div>
    return (
        <section className="toy-edit">
        <form onSubmit={onSaveToy}>
            <div className="edit">
                <label htmlFor="name">name : </label>
                <input type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name"
                    value={toyToEdit.name}
                    onChange={handleChange}
                />
            </div>
            <div className="edit">
                <label htmlFor="price">price: </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                />
            </div>
            <div className="edit">
                <label htmlFor="imgUrl">imgUrl: </label>
                <input type="url"
                    name="imgUrl"
                    id="imgUrl"
                    placeholder="Enter imgUrl"
                    value={toyToEdit.imgUrl}
                    onChange={handleChange}
                />
            </div>
            <div className="labels">
            <label htmlFor="labels">labels: </label>
            <MultiSelect
                name="labels"
                id="labels"
                options={options}
                value={selected}
                onChange={(selected) => onMultiSelected(selected)}
                labelledBy="Select"
            />
            </div>
            <div className="edit">
                <label htmlFor="inStock">inStock: </label>
                <input type="checkBox"
                    name="inStock"
                    id="inStock"
                    value={toyToEdit.inStock}
                    checked={toyToEdit.inStock}
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
