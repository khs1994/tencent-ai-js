export default function() {
  if (typeof global === 'object' && typeof Buffer !== 'undefined') {
    // node
    return 'node';
  }

  // @ts-ignore
  if (typeof wx !== 'undefined' && typeof wx.authorize === 'function') {
    // wx
    return 'wx';
  }

  if (typeof window === 'undefined') {
    return 'unknown';
  }

  // @ts-ignore
  if (typeof window.Deno !== 'undefined') {
    // deno
    return 'deno';
  }

  // @ts-ignore
  if (typeof window.Deno === 'undefined') {
    // browser
    return 'browser';
  }
}
