interface FetchInterface extends Object {
    method?: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT' | 'string';
    headers?: any;
    body?: any;
    mode?: any;
    credentials?: any;
    cache?: any;
    redirect?: any;
    referrer?: any;
    referrerPolicy?: any;
    integrity?: any;
    keepalive?: any;
    signal?: any;
    charset?: string;
}
export default function wxFetch(url: string, options?: FetchInterface): Promise<{}>;
export {};
