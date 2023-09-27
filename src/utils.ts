export const parseCommonArgs = () => {
  const args = process.argv;
  const params: Record<string, string> = {};
  args.forEach((str) => {
    const [k, v] = str.split('=');
    params[k] = v;
  });
  return params;
};
