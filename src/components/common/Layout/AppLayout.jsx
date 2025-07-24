// src/components/common/Layout/AppLayout.jsx
import useWindowWidth from '../../../hooks/useWindowWidth';
import NavbarDesktop from '../Navbar/NavbarDesktop/NavbarDesktop';
import NavbarMobile from '../Navbar/NavbarMobile/NavbarMobile';
import { Header } from '../Header/Header';
import Footer from '../Footer/Footer';
import Background from '../Background/Background';
import FloatingChatWidget from '../../chat/FloatingChatWidget'; // <-- IMPORTA AQUÍ
import './appLayout.css';

const AppLayout = ({ children }) => {
  const width = useWindowWidth();
  const isDesktop = width >= 975;

  return (
    <>
      <Background>
        <div className="layout__wrapper">
          <div className="layout">
            <header className="layout__header">
              <Header />
            </header>

              {isDesktop && (
                <aside className="sidebar">
                  <NavbarDesktop />
                </aside>
              )}

              <main className="main__content">{children}</main>

              {isDesktop && <footer className="footer">{/* <Footer /> */}</footer>}
          </div>

          {!isDesktop && <NavbarMobile />}
        </div>

        {/* Botón + panel de chat flotante */}
        <FloatingChatWidget />
      </Background>
    </>
  );
};

export default AppLayout;
