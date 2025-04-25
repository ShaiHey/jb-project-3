import Like from "../like/Like";
import BaseVacation from "./BaseVacation";

export default interface Vacation extends BaseVacation {
    id: string;
    likes: Like[];
    imageUrl: string;
}