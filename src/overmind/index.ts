import { IConfig } from 'overmind';
import { createHook } from 'overmind-react';
import { state } from './state';
import * as actions from './actions';

export const config = {
  state,
  actions,
};

declare module 'overmind' {
  interface Config
    extends IConfig<{
      state: typeof config.state;
      actions: typeof config.actions;
    }> {}
}

export const useOvermind = createHook<typeof config>();
