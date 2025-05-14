 
const hasRoles = (roles: string[], route: any) => { 

    if(route.meta && route.meta.roles) {  
        if(route.meta.roles === "*"){
            return true;
        } else {
            // roles is empty  
            if(roles.length === 0){
                return false;
            }else if(roles.length === 1 && roles[0] === "super_admin"){
                return true;
            } else {  
                const containsAny = route.meta.roles.some((element:any) => roles.includes(element)); 
                return containsAny;
            } 
        }
    } 
} 
export {
    hasRoles
}