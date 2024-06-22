export const isNameValid = (value: string) => /^[A-Z][A-Za-z]+$/.test(value);
export const isEmailValid = (value: string) =>
  /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[_a-z0-9-]+)*(.[a-z]{2,4})$/.test(
    value,
  );
export const isPasswordValid = (value: string) => /[A-Z]/.test(value);
