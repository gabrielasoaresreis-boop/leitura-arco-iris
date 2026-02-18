import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Pencil } from 'lucide-react';

const EditableText = ({ 
  html, 
  tagName = 'div', 
  className, 
  isEditing, 
  onSave,
  ...props 
}) => {
  const contentRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  // Update content when html prop changes (unless currently focused to avoid cursor jumps)
  useEffect(() => {
    if (contentRef.current && !isFocused) {
      contentRef.current.innerHTML = html;
    }
  }, [html, isFocused]);

  const handleBlur = () => {
    setIsFocused(false);
    if (contentRef.current) {
      const newContent = contentRef.current.innerHTML;
      if (newContent !== html) {
        onSave(newContent);
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleKeyDown = (e) => {
    // Optional: Prevent creating new divs on Enter if it's meant to be a single line headers
    // But for this description text, allowing breaks is probably fine.
  };

  const Tag = tagName;

  return (
    <div className="relative group">
      {isEditing && (
        <div className="absolute -top-3 -right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-blue-600 text-white p-1 rounded-full shadow-lg">
            <Pencil className="w-3 h-3" />
          </div>
        </div>
      )}
      <Tag
        ref={contentRef}
        className={cn(
          className,
          isEditing && "outline-none ring-2 ring-blue-400 ring-offset-4 ring-offset-transparent rounded-lg cursor-text bg-white/10 p-1 transition-all duration-200 border border-dashed border-blue-300 min-h-[1em]"
        )}
        contentEditable={isEditing}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: html }}
        {...props}
      />
    </div>
  );
};

export default EditableText;