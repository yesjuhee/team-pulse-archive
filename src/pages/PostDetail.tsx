
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Mock post data
const mockPost = {
  id: '1',
  title: 'React 상태 관리 라이브러리 선택 과정',
  content: `
# 프로젝트 초기 상태 관리 라이브러리 선택

프로젝트 초기에 Redux vs Zustand vs Context API 중 어떤 것을 선택할지 고민했습니다. 각각의 장단점을 분석하고 팀의 요구사항에 맞는 최적의 선택을 한 과정을 공유합니다.

## 1. 요구사항 분석

우리 팀의 프로젝트는 다음과 같은 특징을 가지고 있었습니다:
- 중간 규모의 SPA 애플리케이션
- 실시간 데이터 동기화 필요
- 팀원들의 React 경험 수준이 다양함
- 빠른 개발 속도 요구

## 2. 각 라이브러리 비교

### Redux Toolkit
**장점:**
- 성숙한 생태계와 풍부한 문서
- DevTools 지원으로 디버깅 용이
- 타입스크립트 지원 우수

**단점:**
- 보일러플레이트 코드가 여전히 존재
- 학습 곡선이 높음

### Zustand
**장점:**
- 매우 간단한 API
- 작은 번들 사이즈
- 타입스크립트 친화적

**단점:**
- Redux만큼 성숙하지 않은 생태계
- 복잡한 상태 로직에서는 구조화가 어려움

### Context API
**장점:**
- React 내장 기능
- 추가 라이브러리 불필요
- 간단한 상태 관리에 적합

**단점:**
- 성능 최적화의 어려움
- 복잡한 상태 관리에 부적합

## 3. 최종 선택: Zustand

결과적으로 Zustand를 선택했습니다. 이유는 다음과 같습니다:

1. **학습 곡선이 낮음**: 팀원들이 빠르게 적응할 수 있었음
2. **충분한 기능**: 우리 프로젝트 요구사항을 모두 만족
3. **좋은 성능**: 불필요한 리렌더링이 적음
4. **타입 안정성**: TypeScript와의 호환성이 뛰어남

\`\`\`typescript
import { create } from 'zustand'

interface UserState {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
\`\`\`

## 4. 결과

6개월간 사용한 결과, Zustand는 우리 팀에게 매우 적합한 선택이었습니다. 개발 속도도 빨라졌고, 코드 유지보수성도 향상되었습니다.

앞으로도 비슷한 규모의 프로젝트에서는 Zustand를 우선적으로 고려할 예정입니다.
  `,
  author: '김민준',
  category: 'tech',
  date: '2024.01.15',
  likes: 12,
  comments: 5,
  isBookmarked: false,
  readTime: '5분'
};

// Mock comments data
const mockComments = [
  {
    id: '1',
    author: '박서연',
    content: '정말 유용한 비교 분석이네요! 저희 팀도 비슷한 고민을 하고 있었는데 많은 도움이 되었습니다.',
    date: '2024.01.16',
    likes: 3
  },
  {
    id: '2',
    author: '이지혜',
    content: 'Zustand 사용 경험을 더 자세히 들어보고 싶어요. 특히 복잡한 상태 로직은 어떻게 관리하셨나요?',
    date: '2024.01.17',
    likes: 1
  },
  {
    id: '3',
    author: '정수진',
    content: '코드 예제까지 포함되어 있어서 이해하기 쉬웠습니다. 감사합니다!',
    date: '2024.01.17',
    likes: 2
  }
];

const PostDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(mockPost.isBookmarked);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(mockComments);

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "좋아요가 취소되었습니다" : "좋아요를 눌렀습니다",
      duration: 2000,
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "북마크가 해제되었습니다" : "북마크에 추가되었습니다",
      duration: 2000,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockPost.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "링크가 클립보드에 복사되었습니다",
        duration: 2000,
      });
    }
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: String(comments.length + 1),
      author: '현재 사용자',
      content: newComment,
      date: new Date().toLocaleDateString('ko-KR'),
      likes: 0
    };
    
    setComments([...comments, comment]);
    setNewComment('');
    toast({
      title: "댓글이 등록되었습니다",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" asChild>
              <Link to="/team-blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                팀 블로그로 돌아가기
              </Link>
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant={isBookmarked ? "default" : "outline"}
                size="sm"
                onClick={handleBookmark}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                북마크
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                공유
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Post Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-blue-100 text-blue-800">Tech Archiving</Badge>
            <span className="text-sm text-gray-500">• {mockPost.readTime} 읽기</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {mockPost.title}
          </h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{mockPost.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{mockPost.date}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="flex items-center gap-1"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                {mockPost.likes + (isLiked ? 1 : 0)}
              </Button>
              <div className="flex items-center gap-1 text-gray-500">
                <MessageCircle className="h-4 w-4" />
                <span>{comments.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <Card className="mb-8">
          <CardContent className="prose prose-lg max-w-none p-8">
            <div dangerouslySetInnerHTML={{ 
              __html: mockPost.content
                .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4 text-gray-900">$1</h1>')
                .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3 mt-8 text-gray-900">$1</h2>')
                .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2 mt-6 text-gray-900">$1</h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/```typescript([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code class="text-sm">$1</code></pre>')
                .replace(/\n\n/g, '</p><p class="mb-4">')
                .replace(/^(.*)$/gm, '<p class="mb-4">$1</p>')
            }} />
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold">댓글 {comments.length}개</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Comment Input */}
            <div className="space-y-3">
              <Textarea
                placeholder="댓글을 작성해주세요..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
                  댓글 등록
                </Button>
              </div>
            </div>
            
            {/* Comments List */}
            <div className="space-y-4 border-t pt-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {comment.author.charAt(0)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{comment.author}</span>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                        <Heart className="h-3 w-3 mr-1" />
                        {comment.likes}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PostDetail;
