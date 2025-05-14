
import {get_headers} from "../utils" 

import { request } from "@/utils/request";

const URL = import.meta.env.VITE_API_CURATION_GO +'/global'; 


export const globalAPI = {
    fetchFilterOptions() {
        return request({
            baseURL: URL,
            url: "/get_filter_option",
            method: "get",
            headers: get_headers(),
        });
    },
    fetchIndications() {
        return request({
            baseURL: URL,
            url: "/indication/list",
            method: "get",
            headers: get_headers(),
        });
    },
    fetchFilterMaps() {
        return request({
            baseURL: URL,
            url: "/get_filter_maps",
            method: "get",
            headers: get_headers(),
        });
    },
    fetchLiteratureTypes() {
        return request({
            baseURL: URL,
            url: "/get_literature_types",
            method: "get",
            headers: get_headers(),
        });
    },
    // global.GET("/get_submission_types", global_handlers.GetGlobalSubmissionTypes)
    fetchSubmissionTypes() {
        return request({
            baseURL: URL,
            url: "/get_submission_types",
            method: "get",
            headers: get_headers(),
        });
    },
   
    fetchSubmissionClassTypes() {
        return request({
            baseURL: URL,
            url: "/get_submission_class_types",
            method: "get",
            headers: get_headers(),
        });
    },
    // /global/get_llm_model_names
    fetchLLMModelNames() {
        return request({
            baseURL: URL,
            url: "/get_llm_model_names",
            method: "get",
            headers: get_headers(),
        });
    },
    
}