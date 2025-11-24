import styled from "styled-components";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 2rem 2vw;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SearchBar = styled.input`
  width: 30vw;
  min-width: 200px;
  padding: 0.7rem 1rem;
  border-radius: 4px;
  border: none;
  font-size: 1.1rem;
`;

const SearchButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.7rem 1.2rem;
  border-radius: 4px;
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #fff;
    color: #222;
  }
`;

const GenreSelect = styled.select`
  margin-left: 1rem;
  padding: 0.7rem 1rem;
  border-radius: 4px;
  border: none;
  font-size: 1.1rem;
`;

const ProfileIcon = styled(FaUserCircle)`
  color: #fff;
  font-size: 2.5rem;
  cursor: pointer;
`;

const Grid = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: #37474f;
  border-radius: 8px;
  width: 220px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const Cover = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
`;

export default function Home() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [carti, setCarti] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5035/api/carti")
      .then((res) => res.json())
      .then((data) => {
        console.log("Carti primite:", data);
        setCarti(data);
        setLoading(false);
      });
  }, []);

  // Generează lista de genuri distincte pentru dropdown
  const genres = [
    "Toate",
    ...Array.from(new Set(carti.map((c) => c.categorie || c.category))).filter(
      Boolean
    ),
  ];

  if (loading)
    return (
      <div style={{ color: "#fff", textAlign: "center", marginTop: 50 }}>
        Se încarcă...
      </div>
    );

  return (
    <Container>
      <TopBar>
        <div>
          <SearchBar
            placeholder="Caută o carte..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const searchTitle = search.trim().toLowerCase();
                const found = carti.find((carte) =>
                  (carte.titlu || carte.Titlu || "")
                    .toLowerCase()
                    .includes(searchTitle)
                );
                if (found) {
                  navigate(`/book/${found.codCarte || found.CodCarte}`);
                } else {
                  alert("Cartea nu a fost găsită!");
                }
              }
            }}
          />
          <SearchButton
            onClick={() => {
              const searchTitle = search.trim().toLowerCase();
              const found = carti.find((carte) =>
                (carte.titlu || carte.Titlu || "")
                  .toLowerCase()
                  .includes(searchTitle)
              );
              if (found) {
                navigate(`/book/${found.codCarte || found.CodCarte}`);
              } else {
                alert("Cartea nu a fost găsită!");
              }
            }}
          >
            Căutare
          </SearchButton>
        </div>
        <ProfileIcon onClick={() => navigate("/account")} />
      </TopBar>
      <h2
        style={{
          fontFamily: "Georgia",
          fontStyle: "italic",
          marginBottom: "2rem",
          textAlign: "center",
          fontSize: "2.2rem",
        }}
      >
        Bun venit
      </h2>
      <Grid>
        {carti.map((carte) => (
          <Card
            key={carte.codCarte || carte.CodCarte}
            onClick={() =>
              navigate(`/book/${carte.codCarte || carte.CodCarte}`)
            }
          >
            <Cover
              src={
                !carte.poza && !carte.Poza
                  ? "/covers/default.jpg"
                  : (carte.poza || carte.Poza) === "default.jpg"
                  ? "/covers/default.jpg"
                  : `/covers/${carte.poza || carte.Poza}`
              }
              alt={carte.titlu || carte.Titlu}
            />
            <h3>{carte.titlu || carte.Titlu}</h3>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}
