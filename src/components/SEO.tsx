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
}

const SEO = ({
  title,
  description,
  keywords = 'Рик и Морти, Rick and Morty, эпизоды, блог, теории, анализ, мультсериал',
  image = 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg',
  url = window.location.href,
  ogType = 'website',
  author,
  publishedTime
}: SEOProps) => {
  const type = ogType;
  useEffect(() => {
    document.title = `${title} | Rick and Morty Fan Site`;
    
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: author || 'Rick and Morty Fan Site' },
      
      { property: 'og:type', content: type },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:site_name', content: 'Rick and Morty Fan Site' },
      
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
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
    canonicalLink.setAttribute('href', url);
    
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'WebSite',
      'name': title,
      'description': description,
      'url': url,
      'image': image,
      ...(type === 'article' && {
        'author': {
          '@type': 'Person',
          'name': author || 'Unknown'
        },
        'datePublished': publishedTime
      })
    };
    
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
    
  }, [title, description, keywords, image, url, type, author, publishedTime]);

  return null;
};

export default SEO;