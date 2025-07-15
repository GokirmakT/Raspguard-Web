import axios from 'axios';

const baseURL = 'https://sheets.googleapis.com/v4/spreadsheets';

export const getTextsInSheet = async (spreadsheetId, apiKey) => {
  try {
    const response = await axios.get(`${baseURL}/${spreadsheetId}/values/Sheet1!A1:Z1000`, {
      params: {
        key: apiKey,
      },
    });

    const rows = response.data.values;
    // Örnek olarak, her satırın ilk hücresindeki metni alalım
    const texts = rows.map(row => row[0]);
    return texts;
  } catch (error) {
    console.error('Hata: Metinler alınamadı:', error);
    throw error;
  }
};
