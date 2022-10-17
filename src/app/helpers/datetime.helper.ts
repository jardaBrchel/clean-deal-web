export const dateToYmdFormat = (d: Date) => {
  const month = d.getMonth() + 1;
  return `${d.getFullYear()}-${month < 10 ? '0' + month : month}-${d.getDate()}`;
}
