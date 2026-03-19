/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: string | never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};