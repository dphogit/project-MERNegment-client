export const dateFormatter = (date = new Date()) => {
  date = String(date);
  return new Date(date).toISOString().split("T")[0];
};
