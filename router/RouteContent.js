import { jsx as _jsx } from "react/jsx-runtime";
import EntityService from '../services/entity/EntityService';
const RouteContent = (props) => {
    var _a, _b;
    const { route, apiSpec, routeMap } = props;
    const entity = route.entity;
    const entityService = new EntityService(((_a = apiSpec[entity.iden]) === null || _a === void 0 ? void 0 : _a.actions) || {}, ((_b = apiSpec[entity.iden]) === null || _b === void 0 ? void 0 : _b.properties) || {}, Object.assign({}, entity));
    const properties = entityService.getProperties();
    return (_jsx(route.component, Object.assign({}, entity, { entityService: entityService, routeMap: routeMap, properties: properties })));
};
export default RouteContent;
