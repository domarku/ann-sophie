import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from 'contentful';

const ImgComponent = () => (
  <Image
    src="/../public/images/profile.jpg"
    height={144}
    width={144}
    alt="Profile picture"
  />
)

export async function getStaticProps() {
  const client = createClient({
    space: "cfaebry355jl",
    accessToken: "KodQsdZjAW0jrB7p_hPCV0W8TmzaR2lTsuMaJ8_ht8Y",
  })

  const res = await client.getEntries({ content_type: "homepage"})

  return {
    props: {
      homepage: res.items
    }
  }
}

export default function Home({homepage}) {
  // console.log(homepage[0].fields.title)
  return (
    <div className={styles.container}>
      <Head>
        <title>{homepage[0].fields.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          {homepage[0].fields.title}
        </h1>
        <p><Link href="food">Food</Link></p>
        <p>{homepage[0].fields.description}</p>
        <ImgComponent></ImgComponent>

      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
