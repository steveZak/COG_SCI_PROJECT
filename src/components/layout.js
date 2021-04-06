import '../App.css';
import logo from '../imgs/gt-seal.png';

export const siteTitle = 'Cognitive Science Study'

export default function Layout({ children, home }) {
  return (
    <div>
      <header className={"layout"}>
        <img style={{height: 100, width: 100}} src={logo} alt="logo"/>
        <h1 style={{marginTop:"1%"}}>
          {siteTitle}
        </h1>
      </header>
      <main>{children}</main>
    </div>

  )
}
