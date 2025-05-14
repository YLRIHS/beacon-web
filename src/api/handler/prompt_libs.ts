import {get_headers} from "../utils" 

import { request } from "@/utils/request";

const URL = import.meta.env.VITE_API_CURATION_GO +'/prompt_libs'; 

// prompt_libs := r.Group("/prompt_libs")
// 		{
// 			prompt_libs.GET("/get_list", prompt_lib_handlers.GetList)
// 			prompt_libs.GET("/get_by_id/:id", prompt_lib_handlers.GetByID)
// 			prompt_libs.POST("/create_or_update", prompt_lib_handlers.CreateOrUpdate)
// 		}

export const promptLibsAPI = {
    fetchPromptLibsList() {
        return request({
            baseURL: URL,
            url: "/get_list",
            method: "get",
            headers: get_headers(),
        });
    },
    fetchPromptLibsById(id: string) {
        return request({
            baseURL: URL,
            url: `/get_by_id/${id}`,
            method: "get",
            headers: get_headers(),
        });
    },
    createOrUpdatePromptLibs(data: any) {
        return request({
            baseURL: URL,
            url: "/create_or_update",
            method: "post",
            headers: get_headers(),
            data
        });
    },
}