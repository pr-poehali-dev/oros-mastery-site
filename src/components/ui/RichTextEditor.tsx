import { useRef, useEffect, useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ value, onChange, placeholder = 'Введите текст...' }: RichTextEditorProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  useEffect(() => {
    if (!isMounted) return;

    const style = document.createElement('style');
    style.textContent = `
      .ql-toolbar {
        background: rgba(31, 41, 55, 0.8);
        border: 1px solid rgba(6, 182, 212, 0.3);
        border-radius: 0.5rem 0.5rem 0 0;
      }
      .ql-container {
        background: rgba(31, 41, 55, 0.5);
        border: 1px solid rgba(6, 182, 212, 0.3);
        border-top: none;
        border-radius: 0 0 0.5rem 0.5rem;
        color: white;
        min-height: 300px;
      }
      .ql-editor {
        min-height: 300px;
        color: white;
      }
      .ql-editor.ql-blank::before {
        color: rgba(156, 163, 175, 0.5);
      }
      .ql-stroke {
        stroke: rgba(156, 163, 175, 0.8);
      }
      .ql-fill {
        fill: rgba(156, 163, 175, 0.8);
      }
      .ql-toolbar button:hover .ql-stroke {
        stroke: rgb(6, 182, 212);
      }
      .ql-toolbar button:hover .ql-fill {
        fill: rgb(6, 182, 212);
      }
      .ql-toolbar button.ql-active .ql-stroke {
        stroke: rgb(6, 182, 212);
      }
      .ql-toolbar button.ql-active .ql-fill {
        fill: rgb(6, 182, 212);
      }
      .ql-picker-label {
        color: rgba(156, 163, 175, 0.8);
      }
      .ql-picker-label:hover {
        color: rgb(6, 182, 212);
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [isMounted]);

  if (!isMounted) {
    return (
      <div className="w-full min-h-[300px] p-4 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 flex items-center justify-center">
        Загрузка редактора...
      </div>
    );
  }

  // Динамический импорт ReactQuill
  try {
    const ReactQuill = require('react-quill');
    require('react-quill/dist/quill.snow.css');

    return (
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    );
  } catch (error) {
    console.error('Error loading ReactQuill:', error);
    return (
      <div className="w-full min-h-[300px] p-4 bg-gray-800 border border-gray-700 rounded-lg">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full bg-transparent text-white border-none outline-none resize-none"
        />
      </div>
    );
  }
};

export default RichTextEditor;