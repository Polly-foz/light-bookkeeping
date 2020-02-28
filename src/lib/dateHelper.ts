import dayjs from 'dayjs';

const dateHelper = {
    date(dayStr: string) {
        return dayjs(dayStr).format('M月D日');
    },
    time(dayStr: string) {
        return dayjs(dayStr).format('HH:mm');
    },
    inThisScope(date: string, unit: ('day' | 'week' | 'month' | 'year' | '' | undefined)) {
        if (!unit) {
            return true;
        }
        return dayjs().isSame(date, unit);
    },
    today() {
        return dayjs().format('MM月DD日');
    },
    firstDayOfWeek() {
        // console.dir(dayjs().day(1).format())
        // console.dir(dayjs().day(8).format())
        return dayjs().startOf('week').add(1, 'day').format('M月D日');
    },

    lastDayOfWeek() {
        return dayjs().endOf('week').add(1, 'day').format('M月D日');
    },
    firstDayOfMonth() {
        return dayjs().startOf('month').format('M月D日');
    },
    lastDayOfMonth() {
        return dayjs().startOf('month').add(1, 'month').date(0).format('M月D日');
    },
    firstDayOfYear() {
        return dayjs().startOf('year').format('M月D日');
    },
    lastDayOfYear() {
        return dayjs().endOf('year').format('M月D日');
    },
    beautify(date: string) {
        // date = "2020-02-24"
        const now = dayjs();
        if (now.isSame(date, 'day')) {
            return '今天';
        } else if (now.subtract(1, 'day').isSame(date, 'day')) {
            return '昨天';
        } else if (now.subtract(2, 'day').isSame(date, 'day')) {
            return '前天';
        } else if (now.isSame(date, 'year')) {
            return dayjs(date).format('M月D日');
        }
        return dayjs(date).format('YYYY年M月D日');
    },
};

export default dateHelper;
