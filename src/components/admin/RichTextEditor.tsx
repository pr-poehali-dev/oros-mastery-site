import { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ],
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'link', 'image'
  ];

  return (
    <div className="rich-text-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="bg-gray-900 text-white border-gray-700 rounded-lg"
      />
      <style>{`
        .rich-text-editor .ql-toolbar {
          background: rgb(17 24 39);
          border: 1px solid rgb(55 65 81);
          border-radius: 0.5rem 0.5rem 0 0;
        }
        .rich-text-editor .ql-container {
          background: rgb(17 24 39);
          border: 1px solid rgb(55 65 81);
          border-radius: 0 0 0.5rem 0.5rem;
          min-height: 200px;
        }
        .rich-text-editor .ql-editor {
          color: white;
          min-height: 200px;
        }
        .rich-text-editor .ql-stroke {
          stroke: rgb(209 213 219);
        }
        .rich-text-editor .ql-fill {
          fill: rgb(209 213 219);
        }
        .rich-text-editor .ql-picker-label {
          color: rgb(209 213 219);
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: rgb(156 163 175);
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
