export const dateToYmdFormat = (d: Date) => {
  const month = d.getMonth() + 1;
  return `${d.getFullYear()}-${month < 10 ? '0' + month : month}-${d.getDate()}`;
}

export const dateToDmyFormat = (d: string) => {
  const [year,month,day] = d.split('T')[0].split('-');
  return `${day}.${month}.${year}`;
}

export const getWorkingDaysAfter = (daysAfter: number): number => {
  let nonWorkingDays = 0;
  const theDay = new Date();
  theDay.setDate(theDay.getDate() + daysAfter);

  for(let i = 1; i <= daysAfter; i++) {
    const aDay = new Date();
    aDay.setDate(aDay.getDate() + i);
    if(aDay.getDay() === 0 && aDay.getDay() === 6) nonWorkingDays++;
  }

  return daysAfter + nonWorkingDays;
}

export const getWeekNumber = () => {
  const today = new Date();
  const d = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  // @ts-ignore
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};
