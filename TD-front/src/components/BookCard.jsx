import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
  background: #37474f;
  border-radius: 8px;
  width: 220px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  cursor: pointer;
`;

const Cover = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
`;

export default function BookCard({ book }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/book/${book.id}`)}>
      <Cover src={book.cover} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </Card>
  );
} 