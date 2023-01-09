import './assets/css/main.css'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ToyApp } from "./pages/toy-app";
import { store } from "./store/store";
import { Provider } from 'react-redux';
export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    {/* <AppHeader /> */}
                    <main>
                        <Routes>
                            <Route element={<ToyApp />} path="/" />
                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </section>
            </Router>
         </Provider>
    )
}


export default App;
