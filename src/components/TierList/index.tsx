import { useEffect, useState } from 'react';

import { getUpdatedTierListItems } from 'src/helpers';
import { TierListItemProps } from 'src/pages/Home/types';

import { TierListItem, TierListItemsContainer } from './styles';

interface TierListProps {
  tierListItems: TierListItemProps[];
  draggIngItem: TierListItemProps | null;
  onChangeDraggIngItem: (draggingItem: TierListItemProps | null) => void;
}

export function TierList({
  tierListItems,
  draggIngItem,
  onChangeDraggIngItem,
}: TierListProps) {
  const [updatedTierListItems, setUpdatedTierListItems] =
    useState<TierListItemProps[]>(tierListItems);

  useEffect(() => {
    setUpdatedTierListItems(tierListItems);
  }, [tierListItems]);

  const handleDropItem = () => {
    onChangeDraggIngItem(null);
  };

  const handleDragItemEnter = (
    draggOverItemId: string,
    tierListItems: TierListItemProps[]
  ) => {
    const currentTierListItems = tierListItems;

    if (draggIngItem) {
      const updatedTierList = getUpdatedTierListItems(
        draggIngItem,
        draggOverItemId,
        currentTierListItems
      );

      setUpdatedTierListItems(updatedTierList);
    }
  };

  const handleDraggingItemStart = (item: TierListItemProps) => {
    onChangeDraggIngItem({ id: item.id, imgUrl: item.imgUrl });
  };

  return (
    <TierListItemsContainer onDrop={handleDropItem}>
      {updatedTierListItems.map((item, index) => {
        return (
          <TierListItem
            draggable
            key={index}
            id={item.id}
            imgUrl={item.imgUrl}
            isDraggIng={draggIngItem?.id === item.id}
            onDragStart={() =>
              handleDraggingItemStart({
                id: item.id,
                imgUrl: item.imgUrl,
              })
            }
            onDragEnter={(event) =>
              handleDragItemEnter(
                (event.target as HTMLDivElement).id,
                updatedTierListItems
              )
            }
            onDragEnd={handleDropItem}
            onDragOver={(event) => event.preventDefault()}
          />
        );
      })}
    </TierListItemsContainer>
  );
}
