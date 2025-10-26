import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  ogType?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  episodeNumber?: number;
  seasonNumber?: number;
}

const SEO = ({
  title,
  description,
  keywords = 'Рик и Морти, Рик и Морти, эпизоды, блог, теории, анализ, мультсериал',
  image = 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg',
  url,
  ogType = 'website',
  author,
  publishedTime,
  episodeNumber,
  seasonNumber
}: SEOProps) => {
  const type = ogType;
  const isEpisode = episodeNumber !== undefined && seasonNumber !== undefined;
  
  const normalizeUrl = (rawUrl: string | undefined): string => {
    const currentUrl = rawUrl || window.location.href;
    return currentUrl
      .replace(/\/+$/, '')
      .replace('http://', 'https://')
      .replace('www.rick-and-morty.poehali.dev', 'rick-and-morty.poehali.dev')
      .replace('www.rickmorty.poehali.dev', 'rick-and-morty.poehali.dev')
      .replace('rickmorty.poehali.dev', 'rick-and-morty.poehali.dev');
  };
  
  const canonicalUrl = normalizeUrl(url);
  useEffect(() => {
    document.title = `${title} | Рик и Морти фан-сайт`;
    document.documentElement.lang = 'ru';
    
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: author || 'Рик и Морти фан-сайт' },
      
      { property: 'og:type', content: type },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:site_name', content: 'Рик и Морти фан-сайт' },
      { property: 'og:locale', content: 'ru_RU' },
      
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'theme-color', content: '#1f2937' },
    ];
    
    if (publishedTime && type === 'article') {
      metaTags.push({ property: 'article:published_time', content: publishedTime });
    }
    
    metaTags.forEach(({ name, property, content }) => {
      const attribute = name ? 'name' : 'property';
      const value = name || property;
      
      let element = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value!);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    });
    
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute('href', canonicalUrl);
    
    let structuredData: any = {
      '@context': 'https://schema.org'
    };

    if (isEpisode) {
      structuredData = {
        ...structuredData,
        '@type': 'TVEpisode',
        'name': title,
        'description': description,
        'episodeNumber': episodeNumber,
        'partOfSeason': {
          '@type': 'TVSeason',
          'seasonNumber': seasonNumber,
          'partOfSeries': {
            '@type': 'TVSeries',
            'name': 'Рик и Морти'
          }
        },
        'image': {
          '@type': 'ImageObject',
          'url': image,
          'width': 1200,
          'height': 630
        }
      };
    } else {
      structuredData = {
        ...structuredData,
        '@type': type === 'article' ? 'Article' : 'WebSite',
        'name': title,
        'description': description,
        'url': canonicalUrl,
        'image': {
          '@type': 'ImageObject',
          'url': image,
          'width': 1200,
          'height': 630
        },
        ...(type === 'website' && canonicalUrl === 'https://rick-and-morty.poehali.dev/' && {
          'potentialAction': {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': 'https://rick-and-morty.poehali.dev/episodes?search={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'Рик и Морти фан-сайт',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg'
            }
          }
        }),
        ...(type === 'article' && {
          'author': {
            '@type': 'Person',
            'name': author || 'Рик и Морти фан-сайт'
          },
          'datePublished': publishedTime,
          'publisher': {
            '@type': 'Organization',
            'name': 'Рик и Морти фан-сайт',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg'
            }
          }
        })
      };
    }
    
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
    
  }, [title, description, keywords, image, url, type, author, publishedTime, episodeNumber, seasonNumber, isEpisode]);

  return null;
};

export default SEO;