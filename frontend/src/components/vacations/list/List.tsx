import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import './List.css';
import useService from '../../../hooks/useService';
import Vacations from '../../../services/auth-aware/Vacations';
import { init } from '../../../redux/vacationsSlice';
import Card from '../card/Card';
import useTitle from '../../../hooks/useTitle';
import useUserInfo from '../../../hooks/useUserInfo';
import Pagination from '../../pagination/Pagination';

function List(): JSX.Element {
    useTitle("EasyVacay - Vacations");

    const vacations = useAppSelector(state => state.vacations.vacations);
    const dispatch = useAppDispatch();
    const vacationService = useService(Vacations);
    const { role, id: userId } = useUserInfo();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [filteredVacations, setFilteredVacations] = useState(vacations);
    const [selected, setSelected] = useState<string | null>(null);

    useEffect(() => {
        vacationService.getAllVacations()
            .then(vacations => {
                dispatch(init(vacations));
                setFilteredVacations(vacations);
            })
            .catch(error => alert(error));
    }, [])

    useEffect(() => {
        let newVacations = vacations;
        const today = new Date();

        if (selected === "onlyLike") {
            newVacations = vacations.filter(vacation =>
                vacation.likes.some(like => like.likerId === userId)
            );
        } else if (selected === "onlyNotStartedVacation") {
            newVacations = vacations.filter(vacation =>
                new Date(vacation.startDate) > today
            );
        } else if (selected === "onlyProgressVacation") {
            newVacations = vacations.filter(vacation =>
                new Date(vacation.startDate) <= today && new Date(vacation.endDate) >= today
            );
        }

        setFilteredVacations(newVacations);
        setCurrentPage(1);
    }, [selected, vacations])

    const totalPages = Math.ceil(filteredVacations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentVacations = filteredVacations.slice(startIndex, startIndex + itemsPerPage);

    function goToPage(page: number) {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }

    function changeCheck(event: ChangeEvent<HTMLInputElement>) {
        const { id, checked } = event.target;
        setSelected(checked ? id : null);
    }

    return (
        <div className='List'>
            {role === "user" &&
                <div className='CheckBoxContainer'>
                    <input
                        type="checkbox"
                        id="onlyLike"
                        checked={selected === "onlyLike"}
                        onChange={changeCheck}
                    />
                    <label htmlFor="onlyLike">Show only liked vacations</label>

                    <input
                        type="checkbox"
                        id="onlyNotStartedVacation"
                        checked={selected === "onlyNotStartedVacation"}
                        onChange={changeCheck}
                    />
                    <label htmlFor="onlyNotStartedVacation">Show vacations she didn't start</label>

                    <input
                        type="checkbox"
                        id="onlyProgressVacation"
                        checked={selected === "onlyProgressVacation"}
                        onChange={changeCheck}
                    />
                    <label htmlFor="onlyProgressVacation">Show vacations in progress</label>
                </div>
            }

            <div className='CardsContainer'>
                {currentVacations.map(v => <Card key={v.id} vacation={v} />)}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                goToPage={goToPage}
            />
        </div>
    );
}

export default List;