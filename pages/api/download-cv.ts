import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/sanity-client';

// This API prefers an explicit `cv` document with a `file` field. If none found,
// it falls back to scanning file assets for PDFs or filenames containing "cv"/"resume".
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1) Prefer explicit cv document with file.asset reference
    const cvQuery = `*[_type == "cv"] | order(publishedAt desc, _createdAt desc)[0]{file{asset->{url,originalFilename,mimeType}}}`;
    const cvDoc: any = await client.fetch(cvQuery);

    let url: string | undefined;
    let filename: string | undefined;
    let mimeType: string | undefined;

    if (cvDoc?.file?.asset) {
      url = cvDoc.file.asset.url;
      filename = cvDoc.file.asset.originalFilename;
      mimeType = cvDoc.file.asset.mimeType || 'application/pdf';
    }

    // 2) Fallback: search generic file assets for PDFs or filenames containing cv/resume
    if (!url) {
      const assetQuery = `*[_type == "sanity.fileAsset" && (originalFilename match "*cv*" || originalFilename match "*resume*" || mimeType == "application/pdf")] | order(_createdAt desc)[0]{url,originalFilename,mimeType}`;
      const asset: { url?: string; originalFilename?: string; mimeType?: string } | null = await client.fetch(assetQuery);
      if (asset?.url) {
        url = asset.url;
        filename = asset.originalFilename;
        mimeType = asset.mimeType || 'application/pdf';
      }
    }

    if (!url) {
      return res.status(404).json({ error: 'CV not found in Sanity' });
    }

    // Proxy the asset to force a download with a sensible filename
    const fetchRes = await fetch(url);
    if (!fetchRes.ok) {
      return res.status(502).json({ error: 'Failed to fetch CV from Sanity' });
    }

    const buffer = await fetchRes.arrayBuffer();
    const nodeBuffer = Buffer.from(buffer);

    // Set headers and send the full buffer. Using arrayBuffer avoids mixing Web ReadableStream
    // with Node streams which can cause ERR_INVALID_RESPONSE in Next API route contexts.
    res.setHeader('Content-Type', mimeType || 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'resume.pdf'}"`);
    const contentLength = fetchRes.headers.get('content-length');
    if (contentLength) res.setHeader('Content-Length', contentLength);

    res.status(200).send(nodeBuffer);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('download-cv error', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
