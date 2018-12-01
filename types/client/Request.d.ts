export default class Request {
    private static requestInstance;
    static request(url: string, appKey: string, data: any, isGbk?: boolean, method?: string): any;
    static handle_gbk(sort_list: any, isGbk?: boolean): string;
    static ksort(data: any): any[];
}
