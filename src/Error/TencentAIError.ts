// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
export default class TencentAIError extends Error {
  constructor(message = '', public code: number = 4096, ...args) {
    super(...args);
    this.message = message;
  }
}
