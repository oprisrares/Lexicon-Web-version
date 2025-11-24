import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

const Table = styled.table`
  margin-top: 1rem;
  width: 100%;
  background: #263238;
  color: #fff;
  border-radius: 12px;
  overflow: hidden;
  border-collapse: collapse;
  font-size: 1.1rem;
`;

const Th = styled.th`
  padding: 1rem 1.5rem;
  background: #37474f;
  font-size: 1.2rem;
  text-align: left;
`;

const Tr = styled.tr`
  background: ${({ selected }) => (selected ? '#455a64' : 'inherit')};
  cursor: pointer;
  &:hover {
    background: #455a64;
  }
`;

const Td = styled.td`
  padding: 1rem 1.5rem;
  text-align: left;
`;

const DeleteButton = styled.button`
  margin-top: 1.5rem;
  background: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.9rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #fff;
    color: #111;
  }
`;

const DeleteIcon = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.3rem;
  cursor: pointer;
  margin-left: 1rem;
  &:hover {
    color: #ffbdbd;
  }
`;

export default function Cart({ isFavorite, favorites = [], onRemoveFavorite, onAddFavorite }) {
  const { cart, removeFromCart } = useCart();
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  // Folosește lista de favorite dacă există, altfel contextul cart
  const displayList = isFavorite ? favorites : cart;

  // Pentru a preveni adăugarea dublă la favorite
  const favoriteCoduri = favorites.map(fav => fav.codCarte || fav.Cod_carte);

  // Log pentru debug
  if (isFavorite) {
    console.log('Cart.jsx favorites primite ca prop:', favorites);
    favorites.forEach((fav, idx) => {
      console.log(`Cart.jsx favorite[${idx}]:`, fav, 'chei:', Object.keys(fav));
    });
  }

  return (
    <CartWrapper>
      <div style={{ fontFamily: 'Georgia', fontStyle: 'italic', fontSize: '1.3rem', marginBottom: 10 }}>
        {isFavorite ? 'Favoritele tale:' : 'Poveștile din coș:'}
      </div>
      <Table>
        <thead>
          <Tr>
            <Th>Titlu</Th>
            {!isFavorite && <Th>Acțiuni</Th>}
          </Tr>
        </thead>
        <tbody>
          {displayList.length === 0 ? (
            <Tr><Td colSpan={!isFavorite ? 2 : 1}>{isFavorite ? 'Lista de favorite este goală.' : 'Coșul este gol.'}</Td></Tr>
          ) : (
            displayList.map(book => {
              // Folosește DOAR book['iD_cos'] pentru id-ul de ștergere
              let bookId = book['iD_cos'];
              if (typeof bookId === 'string') {
                bookId = Number(bookId);
              }
              const carteId = book['cod_carte'];
              return (
                <Tr
                  key={isFavorite ? bookId : book['id']}
                  selected={selectedId === (isFavorite ? bookId : book['id'])}
                  onClick={() => {
                    if (isFavorite) {
                      if (carteId) navigate(`/book/${carteId}`);
                      setSelectedId(bookId);
                    } else {
                      setSelectedId(book['id']);
                    }
                  }}
                >
                  <Td style={{ display: 'flex', alignItems: 'center' }}>
                    {isFavorite ? (book['titlu'] || '(fără titlu)') : (book['title'] || '(fără titlu)')}
                    {isFavorite && (
                      <DeleteIcon
                        title="Șterge din Favorite"
                        onClick={e => {
                          e.stopPropagation();
                          if (bookId === undefined) {
                            console.error('EROARE: bookId este undefined! Obiectul book:', book);
                          }
                          if (!bookId && bookId !== 0) {
                            alert('Nu există id valid pentru ștergere!');
                            return;
                          }
                          if (onRemoveFavorite) onRemoveFavorite(book);
                        }}
                      >
                        🗑️
                      </DeleteIcon>
                    )}
                  </Td>
                  {!isFavorite && (
                    <Td style={{ display: 'flex', alignItems: 'center' }}>
                      <button
                        style={{
                          background: '#37474f',
                          color: '#fff',
                          border: '1px solid #fff',
                          borderRadius: '6px',
                          padding: '0.4rem 1.2rem',
                          marginRight: '1rem',
                          cursor: favoriteCoduri.includes(book['id']) ? 'not-allowed' : 'pointer',
                          opacity: favoriteCoduri.includes(book['id']) ? 0.5 : 1
                        }}
                        disabled={favoriteCoduri.includes(book['id'])}
                        onClick={e => {
                          e.stopPropagation();
                          if (onAddFavorite && !favoriteCoduri.includes(book['id'])) onAddFavorite(book['id']);
                        }}
                      >
                        {favoriteCoduri.includes(book['id']) ? 'Adăugată' : 'Adaugă la favorite'}
                      </button>
                      <DeleteIcon
                        title="Șterge din coș"
                        onClick={e => {
                          e.stopPropagation();
                          removeFromCart(book['id']);
                        }}
                      >
                        🗑️
                      </DeleteIcon>
                    </Td>
                  )}
                </Tr>
              );
            })
          )}
        </tbody>
      </Table>
    </CartWrapper>
  );
} 