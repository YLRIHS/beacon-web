// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    systemCode:'curation-system',
    username: '',
    id: null,
    permission:<any> [], 
    userInfo: <any>{},   
    sysMenuList: [   
      {
          icon: 'ion:md-log-out',
          title: 'Log out',
          key: 'logout',
          role: '*',
          app:'common',
          routerMain:false,
          roles:['admin','user','viewer'],
      },
  ],  
  }),
  actions: { 
    setUserInfo(user: any) {
        this.userInfo = user;
    },
    setUserName(name: string) {
        this.username = name;
    },    
  }
})
