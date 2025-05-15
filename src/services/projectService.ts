import { useQuery } from '@vue/apollo-composable'

import {PROJECT_QUERIES} from "@/graphql/queries"

import type{
    ProjectResponse,
    ProjectListResponse
} from "@/graphql/types"
import { computed, ref } from 'vue'

export const useProjectService = () => {
    // 获取project列表
    const getProjectList = ()=>{
       
        const { result, loading, error ,refetch} = useQuery<ProjectListResponse>(PROJECT_QUERIES.PROJECT_LIST)
        const projectList = computed(() => result.value?.projectList || [])
        return {
            projectList,
            loading,
            error,
            refetch
        }
    }
    const getProjectById = (id: string) => {
        console.log('id', id)
        const { result, loading, error,refetch } = useQuery<ProjectResponse>(PROJECT_QUERIES.PROJECT, () => ({ id }))
        const project = computed(() => result.value?.project || null)
        return {
            project,
            loading,
            error,
            refetch
        }
    } 
    const getIndicationList = () => {
        const { result, loading, error, refetch } = useQuery<any>(PROJECT_QUERIES.INDICATION_LIST)
        const indicationList = computed(() => result.value?.indicationList || [])
        return {
            indicationList,
            loading,
            error,
            refetch
        }
    }

    return {
        getProjectList,
        getProjectById,
        getIndicationList
    }
}
