import axios from "axios";

const AWS = require('aws-sdk');
const newname = require('uuid').v4().slice(0, 5);




const S3_BUCKET = 'dailyyachayimagenes';

class CoversServices {
  static baseURL = "http://localhost:4000";

  static myBucket = new AWS.S3({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    params: { Bucket: S3_BUCKET },
  });



  static getCoversFromServer = async (event_id) => {
    try {
      const response = await axios.get(`${CoversServices.baseURL}/covers/${event_id}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching covers from server: " + error.message);
    }
  };


  
  static sendCoverUrlsToServer = async (coverUrls) => {
    try {
      await axios.post(`${CoversServices.baseURL}/covers`, coverUrls);
      console.log('URLs de las imágenes enviadas al servidor');
    } catch (error) {
      console.error('Error al enviar los URLs al servidor:', error.message);
    }
  }


  static uploadFileToS3(file) {
    // const newName = `${newname}_${file.name}`;
    return new Promise((resolve, reject) => {
      const params = {
        ACL: "public-read",
        Body: file,
        Bucket: S3_BUCKET,
        Key: `covers/${file.name}`, // Usar el nuevo nombre del archivo
        ContentType: "image/jpeg",
      };

      CoversServices.myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
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
      const uploadPromises = files.map((file) =>
        CoversServices.uploadFileToS3(file)
      );
      const uploadedUrls = await Promise.all(uploadPromises);
      console.log(uploadedUrls);
      return uploadedUrls;
    } catch (error) {
      throw new Error("Error uploading files to S3: " + error.message);
    }
  }
}

export default CoversServices;
