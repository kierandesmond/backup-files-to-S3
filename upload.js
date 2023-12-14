require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configure AWS with your credentials
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

function uploadFileToS3(filePath, bucketName) {
    const fileContent = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent
    };

    s3.upload(params, function(err, data) {
        if (err) {
            console.error("Error uploading file:", err);
            return;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
}

function uploadPDFs(directoryPath, bucketName) {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.error('Unable to scan directory:', err);
            return;
        } 

        files.forEach(function (file) {
            if(path.extname(file) === '.pdf') {
                uploadFileToS3(path.join(directoryPath, file), bucketName);
            }
        });
    });
}

uploadPDFs(process.env.PDF_DIRECTORY_PATH, process.env.AWS_S3_BUCKET);
