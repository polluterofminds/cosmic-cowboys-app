const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

export const uploadJson = async (payload) => {
  try {
    const { body, options } = payload;
    
    return await pinata.pinJSONToIPFS(body, options)
  } catch (error) {
    throw error;
  }
}

export const getFiles = async (filters) => {
  try {
    return await pinata.pinList(filters);
  } catch (error) {
    throw error;
  }
}