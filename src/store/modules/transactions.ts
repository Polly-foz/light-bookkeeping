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
        scopedTotalAmount(state: StateType, getters: { scopedTransactions: (arg0: string | undefined) => Transaction[] }) {
            return function (scope: ('day' | 'week' | 'month' | 'year' | undefined)) {
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
            return function (scope: ('day' | 'week' | 'month' | 'year' | '' | undefined)) {
                const now = dayjs();
                if (scope === '' || !scope) {
                    return state.transactions;
                }
                return state.transactions.filter(transaction => {
                    return now.isSame(transaction.date, scope);
                });
            };
        },
        transactionsGroupedByDate(state: StateType) {
            const hashTable: { [propName: string]: Transaction[] } = {};
            state.transactions.forEach((transaction) => {
                const [date, time] = transaction.date.split('T');
                hashTable[date] = hashTable[date] || [];
                hashTable[date].push(transaction);
            });
            return hashTable;
        },
        scopedTransactionsGroupedByDate(state: StateType,) {
            return function (scope: ('day' | 'week' | 'month' | 'year' | '' | undefined)) {
                const hashTable: { [propName: string]: Transaction[] } = {};
                state.transactions.forEach((transaction) => {
                    const [date, time] = transaction.date.split('T');
                    if (dateHelper.inThisScope(date, scope)) {
                        hashTable[date] = hashTable[date] || [];
                        hashTable[date].push(transaction);
                    }
                });
                return hashTable;
            };
        },
        dateArray(state: StateType, getters: { transactionsGroupedByDate: any }) {
            return function (scope: ('day' | 'week' | 'month' | 'year' | undefined)) {
                const ret: string[] = Object.getOwnPropertyNames(getters.transactionsGroupedByDate).reverse();
                return ret.filter(date => {
                    return dateHelper.inThisScope(date, scope);
                });
            };
        },
    },
    mutations: {
        fetchTransactions(state: StateType) {
            const localTransactions = localStorage.getItem(localStorageKeyName);
            if (localTransactions) {
                state.transactions = JSON.parse(localTransactions);
            }
            if (state.transactions.length === 0) {
                state.transactions = initialTransactions();
            }
            if (!localTransactions) {
                //@ts-ignore
                this.commit('saveTransactions');
            }
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
            (note||note==='') && (state.transactions[index].note = transaction.note);
            date && (state.transactions[index].date = transaction.date);
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

    }
};