import { get_headers } from "../utils";
import { request } from "@/utils/request";

export interface TaskDefinition {
    taskId: number;
    // Add other column properties based on your actual data model
}


export const standardizeTableAPI = {
    // extract_table := r.Group("/standardize_table")
    // execTask(taskId: string, data?: any) {
    //     return request({
    //         url: `/standardize_table/exec/${taskId}`,
    //         method: 'post',
    //         headers: get_headers(),
    //         data,
    //         baseURL: import.meta.env.VITE_API_CURATION_GO
    //     });
    // },

    cancelTask(taskId: TaskDefinition['taskId']) {
        return request({
            url: `/standardize_table/cancel/${taskId}`,
            method: 'post',
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO
        });
    },

    getTask(taskId: TaskDefinition['taskId']) {
        return request({
            url: `/standardize_table/get_task/${taskId}`,
            method: 'get',
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO
        });
    },

    getTaskList(indicationId: string, source: string) {
        return request({
            url: `/standardize_table/get_task_list/${indicationId}/${source}`,
            method: 'get',
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO
        });
    },

    createTask(data: any) {
        return request({
            url: '/standardize_table/create',
            method: 'put',
            headers: get_headers(),
            data,
            baseURL: import.meta.env.VITE_API_CURATION_GO
        });
    },
    saveTask(taskId: TaskDefinition['taskId'], data: any) {
        return request({
            url: `/standardize_table/save/${taskId}`,
            method: 'post',
            headers: get_headers(),
            data,
            baseURL: import.meta.env.VITE_API_CURATION_GO
        });
    },
   
    execTask(taskId: TaskDefinition['taskId'], data: any) {
        return request({
            url: `/standardize_table/exec/${taskId}`,
            method: 'post',
            headers: get_headers(),
            data,
            baseURL: import.meta.env.VITE_API_CURATION_GO
        });
    },  
    deleteTask(taskId: TaskDefinition['taskId']) {
        return request({
            url: `/standardize_table/delete/${taskId}`,
            method: 'delete',
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO
        });
    }
    

}