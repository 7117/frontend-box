import Vue from 'vue'
import App from './App'
import { myRequest } from './util/api.js'

Vue.prototype.$myRequest = myRequest
Vue.config.productionTip = false

Vue.filter('formatDate',(date)=>{
	const oDate = new Date(date)
	const year = oDate.getFullYear();
	const mon = oDate.getMonth().toString().padStart(2, 0);
	const day = oDate.getDay().toString().padStart(2, 0);
	return year + '-' + mon + '-' + day
})


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
