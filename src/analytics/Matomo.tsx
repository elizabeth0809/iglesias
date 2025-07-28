// components/analytics/Matomo.tsx
'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Tipos específicos para Matomo
type MatomoCommand = 
  | ['trackPageView']
  | ['enableLinkTracking']
  | ['setDoNotTrack', boolean]
  | ['disableCookies']
  | ['setDocumentTitle', string]
  | ['setCookieDomain', string]
  | ['disableCampaignParameters']
  | ['setCustomUrl', string]
  | ['setTrackerUrl', string]
  | ['setSiteId', string | number]
  | ['trackEvent', string, string, string?, number?]
  | ['trackGoal', number, number?]
  | ['trackLink', string, string]
  | ['trackDownload', string]
  | ['setCustomDimension', number, string]
  | ['setUserId', string];

// Extensión del objeto Window
declare global {
  interface Window {
    _paq: MatomoCommand[];
  }
}

export function Matomo() {
  const pathname = usePathname();

  // Track page views on route changes in Next.js
  useEffect(() => {
    if (typeof window !== 'undefined' && window._paq) {
      window._paq.push(['setCustomUrl', pathname]);
      window._paq.push(['setDocumentTitle', document.domain + "/" + document.title]);
      window._paq.push(['trackPageView']);
    }
  }, [pathname]);

  return (
    <Script
      id="matomo-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _paq = window._paq = window._paq || [];
          /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
          _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
          _paq.push(["setCookieDomain", "*.www.ibrsonhodedeus.com.br"]);
          _paq.push(["disableCampaignParameters"]);
          _paq.push(["setDoNotTrack", true]);
          _paq.push(["disableCookies"]);
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="https://ibrsonhodedeus.matomo.cloud/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '1']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; 
            g.src='https://cdn.matomo.cloud/ibrsonhodedeus.matomo.cloud/matomo.js'; 
            s.parentNode.insertBefore(g,s);
          })();
        `,
      }}
    />
  );
}

// Hook para eventos personalizados de la iglesia con tipos seguros
export function useChurchAnalytics() {
  const trackEvent = (category: string, action: string, name?: string, value?: number) => {
    if (typeof window !== 'undefined' && window._paq) {
      if (name !== undefined && value !== undefined) {
        window._paq.push(['trackEvent', category, action, name, value]);
      } else if (name !== undefined) {
        window._paq.push(['trackEvent', category, action, name]);
      } else {
        window._paq.push(['trackEvent', category, action]);
      }
    }
  };

  const trackGoal = (goalId: number, customRevenue?: number) => {
    if (typeof window !== 'undefined' && window._paq) {
      if (customRevenue !== undefined) {
        window._paq.push(['trackGoal', goalId, customRevenue]);
      } else {
        window._paq.push(['trackGoal', goalId]);
      }
    }
  };

  const trackDownload = (url: string) => {
    if (typeof window !== 'undefined' && window._paq) {
      window._paq.push(['trackLink', url, 'download']);
    }
  };

  const trackOutlink = (url: string) => {
    if (typeof window !== 'undefined' && window._paq) {
      window._paq.push(['trackLink', url, 'link']);
    }
  };

  // Eventos específicos para tu iglesia
  const trackEventRegistration = (eventName: string) => {
    trackEvent('Eventos', 'Inscripción', eventName);
  };

  const trackPrayerRequest = () => {
    trackEvent('Oração', 'Pedido de Oração', 'Formulário');
  };

  const trackDonation = (amount?: number) => {
    trackEvent('Doações', 'Clique Doar', amount ? `R$ ${amount}` : 'Botão Doar');
  };

  const trackSermonDownload = (sermonTitle: string) => {
    trackEvent('Sermões', 'Download', sermonTitle);
  };

  const trackNewsletterSignup = () => {
    trackEvent('Newsletter', 'Inscrição', 'Footer');
  };

  const trackContactForm = () => {
    trackEvent('Contato', 'Envio Formulário', 'Página Contato');
  };

  const trackBlogRead = (articleTitle: string) => {
    trackEvent('Blog', 'Leitura Artigo', articleTitle);
  };

  const trackViewAllEvents = () => {
    trackEvent('Eventos', 'Ver Todos', 'Carousel');
  };

  const trackViewAllBlogs = () => {
    trackEvent('Blog', 'Ver Todas', 'Carousel');
  };

  const trackViewAllSermons = () => {
    trackEvent('Sermões', 'Ver Todos', 'Carousel');
  };

  return {
    trackEvent,
    trackGoal,
    trackDownload,
    trackOutlink,
    trackEventRegistration,
    trackPrayerRequest,
    trackDonation,
    trackSermonDownload,
    trackNewsletterSignup,
    trackContactForm,
    trackBlogRead,
    trackViewAllEvents,
    trackViewAllBlogs,
    trackViewAllSermons,
  };
}