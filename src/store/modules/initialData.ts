import createId from '@/lib/createId';
import dayjs from 'dayjs';

function initialTransactions() {
    return [
        {
            id: createId(),
            type: 'expenditure',
            money: 2.3,
            category: '生活用品',
            note: 'aaa',
            date: dayjs().subtract(1, 'year').toISOString()
        },
        {
            id: createId(),
            type: 'income',
            money: 4.92,
            category: '利息',
            note: 'bbb',
            date: dayjs().subtract(1, 'year').toISOString()
        },
        {
            id: createId(),
            type: 'expenditure',
            money: 15,
            category: '生活用品',
            note: 'aaa',
            date: dayjs().subtract(1, 'month').toISOString()
        },
        {
            id: createId(),
            type: 'income',
            money: 2.3,
            category: '奖金',
            note: 'aaa',
            date: dayjs().subtract(1, 'month').toISOString()
        },
        {
            id: createId(),
            type: 'expenditure',
            money: 300,
            category: '生活用品',
            note: 'aaa',
            date: dayjs().subtract(1, 'month').add(1, 'week').toISOString()
        },
        {
            id: createId(),
            type: 'expenditure',
            money: 40,
            category: '生活用品',
            note: 'aaa',
            date: dayjs().subtract(1, 'month').add(2, 'week').toISOString()
        },
        {
            id: createId(),
            type: 'income',
            money: 500,
            category: '工资',
            note: '',
            date: dayjs().subtract(1, 'week').toISOString()
        },
        {
            id: createId(),
            type: 'expenditure',
            money: 2.3,
            category: '生活用品',
            note: 'aaa',
            date: dayjs().subtract(1, 'week').toISOString()
        },
        {
            id: createId(),
            type: 'expenditure',
            money: 2.3,
            category: '生活用品',
            note: 'aaa',
            date: dayjs().subtract(3, 'day').toISOString()
        },
        {
            id: createId(),
            type: 'income',
            money: 4.92,
            category: '利息',
            note: 'bbb',
            date: dayjs().subtract(2, 'day').toISOString()
        },
        {
            id: createId(),
            type: 'expenditure',
            money: 300,
            category: '生活用品',
            note: 'xxx',
            date: dayjs().subtract(2, 'day').toISOString()
        },
        {
            id: createId(),
            type: 'expenditure',
            money: 40,
            category: '生活用品',
            note: 'yyy',
            date: dayjs().subtract(2, 'day').toISOString()
        },
        {
            id: createId(),
            type: 'expenditure',
            money: 15,
            category: '生活用品',
            note: 'aaa',
            date: dayjs().subtract(1, 'day').toISOString()
        },
        {id: createId(), type: 'income', money: 7, category: '利息', note: 'aaa', date: dayjs().toISOString()},
        {id: createId(), type: 'income', money: 6, category: '利息', note: '', date: dayjs().toISOString()},
        {id: createId(), type: 'expenditure', money: 5, category: '生活用品', note: 'aaa', date: dayjs().toISOString()},
        {id: createId(), type: 'expenditure', money: 15, category: '生活用品', note: '', date: dayjs().toISOString()},
    ];
}

export {initialTransactions};