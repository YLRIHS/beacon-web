
import { App } from 'vue';
 

import roles from "./roles";

export function setupDirectives(app: App) {
    // 权限控制指令
    
    app.directive('roles', roles);
} 