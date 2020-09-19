export const DataTestHelper = {};
DataTestHelper.getFile = async (file) => {
  const response = await fetch(`/base/test/${file}`);
  if (!response.ok) {
    throw new Error(`File ${file} is unavailable`);
  }
  return response.text();
};
