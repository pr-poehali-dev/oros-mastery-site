import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder = 'Введите текст...' }: RichTextEditorProps) => {
  const [imageUrl, setImageUrl] = useState('');

  const insertMarkdown = (before: string, after: string = before) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const insertImage = () => {
    if (imageUrl) {
      const imageMarkdown = `\n![Изображение](${imageUrl})\n`;
      onChange(value + imageMarkdown);
      setImageUrl('');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 p-2 bg-gray-800 border border-gray-700 rounded-t-lg">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => insertMarkdown('# ', '')}
          className="text-gray-300 hover:text-cyan-400 hover:bg-gray-700"
          title="Заголовок 1"
        >
          <Icon name="Heading1" size={18} />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => insertMarkdown('## ', '')}
          className="text-gray-300 hover:text-cyan-400 hover:bg-gray-700"
          title="Заголовок 2"
        >
          <Icon name="Heading2" size={18} />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => insertMarkdown('**', '**')}
          className="text-gray-300 hover:text-cyan-400 hover:bg-gray-700"
          title="Жирный"
        >
          <Icon name="Bold" size={18} />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => insertMarkdown('*', '*')}
          className="text-gray-300 hover:text-cyan-400 hover:bg-gray-700"
          title="Курсив"
        >
          <Icon name="Italic" size={18} />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => insertMarkdown('\n- ', '')}
          className="text-gray-300 hover:text-cyan-400 hover:bg-gray-700"
          title="Список"
        >
          <Icon name="List" size={18} />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => insertMarkdown('[', '](url)')}
          className="text-gray-300 hover:text-cyan-400 hover:bg-gray-700"
          title="Ссылка"
        >
          <Icon name="Link" size={18} />
        </Button>
        
        <div className="flex items-center gap-2 ml-auto">
          <input
            type="text"
            placeholder="URL изображения"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="px-2 py-1 text-sm bg-gray-900 border border-gray-700 rounded text-white w-48"
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={insertImage}
            className="text-gray-300 hover:text-cyan-400 hover:bg-gray-700"
            title="Вставить изображение"
          >
            <Icon name="Image" size={18} />
          </Button>
        </div>
      </div>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full min-h-[400px] p-4 bg-gray-900 border border-gray-700 border-t-0 rounded-b-lg text-white resize-y focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-sm"
      />
    </div>
  );
};

export default RichTextEditor;
