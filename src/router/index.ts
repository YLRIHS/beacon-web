import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

 
import {useAppStore} from '@/stores/app'
import {current_user } from"@/api/user"

 
// import { socket } from "@/api/socketio";
// 常驻路由
const _currentRoutes: Array<RouteRecordRaw> = [
    // {
    //   path: "/",
    //   name: "ViewHome",
    //   component: () => import("@/views/Home.vue"), 
    //   meta:{
    //     requiresAuth:true,
    //     roles:['admin','user','viewer'],
    //     permission:'*',
    //   }
    // }, 
    {
      path:'/pure/:id',
      name:'ViewPure',
      component: () => import('@/views/pure/[id].vue'),
      meta:{
        requiresAuth:true,
        roles:['admin','user','viewer'],
        permission:'*',
      }
    },
    {
      path:'/',
      name:'ViewPureHome',
      component: () => import('@/views/pure/index.vue'),
      meta:{
        requiresAuth:true,
        roles:['admin','user','viewer'],
        permission:'*',
      }
    },
    {
      path:'/set',
      name:'share', 
      component:()=>import("@/views/Setting.vue"),
      meta:{
        requiresAuth:true,
        roles:['admin','user'],
        permission:'*',
      },  
      children:[ 
        {
          // column_setting
          path:'/set/prompt_setting',
          name:'prompt_setting',
          component:()=> import("@/views/settings/PromptSetting.vue"),
        }
      ]
    },
      
];
 
 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: _currentRoutes,
})

const goToLoginPage = () => {
  const appStore = useAppStore();
  const url = import.meta.env.VITE_AUTH_HOPEAI+"/#/?" + "product_code=" + appStore.systemCode;
  const re_url = window.location.href; 
  const redirect = url+"&redirect="+encodeURIComponent(re_url);  
  window.location.href = redirect;
}

const crossroads=async(next:any)=> {  
  const appStore = useAppStore();
  const roles = appStore.userInfo.roles || [];
  if(roles.length === 0) {
    await next('/403')
  } else {   
    await next();
  }
  
}  


router.beforeEach(async(to, _,next) => {
  
  const appStore = useAppStore(); 
  let token:any = null;
  
  if(to.query.token){
    token = to.query.token;
    localStorage.setItem('token', token)
  } else {
    token = localStorage.getItem('token')
  }
  
  if(token) { 
    if(!appStore.userInfo.username) {
      try{
        const product_code = appStore.systemCode;
        const userRes: any = await current_user(product_code,token);    
        if(userRes){
          localStorage.setItem('token',token);
          if (userRes.roles.length === 0) { 
            await goToLoginPage();
            return;
          }else {
            appStore.setUserInfo(userRes);
            appStore.setUserName(userRes.username);   
            if (to.query.token) {
              await next('/');
            } else {
              await next();
            }
          } 
        }

      }catch(e){
        await goToLoginPage();
      }
    }else {
      await crossroads(next);
    }

  }else {
    // Redirect to login page if no token is found 
    await goToLoginPage();
  }



  
  
  // Otherwise continue to the requested route
   
}) // eslint-disable-line no-unused-vars

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

 

export default router
