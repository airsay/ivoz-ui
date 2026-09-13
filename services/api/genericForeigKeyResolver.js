var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { StoreContainer } from '../../store';
export const entityObject2ListLink = (props, data, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { fkFld, entity, addLink = true, dataPreprocesor } = props;
    const { localPath, path, toStr } = entity;
    try {
        if (dataPreprocesor) {
            yield dataPreprocesor(response);
        }
    }
    catch (_a) { }
    const entityReducer = (accumulator, value) => __awaiter(void 0, void 0, void 0, function* () {
        accumulator[value.id] = toStr(value);
        return accumulator;
    });
    const entities = {};
    for (const idx in response) {
        yield entityReducer(entities, response[idx]);
    }
    for (const idx in data) {
        if (data[idx][fkFld]) {
            let fk = data[idx][fkFld];
            if (Array.isArray(fk)) {
                for (const key in fk) {
                    fk[key] = entities[fk[key]];
                }
                data[idx][fkFld] = fk.join(', ');
                continue;
            }
            else if (typeof fk === 'object') {
                fk = fk.id;
            }
            const scalarFk = fk;
            data[idx][`${fkFld}Id`] = data[idx][fkFld];
            if (addLink) {
                data[idx][`${fkFld}Link`] = `${localPath || path}/${scalarFk}/update`;
            }
            data[idx][fkFld] = entities[scalarFk];
        }
    }
});
export default function genericForeignKeyResolver(props) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, fkFld, entity, dataPreprocesor, cancelToken } = props;
        const { path, toStr } = entity;
        if (typeof data !== 'object') {
            return data;
        }
        if (!Array.isArray(data) &&
            (typeof data[fkFld] !== 'object' || data[fkFld] === null)) {
            return data;
        }
        if (!Array.isArray(data)) {
            // Just flat view's detailed model
            try {
                if (dataPreprocesor && typeof data[fkFld] === 'object') {
                    yield dataPreprocesor(data[fkFld]);
                }
            }
            catch (_a) { }
            data[fkFld] = toStr(data[fkFld]);
            return data;
        }
        const ids = [];
        const embeded = [];
        for (const idx in data) {
            if (data[idx][fkFld]) {
                const val = data[idx][fkFld];
                const iterableValues = Array.isArray(val) ? val : [val];
                for (const value of iterableValues) {
                    if (typeof value === 'object') {
                        embeded.push(value);
                        continue;
                    }
                    if (ids.includes(value)) {
                        continue;
                    }
                    ids.push(value);
                }
            }
        }
        if (embeded.length) {
            yield entityObject2ListLink(props, data, embeded);
        }
        else if (ids.length) {
            const getAction = StoreContainer.store.getActions().api.get;
            yield getAction({
                path,
                params: {
                    id: ids,
                    _pagination: false,
                    _itemsPerPage: 1000,
                },
                cancelToken: cancelToken,
                successCallback: (response) => __awaiter(this, void 0, void 0, function* () { return yield entityObject2ListLink(props, data, response); }),
            });
        }
        else {
            yield entityObject2ListLink(props, data, []);
        }
        return data;
    });
}
export const remapFk = (row, from, to) => {
    row[to] = row[from];
    row[`${to}Id`] = row[`${from}Id`];
    row[`${to}Link`] = row[`${from}Link`];
};
