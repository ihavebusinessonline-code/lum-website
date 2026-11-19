const configuredOrigin = process.env.SITE_URL?.trim();

function getSiteUrl(origin: string): URL {
  const url = new URL(origin);
  if (url.protocol !== 'https:' || url.username || url.password ||
      url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL must be the HTTPS origin of the production site.');
  }

  return url;
}

export const siteUrl = getSiteUrl(configuredOrigin || 'https://ihavebusinessonline.com');
