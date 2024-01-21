import { createDataFromApi } from "./create-data-from-api";
import { jsonVarTest, jsonValid } from "./create-data-from-api.json";

test("Must return a valid json schema", () => {
  expect(createDataFromApi(jsonVarTest)).toStrictEqual(jsonValid);
});
