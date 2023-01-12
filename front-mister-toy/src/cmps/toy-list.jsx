import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { ToyPreview } from "./toy-preview.jsx"


export function ToyList({ toys, onRemove }) {
    const user = useSelector((storeState) => storeState.userModule.user)

    return(
        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div className="btn-container">
                        {user?.isAdmin && <button onClick={() => onRemove(toy._id)}>delete</button>}
                        <Link to={`/toy/${toy._id}`}><button>details</button></Link>
                        {user?.isAdmin && <Link to={`/toy/edit/${toy._id}`}><button>update</button></Link>}
                    </div>
                </li>)}
        </ul>
        )
}