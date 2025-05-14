import { createVNode, render } from "vue";
import LoadingBar from "./loadingBar.vue";
export default{
    install(app: any){

        let vNode = createVNode(LoadingBar);
        render(vNode, document.body);
        let loadingBar = {
            start: () => vNode.component?.exposed?.start?.(),
            finish: () => vNode.component?.exposed?.finish?.(),
            error: () => vNode.component?.exposed?.error?.()
        } 
       app.config.globalProperties.$loadingBar = loadingBar;
       app.component('LoadingBar',LoadingBar); 
       
    }
}