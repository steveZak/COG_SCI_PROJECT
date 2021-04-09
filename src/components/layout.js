import '../App.css';
import logo from '../imgs/gt-seal.png';

export const siteTitle = 'Cognitive Science Study'

export default function Layout({ children }) {
  return (
    <div>
      <header className={"layout"}>
        <img id="logo" src={logo} alt="logo"/>
        <h1 id="header">
          {siteTitle}
        </h1>
      </header>
      <main>{children}</main>
    </div>

  )
}
