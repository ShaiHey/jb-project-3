import './Signup.css';
import { useForm } from 'react-hook-form';
import SignupModel from '../../../models/user/Signup';
import auth from '../../../services/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../auth/Auth';
import { useNavigate } from 'react-router-dom';

function Signup(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<SignupModel>()
    const { newLogin } = useContext(AuthContext)!
    const navigate = useNavigate();

    async function submitSignup(signup: SignupModel) {
        await auth.signup(signup)
            .then((jwt) => {
                toast.success("Your account has been created. Welcome aboard !")
                newLogin(jwt)
                navigate('/vacations')
            })
            .catch(error => {
                toast.error(error.response?.data || error.message);
            })
    }

    return (
        <div className='Signup'>
            <div className="signup-form">
                <h1>Sign Up</h1>
                <p>Create an account to get started.</p>
                <form onSubmit={handleSubmit(submitSignup)}>
                    <div className="input-group">
                        <label htmlFor="firstName">First Name</label>
                        <input placeholder="Enter your first name" type="text" {...register('firstName', {
                            required: {
                                value: true,
                                message: "First name is required"
                            }
                        })} />
                        <span className='error'>{formState.errors.firstName?.message}</span>
                    </div>
                    <div className="input-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input placeholder="Enter your last name" type="text" {...register('lastName', {
                            required: {
                                value: true,
                                message: "Last name is required"
                            }
                        })} />
                        <span className='error'>{formState.errors.lastName?.message}</span>
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input placeholder="Enter your email" type="email" {...register('email', {
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
                    <button type="submit" className="signup-btn">Sign Up</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Signup;