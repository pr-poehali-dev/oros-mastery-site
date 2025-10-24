import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import RichTextViewer from '@/components/ui/RichTextViewer';

interface EditableContentProps {
  content: string;
  onSave: (newContent: string) => void;
  className?: string;
  title?: string;
  showEditButton?: boolean;
}

const EditableContent = ({ content, onSave, className = '', title, showEditButton = false }: EditableContentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSave = () => {
    onSave(editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={className}>
        {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full min-h-[400px] p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          autoFocus
        />
        <div className="flex gap-3 mt-4">
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Icon name="Check" size={20} className="mr-2" />
            Сохранить
          </Button>
          <Button onClick={handleCancel} variant="outline">
            <Icon name="X" size={20} className="mr-2" />
            Отмена
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        {title && <h2 className="text-2xl font-bold">{title}</h2>}
        {showEditButton && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
            className="ml-auto"
          >
            <Icon name="Edit" size={16} className="mr-2" />
            Редактировать
          </Button>
        )}
      </div>
      {content.startsWith('<') ? (
        <RichTextViewer content={content} />
      ) : (
        <div className="prose prose-invert max-w-none prose-headings:text-white prose-h2:text-white prose-h3:text-white">
          {content.split('\n').map((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;
            
            if (trimmed.startsWith('## ')) {
              return <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">{trimmed.replace('## ', '')}</h2>;
            }
            
            if (trimmed.startsWith('### ')) {
              return <h3 key={index} className="text-xl font-bold text-white mt-6 mb-3">{trimmed.replace('### ', '')}</h3>;
            }
            
            if (trimmed.startsWith('# ')) {
              return <h1 key={index} className="text-3xl font-bold text-white mt-10 mb-5">{trimmed.replace('# ', '')}</h1>;
            }
            
            if (trimmed.startsWith('- ')) {
              return <li key={index} className="text-gray-200 mb-2 ml-4">{trimmed.replace('- ', '')}</li>;
            }
            
            return <p key={index} className="mb-4 text-gray-200 leading-relaxed">{trimmed}</p>;
          })}
        </div>
      )}
    </div>
  );
};

export default EditableContent;