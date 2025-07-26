export default async function handler(req, res) {
  // Permitir acesso de qualquer origem
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const lat = 38.7223;  // Lisboa
  const lon = -9.1393;

  try {
    const response = await fetch(`https://aircraftscatter.p.rapidapi.com/lat/${lat}/lon/${lon}/`, {
      headers: {
        'x-rapidapi-host': 'aircraftscatter.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro ao buscar aeronaves" });
  }
}
