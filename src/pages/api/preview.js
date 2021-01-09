import fetch from 'node-fetch';

export default async (req, res) => {
  if (!req.query.id) {
    return res.status(404).end();
  }
  const key = {
    headers: {'X-API-KEY': process.env.MICRO_CMS_API_KEY},
  };

  const content = await fetch(
    `https://sample-next-blog.microcms.io/api/v1/blog/${req.query.id}?fields=id&draftKey=${req.query.draftKey}`,
    key
  )
  .then(res => res.json()).catch(error => null);

  if (!content) {
    return res.status(401).json({ message: 'Invalid data' });
  }

  res.setPreviewData({
    slug: content.id,
    draftKey: req.query.draftKey,
  }, {
    maxAge: 1,
  });
  res.writeHead(307, { Location: `/blog/${content.id}` });
  res.end('Preview mode enabled');
};
