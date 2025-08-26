export default async function handler(req, res) {
  if (req.method === "POST") {
    const { ask } = req.body;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-5", // model terbaru
          messages: [{ role: "user", content: ask }],
          max_tokens: 500
        })
      });

      const data = await response.json();

      res.status(200).json({
        result: data.choices?.[0]?.message?.content || "⚠️ Tidak ada respon dari AI"
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
