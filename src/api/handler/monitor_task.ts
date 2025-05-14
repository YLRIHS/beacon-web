

import {get_headers} from "../utils" 

import { request } from "@/utils/request";

const URL = import.meta.env.VITE_API_CURATION_GO +'/monitor_task';  

export const monitorTaskAPI = {
    create(data: any) {
        return request({
            baseURL: URL,
            url: "/create",
            method: "put",
            headers: get_headers(),
            data: data
        });
    },
    update(data: any) {
        return request({
            baseURL: URL,
            url: "/update/" + data.id,
            method: "post",
            headers: get_headers(),
            data: data
        });
    },
    listByIndication(indicationId: any) {
        return request({
            baseURL: URL,
            url: "/list_by_indication/" + indicationId,
            method: "get",
            headers: get_headers(),
        });
    },
    delete(taskId: any) {
        return request({
            baseURL: URL,
            url: "/delete/" + taskId,
            method: "delete",
            headers: get_headers(),
        });
    },
    execute(taskId: any) {
        return request({
            baseURL: URL,
            url: "/exec/" + taskId,
            method: "post",
            headers: get_headers(),
        });
    },
    cancel(taskId: any) {
        return request({
            baseURL: URL,
            url: "/cancel/" + taskId,
            method: "post",
            headers: get_headers(),
        });
    }
}

export const createMonitorTaskAPI = (data: any) => {
    return request({
        baseURL: URL,
        url: "/create",
        method: "put",
        headers: get_headers(),
        data: data
    });
}

export const updateMonitorTaskAPI = (data: any) => {
    return request({
        baseURL: URL,
        url: "/update/"+data.id,
        method: "post",
        headers: get_headers(),
        data: data
    });
}

 
// monitor_task.GET("/list_by_indication/:indication_id", monitor_task_handlers.ListMonitorTasksByIndicationHandler)

export const getMonitorTaskListAPI = (indication_id: any) => {
    return request({
        baseURL: URL,
        url: "/list_by_indication/"+indication_id,
        method: "get",
        headers: get_headers(),
    });
}

export const deleteMonitorTaskByIdAPI = (task_id: any) => {
    return request({
        baseURL: URL,
        url: "/delete/"+task_id,
        method: "delete",
        headers: get_headers(),
    });
}

export const execMonitorTaskByIdAPI = (task_id: any) => {
    return request({
        baseURL: URL,
        url: "/exec/"+task_id,
        method: "post",
        headers: get_headers(),
    });
}

// monitor_task.POST("/cancel/:task_id", monitor_task_handlers.CancelMonitorTaskHandler)

export const cancelMonitorTaskByIdAPI = (task_id: any) => {
    return request({
        baseURL: URL,
        url: "/cancel/"+task_id,
        method: "post",
        headers: get_headers(),
    });
}
