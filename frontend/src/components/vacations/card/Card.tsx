import useService from '../../../hooks/useService';
import Vacation from '../../../models/vacation/Vacation';
import './Card.css';
import { CiHeart } from "react-icons/ci";
import { IoMdCalendar } from "react-icons/io";
import Likes from '../../../services/auth-aware/Likes';
import { useAppDispatch } from '../../../redux/hooks';
import { addLike, removeLike, removeVacation } from '../../../redux/vacationsSlice';
import { FaHeart } from 'react-icons/fa';
import { MdDelete, MdOutlineModeEditOutline } from 'react-icons/md';
import Vacations from '../../../services/auth-aware/Vacations';
import useUserInfo from '../../../hooks/useUserInfo';
import { useNavigate } from 'react-router-dom';

interface PropsCard {
    vacation: Vacation
}

function Card({ vacation }: PropsCard): JSX.Element {
    const { id, likes, imageUrl, startDate, endDate, description, destination, price } = vacation;
    const { role, id: userId } = useUserInfo();
    const isLiked = likes.find(l => l.vacationId === id && l.likerId === userId)
    const likeService = useService(Likes)
    const vacationService = useService(Vacations)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    async function likeVacation() {
        try {
            if (isLiked) {
                await likeService.removeLike(id)
                dispatch(removeLike({ vacationId: id, userId }))
            } else {
                const newLike = await likeService.addLike(id)
                dispatch(addLike(newLike))
            }
        } catch (error) {
            alert(error)
        }
    }

    async function deleteVacation() {
        try {
            if(confirm("Are you sure you want to delete this vacation ?")) {
                await vacationService.remove(id)
                dispatch(removeVacation({id}))
            }
        } catch (error) {
            alert(error)
        }
    }

    async function editVacation() {
        navigate(`/edit/${id}`)
    }

    return (
        <div className='Card'>
            <div className='ImageContainer'>
                <img src={`${import.meta.env.VITE_AWS_SERVER_URL}/${imageUrl}`} alt={destination} />
                {
                    role === 'user' ?
                        <span
                            className={`LikeContainer ${isLiked ? 'active' : ''}`}
                            onClick={likeVacation}
                        >
                            {isLiked ? <FaHeart /> : <CiHeart />} Like {likes.length}
                        </span>
                        : <>
                            <span
                                className='LikeContainer'
                                onClick={editVacation}
                            >
                                <MdOutlineModeEditOutline /> Edit
                            </span>
                            <span
                                className='LikeContainer'
                                onClick={deleteVacation}
                            >
                                <MdDelete /> Delete
                            </span>
                        </>
                }
                <h3>{destination}</h3>
            </div>
            <div className='DateContainer'>
                <IoMdCalendar />
                <span>{new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</span>
            </div>
            <div className='DescContainer'>
                <p>
                    {description}
                </p>
                <button>${price}</button>
            </div>
        </div>
    )
}

export default Card;