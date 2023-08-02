import axios from "axios";
const AWS = require('aws-sdk');



const S3_BUCKET = 'dailyyachayimagenes';

class CoversServices {
  static baseURL = 'http://localhost:4000';

  static myBucket = new AWS.S3({
    accessKeyId: "AKIARAPDFJYAMQCHO6SC",
    secretAccessKey: "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",
    params: { Bucket: S3_BUCKET },
  });

  static getCoversFromServer = async () => {
    try {
      const response = await axios.get(`${CoversServices.baseURL}/covers`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching covers from server: ' + error.message);
    }
  }

  static uploadFileToS3(file) {
    return new Promise((resolve, reject) => {
      const params = {
        ACL: 'public-read',
        Body: file, 
        Bucket: S3_BUCKET,
        Key: `covers/${file.name}`,
        ContentType: 'image/jpeg', 
      };

      CoversServices.myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        const progress = Math.round((evt.loaded / evt.total) * 100);
        file.progress = progress;
      })
      .send((err) => {
        if (err) {
          reject(err);
        } else {
          const url = `https://${S3_BUCKET}.s3.amazonaws.com/covers/${file.name}`;
          resolve(url);
        }
      });
  });
}

  static async uploadFilesToS3(files) {
    try {
      const uploadPromises = files.map((file) => CoversServices.uploadFileToS3(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      console.log(uploadedUrls);
      return uploadedUrls;
    } catch (error) {
      throw new Error('Error uploading files to S3: ' + error.message);
    }
  }
}

export default CoversServices;
