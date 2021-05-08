const files = require.context(".", false, /\.js$/);
const constants = {};

files.keys().forEach((key) => {
  if (key === "./index.js") return;
  Object.entries(files(key).default).forEach(([key, value]) => {
    if (constants[key]) {
      console.warn(
        `Warning! It seems like you are duplicating one of your constants: ${key}: ${value} and ${constants[key]}`
      );
    } else {
      constants[key] = value;
    }
  });
});

export default constants;
