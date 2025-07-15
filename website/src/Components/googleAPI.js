import axios from 'axios';

const baseURL = 'https://www.googleapis.com/drive/v3';

export const getFilesInFolder = async (folderId, apiKey) => {
  try {
    const response = await axios.get(`${baseURL}/files`, {
      params: {
        q: `'${folderId}' in parents`,
        fields: 'files(id, thumbnailLink)',
        key: apiKey,
      },
    });

    const files = response.data.files;
    const thumbnailLinks = files.map(file => file.thumbnailLink.replace('s220', 's1000'));
    return thumbnailLinks;
  } catch (error) {
    console.error('Error retrieving files:', error);
    throw error;
  }
};