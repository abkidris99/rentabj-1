import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BlogModal } from './components/BlogModal';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { blogArticles } from './data/blogArticles';
import { AuthGuard } from './components/admin/AuthGuard';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLeads } from './pages/admin/AdminLeads';
import { AdminBlog } from './pages/admin/AdminBlog';
import { AdminProperties } from './pages/admin/AdminProperties';
import { AdminSettings } from './pages/admin/AdminSettings';

// Scroll to hash element on hash change or route transition
const ScrollToHash: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
};

// Public site wrapper — includes header, footer, blog modal
const PublicSite: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [articlesMap, setArticlesMap] = useState<Record<string, any>>(blogArticles);

  useEffect(() => {
    // Dynamic import / fetch so it works smoothly
    import('./lib/supabaseService')
      .then(({ getArticles }) => getArticles())
      .then((items) => {
        const published = items.filter((a) => a.published !== false);
        if (published.length > 0) {
          const map: Record<string, any> = { ...blogArticles };
          published.forEach((a) => {
            const id = a.id || a.title;
            map[id] = {
              id,
              title: a.title,
              category: a.category,
              categorySlug: a.categorySlug,
              readTime: a.readTime,
              date: a.date,
              author: a.author,
              excerpt: a.excerpt,
              image: a.image,
              tags: a.tags,
              content: a.content,
            };
          });
          setArticlesMap(map);
        }
      })
      .catch((err) => console.warn('Supabase articles fetch:', err));
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  }, []);

  const handleReadArticle = useCallback((articleId: string) => {
    setActiveArticleId(articleId);
  }, []);

  const handleCloseArticle = useCallback(() => {
    setActiveArticleId(null);
  }, []);

  const handleShareArticle = useCallback(
    (platform: 'whatsapp' | 'twitter' | 'facebook' | 'copy', articleId: string) => {
      const article = articlesMap[articleId] || blogArticles[articleId];
      const title = article ? article.title : 'Abuja Rental Guide';
      const shareUrl = `${window.location.origin}/blog?article=${encodeURIComponent(articleId)}`;
      const text = `"${title}" - Read this Abuja rental guide on RentABJ Homes:\n${shareUrl}`;

      if (platform === 'whatsapp') {
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
          '_blank',
          'noopener,noreferrer'
        );
      } else if (platform === 'twitter') {
        const tweetText = `"${title}" via @rentabj #AbujaRentals #AbujaRealEstate`;
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'noopener,noreferrer'
        );
      } else if (platform === 'facebook') {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'noopener,noreferrer'
        );
      } else if (platform === 'copy') {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(shareUrl)
            .then(() => showToast('Article link copied to clipboard!'))
            .catch(() => fallbackCopy(shareUrl));
        } else {
          fallbackCopy(shareUrl);
        }
      }
    },
    [showToast, articlesMap]
  );

  const fallbackCopy = (text: string) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('Article link copied to clipboard!');
    } catch {
      showToast(`Link: ${text}`);
    }
    document.body.removeChild(ta);
  };

  const activeArticle = activeArticleId ? articlesMap[activeArticleId] || blogArticles[activeArticleId] || null : null;

  return (
    <>
      <ScrollToHash />
      <Header onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onReadArticle={handleReadArticle}
              onShareArticle={handleShareArticle}
            />
          }
        />
        <Route
          path="/blog"
          element={
            <BlogPage
              onReadArticle={handleReadArticle}
              onShareArticle={handleShareArticle}
            />
          }
        />
        <Route
          path="*"
          element={
            <HomePage
              onReadArticle={handleReadArticle}
              onShareArticle={handleShareArticle}
            />
          }
        />
      </Routes>
      <Footer />
      <WhatsAppButton />
      <BlogModal
        article={activeArticle}
        isOpen={Boolean(activeArticle)}
        onClose={handleCloseArticle}
        onShare={handleShareArticle}
        toastMessage={toastMessage}
      />
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Admin routes (no public header/footer) ── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <AuthGuard fallback={<AdminLogin />}>
              <AdminLayout />
            </AuthGuard>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="properties" element={<AdminProperties />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* ── Public routes ── */}
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </BrowserRouter>
  );
}
