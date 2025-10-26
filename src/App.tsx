
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Episodes from "./pages/Episodes";
import EpisodeDetail from "./pages/EpisodeDetail";
import Universes from "./pages/Universes";
import UniverseDetail from "./pages/UniverseDetail";
import Characters from "./pages/Characters";
import CharacterDetail from "./pages/CharacterDetail";
import Theories from "./pages/Theories";
import TheoryDetail from "./pages/TheoryDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import ShopProduct from "./pages/ShopProduct";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/episodes/season/:season" element={<Episodes />} />
          <Route path="/episode/:slug" element={<EpisodeDetail />} />
          <Route path="/universes" element={<Universes />} />
          <Route path="/universes/danger/:danger" element={<Universes />} />
          <Route path="/universe/:slug" element={<UniverseDetail />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/species/:species" element={<Characters />} />
          <Route path="/character/:slug" element={<CharacterDetail />} />
          <Route path="/theories" element={<Theories />} />
          <Route path="/theories/type/:type" element={<Theories />} />
          <Route path="/theory/:slug" element={<TheoryDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ShopProduct />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;