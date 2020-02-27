export default {
    state: {
        cnt: 10
    },
    mutations: {
        increment(state: { cnt: number }) {
            console.log("transaction increment")
            state.cnt++;
        }
    }
};