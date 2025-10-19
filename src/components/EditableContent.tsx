import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

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
      <div className="prose prose-invert max-w-none">
        {content.split('\n').map((paragraph, index) => (
          paragraph.trim() && <p key={index} className="mb-4 text-gray-200 leading-relaxed">{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default EditableContent;