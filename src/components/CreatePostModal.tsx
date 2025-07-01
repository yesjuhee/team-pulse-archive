
import React, { useState } from 'react';
import { X, Link as LinkIcon, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

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

  if (!isOpen) return null;

  const handleSave = () => {
    const newPost = {
      id: Date.now().toString(),
      title,
      content: postType === 'link' ? `외부 블로그 글: ${externalUrl}` : content,
      author: '김민준',
      category,
      date: new Date().toLocaleDateString('ko-KR'),
      likes: 0,
      comments: 0,
      isExternal: postType === 'link',
      externalUrl: postType === 'link' ? externalUrl : undefined,
    };
    
    onSave(newPost);
    onClose();
    
    // Reset form
    setTitle('');
    setContent('');
    setCategory('');
    setExternalUrl('');
    setPostType('content');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">새 글 작성</h2>
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
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목 *
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="글 제목을 입력하세요"
                className="text-lg"
              />
            </div>

            {/* Category and Visibility */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  카테고리 *
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sprint">스프린트 회고</SelectItem>
                    <SelectItem value="troubleshooting">트러블 슈팅</SelectItem>
                    <SelectItem value="tech">Tech Archiving</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  공개 범위
                </label>
                <Select value={visibility} onValueChange={setVisibility}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">공개</SelectItem>
                    <SelectItem value="private">비공개</SelectItem>
                    <SelectItem value="draft">임시 저장</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Content or URL */}
            {postType === 'content' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  내용 *
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="프로젝트 경험, 기술적 지식, 문제 해결 과정 등을 자유롭게 작성해주세요..."
                  className="min-h-[300px] resize-none"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  외부 블로그 URL *
                </label>
                <Input
                  value={externalUrl}
                  onChange={(e) => setExternalUrl(e.target.value)}
                  placeholder="https://..."
                  type="url"
                />
                <p className="text-sm text-gray-500 mt-1">
                  개인 블로그나 외부에 작성한 프로젝트 관련 글의 링크를 입력해주세요.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            * 필수 입력 항목
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!title || !category || (postType === 'content' ? !content : !externalUrl)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {visibility === 'draft' ? '임시 저장' : '게시하기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
