import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
  urlForFindRecord(id, modelName) {
    const path = this.pathForType(modelName);
    return `/${path}/${id}.json`;
  }
}
