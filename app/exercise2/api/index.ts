export type API_RESULT = number[];

const DATA: API_RESULT = [1.99, 5.99, 10.99, 30.99, 50.99, 70.98];
const DELAY = 500;

export const myFetch = () =>
  new Promise<API_RESULT>((resolve) => setTimeout(() => resolve(DATA), DELAY));
