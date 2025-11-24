import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "../assets/library-bg.jpg";
import { useState } from "react";

const Background = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: url(${bgImg}) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  padding: 3rem 2.5rem;
  border-radius: 10px;
  margin: 3rem 5vw 3rem 0;
  min-width: 350px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Label = styled.label`
  color: #fff;
  font-family: "Georgia", serif;
  font-style: italic;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.7rem;
  border-radius: 4px;
  border: none;
  margin-top: 0.3rem;
  font-size: 1rem;
`;

const Button = styled.button`
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  padding: 0.7rem 1.2rem;
  border-radius: 4px;
  font-size: 1.1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #fff;
    color: #222;
  }
`;

const CartSection = styled.div`
  background: #37474f;
  border-radius: 10px;
  padding: 2rem 2.5rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 1000px;
  box-sizing: border-box;
  color: #fff;
  align-self: center;
`;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data) => {
    try {
      console.log("Attempting login with:", data);
      const response = await fetch("http://localhost:5035/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          parola: data.password,
        }),
      });
      console.log("Login response status:", response.status);
      const responseData = await response.json();
      console.log("Login response data:", responseData);

      if (response.ok) {
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userPassword", data.password);
        alert("Autentificare reușită!");
        console.log("Navigating to /home...");
        navigate("/home");
      } else {
        alert(responseData.message || "Email sau parolă incorectă!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(
        "A apărut o eroare la autentificare. Vă rugăm să încercați din nou."
      );
    }
  };

  return (
    <Background>
      <Overlay as="form" onSubmit={handleSubmit(onSubmit)}>
        <Label>
          E-MAIL:
          <Input
            {...register("email", { required: true })}
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <span style={{ color: "#ffbdbd" }}>Email is required</span>
          )}
        </Label>
        <Label>
          PASSWORD:
          <div style={{ position: 'relative', width: '100%' }}>
            <Input
              {...register("password", { required: true })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              style={{ paddingRight: '2.2rem', width: '95%' }}
            />
            <span
              onClick={() => setShowPassword((v) => !v)}
              style={{
                position: 'absolute',
                right: '0.7rem',
                top: 0,
                bottom: 0,
                margin: 'auto',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                color: '#fff',
                cursor: 'pointer',
                zIndex: 2,
                background: 'transparent',
              }}
              tabIndex={0}
              aria-label={showPassword ? 'Ascunde parola' : 'Afișează parola'}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" style={{ pointerEvents: 'none' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" style={{ pointerEvents: 'none' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95m3.362-2.7A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.293 5.03M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                </svg>
              )}
            </span>
          </div>
          {errors.password && (
            <span style={{ color: "#ffbdbd" }}>Password is required</span>
          )}
        </Label>

        <Button type="submit">LOGIN</Button>
        <div style={{ color: "#fff", textAlign: "center", marginTop: 10 }}>
          DON'T HAVE AN ACCOUNT?{" "}
          <Link
            to="/register"
            style={{ color: "#90caf9", fontStyle: "italic" }}
          >
            REGISTER
          </Link>
        </div>
      </Overlay>
    </Background>
  );
}
