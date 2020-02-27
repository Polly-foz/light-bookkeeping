const localStorageKeyName = {
    income: 'incomeCategories',
    expenditure: 'expenditureCategories'
};

type stateType = {
    income: string[];
    expenditure: string[];
}

export default {
    state: {
        income: [],
        expenditure: []
    },
    mutations: {
        fetchCategories(state: stateType) {
            const localIncome = window.localStorage.getItem(localStorageKeyName.income);
            state.income = localIncome ? JSON.parse(localIncome) : ['工资', '利息', '投资', '奖金', '兼职'];
            const localExpenditure = window.localStorage.getItem(localStorageKeyName.expenditure);
            state.expenditure = localExpenditure ? JSON.parse(localExpenditure) : ['公共交通', '食物&餐饮', '通信费', '房租', '生活用品', '医疗保健', '衣物配饰', '妆容护理'];
        }
    }
};