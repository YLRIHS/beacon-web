

import {get_headers,get_form_headers} from "../utils" 

import { request } from "@/utils/request";


export const pubmedAPI= {
    startTask(data: any) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: "/pubmed/start_task",
            method: "put",
            headers: get_form_headers(),
            data: data
        });
    },
    getTaskById(taskId: any) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/pubmed/get_task_info/${taskId}`,
            method: 'GET',
            headers: get_headers(),
        });
    },
    getTaskList() {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: '/pubmed/get_task_list',
            method: 'GET',
            headers: get_headers(),
        });
    },
    cancelTask(taskId: any) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/pubmed/cancel_task/${taskId}`,
            method: 'POST',
            headers: get_headers(),
        });
    }
}


 