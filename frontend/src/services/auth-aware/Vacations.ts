import VacationDraft from "../../models/vacation/Draft";
import Vacation from "../../models/vacation/Vacation";
import AuthAware from "./AuthAware";

class Vacations extends AuthAware {
    async getAllVacations(): Promise<Vacation[]> {
        const response = await this.axiosInstance.get<Vacation[]>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations`);
        return response.data;
    }

    async getAllVacationsCSV(): Promise<Blob> {
        const response = await this.axiosInstance.get<Blob>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/csv`, {
            responseType: 'blob'
        })
        return response.data;
    }

    async getVacation(id: string): Promise<Vacation> {
        const response = await this.axiosInstance.get<Vacation>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/${id}`);
        return response.data;
    }

    async remove(id: string): Promise<boolean> {
        const response = await this.axiosInstance.delete<boolean>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/${id}`);
        return response.data;
    }

    async create(draft: VacationDraft): Promise<Vacation> {
        const {
            destination,
            description,
            startDate,
            endDate,
            price,
            imageFile
        } = draft
        const response = await this.axiosInstance.post<Vacation>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/`, { destination, description, startDate, endDate, price, imageFile }, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        });
        return response.data;
    }

    async update(id: string, draft: VacationDraft): Promise<Vacation> {
        const {
            destination,
            description,
            startDate,
            endDate,
            price,
            imageFile
        } = draft
        const response = await this.axiosInstance.patch<Vacation>(`${import.meta.env.VITE_REST_SERVER_URL}/vacations/${id}`, { destination, description, startDate, endDate, price, imageFile }, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        });
        return response.data;
    }
}


export default Vacations;