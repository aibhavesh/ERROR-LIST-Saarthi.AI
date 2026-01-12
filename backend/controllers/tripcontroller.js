import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

export const planTrip = async (req, res) => {
  try {
    const { from, to, priority } = req.body;

    if (!from || !to || !priority) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const input_value = `The user wants to travel from ${from} to ${to} with a preference for ${priority}.`;

    const payload = {
      input_value,
      output_type: "chat",
      input_type: "chat",
      session_id: "user_1"
    };

    const langflowResponse = await fetch(
      'https://api.langflow.astra.datastax.com/lf/d0e508fd-3e83-482e-92fe-cbc69362988f/api/v1/run/61daf701-1e9f-4af4-b990-2bc691c262c6',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ASTRA_API_KEY}`
        },
        body: JSON.stringify(payload)
      }
    );

    if (!process.env.ASTRA_API_KEY) {
      return res.status(500).json({ message: 'Server misconfigured: ASTRA_API_KEY missing' });
    }

    if (!langflowResponse.ok) {
      console.error(`Langflow API error: ${langflowResponse.status}`);
      return res.status(500).json({ message: 'Langflow API error', status: langflowResponse.status });
    }

    const text = await langflowResponse.text();
    console.log('Langflow raw response:', text);

    let langflowData;
    try {
      langflowData = JSON.parse(text);
    } catch (parseErr) {
      console.error('Invalid JSON from Langflow:', parseErr);
      return res.status(500).json({ message: 'Invalid JSON response from Langflow API' });
    }

    res.status(200).json({ message: 'Trip planned', output: langflowData });

  } catch (err) {
    console.error('Trip planning error:', err);
    res.status(500).json({ error: 'Trip planning failed', details: err.message });
  }
};
