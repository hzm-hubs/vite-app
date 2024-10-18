import axios from "@/plugins/axios";
import { Header } from "element-plus/es/components/table-v2/src/components/index.mjs";

export const getUserInfo = (data: any) => {
    return axios.get("/api/userInfo");
};

export const editUserInfo = (data: any) => {
    return axios.post("/api/editInfo");
};

export const uploadUrl = (data: any) => {
    return axios.post("/upload", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
