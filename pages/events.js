import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { createClient } from 'contentful';
import styles from '../styles/Gallery.module.css'

export async function getStaticProps() {
  const client = createClient({
    space: "cfaebry355jl",
    accessToken: "KodQsdZjAW0jrB7p_hPCV0W8TmzaR2lTsuMaJ8_ht8Y",
  })

  const res = await client.getAssets({ "metadata.tags.sys.id[in]" : "events"})

  return {
    props: {
      eventAssets: res.items
    }
  }

}

export default function Events({eventAssets}) {
  console.log(eventAssets)
  return(
    <>
      <Head>
        <title>Events</title>
      </Head>
      <h1>Events</h1>
      <h2>
        <Link href="/">← Back to home</Link>
      </h2>
      <div className="food">
        {eventAssets.map(asset => (
          <div key={asset.sys.id} className={styles.imageBox}>
            <Image
              className={styles.images}
              src={'https:' + asset.fields.file.url}
              height={asset.fields.file.details.image.height}
              width={asset.fields.file.details.image.width}
              alt={asset.fields.title}
            />
            <span>{asset.fields.title}</span>
          </div>
        ))}

      </div>

      <style jsx>{`
        img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
      
    </>
  )
}