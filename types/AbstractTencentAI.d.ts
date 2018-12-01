export default abstract class AbstractTencentAI {
    readonly appKey: string;
    readonly appId: string | number;
    isWx: boolean;
    constructor(appKey: string, appId: string | number);
    readFileSync(file: any): any;
}
