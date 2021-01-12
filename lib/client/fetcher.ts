import axios from "axios";

type ResourceType = "user" | "item";

class Fetcher {
  data: Promise<string>;
  async fetch(resourceType: ResourceType, id: string) {
    return (await axios.get(`/api/${resourceType}/${id}`)).data;
  }
}

const fetcher = new Fetcher();

export { fetcher };
