import { utilService } from "../services/util.service";


export function ToyPreview({ toy }) {
    return (
        <section className="toy-preview">
            <img src={toy.imgUrl} />
            <div className="toy-content">
                <h2>{toy.name}</h2>
                <div>{utilService.getPrice(toy.price) }</div>
            </div>
            
        </section>
    )
}