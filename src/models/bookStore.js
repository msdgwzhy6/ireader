import * as bookStoreService from '../services/bookStore.js';

export default {
  namespace: 'bookStore',
  state: {
    list: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch({ query }, { call, put }) {
      const { data } = yield call(bookStoreService.fetch, { query });
      if (data.ok) {
        yield put({ type: 'save', payload: { list: data.books } });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/bookstore') {
          dispatch({ type: 'fetch', query });
        }
      });
    },
  },
};