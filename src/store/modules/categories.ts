const localStorageKeyName = {
    income: 'incomeCategories',
    expenditure: 'expenditureCategories'
};

interface StateType {
    income: string[];
    expenditure: string[];
}

export default {
    state: {
        income: [],
        expenditure: [],
    },
    mutations: {
        fetchCategories(state: StateType) {
            const localIncome = window.localStorage.getItem(localStorageKeyName.income);
            state.income = localIncome ? JSON.parse(localIncome) : ['工资', '利息', '投资', '奖金', '兼职'];
            const localExpenditure = window.localStorage.getItem(localStorageKeyName.expenditure);
            state.expenditure = localExpenditure ? JSON.parse(localExpenditure) : ['公共交通', '食物&餐饮', '通信费', '房租', '生活用品', '医疗保健', '衣物配饰', '妆容护理'];
            if (!localIncome) {
                //@ts-ignore
                this.commit('saveCategories');
            }
        },
        saveCategories(state: StateType) {
            // console.log('saveCategory');
            window.localStorage.setItem(localStorageKeyName.income, JSON.stringify(state.income));
            window.localStorage.setItem(localStorageKeyName.expenditure, JSON.stringify(state.expenditure));
        },
        addCategory(state: StateType, payload: { category: string; type: ('income' | 'expenditure') }) {
            // console.log('addCategory');
            const {category, type} = payload;
            if (state[type].indexOf(category) >= 0) {
                throw new Error('创建分类失败，该分类名已存在！');
            }
            if (!category) {
                throw new Error('创建分类失败，分类名不能为空！');
            }
            state[type].push(category);
            // @ts-ignore
            this.commit('saveCategories');
        },
        deleteCategories(state: StateType, payload: { categories: string[]; type: ('income' | 'expenditure') }) {
            const {type, categories} = payload;
            categories.forEach(item => {
                const index = state[type].indexOf(item);
                if (index >= 0) {
                    //@ts-ignore
                    this.commit('deleteTransactionsOnCategoryDeleted',{category: item, type:type});
                    state[type].splice(index, 1);
                }
            });
            // @ts-ignore
            this.commit('saveCategories');
        },
        deleteCategory(state: StateType, payload: { category: string; type: ('income' | 'expenditure') }) {
            const {category, type} = payload;
            const index = state[type].indexOf(category);
            if (index < 0) {
                return;
            }
            //@ts-ignore
            this.commit('deleteTransactionsOnCategoryDeleted',payload);
            state[type].splice(index, 1);
            // @ts-ignore
            this.commit('saveCategories');
        },
        editCategory(state: StateType, payload: { oldName: string; newName: string; type: ('income' | 'expenditure') }) {
            const {oldName, newName, type} = payload;
            if (newName === '') {
                throw new Error('分类名不能为空');
            }
            if (state[type].indexOf(newName) >= 0) {
                throw new Error(`编辑失败：新的分类名${newName}已存在。`);
            }
            const index = state[type].indexOf(oldName);
            if (index < 0) {
                return;
            }
            // @ts-ignore
            this.commit('editTransactionsOnCategoryChanged', {oldv: oldName, newv: newName, type: type});
            state[type][index] = newName;
            // @ts-ignore
            this.commit('saveCategories');
        }
    },
};