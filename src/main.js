import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Include Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
	
import DataTable from 'datatables.net-dt';
//import 'datatables.net-responsive-dt';

const app = createApp(App)

app.use(router)

app.mount('#app')
