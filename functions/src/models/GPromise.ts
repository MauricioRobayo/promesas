import {BibleId} from "../types";

export type Content = Partial<
  Record<
    BibleId,
    {
      text: string;
      reference: string;
    }
  >
>;

export type GPromiseDTO = {
  id: string;
  source: string;
  content: Content;
};

export type IGPromise = {
  _id: string;
  osis: string;
  originalReference: string;
  source: string;
  content?: Content;
};

export class GPromise {
  _id: string;
  osis: string;
  originalReference: string;
  source: string;
  content: Content;

  constructor({_id, osis, originalReference, source, content = {}}: IGPromise) {
    this._id = _id;
    this.osis = osis;
    this.originalReference = originalReference;
    this.source = source;
    this.content = content;
  }

  toDTO(): GPromiseDTO {
    return {
      id: this._id,
      source: this.source,
      content: this.content,
    };
  }
}
