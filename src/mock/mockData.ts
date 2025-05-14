const mockData = [
  { 
    id: 1, 
    title: "Multiple myeloma : 2024 update on diagnosis, risk-stratification, and management.",
    author:'Rajkumar SV.',
    journal:'Am J Hematol. 2024 Sep;99(9):1802-1824. doi: 10.1002/ajh.27422. Epub 2024 Jun 28.',
    content: "DISEASE OVERVIEW: Multiple myeloma accounts for approximately 10% of hematologic malignancies. DIAGNOSIS: The diagnosis requires 10% clonal bone marrow plasma cells or a biopsy proven plasmacytoma plus evidence of one or more multiple myeloma defining …" 
  },
  { 
    id: 2, 
    title: "Advances in the treatment of multiple myeloma.",
    author:'Smith A.',
    journal:'Blood. 2024 Aug;134(8):1234-1245. doi: 10.1182/blood.2024001234. Epub 2024 Jul 15.',
    content: "The treatment landscape for multiple myeloma has evolved significantly over the past decade. New therapies have improved patient outcomes and survival rates. This review discusses the latest advancements in treatment options and their clinical implications." 
  },
  { 
    id: 3, 
    title: "Novel biomarkers in multiple myeloma.",
    author:'Johnson B.',
    journal:'J Clin Oncol. 2024 Jul;42(7):567-578. doi: 10.1200/JCO.2024005678. Epub 2024 Jun 10.',
    content: "Biomarkers play a crucial role in the diagnosis and management of multiple myeloma. This article explores the latest research on novel biomarkers and their potential impact on patient care." 
  },
  { 
    id: 4, 
    title: "Immunotherapy in multiple myeloma: Current status and future directions.",
    author:'Williams C.',
    journal:'Cancer Immunol Res. 2024 Jun;12(6):789-799. doi: 10.1158/2326-6066.CIR-24-0123. Epub 2024 May 20.',
    content: "Immunotherapy has emerged as a promising treatment modality for multiple myeloma. This review highlights the current status of immunotherapy in multiple myeloma and discusses future directions for research and clinical practice." 
  },
  { 
    id: 5, 
    title: "The role of stem cell transplantation in multiple myeloma.",
    author:'Brown D.',
    journal:'Bone Marrow Transplant. 2024 May;59(5):1234-1245. doi: 10.1038/s41409-024-0123-4. Epub 2024 Apr 25.',
    content: "Stem cell transplantation remains a cornerstone in the treatment of multiple myeloma. This article reviews the current evidence on the role of stem cell transplantation and its impact on patient outcomes." 
  },
  { 
    id: 6, 
    title: "Genetic and epigenetic alterations in multiple myeloma.",
    author:'Davis E.',
    journal:'Nat Rev Cancer. 2024 Apr;24(4):234-245. doi: 10.1038/s41568-024-0123-4. Epub 2024 Mar 30.',
    content: "Genetic and epigenetic alterations play a significant role in the pathogenesis of multiple myeloma. This review discusses the latest findings on genetic and epigenetic changes and their implications for disease management." 
  },
  { 
    id: 7, 
    title: "The impact of minimal residual disease on multiple myeloma outcomes.",
    author:'Miller F.',
    journal:'Leukemia. 2024 Mar;38(3):567-578. doi: 10.1038/s41375-024-0123-4. Epub 2024 Feb 28.',
    content: "Minimal residual disease (MRD) is an important prognostic factor in multiple myeloma. This article examines the impact of MRD on patient outcomes and discusses strategies for MRD assessment and management." 
  },
  { 
    id: 8, 
    title: "The role of proteasome inhibitors in multiple myeloma therapy.",
    author:'Garcia G.',
    journal:'Clin Cancer Res. 2024 Feb;30(2):345-356. doi: 10.1158/1078-0432.CCR-24-0123. Epub 2024 Jan 25.',
    content: "Proteasome inhibitors have revolutionized the treatment of multiple myeloma. This review provides an overview of the mechanisms of action, clinical efficacy, and safety profiles of proteasome inhibitors in multiple myeloma therapy." 
  },
  { 
    id: 9, 
    title: "The evolving landscape of multiple myeloma treatment.",
    author:'Harris H.',
    journal:'Lancet Oncol. 2024 Jan;25(1):123-134. doi: 10.1016/S1470-2045(24)01234-5. Epub 2023 Dec 20.',
    content: "The treatment landscape for multiple myeloma is continuously evolving. This article discusses the latest advancements in treatment options and their impact on patient care and outcomes." 
  },
  { 
    id: 10, 
    title: "The role of CAR T-cell therapy in multiple myeloma.",
    author:'Martinez I.',
    journal:'J Hematol Oncol. 2023 Dec;16(12):234-245. doi: 10.1186/s13045-023-01234-5. Epub 2023 Nov 30.',
    content: "CAR T-cell therapy has shown promising results in the treatment of multiple myeloma. This review discusses the current status of CAR T-cell therapy, its clinical efficacy, and potential challenges." 
  },
  { 
    id: 11, 
    title: "The impact of novel agents on multiple myeloma survival.",
    author:'Clark J.',
    journal:'Blood Cancer J. 2023 Nov;13(11):123-134. doi: 10.1038/s41408-023-01234-5. Epub 2023 Oct 25.',
    content: "Novel agents have significantly improved survival rates in multiple myeloma. This article reviews the latest data on novel agents and their impact on patient outcomes." 
  },
  { 
    id: 12, 
    title: "The role of maintenance therapy in multiple myeloma.",
    author:'Lewis K.',
    journal:'Haematologica. 2023 Oct;108(10):1234-1245. doi: 10.3324/haematol.2023.01234. Epub 2023 Sep 30.',
    content: "Maintenance therapy plays a crucial role in prolonging remission and improving survival in multiple myeloma. This review discusses the current evidence on maintenance therapy and its clinical implications." 
  },
  { 
    id: 13, 
    title: "The impact of comorbidities on multiple myeloma treatment outcomes.",
    author:'Walker L.',
    journal:'J Geriatr Oncol. 2023 Sep;14(9):1234-1245. doi: 10.1016/j.jgo.2023.01234. Epub 2023 Aug 25.',
    content: "Comorbidities can significantly impact treatment outcomes in multiple myeloma. This article examines the influence of comorbidities on patient outcomes and discusses strategies for managing comorbid conditions." 
  },
  { 
    id: 14, 
    title: "The role of imaging in multiple myeloma diagnosis and management.",
    author:'Young M.',
    journal:'Radiology. 2023 Aug;308(2):345-356. doi: 10.1148/radiol.20232301234. Epub 2023 Jul 20.',
    content: "Imaging plays a vital role in the diagnosis and management of multiple myeloma. This review discusses the latest imaging techniques and their applications in multiple myeloma care." 
  },
  { 
    id: 15, 
    title: "The impact of frailty on multiple myeloma treatment decisions.",
    author:'King N.',
    journal:'J Geriatr Oncol. 2023 Jul;14(7):567-578. doi: 10.1016/j.jgo.2023.01234. Epub 2023 Jun 15.',
    content: "Frailty is an important consideration in treatment decisions for older adults with multiple myeloma. This article explores the impact of frailty on treatment outcomes and discusses strategies for managing frail patients." 
  },
  { 
    id: 16, 
    title: "The role of autologous stem cell transplantation in multiple myeloma.",
    author:'Scott O.',
    journal:'Bone Marrow Transplant. 2023 Jun;58(6):789-799. doi: 10.1038/s41409-023-01234-5. Epub 2023 May 20.',
    content: "Autologous stem cell transplantation remains a key treatment option for multiple myeloma. This review discusses the current evidence on autologous stem cell transplantation and its impact on patient outcomes." 
  },
  { 
    id: 17, 
    title: "The impact of socioeconomic factors on multiple myeloma outcomes.",
    author:'Adams P.',
    journal:'Cancer Epidemiol Biomarkers Prev. 2023 May;32(5):567-578. doi: 10.1158/1055-9965.EPI-23-01234. Epub 2023 Apr 25.',
    content: "Socioeconomic factors can significantly influence treatment outcomes in multiple myeloma. This article examines the impact of socioeconomic factors on patient outcomes and discusses strategies for addressing disparities in care." 
  },
  { 
    id: 18, 
    title: "The role of combination therapy in multiple myeloma treatment.",
    author:'Baker Q.',
    journal:'Clin Lymphoma Myeloma Leuk. 2023 Apr;23(4):345-356. doi: 10.1016/j.clml.2023.01234. Epub 2023 Mar 30.',
    content: "Combination therapy has become a standard approach in the treatment of multiple myeloma. This review discusses the rationale for combination therapy, its clinical efficacy, and potential challenges." 
  },
  { 
    id: 19, 
    title: "The impact of early intervention on multiple myeloma outcomes.",
    author:'Nelson R.',
    journal:'J Clin Oncol. 2023 Mar;41(3):234-245. doi: 10.1200/JCO.2023.01234. Epub 2023 Feb 28.',
    content: "Early intervention is critical for improving outcomes in multiple myeloma. This article reviews the latest evidence on early intervention strategies and their impact on patient care." 
  },
  { 
    id: 20, 
    title: "The role of supportive care in multiple myeloma management.",
    author:'Parker S.',
    journal:'Support Care Cancer. 2023 Feb;31(2):1234-1245. doi: 10.1007/s00520-023-01234-5. Epub 2023 Jan 25.',
    content: "Supportive care is essential for managing symptoms and improving quality of life in multiple myeloma patients. This review discusses the role of supportive care and its impact on patient outcomes." 
  }
];


const filterData = [
  {
    key: 'Publication date',
    data: [
      { label: '1 week ago', value: '1_week_ago' },
      { label: '1 month ago', value: '1_month_ago' },
      { label: '6 months ago', value: '6_months_ago' },
      { label: '1 year ago', value: '1_year_ago' },
      { label: '2 years ago', value: '2_years_ago' },
      { label: '3 years ago', value: '3_years_ago' },
    ],
    type: 'single',
    value:'',
  },
  {
    key: 'Text availability',
    data: [
      { label: 'Abstract', value: 'abstract' },
      { label: 'Free full text', value: 'free_full_text' },
      { label: 'Full text', value: 'full_text' },
    ],
    type: 'multiple',
    value:[],
  },
  {
    key: 'Article attribute',
    data: [
      { label: 'Associated data', value: 'associated_data' }
    ],
    type: 'multiple',
    value:[],
  },
  {
    key: 'Article type',
    data: [
      { label: 'Books and Documents', value: 'books_and_documents' },
      { label: 'Clinical Trials', value: 'clinical_trials' },
      { label: 'Conference Papers', value: 'conference_papers' },
      { label: 'Journal Articles', value: 'journal_articles' },
      { label: 'Magazine Articles', value: 'magazine_articles' },
      { label: 'News Articles', value: 'news_articles' },
      { label: 'Patents', value: 'patents' },
      { label: 'Reports', value: 'reports' },
      { label: 'Theses', value: 'theses' },
    ],
    type: 'multiple',
    value:[],
  }
]


export { 
  mockData,
  filterData
 };
