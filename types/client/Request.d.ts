import TencentAIResult from '../TencentAIResult';
export default class Request {
    static request(proxy: string, url: string, appKey: string, data: any, isGbk?: boolean, method?: string): Promise<TencentAIResult>;
    static handle_gbk(sort_list: any, isGbk?: boolean): string;
    static ksort(data: any): any[];
}
