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
import autoSelectOptions from './AutoSelectOptions';
const foreignKeyGetter = ({ cancelToken, entityService, }) => __awaiter(void 0, void 0, void 0, function* () {
    const response = {};
    const entities = StoreContainer.store.getState().entities.entities;
    const promises = autoSelectOptions({
        entities,
        entityService,
        cancelToken,
        response,
    });
    yield Promise.all(promises);
    return response;
});
export default foreignKeyGetter;
