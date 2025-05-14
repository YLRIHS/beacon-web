import { createApp,h } from 'vue'; 
import App from '@/App.vue';
import { createPinia } from "pinia";
import Antd, { notification, Button  } from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import router from '@/router';
import '@/style.css';   
 

import LoadingBar from '@/plugins/loadingBar';
 
const app = createApp(App);

  
import { Icon } from '@iconify/vue';

app.use(createPinia());   
app.use(LoadingBar);

app.component('PureIcon', Icon); // Register Iconify globally

import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './graphql' 

app.provide(DefaultApolloClient, apolloClient)

 
app.use(Antd).use(router).mount('#app');

// Vue global error handler
app.config.errorHandler = (err:any, _, _n) => { 
  
  // Check if error is related to network or chunk loading
  if (err.name === 'ChunkLoadError' || err.message.includes('loading chunk')) {
    notification.warning({
      message: 'System Update Notice',
      description: 'The system is being updated. Some features may be temporarily unavailable.',
      duration: 0, // Don't auto-close
      key: 'deployment-notification', // Use key to avoid duplicates
      btn: () => h(Button, {
        type: 'primary',
        size: 'small',
        onClick: () => {
          window.location.reload();
        }
      }, { default: () => 'Refresh Page' })
    });
  }
};


 