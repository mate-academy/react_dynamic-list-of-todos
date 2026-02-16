export const cn = (
  className: string,
  datas: { [key: string]: boolean },
): string => {
  let calssN = className;

  for (const key in datas) {
    const elem = datas[key];

    if (elem) {
      calssN += ' ' + key;
    }
  }

  return calssN;
};
