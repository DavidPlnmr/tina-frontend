import 'bootstrap/dist/css/bootstrap.css'
import '@/styles/global.css'
import Head from 'next/head'
export default function App({ Component, pageProps }) {

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon_io/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon_io/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon_io/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/images/favicon_io/android-chrome-192x192.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/images/favicon_io/android-chrome-512x512.png" />
                <link rel="manifest" href="/images/favicon_io/site.webmanifest" /> */}
            </Head>
            <Component {...pageProps} />
        </>
    )
}
