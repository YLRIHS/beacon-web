


import {get_headers} from "../utils" 

import { request } from "@/utils/request";

export const generalTaskAPI = {
    /**
     * Fetch the list of all tasks
     * @returns Promise with task list response
     */
    getTaskList() {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: '/general_task/get_task_list',
            method: 'GET',
            headers: get_headers(),
        });
    },

    /**
     * Fetch task details by ID
     * @param taskId The ID of the task to retrieve
     * @returns Promise with task details
     */
    getTaskById(taskId: string) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/general_task/get_task_by_id/${taskId}`,
            method: 'GET',
            headers: get_headers(),
        });
    },

    /**
     * Stop a running task by ID
     * @param taskId The ID of the task to stop
     * @returns Promise with stop operation result
     */
    stopTask(taskId: string) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/general_task/stop_task/${taskId}`,
            method: 'POST',
            headers: get_headers(),
        });
    }
}

 