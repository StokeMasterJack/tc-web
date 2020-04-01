import {Context, createContext, useContext} from 'react';
import {Theme} from '@material-ui/core';
import {ensure} from './util/ass';


export default class ACtx {

  readonly theme: Theme;

  constructor(theme: Theme) {
    this.theme = theme;
  }

  static _a?: Context<ACtx | null> = undefined;

  static get AContext(): Context<ACtx | null> {
    if (!ACtx._a) {
      ACtx._a = createContext<ACtx | null>(null);
    }
    return ACtx._a;
  }


}

export function useACtx(): ACtx {
  return ensure(useContext(ACtx.AContext));
}

export function useSsTheme(): Theme {
  return useACtx().theme;
}