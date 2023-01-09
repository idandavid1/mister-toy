

export function ToyPreview({ toy }) {
    return (
        <section className="toy-preview">
            <h2>{toy.name}</h2>
            <img src={require(`../assets/img/${toy.img}`)} />
            <div>{toy.price}</div>
        </section>
    )
}