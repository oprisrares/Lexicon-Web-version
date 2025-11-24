import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: rgba(20, 20, 20, 0.9);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export default function Header() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register';

  return (
    <Nav>
      <Link to="/home" style={{ fontWeight: 'bold', fontSize: 22 }}>Library for all</Link>
      <NavLinks>
        {isAuthPage ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/home">Home</Link>
            <Link to="/account">My Account</Link>
          </>
        )}
      </NavLinks>
    </Nav>
  );
} 