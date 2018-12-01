export default abstract class AbstractTencentAI {
    readonly appKey: string;
    readonly appId: string | number;
    isWx: boolean;
    constructor(appKey: string, appId: string | number);
    readFileSync(file: string): any;
}
export interface TencentAIReturn {
    ret: number;
    data: any;
}
