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
export const autoSelectOptions = (props) => {
    const { cancelToken, response, entityService } = props;
    let { entities } = props;
    if (!entities) {
        entities = StoreContainer.store.getState().entities.entities;
    }
    if (!entities) {
        return [];
    }
    const skip = props.skip || [];
    const promises = [];
    const fkProperties = entityService === null || entityService === void 0 ? void 0 : entityService.getFkProperties();
    const alreadyRequested = [];
    for (const idx in fkProperties) {
        if (skip && skip.includes(idx)) {
            continue;
        }
        const ref = fkProperties[idx].$ref;
        const cleanRef = fkProperties[idx].$ref.replace('#/definitions/', '');
        const entity = entities[cleanRef];
        if (alreadyRequested.includes(cleanRef)) {
            continue;
        }
        alreadyRequested.push(cleanRef);
        if (!entity) {
            if (cleanRef && cleanRef.indexOf('_') < 0) {
                console.log('autoSelectOptions', `${cleanRef} not found`);
            }
            continue;
        }
        if (!entity.selectOptions) {
            if (cleanRef && cleanRef.indexOf('_') < 0) {
                console.log('autoSelectOptions', `${cleanRef} selectOption is not defined`);
            }
            continue;
        }
        promises.push(entity.selectOptions().then((selectOptions) => selectOptions({
            callback: (options) => {
                for (const k in fkProperties) {
                    if (skip.includes(k)) {
                        continue;
                    }
                    if (fkProperties[k].$ref === ref) {
                        response[k] = options;
                    }
                }
            },
            cancelToken,
        })));
    }
    return promises;
};
export const autoSelectOptionHandlers = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { entityService } = props;
    const entities = StoreContainer.store.getState().entities.entities;
    const handlers = {};
    if (!entities) {
        return handlers;
    }
    const skip = props.skip || [];
    const fkProperties = entityService === null || entityService === void 0 ? void 0 : entityService.getFkProperties();
    const promises = [];
    for (const idx in fkProperties) {
        if (skip.includes(idx)) {
            continue;
        }
        const cleanRef = fkProperties[idx].$ref.replace('#/definitions/', '');
        const entity = entities[cleanRef];
        if (!entity) {
            if (cleanRef && cleanRef.indexOf('_') < 0) {
                console.log('autoSelectOptionsHandlers', `${cleanRef} not found`);
            }
            continue;
        }
        if (!entity.selectOptions) {
            if (cleanRef && cleanRef.indexOf('_') < 0) {
                console.log('autoSelectOptionsHandlers', `${cleanRef} selectOption is not defined`);
            }
            continue;
        }
        if (!entity.dynamicSelectOptions) {
            continue;
        }
        const selectOptionsLoader = entity.selectOptions;
        if (!selectOptionsLoader) {
            continue;
        }
        promises.push(selectOptionsLoader().then((handler) => {
            handlers[cleanRef] = handler;
        }));
    }
    yield Promise.all(promises);
    return handlers;
});
export default autoSelectOptions;
