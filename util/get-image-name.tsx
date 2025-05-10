type ItemWithNameAndImage = {
  name: string;
  image: any;
};

export const getImageName = (
  data: ItemWithNameAndImage[],
  name: string
): any | undefined => {
  const item = data.find((v) => v.name === name);
  return item?.image;
};
