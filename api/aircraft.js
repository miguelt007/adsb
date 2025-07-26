console.log("🧪 RAPIDAPI_KEY:", process.env.RAPIDAPI_KEY);
export default async function handler(req, res) {
  const response = await fetch(
    "https://aircraftscatter.p.rapidapi.com/lat/38.7223/lon/-9.1393/",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "aircraftscatter.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPIDAPI_KEY
      }
    }
  );

  if (!response.ok) {
    return res.status(response.status).json({ error: "Erro ao buscar aeronaves" });
  }

  const data = await response.json();
  res.status(200).json(data);
}
