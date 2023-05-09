import Head from "next/head";
import Link from "next/Link";
import Image from "next/Image";
import { createClient } from 'contentful';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getAssets({ "metadata.tags.sys.id[in]" : "food"})

  return {
    props: {
      assets: res.items
    }
  }

}

export default function Events({assets}) {
  // console.log(assets)
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
          <Image
            key={asset.sys.id}
            src={'https:' + asset.fields.file.url}
            height={asset.fields.file.details.image.height}
            width={asset.fields.file.details.image.width}
          />
        ))}

      </div>
      
    </>
  )
}