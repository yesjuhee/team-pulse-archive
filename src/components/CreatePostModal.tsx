
import React, { useState, useEffect } from 'react';
import { X, Save, Eye, Bold, Italic, Link as LinkIcon, List, ListOrdered, Code, Image, Quote, Heading1, Heading2, Heading3, Heading4 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: any) => void;
}

const CreatePostModal = ({ isOpen, onClose, onSave }: CreatePostModalProps) => {
  const [postType, setPostType] = useState<'content' | 'link'>('content');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [externalUrl, setExternalUrl] = useState('');
  const [tags, setTags] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (title || content) {
        localStorage.setItem('draft-post', JSON.stringify({
          postType, title, content, category, visibility, externalUrl, tags
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [postType, title, content, category, visibility, externalUrl, tags]);

  // Load draft on open
  useEffect(() => {
    if (isOpen) {
      const draft = localStorage.getItem('draft-post');
      if (draft) {
        const parsed = JSON.parse(draft);
        setPostType(parsed.postType || 'content');
        setTitle(parsed.title || '');
        setContent(parsed.content || '');
        setCategory(parsed.category || '');
        setVisibility(parsed.visibility || 'public');
        setExternalUrl(parsed.externalUrl || '');
        setTags(parsed.tags || '');
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFetchExternalContent = async () => {
    if (!externalUrl) return;
    
    setIsLoading(true);
    // Mock AI/크롤링 기능 - 프로토타입용
    setTimeout(() => {
      setTitle('React Hook 최적화 방법');
      setContent(`# React Hook 최적화 방법

외부 블로그에서 가져온 내용입니다.

## 주요 내용
- useState 최적화
- useEffect 의존성 관리
- useMemo와 useCallback 활용

이 글은 [외부 링크](${externalUrl})에서 확인하실 수 있습니다.`);
      setIsLoading(false);
    }, 2000);
  };

  const insertMarkdown = (syntax: string) => {
    const textarea = document.getElementById('content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newText = '';
    switch (syntax) {
      case 'bold':
        newText = `**${selectedText || '굵은 텍스트'}**`;
        break;
      case 'italic':
        newText = `*${selectedText || '기울임 텍스트'}*`;
        break;
      case 'link':
        newText = `[${selectedText || '링크 텍스트'}](URL)`;
        break;
      case 'h1':
        newText = `# ${selectedText || '제목 1'}`;
        break;
      case 'h2':
        newText = `## ${selectedText || '제목 2'}`;
        break;
      case 'h3':
        newText = `### ${selectedText || '제목 3'}`;
        break;
      case 'h4':
        newText = `#### ${selectedText || '제목 4'}`;
        break;
      case 'ul':
        newText = `- ${selectedText || '목록 항목'}`;
        break;
      case 'ol':
        newText = `1. ${selectedText || '순서 목록 항목'}`;
        break;
      case 'code':
        newText = `\`${selectedText || '코드'}\``;
        break;
      case 'quote':
        newText = `> ${selectedText || '인용문'}`;
        break;
      case 'image':
        newText = `![대체 텍스트](이미지 URL)`;
        break;
    }

    const newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);
    
    // Focus back to textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
  };

  const handleSave = (saveType: 'publish' | 'draft' = 'publish') => {
    const newPost = {
      id: Date.now().toString(),
      title,
      content,
      author: '김민준',
      category,
      date: new Date().toLocaleDateString('ko-KR'),
      likes: 0,
      comments: 0,
      isExternal: postType === 'link',
      externalUrl: postType === 'link' ? externalUrl : undefined,
      visibility: saveType === 'draft' ? 'draft' : visibility,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };
    
    onSave(newPost);
    
    // Clear draft
    localStorage.removeItem('draft-post');
    
    // Reset form
    setTitle('');
    setContent('');
    setCategory('');
    setExternalUrl('');
    setTags('');
    setPostType('content');
    setVisibility('public');
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-gray-900">제목을 입력하세요</h1>
          <div className="flex gap-2">
            <Badge
              variant={postType === 'content' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setPostType('content')}
            >
              직접 작성
            </Badge>
            <Badge
              variant={postType === 'link' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setPostType('link')}
            >
              <LinkIcon className="h-3 w-3 mr-1" />
              외부 링크
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sprint">스프린트 회고</SelectItem>
                <SelectItem value="troubleshooting">트러블 슈팅</SelectItem>
                <SelectItem value="tech">Tech Archiving</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={visibility} onValueChange={setVisibility}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">공개</SelectItem>
                <SelectItem value="team">팀 공개</SelectItem>
                <SelectItem value="private">비공개</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSave('draft')}>
              임시 저장
            </Button>
            <Button 
              onClick={() => handleSave('publish')}
              disabled={!title || !category || !content}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              게시하기
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Title Input */}
      <div className="p-4 border-b border-gray-100">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="text-2xl font-bold border-none shadow-none p-0 h-auto focus-visible:ring-0"
        />
      </div>

      {/* External URL (if applicable) */}
      {postType === 'link' && (
        <div className="p-4 border-b border-gray-100 bg-blue-50">
          <div className="flex gap-2">
            <Input
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              placeholder="외부 블로그 URL을 입력하세요 (예: https://myblog.com/post/1)"
              className="flex-1"
            />
            <Button 
              onClick={handleFetchExternalContent}
              disabled={!externalUrl || isLoading}
              variant="outline"
            >
              {isLoading ? '가져오는 중...' : '내용 가져오기'}
            </Button>
          </div>
          <p className="text-sm text-blue-600 mt-2">
            외부 링크의 내용을 자동으로 가져와서 팀 블로그에서도 토론할 수 있도록 합니다.
          </p>
        </div>
      )}

      {/* Tags */}
      <div className="p-4 border-b border-gray-100">
        <Input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="태그를 입력하세요 (쉼표로 구분)"
          className="border-none shadow-none p-0 focus-visible:ring-0"
        />
      </div>

      {/* Content Editor */}
      <div className="flex-1 flex">
        {/* Toolbar */}
        <div className="w-12 bg-gray-50 border-r border-gray-200 p-2 flex flex-col gap-1">
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown('h1')} title="제목 1">
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown('h2')} title="제목 2">
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown('h3')} title="제목 3">
            <Heading3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown('h4')} title="제목 4">
            <Heading4 className="h-4 w-4" />
          </Button>
          <div className="h-px bg-gray-300 my-1" />
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown('bold')} title="굵게">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown('italic')} title="기울임">
            <Italic className="h-4 w-4" />
          </Button>
          <div className="h-px bg-gray-300 my-1" />
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown('ul')} title="목록">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown('ol')} title="순서 목록">
            <ListOrdered className="h-4 w-4" />
          </Button>
          <div className="h-px bg-gray-300 my-1" />
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown('quote')} title="인용">
            <Quote className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown('link')} title="링크">
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown('image')} title="이미지">
            <Image className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => insertMarkdown('code')} title="코드">
            <Code className="h-4 w-4" />
          </Button>
        </div>

        {/* Editor/Preview Toggle */}
        <div className="flex-1 flex flex-col">
          <div className="flex border-b border-gray-200">
            <Button
              variant={!showPreview ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setShowPreview(false)}
              className="rounded-none"
            >
              작성
            </Button>
            <Button
              variant={showPreview ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setShowPreview(true)}
              className="rounded-none"
            >
              <Eye className="h-4 w-4 mr-2" />
              미리보기
            </Button>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex">
            {!showPreview ? (
              <Textarea
                id="content-textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={postType === 'link' 
                  ? "외부 글에 대한 설명이나 팀 내 토론 포인트를 작성해주세요..." 
                  : `# 여기에 작성

### 여기에 내용
○○

- 1
- 2`}
                className="flex-1 border-none shadow-none resize-none rounded-none focus-visible:ring-0 font-mono text-sm"
                style={{ minHeight: '100%' }}
              />
            ) : (
              <div className="flex-1 p-4 overflow-y-auto prose prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content || '내용을 입력하세요...'}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
