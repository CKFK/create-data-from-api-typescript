import { createDataFromApi } from "./functions/functions";
import express from "express";
import axios from "axios";
import _ from "lodash";

const app = express();
const port = 8000;

app.get("/", async (req: any, res: any) => {
  try {
    const response = await axios.get("https://dummyjson.com/users");
    const resData = createDataFromApi(response.data);
    const resDataFormat = JSON.stringify(resData, null, 2);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(resDataFormat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
