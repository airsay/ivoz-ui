import { action } from 'easy-peasy';
const aboutInfo = {
    version: 'development',
    commit: 'HEAD',
    lastUpdated: 'now',
    setVersion: action((state, version) => {
        state.version = version;
    }),
    setCommit: action((state, commit) => {
        state.commit = commit;
    }),
    setLastUpdated: action((state, lastUpdated) => {
        state.lastUpdated = lastUpdated;
    }),
};
export default aboutInfo;
