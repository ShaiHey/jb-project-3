import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Graph from '../../graph/Graph';
import './Report.css';
import useService from '../../../hooks/useService';
import Vacations from '../../../services/auth-aware/Vacations';
import { init } from '../../../redux/vacationsSlice';
import useUserInfo from '../../../hooks/useUserInfo';
import { useNavigate } from 'react-router-dom';

function Report(): JSX.Element {
    
    const vacations = useAppSelector(state => state.vacations.vacations);
    const dispatch = useAppDispatch()
    const vacationService = useService(Vacations)
    const { role } = useUserInfo();
    const navigate = useNavigate();
    const points = vacations.map(v => ({
        label: v.destination,
        y: v.likes.length
    }))

    useEffect(() => {
        if (role !== 'admin') navigate('/vacations');
        if (vacations.length === 0) {
            vacationService.getAllVacations()
                .then(vacations => dispatch(init(vacations)))
                .catch(alert);
        }
    }, []);

    async function downloadCSV() {
        try {
            const csvBlob = await vacationService.getAllVacationsCSV();
    
            const url = window.URL.createObjectURL(csvBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'vacations.csv';
            link.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert(error)
        }
    }
    
    return (
        <div className='Report'>
            <button onClick={downloadCSV}>Download CSV file</button>
            <Graph dataPoints={points} />
        </div>
    )
}

export default Report;