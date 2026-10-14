import axios from "axios";
export const api = axios.create({ baseURL: "/api", timeout: 20000 });
export async function requestDemo(data) {
  const { data: session } = await api.get("/demo");
  return api.post("/demo", data, {
    headers: { Authorization: `Bearer ${session.token}` },
  });
}
