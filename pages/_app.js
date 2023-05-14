import '../styles/global.css';
import {Amiri} from '@next/font/google'

const amiri = Amiri({
  subsets: ['latin'],
  weight: ['400'],
});

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={amiri.className}>
      <Component {...pageProps} />
    </main>
  );
}