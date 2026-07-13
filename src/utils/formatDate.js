export function formatDate(dateString, options = {}) {
  if (!dateString) return "";
  const hasTime = dateString.includes("T") || dateString.includes(",");
  const date = hasTime ? new Date(dateString) : new Date(`${dateString}T12:00:00`);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    month: options.short ? "short" : "long",
    day: "numeric",
    year: "numeric",
    timeZone: hasTime ? "UTC" : undefined,
  });
}
