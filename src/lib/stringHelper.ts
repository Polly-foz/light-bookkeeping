function formatFloat(value: number, n: number) {
    const f = Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
    let s = f.toString();
    const rs = s.indexOf('.');
    if (rs < 0) {
        s += '.';
    }
    for (let i = s.length - s.indexOf('.'); i <= n; i++) {
        s += '0';
    }
    // console.log(`${value},${n}`)
    return s;
}

function trimHeadAndTail(str: string) { //去掉首尾两端的空格(^\s*)|(\s*$)
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

export {formatFloat};

export {trimHeadAndTail}