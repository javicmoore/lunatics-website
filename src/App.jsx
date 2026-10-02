import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home.jsx';

/**
 * Shell de la app. Cuando llegue el catálogo, aquí entra el router
 * (react-router) con: /, /relojes, /accesorios, /producto/:slug, /carrito, /checkout.
 * vercel.json ya reescribe esas rutas a index.html.
 */
export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">
        <Home />
      </main>
      <Footer />
    </>
  );
}
