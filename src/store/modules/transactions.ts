import dayjs from 'dayjs';
import {initialTransactions} from '@/store/modules/initialData';
import createId from '@/lib/createId';
import dateHelper from '@/lib/dateHelper';
import {formatFloat} from '@/lib/stringHelper';

const localStorageKeyName = 'transactions';

interface StateType {
    transactions: Transaction[];
}

export default {
    state: {
        transactions: []
    } as StateType,
    getters: {
        getTransactionById(state: StateType) {
            return function (id: number) {
                return state.transactions.find(transaction => (transaction.id === id));
            };
        },
        totalAmountFromTransactions() {
            return function (transactions: Transaction[]) {
                let income = 0;
                let expenditure = 0;
                transactions.forEach(transaction => {
                    if (transaction.type === 'income') {
                        income += transaction.money;
                    } else if (transaction.type === 'expenditure') {
                        expenditure += transaction.money;
                    }
                });
                return {
                    income: formatFloat(income, 2),
                    expenditure: formatFloat(expenditure, 2),
                    balance: formatFloat(income - expenditure, 2)
                };
            };
        },
        scopedTotalAmount(state: StateType, getters: { scopedTransactions: (arg0: string | null | undefined) => Transaction[] }) {
            return function (scope: ('day' | 'week' | 'month' | 'year' | null | undefined)) {
                let income = 0;
                let expenditure = 0;
                getters.scopedTransactions(scope).forEach((transaction: Transaction) => {
                    if (transaction.type === 'income') {
                        income += transaction.money;
                    } else if (transaction.type === 'expenditure') {
                        expenditure += transaction.money;
                    }
                });
                return {
                    income: formatFloat(income, 2),
                    expenditure: formatFloat(expenditure, 2),
                    balance: formatFloat(income - expenditure, 2)
                };
            };
        },
        scopedTransactions(state: StateType) {
            return function (scope: ('day' | 'week' | 'month' | 'year' | '' | null | undefined)) {
                const now = dayjs();
                if (scope === '' || !scope) {
                    return state.transactions;
                }
                return state.transactions.filter(transaction => {
                    return transaction.date && now.isSame(transaction.date, scope);
                });
            };
        },
        transactionsGroupedByDate(state: StateType) {
            const hashTable: { [propName: string]: Transaction[] } = {};
            state.transactions.forEach((transaction) => {
                const date = dateHelper.date(transaction.date);
                hashTable[date] = hashTable[date] || [];
                hashTable[date].push(transaction);
            });
            return hashTable;
        },
        scopedTransactionsGroupedByDate(state: StateType,) {
            return function (scope: ('day' | 'week' | 'month' | 'year' | '' | null | undefined)) {
                const hashTable: { [propName: string]: Transaction[] } = {};
                state.transactions.forEach((transaction) => {
                    const date = dateHelper.date(transaction.date);
                    // console.log('date: ' + date);
                    if (dateHelper.inThisScope(date, scope)) {
                        // console.log('in scope');
                        hashTable[date] = hashTable[date] || [];
                        hashTable[date].push(transaction);
                    }
                });
                return hashTable;
            };
        },
        dateArray(state: StateType, getters: { transactionsGroupedByDate: any }) {
            return function (scope: ('day' | 'week' | 'month' | 'year' | '' | null | undefined)) {
                // console.log('dateArray: ' + scope);
                const ret: string[] = Object.getOwnPropertyNames(getters.transactionsGroupedByDate).reverse();
                return ret.filter(date => {
                    return dateHelper.inThisScope(date, scope);
                });
            };
        },
        categoriesRelatedTransactionsAmount(state: StateType) {
            return function (arg: { categories: string[]; type: string }) {
                let cnt = 0;
                state.transactions.forEach(transaction => {
                    arg.categories.forEach(category => {
                        if (transaction.category === category && transaction.type === arg.type) {
                            cnt++;
                        }
                    });
                });
                return cnt;
            };
        }
    },
    mutations: {
        initTransactions(state: StateType) {
            state.transactions = initialTransactions();
            // @ts-ignore
            this.commit('saveTransactions');
        },
        fetchTransactions(state: StateType) {
            const localTransactions = localStorage.getItem(localStorageKeyName);
            state.transactions = localTransactions ? JSON.parse(localTransactions) : [];
        },
        saveTransactions(state: StateType) {
            localStorage.setItem(localStorageKeyName, JSON.stringify(state.transactions));
        },
        addTransaction(state: StateType, transaction: Transaction) {
            // @ts-ignore
            if (this.state.categories[transaction.type].indexOf(transaction.category) < 0) {
                //分类不存在
                throw new Error(`添加失败：分类${transaction.category}不存在！`);
            }
            if (transaction.money < 0) {
                throw new Error(`添加失败：金额不能为负`);
            }
            transaction.id = createId();
            transaction.date = dayjs().toISOString();
            state.transactions.push(transaction);
            // @ts-ignore
            this.commit('saveTransactions');
        },
        editTransaction(state: StateType, transaction: Transaction) {
            const {id, type, money, category, note, date} = transaction;
            const index = state.transactions.findIndex(item => item.id === id);
            if (index < 0) {
                throw new Error(`修改失败，不存在该交易：${id}`);
            }
            // @ts-ignore
            if ((type === 'expenditure' && this.state.categories.expenditure.indexOf(category) < 0) || (type === 'income' && this.state.categories.income.indexOf(category) < 0)) {
                //分类不存在
                throw new Error(`修改失败：分类${transaction.category}不存在！`);
            }
            if (money < 0) {
                throw new Error(`修改失败：金额不能为负`);
            }
            type && (state.transactions[index].type = transaction.type);
            money && (state.transactions[index].money = transaction.money);
            category && (state.transactions[index].category = transaction.category);
            (note || note === '') && (state.transactions[index].note = transaction.note);
            date && (state.transactions[index].date = transaction.date);
            // @ts-ignore
            this.commit('saveTransactions');
        },
        editTransactionsOnCategoryChanged(state: StateType, payload: { oldv: string; newv: string; type: string }) {
            const {oldv, newv, type} = payload;
            state.transactions.forEach((transaction) => {
                if (transaction.category === oldv && transaction.type === type) {
                    transaction.category = newv;
                }
            });
            // @ts-ignore
            this.commit('saveTransactions');
        },
        deleteTransaction(state: StateType, id: number) {
            const index = state.transactions.findIndex(item => item.id === id);
            if (index < 0) {
                throw new Error(`删除失败，不存在该交易：${id}`);
            }
            state.transactions.splice(index, 1);
            // @ts-ignore
            this.commit('saveTransactions');
        },
        deleteTransactionsByTransactions(state: StateType, transactions: Transaction[]) {
            state.transactions = state.transactions.filter(transaction => {
                for (let i = 0; i < transactions.length; i++) {
                    if (transactions[i].id === transaction.id) {
                        return false;
                    }
                }
                return true;
            });
            //@ts-ignore
            this.commit('saveTransactions');
        },
        deleteTransactionsOnCategoryDeleted(state: StateType, payload: { category: string; type: string }) {
            const {category, type} = payload;
            state.transactions = state.transactions.filter((transaction) => {
                return transaction.category !== category || transaction.type !== type;
            });
            // @ts-ignore
            this.commit('saveTransactions');
        }

    }
};