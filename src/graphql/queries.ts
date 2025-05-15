// 集中管理所有的 GraphQL 查询语句
import gql from 'graphql-tag'

export const PURE_QUERIES = {
    PROJECT_LIST: gql`
        query ProjectList {
            ProjectList {
                id
                name
                indication_id
                created_at
                updated_at
            }
        }
    `, 
    PROJECT: gql`
        query Project($id: String!) {
            Project(id: $id) {
                id
                name
                indication_id
                created_at
                updated_at
            }
        } 
    `, 
    PROJECT_LIST_BY_INDICATION: gql`
        query ProjectListByIndication($indication_id: String!) {
            ProjectListByIndication(indication_id: $indication_id) {
                id
                name
                indication_id
                created_at
                updated_at
            }
        }
    `,
    INDICATION_LIST: gql`
        query IndicationList {
            IndicationList {
                id
                name
                keywords
                desc
            }
        }
    `,
    CUSTOM_TABLE: gql`
        query CustomTable($id: String!) {
            CustomTable(id: $id) {
                id
                created_at
                updated_at
                study_ids
                row_data
                status
                running_process
                enum_map
            }
        }
    `,
    CUSTOM_TABLE_LIST: gql`
        query CustomTableList {
            CustomTableList {
                id
                created_at
                updated_at
                study_ids
                row_data
                status
                running_process
                enum_map
            }
        }
    `, 
    PROMPT_LIB_LIST: gql`
        query PromptLibList {
            PromptLibList {
                label
                value
            }
        }
    `, 
    PROMPT_LIB_BY_ID: gql`
        query GetPromptLibById($id: String!) {
            GetPromptLibById(id: $id) {
                id
                systemPrompt
                instructionPrompt
                instructionModelName
                instructionModelConfig {
                    temperature
                    topP
                }
            }
        }
    `,
    SEARCH_CT_GOV: gql`
        query SearchCtgov($kwargs: SearchRequestEsParams!) {
            SearchCtgov(kwargs: $kwargs) {
                headers
                data
                total
                aggs {
            study_status {
                doc_count_error_upper_bound
                sum_other_doc_count
                buckets {
                    key
                    key_as_string
                    doc_count
                }
                meta {
                    field
                    values
                }
            }
            eligibility_criteria_sex_all {
                doc_count
                meta {
                    field
                    values
                }
            }
            eligibility_criteria_sex_male {
                doc_count
                meta {
                    field
                    values
                }
            }
            eligibility_criteria_sex_female {
                doc_count
                meta {
                    field
                    values
                }
            }
            eligibility_criteria_sex_other {
                doc_count
                meta {
                    field
                    values
                }
            }
            eligibility_criteria_ages {
                doc_count_error_upper_bound
                sum_other_doc_count
                buckets {
                    key
                    key_as_string
                    doc_count
                }
                meta {
                    field
                    values
                }
            }
            eligibility_criteria_volunteers {
                doc_count_error_upper_bound
                sum_other_doc_count
                buckets {
                    key
                    key_as_string
                    doc_count
                }
                meta {
                    field
                    values
                }
            }
            study_phase {
                doc_count_error_upper_bound
                sum_other_doc_count
                buckets {
                    key
                    key_as_string
                    doc_count
                }
                meta {
                    field
                    values
                }
            }
            study_type {
                doc_count_error_upper_bound
                sum_other_doc_count
                buckets {
                    key
                    key_as_string
                    doc_count
                }
                meta {
                    field
                    values
                }
            }
            study_type_observational_registry {
                doc_count_error_upper_bound
                sum_other_doc_count
                buckets {
                    key
                    key_as_string
                    doc_count
                }
                meta {
                    field
                    values
                }
            }
            study_type_expanded_access_individual {
                doc_count_error_upper_bound
                sum_other_doc_count
                buckets {
                    key
                    key_as_string
                    doc_count
                }
                meta {
                    field
                    values
                }
            }
            study_type_expanded_access_inter {
                doc_count_error_upper_bound
                sum_other_doc_count
                buckets {
                    key
                    key_as_string
                    doc_count
                }
                meta {
                    field
                    values
                }
            }
            study_type_expanded_access_treatment {
                doc_count_error_upper_bound
                sum_other_doc_count
                buckets {
                    key
                    key_as_string
                    doc_count
                }
                meta {
                    field
                    values
                }
            }
            with_results {
                doc_count_error_upper_bound
                sum_other_doc_count
                buckets {
                    key
                    key_as_string
                    doc_count
                }
                meta {
                    field
                    values
                }
            }
            document_section_has_protocol {
                doc_count_error_upper_bound
                sum_other_doc_count
                buckets {
                    key
                    key_as_string
                    doc_count
                }
                meta {
                    field
                    values
                }
            }
            funder_type_other_fed {
                doc_count
                meta {
                    field
                    values
                }
            }
            funder_type_other_gov {
                doc_count
                meta {
                    field
                    values
                }
            }
            funder_type_network {
                doc_count
                meta {
                    field
                    values
                }
            }
            funder_type_unknown {
                doc_count
                meta {
                    field
                    values
                }
            }
            funder_type_other {
                doc_count
                meta {
                    field
                    values
                }
            }
            funder_type_industry {
                doc_count
                meta {
                    field
                    values
                }
            }
            funder_type_nih {
                doc_count
                meta {
                    field
                    values
                }
            }
            funder_type {
                doc_count_error_upper_bound
                sum_other_doc_count
                buckets {
                    key
                    key_as_string
                    doc_count
                }
                meta {
                    field
                    values
                }
            }
            document_section_has_icf {
                doc_count_error_upper_bound
                sum_other_doc_count
                buckets {
                    key
                    key_as_string
                    doc_count
                }
                meta {
                    field
                    values
                }
            }
            document_section_has_sap {
                doc_count_error_upper_bound
                sum_other_doc_count
                buckets {
                    key
                    key_as_string
                    doc_count
                }
                meta {
                    field
                    values
                }
            }
        }
            }
        }
    `,
    GET_PROMPT_LIB_LIST: gql`
        query GetPromptLibList {
            GetPromptLibList {
                label
                value
            }
        }
    `, 
    GET_LLM_MODEL_LIST: gql`
        query GetLlmModelList {
            GetLlmModelList {
                key
                value
            }
        }
    `, 
   
     GET_PROMPT_LIB_BY_ID: gql`
        query GetPromptLibById($id: String!) {
            GetPromptLibById(id: $id) {
                id
                systemPrompt
                instructionPrompt
                instructionModelName
                instructionModelConfig {
                    temperature
                    topP
                }
            }
}
                `
    
    

    
}
    
    

