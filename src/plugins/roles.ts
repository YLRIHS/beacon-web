
// import { DirectiveBinding } from "vue";
// import { useUserStore } from "@/stores/user";


// const roles = (el: HTMLElement, binding: DirectiveBinding) => {
//     const { value } = binding;
//     const userStore = useUserStore(); 
//     const roles = userStore.userInfo.roles || [];   
//     if(value && value !== '*'){
//         //  roles is empty remove the element
//         if( roles.length === 0){
//             el.parentNode && el.parentNode.removeChild(el);
//         }else {
//             // roles is not empty
//             // roles include user or admin add the element  
//             const containsAny = value.some((element:any) => roles.includes(element)); 
//             if(containsAny){
//                 return;
//             } else {
//                 el.parentNode && el.parentNode.removeChild(el);
//             } 
//         } 
//     } 
// }
 
// export default {
//     mounted(el: HTMLElement, binding: DirectiveBinding) {
//         roles(el, binding);
//     },
//     updated(el: HTMLElement, binding: DirectiveBinding) {
//         roles(el, binding);
//     }
// }