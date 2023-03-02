import { Children } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
// import createEmotionServer from '@emotion/server/create-instance';
// import { createEmotionCache } from '../utils/create-emotion-cache';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="theme-color"
            content="#1e1d24"
          />
          <meta name="title" content="OMNIA" />
          <meta name="description" content="TOWARDS A MORE EFFICIENT DECENTRALIZED FINANCE" />
          <meta property="og:type" content="DEFI APP" />
          <meta property="og:title" content="OMNIA" />
          <meta property="og:description" content="TOWARDS A MORE EFFICIENT DECENTRALIZED FINANCE" />
          <meta property="og:image" content="/OMNIA_card_official.png" />
          <meta property="twitter:card" content="/OMNIA_card_official.png" />
          <meta property="twitter:title" content="OMNIA" />
          <meta property="twitter:description" content="TOWARDS A MORE EFFICIENT DECENTRALIZED FINANCE" />
          <meta property="twitter:image" content="/OMNIA_card_official.png" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            href="/favicon.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.ico"
          />
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;