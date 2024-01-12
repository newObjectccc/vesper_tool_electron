import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import { useCallback, useState } from 'react';

const baseConfig: AxiosRequestConfig = {
  baseURL: 'https://rysyclub.com/api' // Replace with your base URL
  // Add any other common configuration options here
};

const instance = axios.create(baseConfig);
// eslint-disable-next-line import/no-named-as-default-member
const CancelToken = axios.CancelToken;
const cacheMap: Map<string, unknown> = new Map();

export function useAxios<P, R>(
  config: AxiosRequestConfig,
  cacheKey?: string,
  cancelPrevious?: boolean
) {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>();

  const request = useCallback(
    async (params: P, modifyConfig: AxiosRequestConfig, flushCache?: boolean) => {
      try {
        setLoading(true);
        // merge config
        const mergedConfig = { ...config, ...modifyConfig };
        // get data from cache
        if (!flushCache && cacheKey) return cacheMap.get(cacheKey ?? mergedConfig.url);
        // set params
        if (mergedConfig.method === 'get') mergedConfig.params = params;
        if (mergedConfig.method === 'post') mergedConfig.data = params;
        // cancel previous request
        cancelPrevious && abort();
        // create cancel token
        const source = CancelToken.source();
        setCancelToken(source);
        mergedConfig.cancelToken = source.token;
        // send request
        const response: AxiosResponse<R> = await instance.request(mergedConfig);
        // set data
        setData(response.data);
        // set cache
        if (cacheKey) cacheMap.set(cacheKey ?? mergedConfig.url, response.data);
      } catch (error) {
        setError(new Error(`Request failed: ${error.message}`));
      } finally {
        setLoading(false);
      }
    },
    [config]
  );

  const abort = useCallback(() => {
    if (cancelToken) cancelToken.cancel('Request aborted');
  }, [cancelToken]);

  return { data, loading, error, request, abort };
}
