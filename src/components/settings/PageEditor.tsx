
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Image, Link, Undo, Redo } from 'lucide-react';

interface PageEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const PageEditor: React.FC<PageEditorProps> = ({ initialValue, onChange }) => {
  const [content, setContent] = useState(initialValue);
  const [activeTab, setActiveTab] = useState<string>('visual');

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onChange(newContent);
  };

  const insertTag = (openTag: string, closeTag: string) => {
    const textarea = document.getElementById('html-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeSelection = content.substring(0, start);
    const afterSelection = content.substring(end);
    
    const newContent = `${beforeSelection}${openTag}${selectedText}${closeTag}${afterSelection}`;
    setContent(newContent);
    onChange(newContent);
    
    // Re-focus the textarea and set the cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + openTag.length,
        start + openTag.length + selectedText.length
      );
    }, 0);
  };

  const handleButtonClick = (type: string) => {
    switch (type) {
      case 'bold':
        insertTag('<strong>', '</strong>');
        break;
      case 'italic':
        insertTag('<em>', '</em>');
        break;
      case 'h1':
        insertTag('<h1>', '</h1>');
        break;
      case 'h2':
        insertTag('<h2>', '</h2>');
        break;
      case 'ul':
        insertTag('<ul>\n  <li>', '</li>\n</ul>');
        break;
      case 'ol':
        insertTag('<ol>\n  <li>', '</li>\n</ol>');
        break;
      case 'img':
        insertTag('<img src="', '" alt="Descrição da imagem" />');
        break;
      case 'link':
        insertTag('<a href="', '">Link</a>');
        break;
      default:
        break;
    }
  };

  return (
    <Tabs defaultValue="visual" value={activeTab} onValueChange={setActiveTab}>
      <div className="flex justify-between items-center mb-2">
        <TabsList>
          <TabsTrigger value="visual">Visual</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
          <TabsTrigger value="preview">Visualização</TabsTrigger>
        </TabsList>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            type="button"
            className="h-8 w-8"
            onClick={() => {/* Implement undo */}}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            type="button"
            className="h-8 w-8"
            onClick={() => {/* Implement redo */}}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <TabsContent value="visual" className="mt-0">
        <div className="border rounded-md bg-white">
          <div className="flex items-center p-2 border-b gap-1 flex-wrap">
            <Button 
              variant="ghost" 
              size="icon" 
              type="button"
              className="h-8 w-8"
              onClick={() => handleButtonClick('bold')}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              type="button"
              className="h-8 w-8"
              onClick={() => handleButtonClick('italic')}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              type="button"
              className="h-8 w-8"
              onClick={() => handleButtonClick('h1')}
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              type="button"
              className="h-8 w-8"
              onClick={() => handleButtonClick('h2')}
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              type="button"
              className="h-8 w-8"
              onClick={() => handleButtonClick('ul')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              type="button"
              className="h-8 w-8"
              onClick={() => handleButtonClick('ol')}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              type="button"
              className="h-8 w-8"
              onClick={() => handleButtonClick('img')}
            >
              <Image className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              type="button"
              className="h-8 w-8"
              onClick={() => handleButtonClick('link')}
            >
              <Link className="h-4 w-4" />
            </Button>
          </div>
          
          <Textarea
            id="html-editor"
            value={content}
            onChange={handleContentChange}
            className="min-h-[200px] border-0 rounded-t-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-y"
          />
        </div>
      </TabsContent>
      
      <TabsContent value="html" className="mt-0">
        <Textarea
          value={content}
          onChange={handleContentChange}
          className="min-h-[250px] font-mono text-sm"
          placeholder="Digite o HTML aqui..."
        />
      </TabsContent>
      
      <TabsContent value="preview" className="mt-0">
        <div 
          className="min-h-[250px] p-4 border rounded-md bg-white overflow-auto"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </TabsContent>
    </Tabs>
  );
};

export default PageEditor;
