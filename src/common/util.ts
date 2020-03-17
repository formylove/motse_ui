import React from 'react';
import {routerStore} from '../store/routerStore';
import {MobXProviderContext} from 'mobx-react';
import { TOKEN} from './constants';

export function navigate(path: string, params?: object) {
  if (!path) {
    console.error('Please specify the pathname');
    return;
  }
  routerStore.push({
    pathname: path,
    state: params,
  });
}
 
export function navigateInLayout(path: string, params?: object) {
  navigate(`${path}`, params);
}

export function useStores<T>(name: string): T {
  return React.useContext(MobXProviderContext)[name];
}

export {observer} from 'mobx-react';

export function getUserSession() {
  return JSON.parse(localStorage.getItem(TOKEN) as string);
}

export function getUserToken() {
  return getUserSession().accessToken.accessToken;
}

export function getUserInfo() {
  return getUserSession().idToken.claims;
}

export function removeEmpty(arr: Array<any>){   
  if(arr === undefined) return arr;
  for(var i = 0; i < arr.length; i++) {
   if(arr[i] == "" || typeof(arr[i]) == "undefined") {
      arr.splice(i,1);
      i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位
    }
   }
   return arr;
};


