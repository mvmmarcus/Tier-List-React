import * as S from './styles';

interface TierListCardProps {
  id: 'naruto' | 'nba' | null;
  bgImage: string;
  title: string;
  onSelect: (id: 'naruto' | 'nba' | null) => void;
}

export function TierListCard({ bgImage, title, id, onSelect }: TierListCardProps) {
  return (
    <S.Wrapper onClick={() => onSelect(id)}>
      <S.Title>{title}</S.Title>
      <img src={bgImage} alt="card" />
    </S.Wrapper>
  );
}
