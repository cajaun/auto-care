type ItemWithNameAndImage = {
  name: string;
  image: any;
};

// when passing the data as a query through screens, cant pass the image itself, a helper lookup functions is used
export const getImageName = (
  data: ItemWithNameAndImage[],
  name: string
): any | undefined => {
  const item = data.find((v) => v.name === name);
  return item?.image;
};
