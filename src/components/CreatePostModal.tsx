
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, X, Plus, Link as LinkIcon, Eye, Edit3, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: any) => void;
}

// 카테고리별 템플릿
const categoryTemplates = {
  sprint: `# 스프린트 [X]주차 회고

## 📅 기간
YYYY.MM.DD - YYYY.MM.DD

## 🎯 스프린트 목표
- 목표 1
- 목표 2
- 목표 3

## ✅ 완료한 작업
### 기능 개발
- [ ] 작업 1
- [ ] 작업 2

### 버그 수정
- [ ] 버그 1
- [ ] 버그 2

## 🔄 진행 중인 작업
- 작업 1
- 작업 2

## 🚫 하지 못한 작업
- 작업 1 (사유: )
- 작업 2 (사유: )

## 📈 성과 및 배운 점
- 성과 1
- 배운 점 1

## 🤔 아쉬웠던 점
- 아쉬운 점 1
- 개선할 점 1

## 📋 다음 스프린트 계획
- 계획 1
- 계획 2`,

  meeting: `# 회의록 - [회의명]

## 📅 회의 정보
- **일시**: YYYY.MM.DD (요일) HH:MM - HH:MM
- **장소**: 온라인/오프라인
- **참석자**: 이름1, 이름2, 이름3
- **회의 진행자**: 이름

## 📋 안건
1. 안건 1
2. 안건 2
3. 안건 3

## 💬 논의 내용
### 안건 1: [제목]
- **논의 내용**: 
- **결정 사항**: 
- **담당자**: 
- **기한**: 

### 안건 2: [제목]
- **논의 내용**: 
- **결정 사항**: 
- **담당자**: 
- **기한**: 

## ✅ 액션 아이템
| 작업 | 담당자 | 기한 | 상태 |
|------|--------|------|------|
| 작업 1 | 이름 | YYYY.MM.DD | 진행 중 |
| 작업 2 | 이름 | YYYY.MM.DD | 대기 |

## 📝 기타 사항
- 기타 사항 1
- 기타 사항 2

## 📅 다음 회의
- **일시**: YYYY.MM.DD (요일) HH:MM
- **안건**: 다음 회의 안건`,

  troubleshooting: `# [문제 상황] 트러블 슈팅

## 🚨 문제 상황
문제가 발생한 상황과 증상을 상세히 기술

## 🔍 문제 분석
### 발생 환경
- **운영체제**: 
- **브라우저/환경**: 
- **버전 정보**: 

### 에러 로그
\`\`\`
에러 로그 내용
\`\`\`

### 재현 방법
1. 단계 1
2. 단계 2
3. 단계 3

## 💡 시도한 해결 방법
### 방법 1: [방법명]
- **시도 내용**: 
- **결과**: 실패/부분 성공
- **원인**: 

### 방법 2: [방법명]
- **시도 내용**: 
- **결과**: 실패/부분 성공
- **원인**: 

## ✅ 해결 방법
### 최종 해결책
해결 방법에 대한 상세한 설명

### 코드 변경사항
\`\`\`javascript
// 변경 전
이전 코드

// 변경 후
수정된 코드
\`\`\`

## 📚 배운 점
- 배운 점 1
- 배운 점 2

## 🔄 예방 방법
앞으로 같은 문제를 방지하기 위한 방법`,

  tech: `# [기술명] 도입/학습 기록

## 📖 개요
기술을 도입하게 된 배경과 목적

## 🎯 도입 목적
- 목적 1
- 목적 2
- 목적 3

## 🔍 기술 조사
### 기존 방법의 한계
- 한계점 1
- 한계점 2

### 대안 기술 비교
| 기술 | 장점 | 단점 | 적합성 |
|------|------|------|--------|
| 기술A | 장점들 | 단점들 | ⭐⭐⭐ |
| 기술B | 장점들 | 단점들 | ⭐⭐ |

## 🛠️ 구현 과정
### 환경 설정
\`\`\`bash
설치 명령어
\`\`\`

### 주요 코드
\`\`\`javascript
핵심 코드 예시
\`\`\`

### 설정 파일
\`\`\`json
설정 파일 내용
\`\`\`

## 📊 성과 측정
### 성능 개선
- 기준: 이전 vs 이후
- 결과: 구체적 수치

### 개발 경험 개선
- 개선점 1
- 개선점 2

## 🤔 겪은 어려움
- 어려움 1과 해결 방법
- 어려움 2와 해결 방법

## 📚 참고 자료
- [링크1](URL)
- [링크2](URL)

## 💭 회고
이 기술을 도입하면서 느낀 점과 팀에게 주는 시사점`
};

const CreatePostModal = ({ isOpen, onClose, onSave }: CreatePostModalProps) => {
  const [activeTab, setActiveTab] = useState<'direct' | 'external'>('direct');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'team' | 'private'>('public');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isDraft, setIsDraft] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  // 외부 링크 관련 상태
  const [externalUrl, setExternalUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedContent, setAnalyzedContent] = useState<{
    title: string;
    summary: string;
    tags: string[];
  } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      // 모달이 닫힐 때 상태 초기화
      setTitle('');
      setContent('');
      setCategory('');
      setVisibility('public');
      setTags([]);
      setNewTag('');
      setIsDraft(false);
      setPreviewMode(false);
      setExternalUrl('');
      setAnalyzedContent(null);
      setActiveTab('direct');
    }
  }, [isOpen]);

  // 카테고리 선택 시 템플릿 적용
  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
    
    if (selectedCategory && categoryTemplates[selectedCategory as keyof typeof categoryTemplates] && !content.trim()) {
      setContent(categoryTemplates[selectedCategory as keyof typeof categoryTemplates]);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAnalyzeUrl = async () => {
    if (!externalUrl.trim()) return;
    
    setIsAnalyzing(true);
    
    // 목업 AI 분석 결과 (실제로는 API 호출)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResults = {
      'blog.example.com': {
        title: 'React Hook 최적화를 통한 성능 개선',
        summary: 'React Hook을 활용하여 컴포넌트 리렌더링을 최적화하고 성능을 30% 향상시킨 경험을 공유합니다. useMemo, useCallback, React.memo 등을 실제 프로젝트에 적용한 사례와 주의사항을 다룹니다.',
        tags: ['React', 'Hook', '성능최적화', 'useMemo', 'useCallback']
      },
      'medium.com': {
        title: 'Docker 컨테이너 환경에서의 메모리 관리',
        summary: 'Docker 컨테이너 환경에서 발생한 메모리 누수 문제를 해결하는 과정과 모니터링 도구 설정 방법을 정리했습니다. Kubernetes 환경에서의 리소스 제한 설정과 최적화 방안도 포함합니다.',
        tags: ['Docker', 'Memory', 'Kubernetes', 'DevOps']
      },
      default: {
        title: 'TypeScript 고급 타입 활용법',
        summary: 'TypeScript의 고급 타입 기능을 활용하여 더 안전하고 유지보수하기 쉬운 코드를 작성하는 방법을 소개합니다. Union, Intersection, Conditional Types 등의 실전 활용법을 다룹니다.',
        tags: ['TypeScript', '고급타입', '타입안전성']
      }
    };
    
    const domain = new URL(externalUrl).hostname;
    const result = mockResults[domain as keyof typeof mockResults] || mockResults.default;
    
    setAnalyzedContent(result);
    setTitle(result.title);
    setContent(`> 원문: [${result.title}](${externalUrl})

${result.summary}

## 주요 내용

${result.summary}

---
*이 글은 외부 블로그에서 가져온 내용입니다. 자세한 내용은 [원문 링크](${externalUrl})를 참고해주세요.*`);
    setTags(result.tags);
    setIsAnalyzing(false);
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
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            새 글 작성
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'direct' | 'external')} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="direct" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              직접 작성
            </TabsTrigger>
            <TabsTrigger value="external" className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              외부 링크
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 flex flex-col gap-4">
            {/* 공통 메타데이터 설정 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <Label htmlFor="category">카테고리</Label>
                <Select value={category} onValueChange={handleCategoryChange}>
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
              <div className="flex flex-wrap gap-2 px-4">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                  </Badge>
                ))}
              </div>
            )}

            <TabsContent value="direct" className="flex-1 flex flex-col space-y-4">
              {/* 제목 입력 */}
              <div className="space-y-2">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="글 제목을 입력하세요"
                  className="text-lg font-semibold"
                />
              </div>

              {/* 에디터/프리뷰 */}
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-600">
                    {category && `${category} 템플릿이 적용되었습니다`}
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

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 에디터 */}
                  {!previewMode && (
                    <div className="h-full">
                      <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="마크다운 형식으로 내용을 작성하세요..."
                        className="h-full min-h-[400px] font-mono text-sm resize-none"
                      />
                    </div>
                  )}

                  {/* 프리뷰 */}
                  <div className={`h-full overflow-y-auto border rounded-md p-4 bg-white ${previewMode ? 'col-span-full' : ''}`}>
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content || '*내용을 입력하면 여기에 미리보기가 표시됩니다*'}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="external" className="flex-1 space-y-4">
              {/* URL 입력 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">외부 링크 분석</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={externalUrl}
                      onChange={(e) => setExternalUrl(e.target.value)}
                      placeholder="https://your-blog.com/post-url"
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleAnalyzeUrl}
                      disabled={!externalUrl.trim() || isAnalyzing}
                      className="min-w-[100px]"
                    >
                      {isAnalyzing ? '분석 중...' : 'AI 분석'}
                    </Button>
                  </div>

                  {isAnalyzing && (
                    <div className="text-center py-8">
                      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                      <p className="text-gray-600">AI가 링크를 분석하고 있습니다...</p>
                    </div>
                  )}

                  {analyzedContent && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">✅ 분석 완료</h4>
                      <p className="text-sm text-green-700">
                        제목과 요약이 자동으로 생성되었습니다. 필요에 따라 수정해주세요.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 생성된 제목 */}
              <div className="space-y-2">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목이 자동으로 생성됩니다"
                  className="text-lg font-semibold"
                />
              </div>

              {/* 생성된 내용 */}
              <div className="flex-1">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="AI가 분석한 내용이 여기에 표시됩니다"
                  className="h-[300px] resize-none"
                />
              </div>
            </TabsContent>
          </div>

          {/* 저장 버튼 */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isDraft ? '임시 저장' : '게시하기'}
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
