import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from 'contentful';

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
  return (
    <div>
      <Head>
        <title>{homepage[0].fields.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.container}>
        <header className={styles.menuHeader}>
          <ul className={styles.menu}>
            <li><Link href="food">Food</Link></li>
            <li><Link href="events">Events</Link></li>
          </ul>
        </header>
        
        <h1 className={styles.title}>
          {homepage[0].fields.title}
        </h1>
        
        <div className={styles.description}>
          <p>{homepage[0].fields.description}</p>
        </div>
        
        <Image
          className={styles.image}
          src={'https:' + homepage[0].fields.headerImage.fields.file.url}
          height={homepage[0].fields.headerImage.fields.file.details.image.height}
          width={homepage[0].fields.headerImage.fields.file.details.image.width}
          quality={80}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
          alt={homepage[0].fields.headerImage.fields.description}
        />

        <p className={styles.contact}>
          <span>{homepage[0].fields.email + '@annsophieraemisch.com'}</span>
          <span>
            <a href="https://www.instagram.com/ansofija/?hl=en">Instagram</a>
          </span>
        </p>

        <footer className={styles.copyright}>
          <p>
            <span>© {new Date().getFullYear()} Ann-Sophie Raemisch</span>
          </p>
        </footer>
      </div>

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
