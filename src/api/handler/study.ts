import {get_headers ,get_form_headers} from  "../utils"

import { request } from "@/utils/request";


const URL = import.meta.env.VITE_API_CURATION_GO +'/study'; 
 
 
 
export const studyAPI = {
    getStudyByNctId(nctId: string) {
        return request({
            baseURL: URL,
            url: `/get_info_by_nct_id/${nctId}`,
            method: "get",
            headers: get_headers(),
        });
    },
    getStudyById(studyId: string) {
        return request({
            baseURL: URL,
            url: `/get_info_by_id/${studyId}`,
            method: "get",
            headers: get_headers(),
        });
    },
    getStudyList(params: { indication_id: string, page_idx: number, page_size: number }) {
        return request({
            baseURL: URL,
            url: `/list/${params.indication_id}/${params.page_idx}/${params.page_size}`,
            method: "get",
            headers: get_headers(),
        });
    },
    getLiteratureList(studyId: any) {
        return request({
            baseURL: URL,
            url: `/literature_list/${studyId}`,
            method: "get",
            headers: get_headers(),
        });
    },
    getLiteratureInfo(literatureId: string) {
        return request({
            baseURL: URL,
            url: `/get_literature_info/${literatureId}`,
            method: "get",
            headers: get_headers(),
        });
    },
    searchByKeyword(payload: any) {
        return request({
            baseURL: URL,
            url: "/search_by_keyword",
            method: "post",
            headers: get_headers(),
            data: payload
        });
    },
    getPdfByKey(payload: any) {
        return request({
            baseURL: URL,
            url: "/get_pdf_by_key",
            method: "post",
            headers: get_headers(),
            data: payload 
        });
    },
    deleteStudy(indicationId: string, studyId: string) {
        return request({
            baseURL: URL,
            url: `/delete/${indicationId}/${studyId}`,
            method: "delete",
            headers: get_headers(),
        });
    },
    updateStudy(studyId: string, payload: any) {
        return request({
            baseURL: URL,
            url: `/update/${studyId}`,
            method: "post",
            headers: get_headers(),
            data: payload
        });
    },
    createStudy(indicationId: string, payload: any) {
        return request({
            baseURL: URL,
            url: `/create/${indicationId}`,
            method: "post",
            headers: get_headers(),
            data: payload
        });
    },
    fetchPubmedLiterature(indicationId: string, studyId: string) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO + '/study',
            url: `/fetch_pubmed_literature/${indicationId}/${studyId}`,
            method: "post",
            headers: get_headers(),
        });
    },
    groupClassifyLiterature(studyId: string) {
        return request({
            baseURL: URL,
            url: `/group_classify_literature/${studyId}`,
            method: "post",
            headers: get_headers()
        });
    },
    reClassifyAllLiterature(indicationId: string) {
        return request({
            baseURL: URL,
            url: `/group_classify_all_literature/${indicationId}`,
            method: 'POST',
            headers: get_headers(),
        });
    },
    batchUpdateStudyName(payload: any) {
        return request({
            baseURL: URL,
            url: "/batch_update_study_name",
            method: "post",
            headers: get_form_headers(),
            data: payload
        });
    },
    getStudyTree(payload: any) {
        return request({
            baseURL: URL,
            url: "/get_study_tree",
            method: "post",
            headers: get_headers(),
            data: payload
        });
    }
}
