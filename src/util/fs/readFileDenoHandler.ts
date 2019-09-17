export default async function(item: string, limit: number = 0) {
  let isFile: boolean = false;
  let isUrl: boolean = false;
  let file: string;
  let base64: string;

  try {
    // @ts-ignore
    let fileInfo = await Deno.stat(item);
    isFile = fileInfo.isFile();
    file = item;
  } catch {
    if (/^http\S*[.jpg|.bmp|.png]$/g.test(item)) {
      isUrl = true;

      file = await request(item);
    } else {
      return item;
    }
  }

  // @ts-ignore
  let base64Handler = await import('https://deno.land/x/base64/mod.ts');
  // @ts-ignore
  base64 = base64Handler.fromUint8Array(await Deno.readFile(file));

  if (isUrl) {
    // @ts-ignore
    await Deno.remove(file);
  }

  return base64;
}

async function request(url: string) {
  return '';
}
