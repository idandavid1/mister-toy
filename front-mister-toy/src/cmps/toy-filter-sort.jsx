
import { loadToys , setFilter } from "../store/toy.action.js"
import { utilService } from "../services/util.service.js"
import { useSelector } from "react-redux"
import { useRef } from "react"

export function ToyFilter() {
    const filter = useSelector((storeState) => storeState.toyModule.filter)
    const debounceLoadToys = useRef(utilService.debounce(loadToys))

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

    return <section className="toy-filter">
        <form onSubmit={onSubmitFilter}>
            <input type="text"
                id="name"
                name="name"
                placeholder="By name"
                value={filter.name}
                onChange={handleChange} />
            <input type="text"
                id="labels"
                name="labels"
                placeholder="By labels"
                value={filter.labels}
                onChange={handleChange} />
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