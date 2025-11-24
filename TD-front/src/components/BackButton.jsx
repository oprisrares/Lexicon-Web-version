import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  position: fixed;
  bottom: 30px;
  left: 30px;
  background: #222;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #fff;
    color: #222;
  }
`;

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)} title="Back">&#8592;</Button>
  );
} 