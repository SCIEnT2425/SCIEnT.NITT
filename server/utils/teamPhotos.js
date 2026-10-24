const { randomUUID } = require('crypto');
const sharp = require('sharp');

// Cards show photos at about 320 x 360 CSS px; covering 800 x 1000 suits 2x screens.
// Phone uploads are often 5-8 MB; this brings them to roughly 100-200 KB.
const MAX_WIDTH = 800;
const MAX_HEIGHT = 1000;

// Scale down until the photo just covers MAX_WIDTH x MAX_HEIGHT (never
// enlarging): the card crops to a portrait frame, so a landscape shot keeps
// enough height. Honours the camera's EXIF rotation; re-encodes as progressive JPEG.
const resizeTeamPhoto = (buffer) =>
  sharp(buffer)
    .rotate()
    .resize({ width: MAX_WIDTH, height: MAX_HEIGHT, fit: 'outside', withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toBuffer();

// Upload a JPEG to Firebase Storage and return its public download URL
// (a firebasestorage.googleapis.com URL with a download token, as the console makes)
const uploadTeamPhoto = async (bucket, destPath, buffer) => {
  const fileRef = bucket.file(destPath);
  const token = randomUUID();
  await fileRef.save(buffer, {
    contentType: 'image/jpeg',
    metadata: {
      cacheControl: 'public, max-age=31536000',
      metadata: { firebaseStorageDownloadTokens: token },
    },
  });
  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(destPath)}?alt=media&token=${token}`;
};

module.exports = { resizeTeamPhoto, uploadTeamPhoto };
