import './assets/css/main.css'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ToyApp } from "./pages/toy-app";
import { store } from "./store/store";
import { Provider } from 'react-redux';
import { AppHeader } from './cmps/app-header';
import { ToyEdit } from './pages/edit-toy';

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className='layout'>
                        <Routes>
                            <Route element={<ToyApp />} path="/" />
                            <Route element={<ToyEdit />} path="/edit/:toyId" />
                            <Route element={<ToyEdit />} path="/edit" />
                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </section>
            </Router>
         </Provider>
    )
}


export default App;
