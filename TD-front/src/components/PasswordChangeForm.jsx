import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useState } from 'react';

const Form = styled.form`
  margin-top: 1rem;
  background: none;
  padding: 0;
  border-radius: 0;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Label = styled.label`
  color: #fff;
  font-family: 'Georgia', serif;
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.7rem;
  border-radius: 4px;
  border: none;
  margin-top: 0.3rem;
  font-size: 1rem;
`;

const Error = styled.span`
  color: #ffbdbd;
  font-size: 0.95rem;
  margin-left: 0.5rem;
`;

const Button = styled.button`
  background: #111;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #fff;
    color: #111;
  }
`;

export default function PasswordChangeForm({ onPasswordChange }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async data => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      alert('Nu ești autentificat!');
      return;
    }
    const response = await fetch('http://localhost:5035/api/users/changepassword', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        newPassword: data.newPassword
      })
    });
    if (response.ok) {
      localStorage.setItem('userPassword', data.newPassword);
      if (onPasswordChange) onPasswordChange(data.newPassword);
      alert('Parola a fost schimbată cu succes!');
    } else {
      const err = await response.json();
      alert(err.message || 'Eroare la schimbarea parolei!');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        New Password:
        <Input {...register('newPassword', { required: true, minLength: 4 })} type={showPassword ? 'text' : 'password'} />
        {errors.newPassword && <Error>Minimum 4 characters</Error>}
      </Label>
      <Label>
        Confirm Password:
        <Input {...register('confirm', { 
          required: true, 
          validate: value => value === watch('newPassword') 
        })} type={showPassword ? 'text' : 'password'} />
        {errors.confirm && <Error>Passwords do not match</Error>}
      </Label>
      <Button type="button" style={{marginBottom: '0.5rem'}} onClick={() => setShowPassword(v => !v)}>
        {showPassword ? 'Hide password' : 'Show password'}
      </Button>
      <Button type="submit">CHANGE PASSWORD</Button>
    </Form>
  );
} 