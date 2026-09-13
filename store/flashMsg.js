import { action } from 'easy-peasy';
const flashMsg = {
    msg: undefined,
    type: undefined,
    setFlashMsg: action((state, { msg, type }) => {
        state.msg = msg;
        state.type = type;
    }),
    clear: action((state) => {
        state.msg = undefined;
        state.type = undefined;
    }),
};
export default flashMsg;
