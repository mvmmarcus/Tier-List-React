import { Gear, CaretUp, CaretDown, X } from 'phosphor-react';
import { useState } from 'react';

import {
  getNextTierListRowIndexOnSwap,
  getRandomColor,
  getUpdatedTierListRows,
  rowColors,
  swapArrayElement,
} from 'src/helpers';
import { TierListItemProps, TierListRowProps } from 'src/pages/Home/types';

import { TierList } from '../TierList';
import * as S from './styles';

interface TierListProps {
  tierListRows: TierListRowProps[];
  draggIngItem: TierListItemProps | null;
  onChangeDraggIngItem: (draggIngItem: TierListItemProps | null) => void;
}

export function TierListRows({
  tierListRows,
  draggIngItem,
  onChangeDraggIngItem,
}: TierListProps) {
  const [updatedTierListRows, setUpdatedTierListRows] =
    useState<TierListRowProps[]>(tierListRows);
  const [selectedRow, setSelectedRow] = useState<TierListRowProps>();

  const isInitialRow = (id: string) => id === 'initial-list';

  const handleDropItem = () => {
    onChangeDraggIngItem(null);
  };

  const handleTierListDragEnter = (draggOverTierListRowId: string) => {
    if (draggIngItem) {
      setUpdatedTierListRows(
        getUpdatedTierListRows(
          draggIngItem,
          draggOverTierListRowId,
          updatedTierListRows
        )
      );
    }
  };

  const handleChangeDraggingItem = (item: TierListItemProps | null) => {
    onChangeDraggIngItem(item);
  };

  const handleSwapTierListRows = (
    swapTo: 'up' | 'down',
    selectedRowIndex: number
  ) => {
    const currentTierListRows = [...updatedTierListRows];
    const firstTierListIndex = 0;
    const lastTierListIndex = currentTierListRows.length - 2;
    const canSwapTierListRow =
      swapTo === 'up'
        ? selectedRowIndex > firstTierListIndex
        : selectedRowIndex < lastTierListIndex;

    if (!canSwapTierListRow) return;

    const nextRowIndex = getNextTierListRowIndexOnSwap(
      swapTo,
      currentTierListRows,
      selectedRowIndex
    );

    setUpdatedTierListRows(
      swapArrayElement(currentTierListRows, selectedRowIndex, nextRowIndex)
    );
  };

  const handleCloseModal = () => setSelectedRow(undefined);

  const handleUpdatedSelectedRow = (newTierListRow: TierListRowProps) => {
    setUpdatedTierListRows((prev) =>
      prev.map((row) => {
        if (newTierListRow.id === row.id) {
          return newTierListRow;
        }
        return row;
      })
    );

    handleCloseModal();
  };

  const handleCallAction = (
    action: 'delete' | 'clear' | 'addAbove' | 'addBelow',
    selectedRow: TierListRowProps
  ) => {
    const newRow = {
      id: updatedTierListRows.length.toString(),
      title: 'NEW',
      items: [],
      color: getRandomColor(),
    };

    const actions = {
      delete: () => {
        setUpdatedTierListRows((prev) =>
          prev
            .map((row) => {
              if (row.id === 'initial-list') {
                return {
                  ...row,
                  items: [...row.items, ...selectedRow.items],
                };
              }
              return row;
            })
            .filter((row) => row.id !== selectedRow.id)
        );
        handleCloseModal();
      },
      clear: () => {
        setUpdatedTierListRows((prev) =>
          prev.map((row) => {
            if (row.id === selectedRow.id) {
              return {
                ...row,
                items: [],
              };
            }
            if (row.id === 'initial-list') {
              return {
                ...row,
                items: [...row.items, ...selectedRow.items],
              };
            }
            return row;
          })
        );
        handleCloseModal();
      },
      addAbove: () => {
        const selectedRowIndex = updatedTierListRows.findIndex(
          (row) => row.id === selectedRow.id
        );
        const currentTierListRows = updatedTierListRows;
        currentTierListRows.splice(selectedRowIndex, 0, newRow);
        setUpdatedTierListRows(currentTierListRows);
        handleCloseModal();
      },
      addBelow: () => {
        const selectedRowIndex = updatedTierListRows.findIndex(
          (row) => row.id === selectedRow.id
        );
        const currentTierListRows = updatedTierListRows;
        currentTierListRows.splice(selectedRowIndex + 1, 0, newRow);
        setUpdatedTierListRows(currentTierListRows);
        handleCloseModal();
      },
    };

    return actions[action]();
  };

  return (
    <S.Wrapper>
      {updatedTierListRows.map(({ id, title, items, color }, index) => {
        const selectedTierListRow = { id, title, items, color };
        return (
          <S.TierListRow
            key={id}
            isInitialRow={isInitialRow(id)}
            hideRow={isInitialRow(id) && !items.length}>
            {!isInitialRow(id) && (
              <S.TierListTitleBox
                color={color}
                onBlur={(event) =>
                  handleUpdatedSelectedRow({
                    ...selectedTierListRow,
                    title: (event.target as HTMLElement).textContent as string,
                  })
                }
                contentEditable
                suppressContentEditableWarning>
                <S.TierListTitle>{title}</S.TierListTitle>
              </S.TierListTitleBox>
            )}
            <S.TierListContent
              onDragOver={(event) => event.preventDefault()}
              onDragEnter={() => handleTierListDragEnter(id)}
              onDrop={handleDropItem}>
              <TierList
                tierListItems={items}
                onChangeDraggIngItem={handleChangeDraggingItem}
                draggIngItem={draggIngItem}
              />
            </S.TierListContent>
            {!isInitialRow(id) && (
              <S.TierListSettingsBox>
                <Gear
                  size={28}
                  onClick={() => setSelectedRow(selectedTierListRow)}
                />
                <S.TierListSettingsArrowsBox>
                  <CaretUp
                    size={28}
                    onClick={() => handleSwapTierListRows('up', index)}
                  />
                  <CaretDown
                    size={28}
                    onClick={() => handleSwapTierListRows('down', index)}
                  />
                </S.TierListSettingsArrowsBox>
              </S.TierListSettingsBox>
            )}
          </S.TierListRow>
        );
      })}
      {!!selectedRow && (
        <S.ModalWrapper>
          <S.ModalContent>
            <S.ModalHeader>
              <S.ModalText>Choose a Label Background Color:</S.ModalText>
              <X size={16} onClick={() => handleUpdatedSelectedRow(selectedRow)} />
            </S.ModalHeader>
            <S.ColorsBox>
              {rowColors.map((color) => (
                <S.ColorOption
                  role="button"
                  isSelected={selectedRow.color === color}
                  onClick={() =>
                    setSelectedRow({
                      ...selectedRow,
                      color,
                    })
                  }
                  key={color}
                  background={color}
                />
              ))}
            </S.ColorsBox>
            <S.ModalText>Edit Label Text Below:</S.ModalText>
            <S.TextArea
              placeholder="Row title"
              value={selectedRow?.title}
              onChange={(event) =>
                setSelectedRow({ ...selectedRow, title: event.target.value })
              }
            />
            <S.ButtonsBox>
              <S.Button onClick={() => handleCallAction('delete', selectedRow)}>
                Delete Row
              </S.Button>
              <S.Button onClick={() => handleCallAction('clear', selectedRow)}>
                Clear Row Images
              </S.Button>
              <S.Button onClick={() => handleCallAction('addAbove', selectedRow)}>
                Add a Row Above
              </S.Button>
              <S.Button onClick={() => handleCallAction('addBelow', selectedRow)}>
                Add a Row Below
              </S.Button>
            </S.ButtonsBox>
          </S.ModalContent>
        </S.ModalWrapper>
      )}
    </S.Wrapper>
  );
}
