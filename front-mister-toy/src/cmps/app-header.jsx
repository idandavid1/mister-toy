const { useSelector, useDispatch } = ReactRedux
const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
    return <header className="app-header">
        <div className="header-content layout">
            <Link to="/">
                <h3>LOGO!</h3>
            </Link>
        </div>
    </header>
}
