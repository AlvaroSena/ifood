export class EmailAlreadyTakenError extends Error {
  constructor(message: string) {
    super(message);
  }
}