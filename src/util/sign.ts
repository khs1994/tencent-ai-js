import hex_md5 from './md5';
import { urlencode, urlencodeByTextEncoder } from './urlencode';

function ksort(data: any) {
  let arrayList: any[] = [];
  let sort = (a, b) => {
    return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
  };

  for (let key in data) {
    arrayList.push({
      key,
      value: data[key],
    });
  }

  return arrayList.sort(sort);
}

function handle_gbk(sort_list: any, isGbk: boolean = false): string {
  let str: string = '';

  if (isGbk) {
    // 是 gbk, 已进行 URL 编码，不再进行编码
    sort_list.map(item => {
      if (item.value !== '') {
        str += `${item.key}=${item.value}&`;
      }
    });
  } else {
    // 不是 gbk, 进行 URL 编码
    sort_list.map(item => {
      if (item.value !== '') {
        // str += `${item.key}=${querystring.escape(item.value)}&`;

        str += `${item.key}=${
          typeof TextEncoder === 'undefined'
            ? urlencode(item.value)
            : urlencodeByTextEncoder(item.value)
        }&`;

        // str += `${item.key}=${encodeURIComponent(item.value)}&`;
      }
    });
  }

  // str = str.replace(/%20/g, '+');
  // str = str.replace(/!/g, '%21');
  // console.log(str);
  return str;
}

export default function(
  data,
  appKey: string,
  isGbk: boolean = false,
): { sign: string; str: string } {
  // 1. 将 <key, value> 请求参数对按 key 进行字典升序排序，得到有序的参数对列表 N
  let sort_list = ksort(data);

  // 2. 将列表 N 中的参数对按 URL 键值对的格式拼接成字符串
  // 得到字符串 T (如：key1=value1&key2=value2)
  // URL 键值拼接过程 value 部分需要 URL 编码
  // URL 编码算法用大写字母，例如 %E8，而不是小写 %e8
  let str: string = handle_gbk(sort_list, isGbk);

  // 追加 app_key
  // MD5 运算
  // 将得到的 MD5 值所有字符转换成大写，得到接口请求签名

  // 3. 将应用密钥以 app_key 为键名，组成 URL 键值拼接到字符串T末尾
  // 得到字符串 S (如：key1=value1&key2=value2&app_key=密钥)

  // 4. 对字符串 S 进行 MD5 运算，将得到的 MD5 值所有字符转换成大写，得到接口请求签名
  let sign: string = hex_md5(str + `app_key=${appKey}`).toUpperCase();

  return { sign, str };

  // data['sign'] = sign;

  // gbk 已进行 URL 编码，直接拼接
  // let body = isGbk ? str + `sign=${sign}` : querystring.stringify(data);
}
