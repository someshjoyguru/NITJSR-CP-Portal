import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";

const findUserById = async (id) => {
    try {
        const userById = await axios.get(`${server}/users/${id}`, {
            withCredentials: true,
        });
        // console.log(userById);
        return userById;
    } catch (error) {
        toast.error(error.response.data.message);
    }
};

export default findUserById;