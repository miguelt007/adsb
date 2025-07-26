export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const lat = 38.7223;
  const lon = -9.1393;

  console.log('RAPIDAPI_KEY:', !!process.env.RAPIDAPI_KEY); // true se definida, false se vazia

  try {
    const response = await fetch(`https://aircraftscatter.p.rapidapi.com/lat/${lat}/lon/${lon}/`, {
      headers: {
        'x-rapidapi-host': 'aircraftscatter.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      }
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Resposta da API não OK:', response.status, text);
      return res.status(response.status).json({ error: 'Erro da API externa', detail: text });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro ao buscar aeronaves" });
  }
}
