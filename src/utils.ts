// export function getEnumKeyByEnumValue<T>(
//   myEnum: T, enumValue: number | string,
// ): string {
//   const keys = Object.keys(myEnum).filter(
//     (x: string) => myEnum[x as keyof typeof myEnum] === enumValue,
//   );

//   return keys.length > 0 ? keys[0] : '';
// }

export function getEnumKeyByEnumValue<T extends { [index: string]: string }>(
  myEnum: T, enumValue: string,
): keyof T | null {
  const keys = Object.keys(myEnum).filter(x => myEnum[x] === enumValue);

  return keys.length > 0 ? keys[0] : null;
}
