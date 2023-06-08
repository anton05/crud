export const getLocalStorageItem = (name) => {
  return localStorage.getItem(name);
};

export const setLocalStorageItem = (name, value) => {
  return localStorage.setItem(name, value);
};

export const removeLocalStorageItem = (name) => {
  return localStorage.removeItem(name);
};