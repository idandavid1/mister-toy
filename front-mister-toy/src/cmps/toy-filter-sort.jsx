
import { loadToys , setFilter } from "../store/toy.action.js"
import { utilService } from "../services/util.service.js"
import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { MultiSelect } from "react-multi-select-component";
import { toyService } from "../services/toy.service.js";
import { Loading } from "./loading.jsx";

export function ToyFilter() {
    const filter = useSelector((storeState) => storeState.toyModule.filter)
    const debounceLoadToys = useRef(utilService.debounce(loadToys))
    const [options, setOptions] = useState([])
    const [selected, setSelected] = useState([])

    useEffect(() => {
        toyService.getLabels()
        .then((labels) => {
            setOptions(labels.map(label => ({label, value: label })))
        })
        .catch(err => {
            console.log('Error:', err)
        })
    }, [])

    function handleChange({ target }) {
        let { value, name: field } = target
        const changeFilter = { ...filter, [field]: value}
        debounceLoadToys.current(changeFilter)
        setFilter(changeFilter)
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        setFilter(filter)
        loadToys(filter)
    }

    function onChangeSelect({target}) {
        let { value, name: field } = target
        const changeFilter = { ...filter, [field]: value}
        loadToys(changeFilter)
        setFilter(changeFilter)
    }

    function onMultiSelected(selected){
        setSelected(selected)
        const labels = selected.map(select => select.label).join(', ')
        const changeFilter = { ...filter, labels}
        loadToys(changeFilter)
        setFilter(changeFilter)
    } 

    if(!options) return <Loading />
    return <section className="toy-filter">
        <form onSubmit={onSubmitFilter}>
            <input type="text"
                id="name"
                name="name"
                placeholder="By name"
                value={filter.name}
                onChange={handleChange} />
                <MultiSelect
                className="multiSelect"
                options={options}
                value={selected}
                onChange={(selected) => onMultiSelected(selected)}
                labelledBy="Select"
            />
            {/* <input type="text"
                id="labels"
                name="labels"
                placeholder="By labels"
                value={filter.labels}
                onChange={handleChange} /> */}
            <select name="inStock" id="inStock" onChange={onChangeSelect}>
                <option value="All">All</option>
                <option value="true">In stock</option>
                <option value="false">Out of stock</option>
            </select>
            <select name="sortBy" id="sortBy" onChange={onChangeSelect}>
                <option value="name">name</option>
                <option value="createAt">createAt</option>
                <option value="price">price</option>
            </select>
            <button>Filter toys</button>
        </form>
    </section>
}
