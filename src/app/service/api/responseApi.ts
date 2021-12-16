export class ResponseApi {
  public '@context'?: string;
  public '@id'?: string;
  public '@type'?: string;
  public 'hydra:member': [];
  public 'hydra:hydra:totalItems'?: number;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }

  public getMembers(): [] {
    return this["hydra:member"];
  }
}
