import Like from "../like/Like";
import Login from "./Login";
import Signup from "./Signup";

export default interface User extends Login, Signup {
    id: string;
    role: string;
    vacationLikes: Like[]
}