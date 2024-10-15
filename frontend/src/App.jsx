import { useEffect } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { PublicRoutes, PrivateRoutes} from './utilities/routes';
import './App.css'

// Context Provider
import AppProvider from './providers/AppProvider';

// Route Guards
import AuthGuard from './guards/AuthGuard';

// Páginas
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import CreateEditPage from './pages/CreateEditPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFountPage';
import ErrorPage from './pages/ErrorPage';


function App() {
    useEffect(() => {
        if (localStorage.getItem("darkMode") === "true") {
            document.documentElement.classList.replace("light", "dark");
        }
        else {
            document.documentElement.classList.replace("dark", "light");
        }
    }, []);

    return (
        <>
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path={PublicRoutes.HomePage} 
                           element={<HomePage/>}/>

                    <Route path={PublicRoutes.LoginPage} 
                           element={<AuthPage/>}/>

                    <Route path={PublicRoutes.RegisterPage} 
                           element={<AuthPage isRegisterForm/>}/>

                    <Route element={<AuthGuard/>}>
                        <Route path={PrivateRoutes.AdminPage}
                               element={<AdminPage/>}/>

                        <Route path={PrivateRoutes.CreatePage}
                               element={<CreateEditPage/>}/>

                        <Route path={`${PrivateRoutes.EditPage}/:id`}
                               element={<CreateEditPage/>}/>
                    </Route>

                    <Route path={PublicRoutes.ErrorPage} 
                           element={<ErrorPage/>}/>

                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
        </AppProvider>
        </>
    );
}

export default App
