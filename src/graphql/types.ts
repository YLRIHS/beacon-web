// 定义所有与 GraphQL 相关的类型

export interface Project {
    id: string
    name: string
    indication_id: string
    created_at: string
    updated_at: string
}
 
export interface CreateProject { 
    name: string
    indication_id: string 
}
 

// 查询结果类型
export interface ProjectListResponse {
    projectList: Project[]
}

export interface ProjectResponse {
    project: Project
}