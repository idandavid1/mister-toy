import './assets/scss/main.scss'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ToyApp } from "./pages/toy-app";
import { store } from "./store/store";
import { Provider } from 'react-redux';
import { AppHeader } from './cmps/app-header';
import { ToyEdit } from './pages/edit-toy';
import { ToyDetails } from './pages/toy-details';
import { HomePage } from './pages/home-page';
import { AboutPage } from './pages/about-page';
import { Dashboard } from './pages/dashboard';
import { AppFooter } from './cmps/app-footer';

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className='layout'>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutPage />} path="/about" />
                            <Route element={<Dashboard />} path="/dashboard" />
                            <Route element={<ToyApp />} path="/toy" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                            <Route element={<ToyEdit />} path="/toy/edit" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
         </Provider>
    )
}


export default App;
