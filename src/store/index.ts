import Vue from 'vue';
import Vuex from 'vuex';
import categories from '@/store/modules/categories';
import transactions from '@/store/modules/transactions';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        categories,
        transactions
    }
});

export default store