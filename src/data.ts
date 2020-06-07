import axios from "axios";

class Data {
  data: Object;
  async fetch() {
    this.data = axios.get("data.json");
  }

  async get() {
    return await this.data;
  }
}

const data = new Data();

export { data };
