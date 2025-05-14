import {get_headers} from "../utils" 
import { request } from "@/utils/request";

export const customStudyTableAPI = {
    
  createCustomStudy(data: any) {
    return request({
        baseURL: import.meta.env.VITE_API_CURATION_GO,
        url: '/custom_study_table/new',
        method: 'PUT',
        data,
        headers: get_headers()
    });
  },

   
  addCustomStudy(data: any)  {
    return request({
        baseURL: import.meta.env.VITE_API_CURATION_GO,
        url: '/custom_study_table/add',
        method: 'POST',
        data,
        headers: get_headers()
    });
  },
 
  deleteCustomTable(tableId: string) {
    return request({
        baseURL: import.meta.env.VITE_API_CURATION_GO,
        url: `/custom_study_table/delete/${tableId}`,
        method: 'DELETE',
        headers: get_headers()
    });
  },

  getColumnDefinitions(tableId: number) {
    return request({
        baseURL: import.meta.env.VITE_API_CURATION_GO,
        url: `/custom_study_table/get_column_definitions/${tableId}`,
        method: 'GET',
        headers: get_headers()
    });
  },
 
  updateColumnDisplay(tableId: string, data: any)  {
    return request({
        baseURL: import.meta.env.VITE_API_CURATION_GO,
        url: `/custom_study_table/update_column_display/${tableId}`,
        method: 'POST',
        data,
        headers: get_headers()
    });
  },

  getCustomTableList(indication_id: string) {
    return request({
        baseURL: import.meta.env.VITE_API_CURATION_GO,
        url: '/custom_study_table/get_table_list/'+indication_id,
        method: 'GET',
        headers: get_headers()
    });
  },

  updateAllCustomColumn(tableId: string, data: any) {
    return request({
        baseURL: import.meta.env.VITE_API_CURATION_GO,
        url: `/custom_study_table/update_all_custom_column/${tableId}`,
        method: 'POST',
        data,
        headers: get_headers()
    });
  },

  deleteCustomColumn(tableId: string, data: any) {
    return request({
        baseURL: import.meta.env.VITE_API_CURATION_GO,
        url: `/custom_study_table/delete_custom_column/${tableId}?column_name=${data.name}`,
        method: 'DELETE', 
        headers: get_headers()
    });
  },

  execColumnTask(tableId: number, data: any)  {
    return request({
        baseURL: import.meta.env.VITE_API_CURATION_GO,
        url: `/custom_study_table/exec_column_task/${tableId}`,
        method: 'POST',
        data,
        headers: get_headers()
    });
  },

  cancelColumnTask(tableId: string)  {
    return request({
        baseURL: import.meta.env.VITE_API_CURATION_GO,
        url: `/custom_study_table/cancel_column_task/${tableId}`,
        method: 'POST', 
        headers: get_headers()
    });
  }, 
  getCustomTableById(tableId: number){
    return request({
        baseURL: import.meta.env.VITE_API_CURATION_GO,
        url: `/custom_study_table/get_table_by_id/${tableId}`,
        method: 'GET',
        headers: get_headers()
    });
  },
  // custom_study_table.GET("/get_table_status_by_id/:table_id", custom_study_handlers.GetCustomTableStatus)
  getCustomTableStatusById(tableId: number){
    return request({
        baseURL: import.meta.env.VITE_API_CURATION_GO,
        url: `/custom_study_table/get_table_status_by_id/${tableId}`,
        method: 'GET',
        headers: get_headers()
    });
  },
};
