
import { connection } from "next/server";

export default async function BanglaDate() {
  // Wait for the incoming request before reading the current date.
  await connection();

  const date = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <span className="mt-1 block text-xs text-black!">
      {date}
    </span>
  );
}