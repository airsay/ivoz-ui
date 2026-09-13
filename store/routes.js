import { action } from 'easy-peasy';
const routes = {
    routes: [],
    setRoutes: action((state, routes) => {
        const simplifiedRoutes = routes.map((item) => ({ path: item.path }));
        state.routes = simplifiedRoutes;
    }),
};
export default routes;
