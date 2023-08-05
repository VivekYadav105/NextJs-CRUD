import Link from "next/link"
export default function Header(){
    return(
        <header className="header">
            <div className="container">
                <div className="logo">
                    <Link href="/">NextJS</Link>
                </div>
                <div className="links">
                    <Link href={'/about'}>About</Link>
                    <Link href={'/card'}>card</Link>
                    <Link href={'/repos'}>Repos</Link>
                </div>
            </div>
        </header>
    )
}