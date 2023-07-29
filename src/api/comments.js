import { toast } from "react-hot-toast";
import { BASE_URL_API } from "../config";
import axios from "axios";



export async function requestUpdate(commentId, content) {
  try {
    const res = await axios.patch(
      `${BASE_URL_API}/comments/${commentId}`,
      content,
      {
        cache: "no-store",
        next: {
          revalidate: 5,
        },
      }
    );
    if (res.status === 200) {
      toast.success("updated comment");
      console.log(res.data)
    } else {
      toast.error("could not update");
    }
  } catch (error) {
    console.log(error);
  }
}
