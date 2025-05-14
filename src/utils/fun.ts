import { reactive } from "vue";
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc)
dayjs.extend(timezone)
// const utc = require('dayjs/plugin/utc');
// const timezone = require('dayjs/plugin/timezone'); //
// 时间戳换算成秒数
export const  intervalTime =(startTime: number,endTime: number)  =>{
   const data =  (endTime- startTime)/1000; //时间差的毫秒数
   return data;
}
// 判断文件类型 img
export const imgTypes = (args: any) => {
   const imgFileArr = reactive([
     "image/png",
     "image/jpeg",
     "image/jpg",
     "image/gif",
     "image/bmp",
     "image/svg+xml",
   ]);
   const index = imgFileArr.findIndex((item: any) => item === args);
   return index;
 };
 // 判断文件类型 pdf
 export const pdfTypes = (args: any) => {
   const arr = reactive(["application/pdf"]);
   const index = arr.findIndex((item: any) => item === args);
   return index;
 };
 // 判断文件类型 xls
 export const xlsTypes = (args: any) => {
   const arr = reactive([
     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
     "application/vnd.ms-excel",
   ]);
   const index = arr.findIndex((item: any) => item === args);
   return index;
 };
 // 判断文件类型 doc
 export const docTypes = (args: any) => {
   const arr = reactive([
     "application/msword",
     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
     "application/wps-writer",
   ]);
   const index = arr.findIndex((item: any) => item === args);
   return index;
 };
 // 判断文件类型 ppt
 export const pptTypes = (args: any) => {
   const arr = reactive([
     "application/vnd.openxmlformats-officedocument.presentationml.presentation",
     "application/vnd.ms-powerpoint",
   ]);
   const index = arr.findIndex((item: any) => item === args);
   return index;
 };
 // 判断文件类型 csv
 export const csvTypes = (args: any) => {
   const arr = reactive(["text/csv"]);
   const index = arr.findIndex((item: any) => item === args);
   return index;
 };
  


 // 只读权限与 编辑权限
 export  const readPermission =  (allRoles:string[], roles:string[]) => {  
  const containsAny = roles.some((element:any) => allRoles.includes(element));
  return containsAny;
 } 
 

export const getProcessPercentage = (value: number): number => {
  if (typeof value !== 'number') return 0;
  return Math.round(value * 10000) / 100;
};


export const  scrollLiteratureIntoView = (id:any) => {
  // const targetId = route.params.literature_id;
  if(id){
    setTimeout(() => {
      const targetElement = document.getElementById(`literature_${id}`);
      if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
  }, 100);
  }
}


export const scrollStudyIntoView = (id:any) => {
  // const targetId = route.params.id;
  if(id){
    setTimeout(() => {
      const targetElement = document.getElementById(`study_${id}`);
      if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
  }, 100);
  }
}

