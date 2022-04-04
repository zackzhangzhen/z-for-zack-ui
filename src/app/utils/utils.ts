export function toDateString(date: Date): string {
  if (date) {
   return new Date(date).toDateString();
  }

  return "Not Dated";
}