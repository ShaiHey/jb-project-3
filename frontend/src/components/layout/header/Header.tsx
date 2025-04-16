import { NavLink } from 'react-router-dom';
import './Header.css'
import imageSource from '../../../assets/images/logorbg.png'
import { useContext } from 'react';
import { AuthContext } from '../../auth/auth/Auth';
import useUserInfo from '../../../hooks/useUserInfo';

function Header(): JSX.Element {

    const { role, firstName, lastName } = useUserInfo()
    const { logout } = useContext(AuthContext)!

    function logoutMe() {
        if (confirm("Are you sure to logout ?")) {
            logout()
        }
    }

    return (
        <div className='Header'>
            <img src={imageSource} />
            <div className='NavContainer'>
                <h2>EasyVacay</h2>
                {role === 'admin' &&
                    <nav>
                        <NavLink to="/vacations">Vacations</NavLink>
                        <NavLink to="/add-vacation">Add vacation</NavLink>
                        <NavLink to="/report">Report</NavLink>
                    </nav>
                }
            </div>
            <nav>
                Hello {firstName} {lastName} | <button onClick={logoutMe}>Logout</button>
            </nav>
        </div>
    )
}

export default Header;