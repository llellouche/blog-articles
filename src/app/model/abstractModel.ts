interface Dic {
  [key: string]: any
}

// TODO Remove unused
export class AbstractModel {
  constructor (values: any) {
    let tmpObject: Dic= [];
    Object.keys(values).map((key, val) => {
      tmpObject[key.replace('@', '')] = values[key];
    });

    return { ...tmpObject };
  }
}
