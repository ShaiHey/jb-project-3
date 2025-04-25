import { useContext } from 'react';
import Login from '../../auth/login/Login';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Routing from '../routing/Routing';
import './Layout.css'
import { AuthContext } from '../../auth/auth/Auth';
import Signup from '../../auth/signup/Signup';

function Layout(): JSX.Element {

    const { jwt } = useContext(AuthContext)!
    const isLoggedIn: boolean = !!jwt

    return (
        <>
            {isLoggedIn ? 
                <div className='Layout'>
                    <header>
                        <Header />
                    </header>
                    <main>
                        <Routing />
                    </main>
                    <footer>
                        <Footer />
                    </footer>
                </div>
            : 
                <div className='AuthContainer'>
                    <Login />
                    <div className="separator-bar"></div>
                    <Signup />
                </div>
            }
        </>
    )
}

export default Layout;