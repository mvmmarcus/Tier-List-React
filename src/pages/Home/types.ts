export interface TierListItemProps {
  id: string;
  imgUrl: string;
}

export interface TierListRowProps {
  id: string;
  title: string;
  color?: string;
  items: TierListItemProps[];
}
