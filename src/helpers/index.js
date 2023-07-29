import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function itWasCreated(dt) {
  return dayjs(dt).fromNow();
}

