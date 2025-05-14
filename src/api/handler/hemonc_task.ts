
import { request } from "@/utils/request";
import {get_headers} from "../utils";


export const hemoncTaskAPI = {
    newTask(data: any)  {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: "/hemonc_task/new_task",
            method: "put",
            headers: get_headers(),
            data: data
        });
    },
    getTaskList(){
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: "/hemonc_task/get_task_list",
            method: "get",
            headers: get_headers(),
        });
    },
    getTaskById(taskId: number) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/hemonc_task/get_task_by_id/${taskId}`,
            method: "get",
            headers: get_headers()
        });
    },
    execTask(taskId: number) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/hemonc_task/exec/${taskId}`,
            method: "get",
            headers: get_headers()
        });
    },
    stopTask(taskId: number) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/hemonc_task/stop/${taskId}`,
            method: "get",
            headers: get_headers()
        });
    },

}
 