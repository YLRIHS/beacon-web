import {get_headers,get_form_headers} from "./utils" 

import { request } from "@/utils/request";




// pubmed := r.Group("/pubmed")
// 		{
// 			pubmed.PUT("/start_task", pubmed_handlers.StartFindTrialsTaskByNctIDsHandler)
// 			pubmed.GET("/get_task_info/:task_id", pubmed_handlers.GetTaskByIDHandler)
// 			pubmed.GET("/get_task_list", pubmed_handlers.ListPubMedTasksByUserIDHandler)
// 			pubmed.POST("/cancel_task/:task_id", pubmed_handlers.CancelTaskHandler)
// 		}

export const api_pubmed_start_task = (data: any) => {

    return request({
        baseURL: import.meta.env.VITE_API_CURATION_GO,
        url: "/pubmed/start_task",
        method: "put",
        headers: get_form_headers(),
        data: data
    });
}

export const api_pubmed_get_task_info = (task_id: any) => {
    return request({
        baseURL: import.meta.env.VITE_API_CURATION_GO,
        url: "/pubmed/get_task_info/"+task_id,
        method: "get",
        headers: get_headers(),
    });
}   
 
export const api_pubmed_get_task_list = () => {
    return request({
        baseURL: import.meta.env.VITE_API_CURATION_GO,
        url: "/pubmed/get_task_list",
        method: "get",
        headers: get_headers(),
    });
}

export const api_pubmed_cancel_task = (task_id: any) => {
    return request({
        baseURL: import.meta.env.VITE_API_CURATION_GO,
        url: "/pubmed/cancel_task/"+task_id,
        method: "post",
        headers: get_headers(),
    });
}


 

 