import osisToEn from "bible-reference-formatter";
import { IGPromise } from "@mauriciorobayo/gods-promises/lib/models";
const bcv_parser =
  require("bible-passage-reference-parser/js/en_bcv_parser").bcv_parser;

const bcv = new bcv_parser();

export type BaseGPromise = Omit<IGPromise, "_id">;

export function makeGPromise({
  reference,
  source,
}: {
  reference: string;
  source: string;
}): BaseGPromise | null {
  try {
    const osis: string = bcv.parse(reference).osis();
    const niv = osisToNivLong(osis);
    if (!niv.includes(":")) {
      console.log(`Skipping '${niv}', full chapter and no specific verses.`);
      return null;
    }
    return {
      niv,
      osis,
      source,
    };
  } catch (err) {
    console.log(`makePromise failed on reference '${reference}'`, err);
    return null;
  }
}

function osisToNivLong(osis: string): string {
  return osisToEn("niv-long", osis);
}