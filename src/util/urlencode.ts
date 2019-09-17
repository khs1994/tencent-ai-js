// 实现 PHP urlencode 方法
export function urlencode(text: string): string {
  var output = '';
  var x = 0;

  text = utf16to8(text.toString());
  var regex = /(^[a-zA-Z0-9-_.]*)/;

  while (x < text.length) {
    var match = regex.exec(text.substr(x));
    if (match != null && match.length > 1 && match[1] != '') {
      output += match[1];
      x += match[1].length;
    } else {
      if (text[x] == ' ') {
        output += '+';
      } else {
        var charCode = text.charCodeAt(x);
        var hexVal = charCode.toString(16);
        output += '%' + (hexVal.length < 2 ? '0' : '') + hexVal.toUpperCase();
      }
      x++;
    }
  }

  function utf16to8(str: string): string {
    var out, i, len, c;

    out = '';
    len = str.length;
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x0001 && c <= 0x007f) {
        out += str.charAt(i);
      } else if (c > 0x07ff) {
        out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
      } else {
        out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
      }
    }
    return out;
  }

  return output;
}

// https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
export function urlencodeByTextEncoder(text: string): string {
  if (typeof TextEncoder === 'undefined') {
    throw new Error('not support TextEncoder');
  }

  const encoder = new TextEncoder();

  return urlencodeReplace(encoder.encode(text.toString()));
}

export function urlencodeReplace(array: any): string {
  let strList: string = '';

  array.map((item): any => {
    switch (true) {
      // ascii 0
      case item === 0:
        strList += '%00';
        break;
      // 空格转为 + 号
      case item === 32:
        strList += '+';
        break;
      // 原样输出
      case // item === 42 ||
      item === 45 ||
        item === 46 ||
        item === 95 ||
        (item >= 48 && item <= 57) ||
        (item >= 65 && item <= 90) ||
        (item >= 97 && item <= 122):
        strList += String.fromCharCode(item);
        break;
      // 需要编码
      default:
        // 10 进制转 16 进制
        strList += '%' + item.toString(16).toUpperCase();
        break;
    }
  });

  return strList;
}
