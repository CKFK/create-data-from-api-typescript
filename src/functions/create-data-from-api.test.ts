import { createDataFromApi, getAgeRange } from "./functions";
import { jsonVarTest, jsonValid } from "./create-data-from-api.json";

test("Must return a valid json schema", () => {
  expect(createDataFromApi(jsonVarTest)).toStrictEqual(jsonValid);
});

test("Must return a valid age range", () => {
  expect(getAgeRange(13)).toBe("13-19");
});
