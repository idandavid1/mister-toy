import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Loading } from "../cmps/loading"
import { loadToys } from "../store/toy.action"


export function ToyApp() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    useEffect(() => {
        loadToys()
    }, [])

    if(!toys) return <Loading />
    return <section className="toy-app">
        hello
        {console.log('toys:', toys)}
    </section>
}