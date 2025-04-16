import { useForm } from 'react-hook-form';
import './Edit.css';
import VacationDraft from '../../../models/vacation/Draft';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import useService from '../../../hooks/useService';
import Vacations from '../../../services/auth-aware/Vacations';
import { ChangeEvent, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import useUserInfo from '../../../hooks/useUserInfo';
import { updateVacation } from '../../../redux/vacationsSlice';
import { AxiosError } from 'axios';
import { LuDollarSign } from 'react-icons/lu';
import useTitle from '../../../hooks/useTitle';

function Edit(): JSX.Element {
    useTitle("EasyVacay - Edit vacation");

    const { id } = useParams<'id'>();
    const { register, handleSubmit, formState, reset, watch } = useForm<VacationDraft>();
    const [previewImageSrc, setPreviewImageSrc] = useState<string>('');
    const navigate = useNavigate();
    const editVacation = useAppSelector(state => state.vacations.vacations.find(v => v.id === id));
    const dispatch = useAppDispatch();
    const vacationService = useService(Vacations);
    const { role } = useUserInfo();

    useEffect(() => {
        if(role !== 'admin') navigate('/vacations');
        
        if(editVacation) {
            reset(editVacation);
            if(editVacation.imageUrl) {
                setPreviewImageSrc(`${import.meta.env.VITE_AWS_SERVER_URL}/${editVacation.imageUrl}`);
            }
        } else {
            vacationService.getVacation(id!)
                .then(vacation => {
                    reset(vacation);
                    if(vacation.imageUrl) {
                        setPreviewImageSrc(`${import.meta.env.VITE_AWS_SERVER_URL}/${vacation.imageUrl}`);
                    }
                })
                .catch(error => {
                    toast.error(error.response?.data || error.message);
                });
        }
    }, []);

    async function submit(draft: VacationDraft) {
        try {
            if (id) {
                draft.imageFile = (draft.imageFile as unknown as FileList)[0];
                const updatingPost = await vacationService.update(id, draft);
                dispatch(updateVacation(updatingPost));
                toast.success("Vacation updated successfully!");
                navigate('/vacations');
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data || error.message);
            } else {
                toast.error("An unknown error has occurred");
            }
        }
    }

    function previewImage(event: ChangeEvent<HTMLInputElement>) {
        const file = event.currentTarget.files && event.currentTarget.files[0];
        if(file) {
            const imageSource = URL.createObjectURL(file);
            setPreviewImageSrc(imageSource);
        }
    }

    function cancelEdit() {
        navigate('/vacations');
    }

    return (
        <div className='Edit'>
            <h1>Edit a vacation</h1>
            <form onSubmit={handleSubmit(submit)}>
                <label htmlFor="destination">Destination</label>
                <input 
                    type="text" 
                    id="destination"
                    {...register('destination', {
                        required: {
                            value: true,
                            message: "Destination is required"
                        }
                    })} 
                />
                <span className='error'>{formState.errors.destination?.message}</span>

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    {...register('description', {
                        required: {
                            value: true,
                            message: "Description is required"
                        }
                    })} 
                />
                <span className='error'>{formState.errors.description?.message}</span>

                <label htmlFor="startDate">Start date</label>
                <input 
                    type="date" 
                    id="startDate"
                    {...register('startDate', {
                        required: {
                            value: true,
                            message: "Start date is required"
                        }
                    })} 
                />
                <span className='error'>{formState.errors.startDate?.message}</span>

                <label htmlFor="endDate">End date</label>
                <input 
                    type="date" 
                    id="endDate"
                    {...register('endDate', {
                        required: {
                            value: true,
                            message: "End date is required"
                        },
                        validate: (value) => {
                            const startDate = watch('startDate');
                            return !startDate || new Date(value) >= new Date(startDate) || "End date cannot be before start date";
                        }
                    })} 
                />
                <span className='error'>{formState.errors.endDate?.message}</span>

                <label htmlFor="price">Price</label>
                <div className="price-input-container">
                    <LuDollarSign />
                    <input 
                        type="number"
                        id="price"
                        {...register('price', {
                            required: {
                                value: true,
                                message: "Price is required"
                            },
                            min: {
                                value: 1,
                                message: "Price cannot be negative"
                            },
                            max: {
                                value: 10000,
                                message: "The price cannot exceed 10,000"
                            }
                        })} 
                    />
                </div>
                <span className='error'>{formState.errors.price?.message}</span>

                <label htmlFor="imageFile">Cover image</label>
                <input 
                    type="file" 
                    id="imageFile"
                    accept='image/png, image/jpeg, image/jpg' 
                    {...register('imageFile')}
                    onChange={previewImage}
                />
                <span className='error'>{formState.errors.imageFile?.message}</span>
                
                {previewImageSrc && <img src={previewImageSrc} className="image-preview" />}
                
                <div className="buttons">
                    <button type="submit" className="submit-btn">Update</button>
                    <button type="button" className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Edit;