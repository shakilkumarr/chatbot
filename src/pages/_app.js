import '../../styles/globals.css';
import styles from 'antd/dist/antd.css';
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Chat Bot</title>
      </Head>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
