import {get_form_headers} from "./utils" 

import { request } from "@/utils/request"; 
 

export const api_clinical_trials_gov_import_from_json = (data: any) => { 
    return request({
        baseURL: import.meta.env.VITE_API_CURATION_GO,
        url: "/clinical_trials_gov/import_from_json",
        method: "post",
        headers: get_form_headers(),
        data: data
    });
}


