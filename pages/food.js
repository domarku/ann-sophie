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

  const res = await client.getAssets({ "metadata.tags.sys.id[in]" : "food"})

  return {
    props: {
      assets: res.items
    }
  }

}

export default function Food({assets}) {
  console.log(assets)
  return(
    <>
      <Head>
        <title>Food</title>
      </Head>
      <h1>Food</h1>
      <h2>
        <Link href="/">← Back to home</Link>
      </h2>
      <div className="food">
        {assets.map(asset => (
          <div key={asset.sys.id} className={styles.imageBox}>
            <Image
              className={styles.images}
              src={'https:' + asset.fields.file.url}
              height={asset.fields.file.details.image.height}
              width={asset.fields.file.details.image.width}
              alt={asset.fields.title}
              quality={60}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={asset.sys.id === 0}
            />
            <span>{asset.fields.title}</span>
          </div>
        ))}

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
      
    </>
  )
}