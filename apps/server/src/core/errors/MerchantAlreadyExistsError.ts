export class MerchantAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
  }
}