import { useForm } from 'react-hook-form';
import './Login.css'
import LoginModel from '../../../models/user/Login';
import auth from '../../../services/auth';
import { useContext } from 'react';
import { AuthContext } from '../auth/Auth';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<LoginModel>()
    const { newLogin } = useContext(AuthContext)!
    const navigate = useNavigate()

    async function submit(login: LoginModel) {
        await auth.login(login)
            .then(userJwt => {
                newLogin(userJwt)
                navigate('/vacations')
            })
            .catch(error => {
                toast.error(error.response?.data || error.message);
            })
    }

    return (
        <div className='Login'>
            <div className="login-form">
                <h1>Login</h1>
                <p>Sign in to pick up where you left off.</p>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="input-group">
                        <label htmlFor="username">Email</label>
                        <input placeholder="Enter your username" type="email" {...register('email', {
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Please enter a valid email',
                            }
                        })} />
                        <span className='error'>{formState.errors.email?.message}</span>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input placeholder="Enter your password" type="password" {...register('password', {
                            required: {
                                value: true,
                                message: "Password is required"
                            },
                            minLength: {
                                value: 4,
                                message: "Password length minimum 4 chars"
                            }
                        })} />
                        <span className='error'>{formState.errors.password?.message}</span>
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login;