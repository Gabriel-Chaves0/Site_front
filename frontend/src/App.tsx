import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
import Services from "./pages/Services";
import ServiceCreate from "./pages/ServiceCreate";
import { SessionProvider } from "./session";

function NotFound() {
  return (
    <main className="container page panel">
      <h2>Página não encontrada</h2>
      <p>Verifique o link ou use o menu para navegar.</p>
    </main>
  );
}

export default function App() {
  return (
    <SessionProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service-create" element={<ServiceCreate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </SessionProvider>
  );
}
