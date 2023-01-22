import { TierListItemProps, TierListRowProps } from 'src/pages/Home/types';

export const swapArrayElement = (array: any[], indexA: number, indexB: number) => {
  const updatedArray = array;
  const element = updatedArray[indexA];
  updatedArray[indexA] = updatedArray[indexB];
  updatedArray[indexB] = element;

  return updatedArray;
};

export const getUpdatedTierListItems = (
  draggIngItem: TierListItemProps,
  draggOverItemId: string,
  currentTierListItems: TierListItemProps[]
) => {
  const tierListItemsHasDraggingItem = currentTierListItems.find(
    (item) => item.id === draggIngItem.id
  );

  if (!tierListItemsHasDraggingItem) {
    currentTierListItems.push(draggIngItem);
  }

  const draggIngItemIndex = currentTierListItems.findIndex(
    (item) => item.id === draggIngItem.id
  );
  const draggOverItemIndex = currentTierListItems.findIndex(
    (item) => item.id === draggOverItemId
  );

  const updatedTierList = swapArrayElement(
    currentTierListItems,
    draggIngItemIndex,
    draggOverItemIndex
  );

  return updatedTierList;
};

export const getUpdatedTierListRows = (
  draggIngItem: TierListItemProps,
  draggOverTierListRowId: string,
  currentTierListItems: TierListRowProps[]
) => {
  const updatedTierListRows = currentTierListItems.map((row) => {
    if (row.id === draggOverTierListRowId) {
      const currentRowItems = row.items;

      const tierListItemsHasDraggingItem = currentRowItems.find(
        (item) => item.id === draggIngItem.id
      );

      if (!tierListItemsHasDraggingItem) {
        currentRowItems.push(draggIngItem);
      }

      return {
        ...row,
        items: currentRowItems,
      };
    }

    return {
      ...row,
      items: row.items.filter((item) => item.id !== draggIngItem.id),
    };
  });

  return updatedTierListRows;
};

export const getNextTierListRowIndexOnSwap = (
  swapTo: 'up' | 'down',
  tierListRows: TierListRowProps[],
  selectedRowIndex: number
) => {
  if (swapTo === 'up') {
    return tierListRows.findIndex((_, index) => index === selectedRowIndex - 1);
  }

  return tierListRows.findIndex((_, index) => index === selectedRowIndex + 1);
};

export const rowColors = [
  '#FF7F7F',
  '#FFBF7F',
  '#FFDF7F',
  '#FFFF7F',
  '#BFFF7F',
  '#7FFF7F',
  '#7FFFFF',
  '#7FBFFF',
  '#7F7FFF',
  '#FF7FFF',
  '#BF7FBF',
  '#858585',
  '#CFCFCF',
];

export const getRandomColor = () => {
  const randomColorIndex = Math.floor(Math.random() * rowColors.length);
  return rowColors[randomColorIndex];
};
