import { axiosInstance } from "@/app/axios";

export const createUserInDB = async (userCred) => {
    try {
    const { email, displayName, uid } = userCred.user;
    const res = axiosInstance.post('/users/create-user',
        { email, displayName, uid }
    )
    console.log(res);
    }
    catch (err) {
        console.log(err);
    }

}