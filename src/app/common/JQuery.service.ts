import { InjectionToken } from '@angular/core';

export let JQ_TOKEN = new InjectionToken<Object>('jQuery');

export function getJquery() {
  return window[<any>'$'];
}

export const jQuery = getJquery();

export const JQUERY_SERVICE = { provide: JQ_TOKEN, useValue: getJquery };
