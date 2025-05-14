import {get_headers, get_form_headers} from "../utils" 
import { request } from "@/utils/request";


export const pureEvidenceAPI = {
    getTableList: (indicationId: string) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/pure_evidence/get_table_list/${indicationId}`,
            method: "GET",
            headers: get_headers()
        });
    },
    createTable: (data: any,indicationId: string) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: "/pure_evidence/create_table/"+indicationId,
            method: "PUT",
            headers: get_headers(),
            data
        });
    },
    updateTable: (id: string, data: any) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/pure_evidence/update_table/${id}`,
            method: "POST",
            headers: get_headers(),
            data
        });
    },
    deleteTable: (id: string) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/pure_evidence/delete_table/${id}`,
            method: "DELETE",
            headers: get_headers()
        });
    },
    getTableColumnDefinitions: (id: number) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/pure_evidence/get_table_column_definitions/${id}`,
            method: "GET",
            headers: get_headers()
        });
    },
    updateTableColumnDefinitions: (id: number, data: any) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/pure_evidence/update_table_column_definitions/${id}`,
            method: "POST",
            headers: get_headers(),
            data
        });
    },
    loadDataFromCSV: (data: any) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: "/pure_evidence/load_data_from_csv",
            method: "POST",
            headers: get_form_headers(),
            data
        });
    },
    newEvidenceTask: (indicationId: string, data: any) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/pure_evidence/new_evidence_task/${indicationId}`,
            method: "PUT",
            headers: get_headers(),
            data
        });
    },
    
    

}

 