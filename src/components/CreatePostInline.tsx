
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, X, Plus, Eye, Edit3, Link, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface CreatePostInlineProps {
  onSave: (post: any) => void;
  onCancel: () => void;
}

const CreatePostInline = ({ onSave, onCancel }: CreatePostInlineProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'team' | 'private'>('public');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isDraft, setIsDraft] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState('direct');
  
  // 외부 링크 관련 상태
  const [externalUrl, setExternalUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    title: string;
    summary: string;
    suggestedTags: string[];
  } | null>(null);

  // 자동 저장 기능 (목업)
  useEffect(() => {
    if (title.trim() || content.trim()) {
      const saveTimer = setTimeout(() => {
        setLastSaved(new Date());
        console.log('자동 저장됨:', { title, content });
      }, 2000);

      return () => clearTimeout(saveTimer);
    }
  }, [title, content]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAIAnalysis = async () => {
    if (!externalUrl.trim()) {
      alert('링크 URL을 입력해주세요.');
      return;
    }

    setIsAnalyzing(true);
    
    // 목업 분석 결과 (2초 후 표시)
    setTimeout(() => {
      const mockResult = {
        title: 'React Query와 Zustand를 활용한 상태 관리 패턴',
        summary: '복잡한 상태 관리 문제를 해결하기 위한 React Query와 Zustand 조합 사용법에 대한 실전 가이드입니다. 서버 상태와 클라이언트 상태를 효율적으로 분리하여 관리하는 방법과 성능 최적화 기법을 다룹니다.',
        suggestedTags: ['React', 'TypeScript', 'React Query', 'Zustand']
      };
      
      setAnalysisResult(mockResult);
      setTitle(mockResult.title);
      setContent(mockResult.summary);
      setTags(mockResult.suggestedTags);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category: category || 'tech',
      author: '김개발',
      date: new Date().toLocaleDateString('ko-KR'),
      likes: 0,
      comments: 0,
      tags: tags,
      visibility,
      isDraft,
      externalUrl: activeTab === 'external' ? externalUrl : undefined
    };

    onSave(newPost);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              새 글 작성
            </CardTitle>
            <Button variant="ghost" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 탭 메뉴 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="direct" className="flex items-center gap-2">
                <Edit3 className="h-4 w-4" />
                직접 작성
              </TabsTrigger>
              <TabsTrigger value="external" className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                외부 링크
              </TabsTrigger>
            </TabsList>

            <TabsContent value="external" className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <Link className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">외부 링크로 글 작성</h3>
                </div>
                <p className="text-sm text-blue-700 mb-4">
                  외부 블로그나 아티클 링크를 입력하면 AI가 자동으로 제목과 요약을 생성해드립니다.
                </p>
                
                <div className="flex gap-2">
                  <Input
                    value={externalUrl}
                    onChange={(e) => setExternalUrl(e.target.value)}
                    placeholder="https://your-blog.com/post-url"
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleAIAnalysis}
                    disabled={isAnalyzing}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    {isAnalyzing ? '분석 중...' : 'AI 분석'}
                  </Button>
                </div>

                {analysisResult && (
                  <div className="mt-4 p-3 bg-white rounded border">
                    <div className="text-sm text-green-600 mb-2">✓ 분석 완료</div>
                    <div className="text-sm text-gray-600">
                      제목과 요약이 자동으로 입력되었습니다. 필요시 수정하세요.
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="direct">
              <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                마크다운 형식으로 직접 글을 작성할 수 있습니다.
              </div>
            </TabsContent>
          </Tabs>

          {/* 메타데이터 설정 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="category">카테고리</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sprint">스프린트 회고</SelectItem>
                  <SelectItem value="meeting">회의록</SelectItem>
                  <SelectItem value="troubleshooting">트러블 슈팅</SelectItem>
                  <SelectItem value="tech">Tech Archiving</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visibility">공개 범위</Label>
              <Select value={visibility} onValueChange={(value: 'public' | 'team' | 'private') => setVisibility(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">전체 공개</SelectItem>
                  <SelectItem value="team">팀 공개</SelectItem>
                  <SelectItem value="private">비공개</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>태그 추가</Label>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="태그 입력"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="flex-1"
                />
                <Button type="button" onClick={handleAddTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDraft(!isDraft)}
                className={isDraft ? 'bg-yellow-50 border-yellow-200' : ''}
              >
                {isDraft ? '임시저장' : '정식게시'}
              </Button>
            </div>
          </div>

          {/* 태그 표시 */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                </Badge>
              ))}
            </div>
          )}

          {/* 제목 입력 */}
          <div className="space-y-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="글 제목을 입력하세요"
              className="text-lg font-semibold"
            />
          </div>

          {/* 자동 저장 상태 */}
          {lastSaved && (
            <div className="text-xs text-gray-500">
              마지막 자동 저장: {lastSaved.toLocaleTimeString()}
            </div>
          )}

          {/* 에디터/프리뷰 */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-600">
                마크다운 형식을 지원합니다
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                {previewMode ? '편집' : '미리보기'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[500px]">
              {/* 에디터 */}
              {!previewMode && (
                <div className="h-full">
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="마크다운 형식으로 내용을 작성하세요...

# 제목
## 부제목

**굵은 글씨** *기울임 글씨*

- 목록 1
- 목록 2

```javascript
코드 블럭
```

> 인용문"
                    className="h-full min-h-[500px] font-mono text-sm resize-none"
                  />
                </div>
              )}

              {/* 프리뷰 */}
              <div className={`h-full overflow-y-auto border rounded-md p-4 bg-white min-h-[500px] ${previewMode ? 'col-span-full' : ''}`}>
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content || '*내용을 입력하면 여기에 미리보기가 표시됩니다*'}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>

          {/* 저장 버튼 */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onCancel}>
              취소
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isDraft ? '임시 저장' : '게시하기'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePostInline;
