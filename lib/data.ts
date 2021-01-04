import axios from "axios";

class Data {
  data: Promise<string>;
  async fetch() {
    this.data = axios.get("data.json");
  }

  async get() {
    return await this.data;
  }
}

const data = new Data();

export { data };
