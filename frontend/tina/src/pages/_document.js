import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="fr-CH">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon_io/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon_io/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon_io/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/images/favicon_io/android-chrome-192x192.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/images/favicon_io/android-chrome-512x512.png" />
                <link rel="manifest" href="/images/favicon_io/site.webmanifest" />
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
}
