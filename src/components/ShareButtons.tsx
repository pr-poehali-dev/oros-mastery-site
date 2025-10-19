import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  excerpt: string;
  url?: string;
}

const ShareButtons = ({ title, excerpt, url }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(excerpt);

  const shareLinks = {
    vk: `https://vk.com/share.php?url=${encodedUrl}&title=${encodedTitle}&description=${encodedText}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    ok: `https://connect.ok.ru/offer?url=${encodedUrl}&title=${encodedTitle}`
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: excerpt,
          url: shareUrl
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const link = shareLinks[platform as keyof typeof shareLinks];
    window.open(link, '_blank', 'width=600,height=400');
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Icon name="Share2" size={20} className="text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">Поделиться статьёй</h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => handleShare('vk')}
          className="bg-[#0077FF] hover:bg-[#0066DD] text-white flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.78 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
          </svg>
          VK
        </Button>

        <Button
          onClick={() => handleShare('telegram')}
          className="bg-[#0088CC] hover:bg-[#0077BB] text-white flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.122.1.155.232.171.326.016.093.036.306.02.472z"/>
          </svg>
          Telegram
        </Button>

        <Button
          onClick={() => handleShare('whatsapp')}
          className="bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </Button>

        <Button
          onClick={() => handleShare('twitter')}
          className="bg-black hover:bg-gray-900 text-white flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          X
        </Button>

        <Button
          onClick={() => handleShare('facebook')}
          className="bg-[#1877F2] hover:bg-[#166FE5] text-white flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </Button>

        <Button
          onClick={() => handleShare('ok')}
          className="bg-[#EE8208] hover:bg-[#D47307] text-white flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3.622c2.211 0 4.007 1.794 4.007 4.007 0 2.212-1.796 4.007-4.007 4.007-2.212 0-4.008-1.795-4.008-4.007 0-2.213 1.796-4.007 4.008-4.007zm0 1.595c-1.33 0-2.412 1.082-2.412 2.412s1.082 2.412 2.412 2.412c1.33 0 2.411-1.082 2.411-2.412s-1.081-2.412-2.411-2.412zm0 7.714c-1.618 0-3.117.401-4.407 1.074l.853 1.461c.851-.497 1.904-.813 2.989-.813h.001c1.085 0 2.138.316 2.989.813l.852-1.461c-1.29-.673-2.789-1.074-4.407-1.074h.001zm-1.724 3.509l-2.309 2.309 1.103 1.103 2.309-2.309 2.309 2.309 1.103-1.103-2.309-2.309 2.309-2.309-1.103-1.103-2.309 2.309-2.309-2.309-1.103 1.103 2.309 2.309z"/>
          </svg>
          OK
        </Button>

        <Button
          onClick={handleNativeShare}
          variant="outline"
          className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 flex items-center gap-2"
        >
          <Icon name="Share" size={20} />
          Ещё
        </Button>

        <Button
          onClick={handleCopyLink}
          variant="outline"
          className={`border-gray-600 ${copied ? 'text-green-400 border-green-500' : 'text-gray-300'} hover:bg-gray-700 flex items-center gap-2`}
        >
          <Icon name={copied ? "Check" : "Link"} size={20} />
          {copied ? 'Скопировано!' : 'Копировать'}
        </Button>
      </div>
    </div>
  );
};

export default ShareButtons;
