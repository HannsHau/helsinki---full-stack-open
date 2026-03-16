export const isNotNumber = (argument: unknown): boolean => {
  return isNaN(Number(argument));
};

export const restValuesAreNum = (values: string[]): boolean => {
  const result = values.reduce((acc, cur) => acc && !isNotNumber(cur), true);
  return result;
};

export default "this is the default...";
