// 集中管理所有的 GraphQL 变更操作

import gql from 'graphql-tag'

export const PROJECT_MUTATIONS = {
  CREATE_PROJECT: gql`
    mutation CreateProject($name: String!, $indication_id: String!) {
    CreateProject(input: { name: $name, indication_id: $indication_id }) {
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
    UpdateProject(input: { id: $id, name: $name, indication_id: $indication_id }) {
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
    DeleteProject(id: $id) {
      id
      name
      indication_id 
    }
    }
  `,
  CREATE_OR_UPDATE_PROMPT_LIB: gql`
    mutation CreateOrUpdatePromptLib($id: String!, $systemPrompt: String!, $instructionPrompt: String!, $instructionModelName: String!, $instructionModelConfig: ModelConfigInput!) {
    CreateOrUpdatePromptLib(
      id: $id,
      systemPrompt: $systemPrompt,
      instructionPrompt: $instructionPrompt,
      instructionModelName: $instructionModelName,
      instructionModelConfig: $instructionModelConfig
    ) {
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
}
