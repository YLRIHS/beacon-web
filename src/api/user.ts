// import axios from "axios";
import {get_headers} from "./utils" 

import { request } from "@/utils/request";


const URL = import.meta.env.VITE_API_AUTH_BASE +'/protected';
 
export const current_user = (code:string,token?: string) => {   
    return request({
        baseURL: URL,
        url: "/users/current_user/"+code,
        method: "get",
        headers: get_headers(token),
    });
}
 
 