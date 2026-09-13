import { createStore, createTypedHooks, } from 'easy-peasy';
import StoreContainer from './StoreContainer';
import auth from './auth';
import spec from './apiSpec';
import api from './api';
import route from './route';
import routes from './routes';
import list from './list';
import flashMsg from './flashMsg';
import form from './form';
import menu from './menu';
import theme from './theme';
import entities from './entities';
import i18n from './i18n';
import aboutInfo from './aboutInfo';
export const storeModel = {
    auth,
    spec,
    api,
    route,
    routes,
    list,
    flashMsg,
    form,
    menu,
    entities,
    i18n,
    theme,
    aboutInfo,
};
StoreContainer.store = createStore(storeModel);
const { useStoreActions, useStoreState, useStoreDispatch, useStore } = createTypedHooks();
export { StoreContainer, useStoreActions, useStoreState, useStoreDispatch, useStore, };
