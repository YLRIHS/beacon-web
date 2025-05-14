import {get_headers} from "../utils" 

import { request } from "@/utils/request";


export const clinicalTrialsGovAPI = {
    searchOnline: (data: any) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: "/clinical_trials_gov/search_online?condition="+data.condition+"&term="+data.term+"&location="+data.location+"&intervention="+data.intervention+"&indication="+data.indication,
            method: "get",
            headers: get_headers(),
            data: data
        });
    },
    

    searchDatabase: (data: any) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: "/clinical_trials_gov/search_database",
            method: "post",
            headers: get_headers(),
            data: data
        });
    },

    searchIDs: (data: any) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: "/clinical_trials_gov/search_ids",
            method: "post",
            headers: get_headers(),
            data: data
        });
    },

    getInfoByNctId: (data: any) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: "/clinical_trials_gov/get_info_by_nct_id?nct_id="+data.nct_id,
            method: "get",
            headers: get_headers(), 
        });
    },

    importByNctIds: (data: any) => {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: "/clinical_trials_gov/import_by_nct_ids",
            method: "post",
            headers: get_headers(),
            data: data
        });
    }
}