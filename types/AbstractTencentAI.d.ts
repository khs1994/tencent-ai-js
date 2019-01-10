export default abstract class AbstractTencentAI {
    readonly appKey: string;
    readonly appId: string | number;
    readonly proxy: string;
    isWx: boolean;
    constructor(appKey: string, appId: string | number, proxy?: string);
    readFileSync(file: string): any;
}
export interface TencentAIReturn {
    ret: number;
    data: any;
}
