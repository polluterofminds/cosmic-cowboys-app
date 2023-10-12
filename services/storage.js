const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });

export const uploadJson = async (payload) => {
  try {
    const { body, options } = payload;
    
    await pinata.pinJSONToIPFS(body, options)
  } catch (error) {
    throw error;
  }
}