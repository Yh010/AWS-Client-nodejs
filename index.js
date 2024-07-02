const {S3Client,GetObjectCommand, PutObjectCommand } = require ("@aws-sdk/client-s3");
const { getSignedUrl } = require ("@aws-sdk/s3-request-presigner");
require('dotenv').config()

const s3client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.accessKeyId,
        secretAccessKey:process.env.secretAccessKey
    }
})

async function getObjectURL(key) {
    const command = new GetObjectCommand({
        Bucket: "yashfirsttestbucket",
        Key: key
    });
    const url = await  getSignedUrl(s3client, command);
    return url;
}

async function putObject(filename,contentType) {
    const command = new PutObjectCommand({
        Bucket: "yashfirsttestbucket",
        Key: `uploads/user/${filename}`,
        ContentType: contentType
    });
    const url = await getSignedUrl(s3client, command);
    return url; 
}
async function main() {
    /* console.log(await getObjectURL("website-blog.jpg")) */
    console.log(await putObject('image-1.jpeg','image/jpeg'))
}

main()