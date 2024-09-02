export default interface ApiParameters {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
}
