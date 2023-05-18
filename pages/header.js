import Link from 'next/link'

export default function Header() {
  return (
    <>
      <header>
        <ul className="menu">
          <li><Link href="food">Food</Link></li>
          <li><Link href="events">Events</Link></li>
        </ul>
      </header>

      <h1 className="title">
        <Link href="/">Ann-Sophie Raemisch</Link>
      </h1>
    </>
  )
}
