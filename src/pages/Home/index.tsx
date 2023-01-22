import { useState } from 'react';

import { TierListCard } from 'src/components/TierListCard';
import { TierListRows } from 'src/components/TierListRows';
import { getRandomColor } from 'src/helpers';

import narutoData from '../../../naruto.json';
import nbaData from '../../../nba.json';
import * as S from './styles';
import { TierListItemProps } from './types';

export function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<'naruto' | 'nba' | null>(
    null
  );
  const [draggIngItem, setDraggIngItem] = useState<TierListItemProps | null>(null);

  const initialTierListRows = [
    {
      id: '1',
      title: 'Elite',
      color: getRandomColor(),
      items: [],
    },
    {
      id: '2',
      title: 'Good',
      color: getRandomColor(),
      items: [],
    },
    {
      id: '3',
      title: 'Regular',
      color: getRandomColor(),
      items: [],
    },
    {
      id: '4',
      title: 'Bad',
      color: getRandomColor(),
      items: [],
    },
    {
      id: 'initial-list',
      title: 'Title 3',
      items: selectedTemplate === 'naruto' ? narutoData : nbaData,
    },
  ];

  return (
    <S.HomeContainer>
      <header>
        <S.Title>Tier List React</S.Title>
      </header>

      {selectedTemplate ? (
        <>
          <TierListRows
            tierListRows={initialTierListRows}
            draggIngItem={draggIngItem}
            onChangeDraggIngItem={setDraggIngItem}
          />
          <S.Button onClick={() => setSelectedTemplate(null)}>
            Choose another template
          </S.Button>
        </>
      ) : (
        <>
          <S.Description>Select a template:</S.Description>
          <S.TemplatesBox>
            <TierListCard
              onSelect={setSelectedTemplate}
              id="naruto"
              title="Naruto"
              bgImage="/src/assets/naruto.jpg"
            />
            <TierListCard
              onSelect={setSelectedTemplate}
              id="nba"
              title="NBA"
              bgImage="/src/assets/lakers.jpg"
            />
          </S.TemplatesBox>
        </>
      )}
      <footer>
        <S.Description>Made by:</S.Description>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/mvmmarcus/"
          rel="noreferrer">
          https://www.linkedin.com/in/mvmmarcus/
        </a>
        <a target="_blank" href="https://github.com/mvmmarcus" rel="noreferrer">
          https://github.com/mvmmarcus
        </a>
      </footer>
    </S.HomeContainer>
  );
}
