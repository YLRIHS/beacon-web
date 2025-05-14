import {get_headers,get_form_headers} from "../utils" 

import { request } from "@/utils/request";

 
export const drugAPI = {
    /**
     * Get drug by name
     */
    getDrugByName: (indicationId: string, drugName: string) =>
        request({
            url: `/drug/get_by_name/${indicationId}/${drugName}`,
            method: 'GET',
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO,
        }),

    /**
     * Get drug by application number
     */
    getDrugByApplicationNo: (indicationId: string, applicationNo: string) =>
        request({
            url: `/drug/get_by_application_no/${indicationId}/${applicationNo}`,
            method: 'GET',
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO,
        }),

    /**
     * Get drug by ID
     */
    getDrugByID: (indicationId: string, drugId: number) =>
        request({
            url: `/drug/get_by_id/${indicationId}/${drugId}`,
            method: 'GET',
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO,
        }),

    /**
     * Get drug list
     */
    getDrugList: (indicationId: string, pageIdx = 0, pageSize = 10000) =>
        request({
            url: `/drug/get_list/${indicationId}/${pageIdx}/${pageSize}`,
            method: 'GET',
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO,
        }),

    /**
     * Update drug
     */
    updateDrug: (indicationId: string, data:any) =>
        request({
            url: `/drug/update/${indicationId}/${data.id}`,
            method: 'POST',
            data,
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO,
        }),

    /**
     * Batch update drug
     */
    // drug.POST("/batch_update/:indication_id", drug_handlers.BatchUpdateDrugHandler)
    batchUpdateDrug: (indicationId:string,data:any) =>
        request({
            url: `/drug/batch_update/`+indicationId,
            method: 'POST',
            data,
            headers: get_form_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO,
        }), 
    /**
     * Create drug
     */
    createDrug: (indicationId:string, data:any) =>
        request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/drug/create/${indicationId}`,
            method: 'PUT',
            data,
            headers: get_headers()
        }),

        // drug.DELETE("/delete/:indication_id/:drug_id", drug_handlers.DeleteDrugHandler)
    deleteDrug: (indicationId:string, drugId:number) =>{
        return request({
            url: `/drug/delete/${indicationId}/${drugId}`,
            method: 'DELETE',
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO,
        })
    },
    getDrugTree(payload: any) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: "/drug/get_drug_tree",
            method: "post",
            headers: get_headers(),
            data: payload
        });
    },
    // drug.POST("/fetch_fda_literatures/:indication_id/:drug_id", drug_handlers.FetchFDALiteratureHandler)
    fetchFDALiterature: (indicationId:string, drugId:number) => {
        return request({
            url: `/drug/fetch_fda_literatures/${indicationId}/${drugId}`,
            method: 'POST',
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO,
        })
    },   
    // drug.GET("/get_drug_base_info_by_app_no/:app_no", drug_handlers.GetBaseInfoHandler)
    getDrugBaseInfoByAppNo: (appNo:string) => {
        return request({
            url: `/drug/get_drug_base_info_by_app_no/${appNo}`,
            method: 'GET',
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO,
        })
    }, 
     
}