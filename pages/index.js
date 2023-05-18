import Head from 'next/head';
import Header from './header';
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { createClient } from 'contentful'

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
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      
      <div className="container">
        <Header></Header>
        
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
          <span>
            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {' '}
            {homepage[0].fields.email + '@annsophieraemisch.com'}
          </span>
            
          <span>
            <a
              href="https://www.instagram.com/ansofija/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/instagram.svg" alt="@ansofija" className={styles.icon} />
              {' '}
              ansofija
            </a>
          </span>

        </p>

        <footer className={styles.copyright}>
          <p>
            <span>©{new Date().getFullYear()} Ann-Sophie Raemisch</span>
          </p>
        </footer>
      </div>

    </div>
  )
}
