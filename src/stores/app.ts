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
          icon: '',
          title: '',
          key: 'divider',
          role: '*',
          app:'common',
          routerMain:false,
          roles:['admin','user','viewer'],
      },  
      {
          icon: 'ic:outline-settings',
          title: 'Settings',
          key: 'header_setting',
          role: '*',
          app:'common',
          routerMain:false,
          roles:['admin','user','viewer'],
      },  
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
    collapsed: false,
  }),
  actions: { 
    changeMenuStatus() { 
      this.collapsed = !this.collapsed;
    },
    setUserInfo(user: any) {
        this.userInfo = user;
    },
    setUserName(name: string) {
        this.username = name;
    },    
  }
})
