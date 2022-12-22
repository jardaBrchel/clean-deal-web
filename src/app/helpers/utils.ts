export const getPageTitle = (title: string): string => title + ' | CleanDeal.cz';

export const firstUpper = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const generateString = (length: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
