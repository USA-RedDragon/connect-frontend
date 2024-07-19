import { describe, test, expect, vi, beforeEach } from 'vitest';
import { LOCATION_CHANGE, createReduxHistoryContext } from 'redux-first-history';
import { thunk } from 'redux-thunk';

import { history } from '../store';
import { onHistoryMiddleware } from './history';
import * as actionsIndex from './index';

vi.mock('./index', () => ({
  selectDevice: vi.fn(),
  pushTimelineRange: vi.fn(),
  primeNav: vi.fn(),
}));

const create = (initialState) => {
  const store = {
    getState: vi.fn(() => initialState),
    dispatch: vi.fn(),
  };
  const next = vi.fn();

  const { routerMiddleware } = createReduxHistoryContext({
    history: history,
  });

  const middleware = (s) => (n) => (action) => {
    routerMiddleware(s)(n)(action);
    onHistoryMiddleware(s)(n)(action);
    thunk(s)(n)(action);
  };
  const invoke = (action) => middleware(store)(next)(action);

  return { store, next, invoke };
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('history middleware', () => {
  test('passes through non-function action', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  test('calls the function', () => {
    const { invoke } = create();
    const fn = vi.fn();
    invoke(fn);
    expect(fn).toHaveBeenCalled();
  });

  test('passes dispatch and getState', () => {
    const { store, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch('TEST DISPATCH');
      getState();
    });
    expect(store.dispatch).toHaveBeenCalledWith('TEST DISPATCH');
  });

  test('should call select dongle with history', async () => {
    const fakeInner = { id: 'kahjfiowenv' };
    actionsIndex.selectDevice.mockReturnValue(fakeInner);

    const { store, next, invoke } = create({
      app: {
        dongleId: null,
        zoom: null,
        primeNav: false,
      },
    });

    const action = {
      type: LOCATION_CHANGE,
      payload: {
        action: 'POP',
        location: { pathname: '0000aaaa0000aaaa' },
      },
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(fakeInner);
    expect(actionsIndex.selectDevice).toHaveBeenCalledWith('0000aaaa0000aaaa', false);
  });

  test('should call select zoom with history', async () => {
    const fakeInner = { id: 'asdfsd83242' };
    actionsIndex.pushTimelineRange.mockReturnValue(fakeInner);

    const { store, next, invoke } = create({
      app: {
        dongleId: '0000aaaa0000aaaa',
        zoom: null,
        primeNav: false,
      },
    });

    const action = {
      type: LOCATION_CHANGE,
      payload: {
        action: 'POP',
        location: { pathname: '0000aaaa0000aaaa/00000000--000f00000d/1230/1234' },
      },
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(fakeInner);
    expect(actionsIndex.pushTimelineRange).toHaveBeenCalledWith("00000000--000f00000d", 1230000, 1234000, false);
  });

  test('should call prime nav with history', async () => {
    const fakeInner = { id: 'n27u3n9va' };
    const fakeInner2 = { id: 'vmklxmsd' };
    actionsIndex.pushTimelineRange.mockReturnValue(fakeInner);
    actionsIndex.primeNav.mockReturnValue(fakeInner2);

    const { store, next, invoke } = create({
      app: {
        dongleId: '0000aaaa0000aaaa',
        zoom: { start: 1230, end: 1234 },
        primeNav: false,
      },
    });

    const action = {
      type: LOCATION_CHANGE,
      payload: {
        action: 'POP',
        location: { pathname: '0000aaaa0000aaaa/prime' },
      },
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(fakeInner);
    expect(store.dispatch).toHaveBeenCalledWith(fakeInner2);
    expect(actionsIndex.pushTimelineRange).toHaveBeenCalledWith(undefined, undefined, undefined, false);
    expect(actionsIndex.primeNav).toHaveBeenCalledWith(true);
  });
});
