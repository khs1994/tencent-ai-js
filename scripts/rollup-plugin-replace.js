export default function() {
  return {
    name: 'replace',
    resolveId(source) {
      if (source === 'node-fetch') {
        return 'wx-fetch';
      }
      return null;
    },
  };
}
