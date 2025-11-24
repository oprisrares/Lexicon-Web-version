import styled from "styled-components";
import PasswordChangeForm from "../components/PasswordChangeForm";
import Cart from "../components/Cart";
import BackButton from "../components/BackButton";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Container = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
`;

const ContentWrapper = styled.div`
  width: 100vw;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopRow = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const InfoSection = styled.div`
  background: #37474f;
  border-radius: 10px;
  padding: 2rem 2.5rem;
  flex: 1;
  color: #fff;
`;

const PasswordSection = styled.div`
  background: #37474f;
  border-radius: 10px;
  padding: 2rem 2.5rem;
  flex: 1;
  color: #fff;
`;

const CartSection = styled.div`
  background: #37474f;
  border-radius: 10px;
  padding: 2rem 2.5rem 1.5rem 2.5rem;
  width: 100%;
  box-sizing: border-box;
  color: #fff;
  align-self: center;
  margin-bottom: 0;
`;

const SectionTitle = styled.h3`
  font-family: "Georgia", serif;
  font-style: italic;
  margin-bottom: 1rem;
`;

// Funcție utilitară pentru a extrage id-ul rândului din favorite, indiferent de denumire
function getFavoriteRowId(fav) {
  console.log('getFavoriteRowId primit:', fav);
  return fav.id_cos ?? fav.ID_cos ?? fav.Id_cos ?? fav["id_cos"] ?? fav["ID_cos"] ?? fav["Id_cos"];
}

export default function Account() {
  const [password, setPassword] = useState(
    localStorage.getItem("userPassword") || ""
  );
  const email = localStorage.getItem("userEmail") || "";
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  console.log("parola din Account.jsx:", password);

  useEffect(() => {
    setPassword(localStorage.getItem("userPassword") || "");
    fetch(`http://localhost:5035/api/cos?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Favorite primite de la backend:", data);
        // Forțează conversia la JSON pur
        const favoritesPure = JSON.parse(JSON.stringify(data));
        setFavorites(favoritesPure);
        if (Array.isArray(favoritesPure)) {
          favoritesPure.forEach((fav, idx) => {
            console.log(`favorite[${idx}]:`, fav, "chei:", Object.keys(fav));
            for (const key in fav) {
              console.log(`favorite[${idx}] key:`, key, 'value:', fav[key]);
            }
          });
        }
      })
      .catch((error) => {
        console.error("Eroare la preluarea favoritelor:", error);
      });
  }, [email]);

  const handleAddToFavorites = (codCarte) => {
    fetch("http://localhost:5035/api/cos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Email: email, CodCarte: codCarte }),
    })
      .then(() => {
        console.log("Carte adăugată la favorite:", codCarte);
        return fetch(`http://localhost:5035/api/cos?email=${email}`);
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("Favorite actualizate după adăugare:", data);
        setFavorites(data);
      })
      .catch((error) => {
        console.error("Eroare la adăugarea în favorite:", error);
      });
  };

  const handleRemoveFromFavorites = (rowIdOrObj) => {
    let id_cos = rowIdOrObj.id_cos ?? rowIdOrObj.iD_cos ?? rowIdOrObj.ID_cos ?? rowIdOrObj["id_cos"] ?? rowIdOrObj["iD_cos"] ?? rowIdOrObj["ID_cos"];
    console.log('Obiect primit la ștergere:', rowIdOrObj);
    console.log('id_cos extras pentru ștergere:', id_cos);
    if (!id_cos && id_cos !== 0) {
      alert("Nu există id valid pentru ștergere!");
      return;
    }
    fetch(`http://localhost:5035/api/cos/${id_cos}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        console.log("Carte ștearsă din favorite:", id_cos);
        return fetch(`http://localhost:5035/api/cos?email=${email}`);
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("Favorite actualizate după ștergere:", data);
        setFavorites(data);
      })
      .catch((error) => {
        console.error("Eroare la ștergerea din favorite:", error);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5035/api/carti/${id}`)
      .then((res) => res.json())
      .then((data) => setCarte(data));
  }, [id]);

  return (
    <Container>
      <ContentWrapper>
        <TopRow>
          <InfoSection>
            <SectionTitle>Informații cont</SectionTitle>
            <div style={{ fontSize: "1.1rem", color: "#fff" }}>
              <div>
                <b>Email:</b> {email ? email : "Nu ești autentificat!"}
              </div>
              <div>
                <b>Password:</b>{" "}
                <span style={{ color: "#fff" }}>
                  {password ? password : "Nu ești autentificat!"}
                </span>
              </div>
            </div>
          </InfoSection>
          <PasswordSection>
            <SectionTitle>Change password</SectionTitle>
            <PasswordChangeForm onPasswordChange={setPassword} />
          </PasswordSection>
        </TopRow>
        {console.log('Account.jsx favorites ca prop pentru Cart:', favorites)}
        <CartSection>
          <SectionTitle>Favorite</SectionTitle>
          <Cart
            isFavorite={true}
            favorites={favorites}
            onRemoveFavorite={handleRemoveFromFavorites}
            onAddFavorite={handleAddToFavorites}
          />
        </CartSection>
      </ContentWrapper>
      <BackButton />
    </Container>
  );
}
