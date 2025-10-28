
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import Episodes from "./pages/Episodes";

const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Admin = lazy(() => import("./pages/Admin"));
const Login = lazy(() => import("./pages/Login"));
const EpisodeDetail = lazy(() => import("./pages/EpisodeDetail"));
const Universes = lazy(() => import("./pages/Universes"));
const UniverseDetail = lazy(() => import("./pages/UniverseDetail"));
const Characters = lazy(() => import("./pages/Characters"));
const CharacterDetail = lazy(() => import("./pages/CharacterDetail"));
const Theories = lazy(() => import("./pages/Theories"));
const TheoryDetail = lazy(() => import("./pages/TheoryDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Shop = lazy(() => import("./pages/Shop"));
const ShopProduct = lazy(() => import("./pages/ShopProduct"));
const SitemapXML = lazy(() => import("./pages/SitemapXML"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={
          <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-cyan-400 text-xl animate-pulse">Загрузка...</div>
          </div>
        }>
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
            <Route path="/sitemap.xml" element={<SitemapXML />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;