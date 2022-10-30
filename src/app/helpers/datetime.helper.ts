export const dateToYmdFormat = (d: Date) => {
  const month = d.getMonth() + 1;
  return `${d.getFullYear()}-${month < 10 ? '0' + month : month}-${d.getDate()}`;
}

export const dateToDmyFormat = (d: string) => {
  const [year,month,day] = d.split('T')[0].split('-');
  return `${day}.${month}.${year}`;
}
