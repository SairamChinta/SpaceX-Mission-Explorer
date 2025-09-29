
module.exports = (api) => {
  const isTest = api.env('test');

  return {
    presets: [
      [ 'next/babel',{  'preset-env': { modules: isTest ? 'commonjs' : 'auto',},},],
    ],
  };
};