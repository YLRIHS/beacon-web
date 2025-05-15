import { defineStore } from "pinia"; 

export const useBasicStore = defineStore("basic", {
    state: () => ({ 
        searchKeyword: '',
        filterData:<any>[],
        //购物车状态
        cartStatus: false,
        cartShopInfo: <any>[],
        indicationList: <any>[],
        currentIndicationLabel:<any>{}, 
        tableFilterData: <any>{},
        tableInfo: <any>{},
        pageSize: 10,
        currentPage: 1,
        pageIdx: 1,
        total: 0,
        keyword: '',
        filters: <any>{},
        filterSubmit:<any>({
            'study_status': [],
            'eligibility_criteria_ages': [],
            'study_phase': [],
            'study_type': [],
            'with_results': [],
            'funder_type': [],
            'document_section': [],
            'document_section_has_sap': false,
            'document_section_has_protocol': false,
            'document_section_has_icf': false,
            'eligibility_criteria_volunteers': false,
            'study_type_observational_patient_registry': false,
            'funder_type_nih': false,
            'funder_type_other_fed': false,
            'funder_type_industry':false,
            'funder_type_other': false,
            'Sex': '',
        }),
        isApplyFilter: false,
        noNeedSorts:['study_title',,'conditions','interventions','phase','collaborators','eligibility_criteria','study_documents','locations','outcome_measures'],
        filterOption:<any> [
            {
                key:'NOT_YET_RECRUITING',
                value:'Not yet recruiting studies', 
            },
            {
                key:'RECRUITING',
                value:'Recruiting studies',
            },
            {
                key:'ENROLLING_BY_INVITATION',
                value:'Enrolling by invitation studies',
            },
            {
                key:'ACTIVE_NOT_RECRUITING',
                value:'Active, not recruiting studies',
            },
            {
                key:'COMPLETED',
                value:'Completed studies',
            },
            {
                key:'WITHDRAWN',
                value:'Withdrawn studies',
            },
            {
                key:'TERMINATED',
                value:'Terminated studies',
            },
            {
                key:'SUSPENDED',
                value:'Suspended studies',
            },
            {
                key:'UNKNOWN',
                value:'Unknown status studies',
            },
            {
                key:'eligibility_criteria_sex_female',
                value:'Female participants '
            },

            {
                key:'eligibility_criteria_sex_male',
                value:'Male participants'
            },
            {
                key:'CHILD',
                value:'Child (birth - 17)',
            },
            {
                key:'ADULT',
                value:'Adult (18 - 64)',
            },
            {
                key:'OLDER_ADULT',
                value:'Older adult (65+)',
            },
            {
                key:'true',
                value:'Accepts healthy volunteers'
            },
            {
                key:'EARLY_PHASE1',
                value:'Early Phase 1',
            },
            {
                key:'PHASE_1',
                value:'1',
            },
            {
                key:'PHASE_2',
                value:'2',
            },
            {
                key:'PHASE_3',
                value:'3',
            },
            {
                key:'PHASE_4',
                value:'4',
            }, 
            {
                key:'NA',
                value:'Not applicable',
            },
            {
                key:'INTERVENTIONAL',
                value:'Interventional',
            },
            {
                key:'OBSERVATIONAL',
                value:'Observational',
            },
            {
                key:'OBSERVATIONAL_PATIENT_REGISTRY',
                value:'Observational Patient Registry',
            },
            {
                key:'TREATMENT',
                value:'Treatment',
            },
            {
                key:'PREVENTION',
                value:'Prevention',
            },
            {
                key:'DIAGNOSTIC',
                value:'Diagnostic',
            },
            {
                key:'SUPPORTIVE_CARE',
                value:'Supportive Care',
            },
            {
                key:'SCREENING',
                value:'Screening',
            },
            {
                key:'HEALTH_SERVICES_RESEARCH',
                value:'Health Services Research',
            },
            {
                key:'BASIC_SCIENCE',
                value:'Basic Science',
            },
            {
                key:'DEVICE_FEASIBILITY',
                value:'Device Feasibility',
            },
            {
                key:'OTHER',
                value:'Other',
            }, 
            {
                key:'INDUSTRY',
                value:'Industry',
            },
            {
                key:'NIH',
                value:'Funded by NIH',
            },
            {
                key:'FED',
                value:'Other U.S. federal agency',
            },{
                key:"INDUSTRY",
                value:"Industry",
            },
            {
                key:"OTHER",
                value:"All others", 
            },
            {
                key:"study_type_observational_patient_registry",
                value:"Patient registries",
            },
            {
                key:"study_type_expanded_access_individual",
                value:"Individual patients",
            },
            {
                key:"study_type_expanded_access_intermediate",
                value:"Intermediate-size population",
            },
            {
                key:"study_type_expanded_access_treatment",
                value:"Treatment IND/Protocol ",
            },
            {
                key:'document_section_has_sap',
                value:'Statistical analysis plans',
            } 
        ],
        tableLoading: false,
        filterMaps: <any>{},
        filterStr: <any>[],
        dataTableHeader: <any>[],
        startTimer:false,
        dateFilters: <any> {},
        pureLists: <any> [],
    }),
    actions: { 
        // filterData
        setFilterData(filterData: any) {
            this.filterData = filterData;
        },
        // searchKeyword
        setSearchKeyword(searchKeyword: string) {
            this.searchKeyword = searchKeyword;
        },
        // cartStatus
        setCartStatus(cartStatus: boolean) {
            this.cartStatus = cartStatus;
        }, 
        // cartShopInfo
        setCartShopInfo(cartShopInfo: any) { 
            this.cartShopInfo = cartShopInfo; 
        },
        changeCartShopInfo(items: any) {
            this.cartShopInfo = this.cartShopInfo.filter((i: any) => i.id !== items.id);
        },
        setIndicationList(indicationList: any) {
            this.indicationList = indicationList;
        },
        // currentIndicationLabel
        setCurrentIndicationLabel(currentIndicationLabel: any) {
            this.currentIndicationLabel = currentIndicationLabel;
        },
        // tableFilterData
        setTableFilterData(tableFilterData: any) { 
            this.tableFilterData = tableFilterData
             
        }, 
        // tableInfo
        setTableInfo(tableInfo: any) { 
            
            
            const columns = localStorage.getItem('DataTableHeader');
            if (columns) {
                const parsedColumns = JSON.parse(columns);
                let newColumns:any =[]; 
                tableInfo.headers.forEach((header: any) => {
                    
                    const columnExists = parsedColumns.find((item: any) => item.name === header);
                    
                    if (columnExists) {
                        newColumns.push(columnExists);
                    }else { 
                        newColumns.push({
                            is_used: true,
                            name: header,
                            order: newColumns.length + 1,
                        });
                    }
                }) 

                // newColumns 按照order 排序
                newColumns = newColumns.sort((a: any, b: any) => a.order - b.order);
                // 重新设置 localStorage

                localStorage.setItem('DataTableHeader', JSON.stringify(newColumns));
                this.dataTableHeader = newColumns;
            }else{
                this.dataTableHeader = tableInfo.headers.map((item: any, index: number) => {
                    return {
                        is_used: true,
                        name: item,
                        order: index + 1, 
                    }
                });
                localStorage.setItem('DataTableHeader', JSON.stringify(this.dataTableHeader)); 
            } 

            this.tableInfo = {
                data: tableInfo.data,
                headers: this.dataTableHeader,
            };
        },
        
        // filters
        setFilters(filters: any) {
            this.filters = filters;
        },
        // pageSize
        setPageSize(pageSize: number) {
         
            this.pageSize = pageSize;
        },
        // currentPage
        setCurrentPage(currentPage: number) {
          
            this.currentPage = currentPage;
        },
        // pageIdx
        setPageIdx(pageIdx: number) {
            this.pageIdx = pageIdx;
        },
        // total
        setTotal(total: number) {
            this.total = total;
        },
        clearKeyword() {
            this.keyword = '';
        },
        // filterSubmit
        clearFilterSubmit() {
            this.filterSubmit = {
                'study_status': [],
                'eligibility_criteria_ages': [],
                'study_phase': [],
                'study_type': [],
                'with_results': [],
                'funder_type': [],
                'document_section': [],
                'document_section_has_sap': false,
                'document_section_has_protocol': false,
                'document_section_has_icf': false,
                'eligibility_criteria_volunteers': false,
                'study_type_observational_patient_registry': false
            };
        },
        // 还原初始页码
        resetPage() {
            this.currentPage = 1;
            this.pageIdx = 1; 
        },
        // isApplyFilter
        setIsApplyFilter(isApplyFilter: boolean) {
            this.isApplyFilter = isApplyFilter;
        }, 
        // tableLoading
        setTableLoading(tableLoading: boolean) {
            this.tableLoading = tableLoading;
        },
        clear(){ 
           
            this.tableInfo = {};
            this.pageSize = 10;
            this.currentPage = 1;
            this.pageIdx = 1;
            this.total = 0;
            this.keyword = '';
            this.filters = {};
            this.filterSubmit = {
                'study_status': [],
                'eligibility_criteria_ages': [],
                'study_phase': [],
                'study_type': [],
                'with_results': [],
                'funder_type': [],
                'document_section': [],
                'document_section_has_sap': false,
                'document_section_has_protocol': false,
                'document_section_has_icf': false,
                'eligibility_criteria_volunteers': false,
                'study_type_observational_patient_registry': false
            };
            this.isApplyFilter = false; 
        },
        setFilterMaps(filterMaps: any) {
            this.filterMaps = filterMaps;
        },
        setFilterStr(result:any){
             
            this.filterStr = result;
        },
        setTimers(startTimer:boolean){
            this.startTimer = startTimer;
        },
        // dateFilters
        setDateFilters(dateFilters:any){
            this.dateFilters = dateFilters;
        },
        // pureLists
        setPureLists(pureLists:any){
            this.pureLists = pureLists.map((item: any) => ({
                ...item,
                checked: false
            }));
        },
    }
})