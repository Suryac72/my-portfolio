import Head from 'next/head';
import { useEffect } from 'react';
import Link from 'next/link';

export default function ResumePage() {
  useEffect(() => {
    // trigger download immediately
    window.location.href = '/api/download-cv';
  }, []);

  return (
    <>
      <Head>
        <title>Download CV</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Preparing your download...</h1>
          <p className="mb-4">If the download doesn't start automatically, <Link href="/api/download-cv">click here</Link>.</p>
        </div>
      </main>
    </>
  );
}
