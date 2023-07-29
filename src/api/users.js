import { BASE_URL_API } from "../config";

export async function getDataUser(id) {
  try {
    const res = await fetch(`${BASE_URL_API}/user/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
