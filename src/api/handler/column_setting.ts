import { get_headers } from "../utils";
import { request } from "@/utils/request";

export interface ColumnDefinition {
    id: string;
    
}

export const columnSettingAPI = {
    /**
     * Get column definition list for an indication
     */
    getColumnDefinitionList: (indicationId: string) => 
        request({
            url: `/indication_columns/get_column_definition_list/${indicationId}`,
            method: 'GET',
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO,
        }),

    /**
     * Get a specific column by ID
     */
    getColumnById: (columnId: string) => 
        request({
            url: `/indication_columns/get_column_definition/${columnId}`,
            method: 'GET',
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO,
        }),

    /**
     * Update a column definition
     */
    updateColumn: (columnId: string, data: Partial<ColumnDefinition>) => 
        request({
            url: `/indication_columns/update_column_definition/${columnId}`,
            method: 'POST',
            data,
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO,
        }),

    /**
     * Create a new column definition
     */
    createColumn: (data: Omit<ColumnDefinition, 'id'>) => 
        request({
            url: `/indication_columns/create_column_definition`,
            method: 'PUT',
            data,
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO,
        }),

    /**
     * Delete a column definition
     */
    deleteColumn: (columnId: string) => 
        request({
            url: `/indication_columns/delete_column_definition/${columnId}`,
            method: 'DELETE',
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO,
        }),

    /**
     * Get default variables/columns
     */
    getDefaultVariables: () => 
        request({
            url: `/indication_columns/get_default_variables`,
            method: 'GET',
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO,
        }), 

    newTask: (indicationId: string, data: any) =>
        request({
            url: `/indication_columns/new_task/${indicationId}`,
            method: 'PUT',
            data,
            headers: get_headers(),
            baseURL: import.meta.env.VITE_API_CURATION_GO,
        }),

};