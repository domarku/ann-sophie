import Header from './header'
import styles from '../styles/Gallery.module.css'
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { createClient } from 'contentful'

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

export default function Food({assets, homepage}) {
  // console.log(assets)
  return(
    <div className="container">
      <Head>
        <title>Ann-Sophie Raemisch — Food</title>
      </Head>

      <Header></Header>
      
      {assets.map(asset => (
        <div key={asset.sys.id}>
          <Image
            className={styles.images}
            src={'https:' + asset.fields.file.url}
            height={asset.fields.file.details.image.height}
            width={asset.fields.file.details.image.width}
            alt={asset.fields.title}
            quality={70}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={asset.sys.id === 0}
          />
          {/* <span className={styles.imageDescription}>{asset.fields.title}</span> */}
        </div>
      ))}

      <footer className={styles.copyright}>
        <p>
          <span>©{new Date().getFullYear()} Ann-Sophie Raemisch</span>
        </p>
      </footer>

    </div>
  )
}