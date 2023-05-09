import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
// import Image from 'next/image';
import { createClient } from 'contentful';

// const ImgComponent = () => (
//   <Image
//     src="/../public/images/profile.jpg"
//     height={144}
//     width={144}
//     alt="Profile picture"
//   />
// )

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
        <ul className={styles.menu}>
          <li><Link href="food">Food</Link></li>
          <li><Link href="events">Events</Link></li>
        </ul>
        <h1 className={styles.title}>
          {homepage[0].fields.title}
        </h1>
        <p className={styles.description}>{homepage[0].fields.description}</p>
        {/* <ImgComponent></ImgComponent> */}

      </main>

      <footer>
        © {new Date().getFullYear()} Ann-Sophie Raemisch, Nobelhart & Schmutzig
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: inherit;
        }
        footer {
          width: 100%;
          height: 100px;
          margin: 1rem;
          display: flex;
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
