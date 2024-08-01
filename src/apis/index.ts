import axios from "@/plugins/axios";

export const getUserInfo = (data: any) => {
    return axios.get("/api/userInfo");
};

export const editUserInfo = (data: any) => {
    return axios.post("/api/editInfo");
};
