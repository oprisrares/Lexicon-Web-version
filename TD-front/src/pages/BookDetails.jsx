import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  padding: 2rem 3vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ProfileIcon = styled(FaUserCircle)`
  margin: 0.5rem 0 1.5rem 0;
  color: #fff;
  font-size: 2.5rem;
  cursor: pointer;
  align-self: flex-end;
`;

const TopSection = styled.div`
  display: flex;
  gap: 3rem;
  width: 100%;
  max-width: 1100px;
  margin-top: 2rem;
  justify-content: center;
`;

const CoverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
`;

const Cover = styled.img`
  width: 320px;
  height: 440px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
  background: #fff;
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: flex-start;
`;

const Title = styled.h2`
  font-family: 'Georgia', serif;
  font-style: italic;
  margin-bottom: 0.5rem;
  align-self: flex-start;
`;

const Label = styled.div`
  font-family: 'Georgia', serif;
  font-style: italic;
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const Description = styled.textarea`
  width: 100%;
  min-height: 120px;
  font-size: 1.1rem;
  border-radius: 6px;
  border: none;
  padding: 0.7rem;
  resize: none;
  background: #f5f5f5;
  color: #222;
`;

const Review = styled.textarea`
  width: 100%;
  min-height: 50px;
  font-size: 1.1rem;
  border-radius: 6px;
  border: none;
  padding: 0.7rem;
  resize: none;
  background: #f5f5f5;
  color: #222;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button`
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  padding: 0.7rem 1.5rem;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #fff;
    color: #222;
  }
`;

function titluToPdfFileName(titlu) {
  return titlu
    .normalize('NFD').replace(/[0-\u036f]/g, '') // elimină diacritice
    .replace(/[^a-zA-Z0-9]/g, '_') // orice nu e litera/cifră devine _
    .replace(/_+/g, '_') // înlocuiește mai multe _ cu unul singur
    .replace(/^_|_$/g, '') // elimină _ de la început/sfârșit
    .toLowerCase() + '.pdf';
}

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [carte, setCarte] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const email = localStorage.getItem('userEmail') || '';

  useEffect(() => {
    fetch(`http://localhost:5035/api/carti/${id}`)
      .then(res => res.json())
      .then(data => {
        setCarte(data);
      });
    // Fetch favorite books for this user
    if (email) {
      fetch(`http://localhost:5035/api/cos?email=${email}`)
        .then(res => res.json())
        .then(data => setFavorites(data));
    }
  }, [id, email]);

  if (!carte) return <div>Se încarcă...</div>;

  // Verifică dacă această carte este deja în favorite
  const favObj = favorites.find(fav => {
    const carteId = carte.codCarte || carte.CodCarte || Number(id);
    return (
      fav.codCarte === carteId ||
      fav.Cod_carte === carteId ||
      fav.cod_carte === carteId ||
      fav.CodCarte === carteId
    );
  });
  const isFavorite = !!favObj;

  const handleAddToFavorites = () => {
    if (isFavorite) {
      alert('Cartea este deja în favorite!');
      return;
    }
    fetch('http://localhost:5035/api/cos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Email: email, CodCarte: carte.codCarte || carte.CodCarte || id })
    })
      .then(res => {
        if (res.ok) {
          setAdded(true);
          // Refetch favorites
          fetch(`http://localhost:5035/api/cos?email=${email}`)
            .then(res => res.json())
            .then(data => setFavorites(data));
          setTimeout(() => setAdded(false), 1200);
        } else {
          alert('Eroare la adăugare în favorite!');
        }
      });
  };

  return (
    <Container>
      <Title>{carte.titlu || carte.Titlu}</Title>
      <ProfileIcon onClick={() => navigate('/account')} title="My Account" />
      <TopSection>
        <CoverWrapper>
          <Cover
            src={
              !carte.poza && !carte.Poza ? '/covers/default.jpg' :
              ((carte.poza || carte.Poza) === 'default.jpg' ? '/covers/default.jpg' : `/covers/${carte.poza || carte.Poza}`)
            }
            alt={carte.titlu || carte.Titlu}
          />
        </CoverWrapper>
        <InfoSection>
          <div>
            <Label>Descriere:</Label>
            <Description value={carte.descriere || carte.Descriere || ''} readOnly />
          </div>
          <div>
            <Label>Recenzie:</Label>
            <Review value={carte.recenzie || carte.Recenzie || ''} readOnly />
          </div>
          <ButtonRow>
            <ActionButton
              onClick={handleAddToFavorites}
              disabled={added}
            >
              {added ? 'Adăugat!' : 'Adaugă la favorite'}
            </ActionButton>
            <ActionButton
              onClick={() => {
                if (!carte.pdf) {
                  alert('Nu există PDF pentru această carte!');
                  return;
                }
                window.open(`/pdfs/${carte.pdf}`, '_blank');
              }}
            >
              Citește PDF-ul
            </ActionButton>
          </ButtonRow>
        </InfoSection>
      </TopSection>
      <BackButton />
    </Container>
  );
} 