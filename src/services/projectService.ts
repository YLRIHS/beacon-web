import { useQuery} from '@vue/apollo-composable'

import {PURE_QUERIES} from "@/graphql/queries"

import type{
    ProjectResponse,
    ProjectListResponse
} from "@/graphql/types"
import { computed  } from 'vue'

export const useProjectService = () => {
    // 获取project列表
    const getProjectList = ()=>{
       
        const { result, loading, error ,refetch} = useQuery<ProjectListResponse>(PURE_QUERIES.PROJECT_LIST)
        const projectList = computed(() => result.value?.projectList || [])
        return {
            projectList,
            loading,
            error,
            refetch
        }
    }
    const getProjectById = (id: string) => { 
        const { result, loading, error,refetch } = useQuery<ProjectResponse>(PURE_QUERIES.PROJECT, () => ({ id }))
        const project = computed(() => result.value?.project || null)
        return {
            project,
            loading,
            error,
            refetch
        }
    } 
    const getIndicationList = () => {
        const { result, loading, error, refetch } = useQuery<any>(PURE_QUERIES.INDICATION_LIST)
        const IndicationList = computed(() => result.value?.IndicationList || [])
        return {
            IndicationList,
            loading,
            error,
            refetch
        }
    }
    // SEARCH_CT_GOV

    const getSearchCtGov = (kwargs:any) => {
        const { result, loading, error, refetch,onResult, onError } = useQuery<any>(PURE_QUERIES.SEARCH_CT_GOV,kwargs) 
        const SearchCtgov = computed(() => result.value?.SearchCtgov || [])
        return {
            SearchCtgov,
            loading,
            error,
            refetch,
            onResult,
            onError
        }
    }
    // GET_PROMPT_LIB_BY_ID
    const getPromptLibById = (kwargs: any) => {  
        const { result, loading, error, refetch,onResult, onError } = useQuery<any>(PURE_QUERIES.GET_PROMPT_LIB_BY_ID,kwargs.ids) 
        const GetPromptLibById = computed(() => result.value?.GetPromptLibById || null)
        return {
            GetPromptLibById,
            loading,
            error,
            refetch,
            onResult,
            onError
        }
    }

    return {
        getProjectList,
        getProjectById,
        getIndicationList,
        getSearchCtGov,
        getPromptLibById
    }
}
