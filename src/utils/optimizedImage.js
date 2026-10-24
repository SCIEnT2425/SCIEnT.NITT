// Cloudinary serves resized, re-encoded copies when transformation parameters
// are added to the URL, so cards can request a small WebP/AVIF instead of the
// full-size upload. Other URLs (local files, Firebase, Commons) pass through.
const UPLOAD = '/image/upload/';

export const optimizedImage = (url, width) => {
  if (typeof url !== 'string' || !url.includes('res.cloudinary.com') || !url.includes(UPLOAD)) return url;
  const [base, rest] = url.split(UPLOAD);
  // Leave URLs that already carry transformations (e.g. "w_400,c_fill/...")
  if (/^[a-z]{1,3}_[^/]*\//.test(rest)) return url;
  return `${base}${UPLOAD}f_auto,q_auto,c_limit,w_${width}/${rest}`;
};
