// 集中管理所有的 GraphQL 变更操作

import gql from 'graphql-tag'

export const PROJECT_MUTATIONS = {
    CREATE_PROJECT: gql`
      mutation CreateProject($name: String!, $indication_id: String!) {
        createProject(input: { name: $name, indication_id: $indication_id }) {
          id
          name
          indication_id
          created_at
          updated_at
        }
      }
    `, 
    UPDATE_PROJECT: gql`
      mutation UpdateProject($id: String!, $name: String!, $indication_id: String!) {
        updateProject(input: { id: $id, name: $name, indication_id: $indication_id }) {
          id
          name
          indication_id
          created_at
          updated_at
        }
      }
    `,  
    DELETE_PROJECT: gql`
      mutation DeleteProject($id: String!) {
        deleteProject(id: $id) {
          id
          name
          indication_id 
        }
      }
    `,
    
    
}