import moment from "moment";

export default function TimeAgo(timestamp) {
  const currentDate = new Date();
  const previousDate = new Date(timestamp);
  const elapsedSeconds =
    (currentDate.getTime() - previousDate.getTime()) / 1000;

  if (elapsedSeconds < 60) {
    return Math.floor(elapsedSeconds) + "s ago";
  } else if (elapsedSeconds < 3600) {
    const minutes = Math.floor(elapsedSeconds / 60);
    return minutes + "m ago";
  } else if (elapsedSeconds < 86400) {
    const hours = Math.floor(elapsedSeconds / 3600);
    return hours + "h ago";
  } else if (elapsedSeconds < 604800) {
    const days = Math.floor(elapsedSeconds / 86400);
    return days + "D ago";
  } else if (elapsedSeconds < 31536000) {
    const weeks = Math.floor(elapsedSeconds / 604800);
    return weeks + "W ago";
  } else {
    const years = Math.floor(elapsedSeconds / 31536000);
    return years + "Y ago";
  }
}
