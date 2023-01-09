import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Loading } from "../cmps/loading"
import { ToyFilter } from "../cmps/toy-filter-sort"
import { ToyList } from "../cmps/toy-list"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { loadFilter, loadToys, removeToy } from "../store/toy.action"


export function ToyApp() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
    }, [])

    function onRemove(toyId) {
        removeToy(toyId)
        .then(() => {
            showSuccessMsg('toy remove')
        })
        .catch((err) => {
            console.log('err:', err)
            showErrorMsg('cant remove toy')
        })
    }

    if(!toys) return <Loading />
    return <section className="toy-app">
        <ToyFilter />
        <ToyList onRemove={onRemove} toys={toys}/>
    </section>
}