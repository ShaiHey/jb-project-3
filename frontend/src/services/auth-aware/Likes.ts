import Like from "../../models/like/Like";
import AuthAware from "./AuthAware";

class Likes extends AuthAware {
    async getLikes(): Promise<Like[]> {
        const response = await this.axiosInstance.get<Like[]>(`${import.meta.env.VITE_REST_SERVER_URL}/likes`);
        return response.data;
    }

    async addLike(vacationId: string): Promise<Like> {
        const response = await this.axiosInstance.post<Like>(`${import.meta.env.VITE_REST_SERVER_URL}/likes/${vacationId}`);
        return response.data;
    }

    async removeLike(vacationId: string): Promise<boolean> {
        const response = await this.axiosInstance.delete<boolean>(`${import.meta.env.VITE_REST_SERVER_URL}/likes/${vacationId}`);
        return response.data;
    }
}


export default Likes;