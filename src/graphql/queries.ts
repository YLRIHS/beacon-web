// 集中管理所有的 GraphQL 查询语句
import gql from 'graphql-tag'

export const PROJECT_QUERIES = {
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
    ` 
}