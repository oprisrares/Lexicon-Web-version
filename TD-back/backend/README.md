# TD-back

Acest proiect conține partea de server (backend) a aplicației, construită cu ASP.NET Core.

## Structura proiectului

- `Controllers/` - Controlerele API
- `Models/` - Modelele de date
- `Data/` - Contextul bazei de date
- `DTOs/` - Data Transfer Objects
- `Program.cs` - Punctul de intrare al aplicației

## Instrucțiuni de pornire

1. Asigură-te că ai .NET 8 SDK instalat.

2. Navighează în directorul backend:
   ```bash
   cd backend
   ```

3. Pornește serverul:
   ```bash
   dotnet run
   ```

4. Accesează API-ul la adresa: http://localhost:5000

## Configurare CORS

Asigură-te că CORS este configurat corect pentru a permite requesturi de la frontend (http://localhost:5173). 