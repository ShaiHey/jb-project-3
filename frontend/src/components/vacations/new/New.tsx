import { AxiosError } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuDollarSign } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import useService from '../../../hooks/useService';
import useUserInfo from '../../../hooks/useUserInfo';
import VacationDraft from '../../../models/vacation/Draft';
import { useAppDispatch } from '../../../redux/hooks';
import { addVacation } from '../../../redux/vacationsSlice';
import Vacations from '../../../services/auth-aware/Vacations';
import './New.css';
import useTitle from '../../../hooks/useTitle';

function New(): JSX.Element {
    useTitle("EasyVacay - Add vacation");

    const { register, handleSubmit, formState, watch } = useForm<VacationDraft>();
    const [previewImageSrc, setPreviewImageSrc] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const vacationService = useService(Vacations);
    const { role } = useUserInfo();

    useEffect(() => {
        if (role !== 'admin') navigate('/vacations');
    }, []);

    async function submit(draft: VacationDraft) {
        try {
            draft.imageFile = (draft.imageFile as unknown as FileList)[0];
            const newVacation = await vacationService.create(draft);
            dispatch(addVacation(newVacation));
            toast.success("Vacation created successfully!");
            navigate('/vacations');
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
        if (file) {
            const imageSource = URL.createObjectURL(file);
            setPreviewImageSrc(imageSource);
        }
    }

    function cancelCreate() {
        navigate('/vacations');
    }

    return (
        <div className='Edit'>
            <h1>Add Vacation</h1>
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
                        },
                        min: {
                            value: new Date().toISOString().split('T')[0],
                            message: "Past dates are not allowed"
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
                        min: {
                            value: new Date().toISOString().split('T')[0],
                            message: "Past dates are not allowed"
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
                    {...register('imageFile', {
                        required: {
                            value: true,
                            message: "Cover image is required"
                        }
                    })}
                    onChange={previewImage}
                />
                <span className='error'>{formState.errors.imageFile?.message}</span>

                {previewImageSrc && <img src={previewImageSrc} className="image-preview" />}

                <div className="buttons">
                    <button type="submit" className="submit-btn">Add vacation</button>
                    <button type="button" className="cancel-btn" onClick={cancelCreate}>Cancel</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default New;