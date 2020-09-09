import axios from "axios";

const INSTANCE = axios.create({
  baseURL: "https://run.mocky.io/v3/0fb7ba7e-5158-4e4f-bfc8-28320bc01cdc",
});

export default INSTANCE;
