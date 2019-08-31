export const updateObject = (oldObj, updatedProperties) => {
  return {
    ...oldObj,
    ...updatedProperties
  };
};

export const checkValidity = (value, rules) => {};
