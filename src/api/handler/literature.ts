import { get_headers, get_form_headers } from "../utils";
import { request } from "@/utils/request"; 

export const literatureAPI = {
    // Upload and process functions
    uploadAndProcessPDF(params: {indication_id: string; study_id?: string; file: any; is_force: boolean}) {
        const { indication_id, study_id, file, is_force } = params;
        
        const url = study_id 
            ? `/literature/process_pdf_with_study/${indication_id}/${study_id}/${is_force}`
            : `/literature/process_pdf/${indication_id}/${is_force}`; 
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url,
            method: 'POST',
            data: file,
            headers: get_form_headers(), 
        });
    },

    // literature.POST("/update_file_key/:literature_id", literature_handlers.UpdateFileKeyHandler)
    /**
     * Update the file key for a literature
     * @param literature_id The ID of the literature
     * @param data The updated data
     * @returns Promise with the response data
     */
    updateFileKey(literature_id: number, data: any) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/literature/update_file_key/${literature_id}`,
            method: 'POST',
            data: {file: data.file},
            headers: get_form_headers(),
        });
    },
   
    uploadAndProcessPDFWithDrug(params: {indication_id: string; drug_id: string; file: any; is_force: boolean}) {
        const { indication_id, drug_id, file, is_force } = params;
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/literature/process_pdf_with_drug/${indication_id}/${drug_id}/${is_force}`,
            method: 'POST',
            data: {file: file},
            headers: get_form_headers(),
        });
    }, 
    /**
     * Re-process all PDF documents
     * @param indication_id The ID of the indication
     * @param is_force Whether to force re-processing
     * @param data Any additional data required for processing
     * @returns Promise with the response data
     */
    reprocessAllPDFs(indication_id: string, is_force: boolean, data: any) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/literature/re_process_pdf_all/${indication_id}/${is_force}`,
            method: 'POST',
            headers: get_headers(),
            data,
        });
    },
    
    /**
     * Re-process a PDF document
     * @param indication_id The ID of the indication
     * @param literature_id The ID of the literature
     * @param is_force Whether to force re-processing
     * @returns Promise with the response data
     */
    reprocessPDF(indication_id: string, literature_id: string, is_force: boolean) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/literature/re_process_pdf/${indication_id}/${literature_id}/${is_force}`,
            method: 'POST',
            headers: get_headers(),
        });
    },
    
    /**
     * Update literature by ID
     * @param literature_id The ID of the literature to update
     * @param data The updated data
     * @returns Promise with the response data
     */
    update(literature_id: string, data: any) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/literature/update/${literature_id}`,
            method: 'POST',
            data,
            headers: get_headers(),
        });
    },
    
    /**
     * Delete literature from a study
     * @param study_id The ID of the study
     * @param literature_id The ID of the literature to delete
     * @returns Promise with the response data
     */
    removeFromStudy(study_id: string, literature_id: number) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/literature/delete_by_study/${study_id}/${literature_id}`,
            method: 'DELETE',
            headers: get_headers(),
        });
    },
    // literature.DELETE("/delete_by_drug/:drug_id/:literature_id", literature_handlers.DeleteLiteratureFromDrug)
    /**
     * Delete literature from a drug
     * @param drug_id The ID of the drug
     * @param literature_id The ID of the literature to delete
     * @returns Promise with the response data
     */
    removeFromDrug(drug_id: number, literature_id: number) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/literature/delete_by_drug/${drug_id}/${literature_id}`,
            method: 'DELETE',
            headers: get_headers(),
        });
    },
    /**
     * Get a list of literature
     * @param data The data to send
     * @returns Promise with the response data
     */
    getStudySourceList(data: any) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: '/literature/study_source_list',
            method: 'POST',
            data,
            headers: get_headers(),
        });
    },
    // drug_source_list
    /**
     * Get a list of literature by drug
     * @param data The data to send
     * @returns Promise with the response data
     */
    getDrugSourceList(data: any) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: '/literature/drug_source_list',
            method: 'POST',
            data,
            headers: get_headers(),
        });
    },
    
    /**
     * Move literature to a different study
     * @param data The data to send
     * @returns Promise with the response data
     */
    moveToStudy(data: any) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: '/literature/move',
            method: 'POST',
            data,
            headers: get_headers(),
        });
    },
    
    /**
     * Delete literature by type
     * @param indication_id The ID of the indication
     * @param literature_type The type of literature to delete
     * @returns Promise with the response data
     */
    removeByType(indication_id: string, literature_type: string) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/literature/delete_literature_from_study_by_type/${indication_id}/${literature_type}`,
            method: 'DELETE',
            headers: get_headers(),
        });
    },

    /**
     * Update the locker for a literature
     * @param literature_id The ID of the literature
     * @param data The updated data
     * @returns Promise with the response data
     */
    updateLocker(literature_id: string, data: any) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/literature/update_locker/${literature_id}`,
            method: 'POST',
            data,
            headers: get_headers(),
        });
    },
    // literature.DELETE("/delete_literature_by_study_id/:study_id", literature_handlers.DeleteLiteratureByStudyIdHandler)
    /**
     * Delete literature by study ID
     * @param study_id The ID of the study
     * @returns Promise with the response data
     */
    deleteByStudyId(study_id: string) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/literature/delete_literature_by_study_id/${study_id}`,
            method: 'DELETE',
            headers: get_headers(),
        });
    },
    // literature.DELETE("/delete_literature_by_drug_id/:drug_id", literature_handlers.DeleteLiteratureByDrugIdHandler)
    /**
     * Delete literature by drug ID
     * @param drug_id The ID of the drug
     * @returns Promise with the response data
     */
    deleteByDrugId(drug_id: number) {
        return request({
            baseURL: import.meta.env.VITE_API_CURATION_GO,
            url: `/literature/delete_literature_by_drug_id/${drug_id}`,
            method: 'DELETE',
            headers: get_headers(),
        });
    }
}
