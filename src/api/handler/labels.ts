
import {get_headers} from "../utils" 

import { request } from "@/utils/request";

const URL = import.meta.env.VITE_API_CURATION_GO +'/label'; 


export const labelsAPI = {
    create:(data: any) => {
        return request({
            baseURL: URL,
            url: "/create",
            method: "post",
            headers: get_headers(),
            data: data
        });
    },
    update:(data: any) => {
        return request({
            baseURL: URL,
            url: "/update/"+data.id,
            method: "post",
            headers: get_headers(),
            data: data
        });
    },
    list:() => {
        return request({
            baseURL: URL,
            url: "/list",
            method: "get",
            headers: get_headers(),
        });
    },
    getById:(id: any) => {
        return request({
            baseURL: URL,
            url: "/get/"+id,
            method: "get",
            headers: get_headers(),
        });
    },
    deleteById:(id: any) => {
        return request({
            baseURL: URL,
            url: "/delete/"+id,
            method: "delete",
            headers: get_headers(),
        });
    }
}

 