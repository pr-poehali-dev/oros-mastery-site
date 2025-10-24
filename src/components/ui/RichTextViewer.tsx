import { useEffect, useRef } from 'react';

interface RichTextViewerProps {
  content: string;
  className?: string;
}

const RichTextViewer = ({ content, className = '' }: RichTextViewerProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const style = document.createElement('style');
      style.textContent = `
        .rich-text-content h1 {
          font-size: 2rem;
          font-weight: bold;
          color: white;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
        }
        .rich-text-content h2 {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .rich-text-content h3 {
          font-size: 1.25rem;
          font-weight: bold;
          color: white;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .rich-text-content p {
          color: rgb(229, 231, 235);
          margin-bottom: 1rem;
          line-height: 1.75;
        }
        .rich-text-content ul, .rich-text-content ol {
          margin-left: 1.5rem;
          margin-bottom: 1rem;
          color: rgb(229, 231, 235);
        }
        .rich-text-content li {
          margin-bottom: 0.5rem;
        }
        .rich-text-content a {
          color: rgb(34, 211, 238);
          text-decoration: underline;
        }
        .rich-text-content a:hover {
          color: rgb(103, 232, 249);
        }
        .rich-text-content img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
          border-radius: 0.5rem;
        }
        .rich-text-content strong {
          font-weight: 600;
          color: white;
        }
        .rich-text-content em {
          font-style: italic;
        }
        .rich-text-content blockquote {
          border-left: 4px solid rgb(34, 211, 238);
          padding-left: 1rem;
          margin: 1rem 0;
          color: rgb(156, 163, 175);
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  return (
    <div 
      ref={contentRef}
      className={`rich-text-content ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default RichTextViewer;
