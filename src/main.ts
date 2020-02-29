import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import LayoutWithNav from '@/components/LayoutWithNav.vue';
import Icon from '@/components/Icon.vue';
import LayoutWithBackAndTitle from '@/components/LayoutWithBackAndTitle.vue';
import DialogWithCover from '@/components/DialogWithCover.vue';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('LayoutWithNav', LayoutWithNav);
Vue.component('Icon', Icon);
Vue.component('LayoutWithBackAndTitle', LayoutWithBackAndTitle);
Vue.component('DialogWithCover', DialogWithCover);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

if (document.documentElement.clientWidth > 540) {
    window.alert('建议使用手机打开本页面，以保证浏览效果');
}