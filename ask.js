export default async function handler(req, res) {
  const { question } = req.body;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: question }]
      })
    });

    const data = await openaiRes.json();
    res.status(200).json({ answer: data.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ answer: "שגיאה: " + e.message });
  }
}
