import { ToyPreview } from "./toy-preview.jsx"


export function ToyList({ toys, onRemove }) {
    return(
        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div className="btn-container">
                        <button onClick={() => onRemove(toy._id)}>delete</button>
                        <button>details</button>
                    </div>
                </li>)}
        </ul>
        )
}