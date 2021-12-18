export class ResponseApi {
  public '@context'?: string;
  public '@id'?: string;
  public '@type'?: string;
  public 'hydra:member': [];
  public 'hydra:hydra:totalItems'?: number;
  public 'ResponseApi'?: any;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }

  public getMembers(): [] {
    return this["hydra:member"];
  }

  public getMember(): [] {
    return this["ResponseApi"];
  }
}
