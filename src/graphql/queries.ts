// 集中管理所有的 GraphQL 查询语句
import gql from 'graphql-tag'

export const PROJECT_QUERIES = {
    GET_PROJECT_LIST: gql`
        query ProjectList {
            projectList {
                id
                name
                indication_id
                created_at
                updated_at
            }
        }
    `, 
    GET_PROJECT: gql`
        query Project($id: String!) {
            project(id: $id) {
                id
                name
                indication_id
                created_at
                updated_at
            }
        } 
    `, 
    GET_PROJECT_LIST_BY_INDICATION: gql`
        query ProjectListByIndication($indication_id: String!) {
            projectListByIndication(indication_id: $indication_id) {
                id
                name
                indication_id
                created_at
                updated_at
            }
        }
    `,
    GET_INDICATION_LIST: gql`
        query IndicationList {
            indicationList {
                id
                name
                keywords
                desc
            }
        }
    `,
    
}