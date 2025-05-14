import {get_headers} from "../utils"; 
import { request } from "@/utils/request";


export const evidenceTaskAPI = {
    newTask(indicationId: string, data: any) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/evidence_task/new_task/${indicationId}`,
            method: "PUT",
            headers: get_headers(),
            data
        });
    },
    getTaskList: (indicationId: string) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/evidence_task/get_task_list/${indicationId}`,
            method: "GET",
            headers: get_headers()
        });
    },
    getTaskById: (taskId: number) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/evidence_task/get_task_by_id/${taskId}`,
            method: "GET",
            headers: get_headers()
        });
    },
    getFilterTableData: (taskId: number, pageIdx: number, pageSize: number, data: any) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/evidence_task/get_filter_table_data/${taskId}/${pageIdx}/${pageSize}`,
            method: "POST",
            headers: get_headers(),
            data:data
        });
    },
    updateCriteria: (taskId: number, data: any) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/evidence_task/update_criteria/${taskId}`,
            method: "POST",
            headers: get_headers(),
            data
        });
    },
    updateTaskTitle: (taskId: number, data: any) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/evidence_task/update_task_title/${taskId}`,
            method: "POST",
            headers: get_headers(),
            data
        });
    },
    runScreening(taskId: number) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/evidence_task/run_screening/${taskId}`,
            method: "POST",
            headers: get_headers()
        });
    },
    cancelScreening(taskId: number) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/evidence_task/cancel_screening/${taskId}`,
            method: "POST",
            headers: get_headers()
        });
    },
    getEfficacy(taskId: number, data: any) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/evidence_task/get_efficacy/${taskId}`,
            method: "POST",
            headers: get_headers(),
            data
        });
    },
    getEvidenceSetting(indicationId: string) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/evidence_task/get_evidence_setting/${indicationId}`,
            method: "GET",
            headers: get_headers()
        }); 
    },

    
    updateEvidenceSetting(indicationId: string, data: any) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/evidence_task/update_evidence_setting/${indicationId}`,
            method: "POST",
            headers: get_headers(),
            data
        });
    },
    deleteTask: (taskId: number) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/evidence_task/delete_task/${taskId}`,
            method: "DELETE",
            headers: get_headers()
        });
    }

}