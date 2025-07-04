
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, X, Plus, Eye, Edit3, Link, Sparkles, Mic, MicOff, Square } from 'lucide-react';
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

  // 녹음 관련 상태
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);

  // 템플릿 정의
  const templates = {
    sprint: `## 무엇을 개발했나요?
이번 스프린트에서 개발한 주요 기능과 작업 내용을 작성해주세요.

## 제일 어려웠던 문제는 무엇이고, 어떻게 해결했나요?
개발 과정에서 가장 어려웠던 기술적 문제와 해결 방법을 설명해주세요.

## 해결되지 않은 문제가 있었다면 무엇인가요?
아직 해결하지 못한 문제나 개선이 필요한 부분을 적어주세요.

## 다음 스프린트에서 집중해야 하는 것은 무엇인가요?
다음 스프린트의 목표와 우선순위를 정리해주세요.

## 지금의 감정 상태는 어떤가요?
현재 느끼는 감정이나 팀 분위기에 대해 솔직하게 적어주세요.`,

    daily: `## 오늘 한 일
오늘 완료한 주요 작업들을 정리해주세요.

## 배운 점
새롭게 알게 된 것이나 깨달은 점을 적어주세요.

## 어려웠던 점
오늘 겪었던 어려움이나 문제점을 적어주세요.

## 내일 할 일
내일 계획하고 있는 작업들을 적어주세요.

## 오늘의 기분
오늘 하루 기분이나 컨디션을 솔직하게 적어주세요.`,

    meeting: `## 회의 기본 정보
- **일시**: 
- **참석자**: 
- **회의 목적**: 

## 주요 논의 사항
### 1. 안건 1
- 논의 내용:
- 결정 사항:

### 2. 안건 2
- 논의 내용:
- 결정 사항:

## 액션 아이템
- [ ] **담당자**: 할 일 (기한)
- [ ] **담당자**: 할 일 (기한)

## 다음 회의 일정
- **일시**: 
- **주요 안건**: `,

    troubleshooting: `## 문제 상황
어떤 문제가 발생했는지 구체적으로 설명해주세요.

## 문제 재현 방법
1. 
2. 
3. 

## 시도해본 해결 방법들
### 방법 1
- **시도한 것**: 
- **결과**: 

### 방법 2
- **시도한 것**: 
- **결과**: 

## 최종 해결책
문제를 어떻게 해결했는지 상세히 설명해주세요.

## 배운 점과 예방책
이 문제를 통해 배운 점과 향후 예방할 수 있는 방법을 정리해주세요.`,

    tech: `## 기술 개요
어떤 기술을 사용했는지 간단히 소개해주세요.

## 사용 이유
왜 이 기술을 선택했는지 이유를 설명해주세요.

## 구현 과정
### 설치 및 설정
\`\`\`bash
# 설치 명령어
\`\`\`

### 주요 코드
\`\`\`javascript
// 핵심 코드 예시
\`\`\`

## 장점과 단점
### 장점
- 
- 

### 단점
- 
- 

## 결론
이 기술을 사용한 경험을 종합해보세요.`
  };

  // 카테고리 변경 시 템플릿 적용
  useEffect(() => {
    if (category && templates[category as keyof typeof templates] && !content.trim()) {
      setContent(templates[category as keyof typeof templates]);
    }
  }, [category]);

  // 녹음 타이머
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

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

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    console.log('녹음 시작');
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    setIsTranscribing(true);
    
    // 목업 음성 인식 및 요약 처리 (3초 후)
    setTimeout(() => {
      const mockTranscription = `안녕하세요, 오늘 회의를 시작하겠습니다. 첫 번째 안건은 프로젝트 진행 상황 점검입니다. 
김개발님, 백엔드 API 개발 현황을 말씀해주시겠어요? 
네, 현재 사용자 인증 API와 게시글 CRUD API를 완료했습니다. 다음 주까지 댓글 기능 API를 완성할 예정입니다.
좋습니다. 그럼 프론트엔드는 어떤가요? 
이노랑님이 대답해주세요. 현재 메인 페이지와 로그인 페이지를 완료했고, 게시글 목록 페이지를 작업 중입니다.
잘 진행되고 있네요. 다음 안건으로 넘어가겠습니다.`;

      const mockSummary = `## 회의 기본 정보
- **일시**: ${new Date().toLocaleDateString('ko-KR')} ${new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
- **참석자**: 김개발, 이노랑, 팀리더
- **회의 목적**: 프로젝트 진행 상황 점검

## 주요 논의 사항
### 1. 백엔드 개발 현황
- **논의 내용**: 사용자 인증 API와 게시글 CRUD API 완료 보고
- **결정 사항**: 다음 주까지 댓글 기능 API 완성

### 2. 프론트엔드 개발 현황
- **논의 내용**: 메인 페이지, 로그인 페이지 완료, 게시글 목록 페이지 작업 중
- **결정 사항**: 계속 진행

## 액션 아이템
- [ ] **김개발**: 댓글 기능 API 개발 (다음 주)
- [ ] **이노랑**: 게시글 목록 페이지 완성 (이번 주)

## 다음 회의 일정
- **일시**: 다음 주 동일 시간
- **주요 안건**: API 통합 테스트 및 배포 준비`;

      setTitle('팀 회의록 - ' + new Date().toLocaleDateString('ko-KR'));
      setContent(mockSummary);
      setTags(['회의록', '프로젝트', '진행상황']);
      setIsTranscribing(false);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
                카테고리를 선택하면 해당 템플릿이 자동으로 적용됩니다. 마크다운 형식으로 작성할 수 있습니다.
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
                  <SelectItem value="daily">데일리 회고</SelectItem>
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

          {/* 회의록 녹음 기능 */}
          {category === 'meeting' && (
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mic className="h-5 w-5 text-purple-600" />
                  AI 회의록 자동 작성
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-purple-700">
                  회의를 녹음하면 AI가 자동으로 회의록을 작성해드립니다.
                </p>
                
                {!isRecording && !isTranscribing && (
                  <Button 
                    onClick={handleStartRecording}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                  >
                    <Mic className="h-4 w-4" />
                    녹음 시작
                  </Button>
                )}

                {isRecording && (
                  <div className="flex items-center gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-700 font-medium">녹음 중</span>
                    </div>
                    <div className="text-red-600 font-mono">
                      {formatTime(recordingTime)}
                    </div>
                    <Button 
                      onClick={handleStopRecording}
                      variant="outline"
                      size="sm"
                      className="ml-auto flex items-center gap-2"
                    >
                      <Square className="h-4 w-4" />
                      녹음 완료
                    </Button>
                  </div>
                )}

                {isTranscribing && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                      <span className="text-blue-700 font-medium">AI가 회의록을 작성하고 있습니다...</span>
                    </div>
                    <p className="text-sm text-blue-600">
                      음성을 텍스트로 변환하고 내용을 요약하고 있습니다.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* 카테고리 선택시 템플릿 안내 */}
          {category && activeTab === 'direct' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-sm text-green-700">
                ✓ {category === 'sprint' ? '스프린트 회고' : 
                   category === 'daily' ? '데일리 회고' :
                   category === 'meeting' ? '회의록' : 
                   category === 'troubleshooting' ? '트러블 슈팅' : 
                   'Tech Archiving'} 템플릿이 적용되었습니다. 내용을 수정하여 사용하세요.
              </div>
            </div>
          )}

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
                    placeholder="마크다운 형식으로 내용을 작성하세요..."
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
