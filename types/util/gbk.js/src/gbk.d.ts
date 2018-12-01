declare var GBK: (gbk_us: any) => {
    decode: (arr: any) => string;
    encode: (str: any) => any[];
};
export = GBK;
