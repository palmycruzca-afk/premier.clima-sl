import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = process.env.PORT || 3000;

  // Initialize Gemini AI SDK if API key is present
  const aiApiKey = process.env.GEMINI_API_KEY;
  const ai = aiApiKey ? new GoogleGenAI({ apiKey: aiApiKey }) : null;

  // API endpoint for AI Climate Advisor / Estimate recommendations
  app.post('/api/recommendation', async (req, res) => {
    try {
      const { propertyType, areaSqm, needs, location } = req.body;

      if (!ai) {
        // Fallback recommendations if API key isn't configured yet
        return res.json({
          recommendation: `Para un espacio de ${areaSqm || 'aproximadamente'} m² (${propertyType || 'Vivienda'}), en ${location || 'Madrid Sur/Toledo'}, Premier Clima SL recomienda un sistema eficiente con bomba de calor inverter (Split o Conductos según distribución) o Aerotermia para máxima eficiencia energética. Contáctanos por teléfono o WhatsApp para una valoración personalizada y sin compromiso.`,
          systemType: 'Sistema Inverter / Bomba de Calor',
          estimatedEfficiency: 'A+++ / Alta Eficiencia Energética'
        });
      }

      const prompt = `Actúa como un experto asesor técnico en climatización de la empresa Premier Clima SL (Casarrubuelos, Madrid).
Analiza los siguientes datos de un cliente:
- Tipo de inmueble: ${propertyType}
- Superficie aproximada: ${areaSqm} m²
- Necesidades principales: ${needs}
- Ubicación: ${location}

Proporciona una recomendación técnica profesional, clara y directa en español de España (con un tono formal y cercano), sugiriendo cuál de nuestros servicios es ideal (Aire acondicionado con bomba de calor [split, cassette o conductos], Aerotermia y placas solares, Mantenimiento para empresas o Reparaciones sujetas a valoración), destacando los beneficios en confort y eficiencia.

Devuelve la respuesta en formato JSON estricto con las siguientes claves:
{
  "recommendation": "texto detallado de la recomendación técnica",
  "systemType": "tipo de sistema recomendado (ej. Split Inverter / Conductos / Aerotermia)",
  "estimatedEfficiency": "clasificación energética estimada"
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const resultText = response.text;
      if (!resultText) {
        throw new Error('No response from Gemini');
      }

      const parsed = JSON.parse(resultText);
      res.json(parsed);
    } catch (error: any) {
      console.error('Error in /api/recommendation:', error);
      res.status(500).json({
        recommendation: 'Recomendamos un sistema de aire acondicionado inverter con bomba de calor o aerotermia adaptado a sus necesidades. Contacte con nuestros técnicos Juan Carlos o Diego para una visita y presupuesto sin compromiso.',
        systemType: 'Bomba de Calor Inverter',
        estimatedEfficiency: 'Alta Eficiencia A++'
      });
    }
  });

  // API endpoint for contact / quote submissions
  app.post('/api/contact', (req, res) => {
    const { name, phone, email, service, message, zone } = req.body;
    console.log('Nuevo presupuesto recibido:', { name, phone, email, service, message, zone });
    res.json({
      success: true,
      message: 'Presupuesto solicitado con éxito. Juan Carlos o Diego le contactarán a la mayor brevedad.'
    });
  });

  // Setup Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Premier Clima SL server running on http://localhost:${PORT}`);
  });
}

startServer();
