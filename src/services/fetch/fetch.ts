import queryString from 'query-string';
import 'whatwg-fetch';
import { getUserToken } from "../../common/util";

/**
 * 实例化Error对象
 * 全局请求的异常对象
 */
class ErrorMs extends Error implements ErrorMessage {
    public message: string;
    public code: string | number;
    /**
     * 构造方法生成错误对象
     *
     * @param message - 错误信息.
     * @param code - 错误码.
     */
    constructor(message: string, code: string | number) {
      super(message);
      this.code = code;
      this.message = message;
    }
}
/**
 * 接口请求的抽象类.
 */
abstract class ResourceAbs {
    public domain: string | undefined;
    /**
     * 传入域名
     *
     * @param domain - 请求使用的域名.
     */
    constructor(domain: string | undefined) {
      this.domain = domain;
    }
    // public abstract get<T>(url: string, params?: Record<string, string>, headers?: Record<string, string>): Promise<T>;
    // public abstract post<T>(url: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<T>;
    // public abstract delete<T>(url: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<T>;
    // public abstract put<T>(url: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<T>;
    // protected abstract request<T>(url: string, params: ResponseInit): Promise<T>;
}


type ResourceDataError = { errCode: number; errMsg: string };

/**
 * 接口请求类
 */
class Resource extends ResourceAbs {
  /**
   * GET 请求
   *
   * @param url 请求地址
   * @param params 请求参数
   * @param headers 请求头
   * @return 包含返回数据的Promise
   */
  public get<T extends ResourceDataError>(url: string, params?: Record<string, string>, headers?: Record<string, string>): Promise<T> {
    const pathParams = this.pathIntercept(url, params);
    return this.request<T>(this.formateQueryParams(pathParams.url, pathParams.params), {method: 'GET', headers});
  }

  /**
   * GET 请求
   *
   * @param url 请求地址
   * @param params 请求参数
   * @param headers 请求头
   * @return 包含返回数据的Promise
   */
  public post<T extends ResourceDataError>(url: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<T> {
    const pathParams = this.pathIntercept(url, params);
    return this.request<T>(pathParams.url, {method: 'POST', headers, body: JSON.stringify(pathParams.params)});
  }

  /**
   * GET 请求
   *
   * @param url 请求地址
   * @param params 请求参数
   * @param headers 请求头
   * @return 包含返回数据的Promise
   */
  public delete<T extends ResourceDataError>(url: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<T> {
    const pathParams = this.pathIntercept(url, params);
    return this.request<T>(this.formateQueryParams(pathParams.url, pathParams.params), {method: 'DELETE', headers});
  }

  /**
   * GET 请求
   *
   * @param url 请求地址
   * @param params 请求参数
   * @param headers 请求头
   * @return 包含返回数据的Promise
   */
  public put<T extends ResourceDataError>(url: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<T> {
    const pathParams = this.pathIntercept(url, params);
    return this.request<T>(pathParams.url, {method: 'PUT', headers, body: JSON.stringify(pathParams.params)});
  }

  /**
   * GET 请求
   *
   * @param url 请求地址
   * @param params 请求配置
   * @return 包含返回数据的Promise
   */
  protected async request<T extends ResourceDataError>(url: string, params: RequestInit): Promise<T> {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getUserToken()}`,
    };
    params.headers = Object.assign({}, defaultHeaders, params.headers);
    const response: Response = await fetch(this.domain + url, params);
    return this.handleData<T>(response);
  }

  /**
   * 将请求参数拼接在url的?后
   * 
   * @param url 请求地址
   * @param params 请求参数
   * @return url?query
   */
  private formateQueryParams(url: string, params?: Record<string, string>): string {
    let query = '';
    if (params) {
      query = '?' + queryString.stringify(params);
    }
    return url + query;
  }

  /**
   * 
   * @param url rest风格的接口地址
   * @param params 请求参数
   * @return 融合后的请求地址和请求参数
   * @example
   *        url: /api/:test params: { test:'zhangsan', age: 12 }
   *        将返回 url: /api/zhangsan params: { age: 12 }
   */
  private pathIntercept(url: string, params?: Record<string, any>): {url: string; params: Record<string, any> | undefined } {
    if (!params) {
      return {url, params};
    }
    const match: RegExpMatchArray | null = url.match(/:\w*/g);
    if (!match) {
      return {url, params};
    }
    const arr: string[] = url.replace(/.*\/\//, '/').split('/');
    let path: string = url;
    let queryParma: Record<string, any> | undefined = {...params};
    for (const val of arr) {
      const valRm = val.replace(':', '');
      if (queryParma[valRm]) {
        path = path.replace(val, queryParma[valRm]);
        delete queryParma[valRm];
      }
    }
    // 当对象为空时 queryParma 重置为 undefined
    if (Object.keys(queryParma).length === 0) {
      queryParma = undefined;
    }
    return {url: path, params: queryParma};
  }

  /**
   * 处理返回数据， 接口status异常 和 数据返回code表示错误均视为异常处理
   * 
   * @param response 响应体
   * @return 转成JSON的数据
   */
  private async handleData<T extends ResourceDataError>(response: Response): Promise<T> {
    if (response.status >= 200 && response.status <= 300) {
      const data: T = await response.json();
      if (data.errCode === 0) {
        return data;
      }
      throw new ErrorMs(data.errMsg, data.errCode);
    }
    throw new ErrorMs('Internet Error', '0000');
  }
}

export const RESOURCE = new Resource('');
