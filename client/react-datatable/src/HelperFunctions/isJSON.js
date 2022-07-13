const objectConstructor = ({}).constructor;

const isJSON = (obj) => {
  return obj.constructor === objectConstructor;
};

export default isJSON;
