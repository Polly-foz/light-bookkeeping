import Vue from 'vue';
import Vuex from 'vuex';
import categories from '@/store/modules/categories';
import transactions from '@/store/modules/transactions';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        categories,
        transactions
    }
});
