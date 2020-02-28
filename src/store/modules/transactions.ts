import dayjs from 'dayjs';
import {initialTransactions} from '@/store/modules/initialData';
import createId from '@/lib/createId';
import dateHelper from '@/lib/dateHelper';

const localStorageKeyName = 'transactions';

interface StateType {
    transactions: Transaction[];
}

export default {
    state: {
        transactions: []
    } as StateType,
    getters: {
        totalAmountFromTransactions() {
            return function (transactions: Transaction[]) {
                const res = {
                    income: 0,
                    expenditure: 0,
                    balance: 0
                };
                transactions.forEach(transaction => {
                    if (transaction.type === 'income') {
                        res.income += transaction.money;
                    } else if (transaction.type === 'expenditure') {
                        res.expenditure += transaction.money;
                    }
                });
                res.balance = res.income - res.expenditure;
                return res;
            };
        },
        scopedTotalAmount(state: StateType, getters: { scopedTransactions: (arg0: string | undefined) => Transaction[] }) {
            return function (scope: ('day' | 'week' | 'month' | 'year' | undefined)) {
                const res = {
                    income: 0,
                    expenditure: 0,
                    balance: 0
                };
                getters.scopedTransactions(scope).forEach((transaction: Transaction) => {
                    if (transaction.type === 'income') {
                        res.income += transaction.money;
                    } else if (transaction.type === 'expenditure') {
                        res.expenditure += transaction.money;
                    }
                });
                res.balance = res.income - res.expenditure;
                return res;
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
            type || (transaction.type = state.transactions[index].type);
            money || (transaction.money = state.transactions[index].money);
            category || (transaction.category = state.transactions[index].category);
            note || (transaction.note = state.transactions[index].note);
            date || (transaction.date = state.transactions[index].date);
            state.transactions[index] = transaction;
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