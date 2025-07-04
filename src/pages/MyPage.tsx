
import React, { useState } from 'react';
import { ArrowLeft, User, Heart, Bookmark, Edit, TrendingUp, Calendar, Mail, Github, ExternalLink, Camera, Users, FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import PostCard from '@/components/PostCard';

const MyPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('my-teams');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Mock user data
  const [userInfo, setUserInfo] = useState({
    name: '김민준',
    email: 'kim@example.com',
    role: 'Frontend Developer',
    bio: 'React와 TypeScript를 사용한 웹 개발을 전문으로 하는 개발자입니다. 사용자 경험을 중시하며, 깔끔하고 효율적인 코드 작성을 지향합니다.',
    joinDate: '2023.09.01',
    profileImage: null,
    githubUrl: 'https://github.com/kimuser',
    blogUrl: 'https://blog.kimuser.com',
    linkedinUrl: '',
    phone: ''
  });

  const userStats = {
    totalPosts: 12,
    totalLikes: 89,
    totalComments: 45,
    totalBookmarks: 23,
    totalTeams: 3,
    totalViews: 567
  };

  const myTeams = [
    { id: 'smart-city-platform', name: '스마트 시티 플랫폼', role: 'Frontend Developer', posts: 8, status: 'active' },
    { id: 'ecommerce-analytics', name: 'E-commerce 분석 대시보드', role: 'Frontend Developer', posts: 3, status: 'active' },
    { id: 'health-monitoring', name: '헬스케어 모니터링 앱', role: 'React Native Developer', posts: 1, status: 'completed' }
  ];

  // Mock posts data
  const myPosts = [
    {
      id: '1',
      title: 'React 상태 관리 라이브러리 선택 과정',
      content: '프로젝트 초기에 Redux vs Zustand vs Context API 중 어떤 것을 선택할지 고민했습니다...',
      author: '김민준',
      category: 'tech',
      date: '2024.01.15',
      likes: 12,
      comments: 5,
    },
    {
      id: '2',
      title: '팀 프로젝트에서 Git 브랜치 전략 수립',
      content: 'Git Flow vs GitHub Flow, 어떤 브랜치 전략을 선택할지에 대한 고민과 결정 과정을 공유합니다...',
      author: '김민준',
      category: 'sprint',
      date: '2024.01.10',
      likes: 8,
      comments: 3,
    },
  ];

  const likedPosts = [
    {
      id: '3',
      title: 'AWS 배포 자동화 구축 경험',
      content: 'CI/CD 파이프라인을 구축하며 겪었던 시행착오와 해결 과정을 정리했습니다...',
      author: '이서영',
      category: 'tech',
      date: '2024.01.12',
      likes: 15,
      comments: 8,
    },
    {
      id: '4',
      title: '데이터베이스 설계 회고',
      content: '프로젝트 초기 데이터베이스 설계 과정에서의 고민과 개선 사항들을 공유합니다...',
      author: '박지훈',
      category: 'troubleshooting',
      date: '2024.01.08',
      likes: 11,
      comments: 6,
    },
  ];

  const bookmarkedPosts = [
    {
      id: '5',
      title: 'TypeScript 고급 타입 활용법',
      content: 'TypeScript의 고급 타입 시스템을 활용하여 더 안전하고 표현력 있는 코드를 작성하는 방법...',
      author: '정수연',
      category: 'tech',
      date: '2024.01.05',
      likes: 20,
      comments: 12,
    },
    {
      id: '6',
      title: 'UX 리서치 결과 반영 과정',
      content: '사용자 인터뷰와 테스트를 통해 얻은 인사이트를 실제 서비스에 반영한 과정을 정리했습니다...',
      author: '최원영',
      category: 'sprint',
      date: '2024.01.03',
      likes: 9,
      comments: 4,
    },
  ];

  // Mock draft posts data
  const draftPosts = [
    {
      id: 'draft-1',
      title: 'React Hook Form 도입 경험 (임시저장)',
      content: '폼 관리 라이브러리 도입 과정에서의 고민과 결정 사항들을 정리 중...',
      author: '김민준',
      category: 'tech',
      date: '2024.01.25',
      likes: 0,
      comments: 0,
      isDraft: true,
    },
    {
      id: 'draft-2',
      title: '팀 코드 리뷰 프로세스 개선 (임시저장)',
      content: '효율적인 코드 리뷰 문화를 만들기 위한 시도들...',
      author: '김민준',
      category: 'sprint',
      date: '2024.01.23',
      likes: 0,
      comments: 0,
      isDraft: true,
    },
  ];

  // Mock comments data
  const myComments = [
    {
      id: 'comment-1',
      postTitle: 'AWS Lambda 성능 최적화 경험',
      postAuthor: '이백엔드',
      comment: '정말 유용한 정보네요! 저희 팀에서도 Lambda 콜드 스타트 문제로 고민이 많았는데, 워밍업 전략 부분이 특히 도움이 됐습니다.',
      date: '2024.01.24',
      likes: 3,
    },
    {
      id: 'comment-2',
      postTitle: 'React Native 네비게이션 구조 설계',
      postAuthor: '박모바일',
      comment: '네비게이션 스택 구조가 깔끔하네요. 혹시 딥링크 처리는 어떻게 하셨나요?',
      date: '2024.01.22',
      likes: 1,
    },
    {
      id: 'comment-3',
      postTitle: 'GraphQL vs REST API 성능 비교',
      postAuthor: '정풀스택',
      comment: '벤치마크 결과가 흥미롭네요. 저희 프로젝트에서도 GraphQL 도입을 고려 중인데 참고하겠습니다.',
      date: '2024.01.20',
      likes: 2,
    },
  ];

  const handlePostClick = (post: any) => {
    // Navigate to post detail or handle external link
    if (post.isExternal && post.externalUrl) {
      window.open(post.externalUrl, '_blank');
    }
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    toast({
      title: "프로필이 업데이트되었습니다",
      description: "변경사항이 성공적으로 저장되었습니다.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                홈으로 돌아가기
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">마이페이지</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Profile */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {userInfo.name.charAt(0)}
                </div>
                <Button size="sm" variant="ghost" className="absolute -bottom-2 -right-2 p-1 h-8 w-8 rounded-full bg-white border shadow-sm">
                  <Camera className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-3xl font-bold text-gray-900">{userInfo.name}</h2>
                  <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        프로필 편집
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>프로필 편집</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                            <Input
                              value={userInfo.name}
                              onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">역할</label>
                            <Input
                              value={userInfo.role}
                              onChange={(e) => setUserInfo({...userInfo, role: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">소개</label>
                          <Textarea
                            value={userInfo.bio}
                            onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                            <Input
                              value={userInfo.githubUrl}
                              onChange={(e) => setUserInfo({...userInfo, githubUrl: e.target.value})}
                              placeholder="https://github.com/username"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">블로그 URL</label>
                            <Input
                              value={userInfo.blogUrl}
                              onChange={(e) => setUserInfo({...userInfo, blogUrl: e.target.value})}
                              placeholder="https://blog.example.com"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                            취소
                          </Button>
                          <Button onClick={handleSaveProfile}>
                            저장
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{userInfo.role}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{userInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>가입일: {userInfo.joinDate}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{userInfo.bio}</p>

                <div className="flex items-center gap-4">
                  {userInfo.githubUrl && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={userInfo.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {userInfo.blogUrl && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={userInfo.blogUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        블로그
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{userStats.totalTeams}</p>
                <p className="text-sm text-gray-600">참여 팀</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{userStats.totalPosts}</p>
                <p className="text-sm text-gray-600">작성한 글</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{userStats.totalViews}</p>
                <p className="text-sm text-gray-600">총 조회수</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{userStats.totalLikes}</p>
                <p className="text-sm text-gray-600">받은 좋아요</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{userStats.totalComments}</p>
                <p className="text-sm text-gray-600">작성한 댓글</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{userStats.totalBookmarks}</p>
                <p className="text-sm text-gray-600">북마크</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Card>
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="my-teams">내 팀 블로그 목록</TabsTrigger>
                <TabsTrigger value="my-posts">내가 쓴 글</TabsTrigger>
                <TabsTrigger value="liked-posts">좋아요 한 글</TabsTrigger>
                <TabsTrigger value="bookmarked-posts">북마크 한 글</TabsTrigger>
                <TabsTrigger value="draft-posts">임시 저장글</TabsTrigger>
                <TabsTrigger value="my-comments">작성한 댓글</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="my-teams" className="space-y-4">
                {myTeams.length > 0 ? (
                  myTeams.map((team) => (
                    <Link key={team.id} to={`/team/${team.id}?view=home`}>
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{team.name}</h4>
                          <p className="text-sm text-gray-500">{team.role} • {team.posts}개 글 작성</p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">참여 중인 팀이 없습니다.</p>
                    <Button className="mt-4" asChild>
                      <Link to="/create-team">팀 만들기</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="my-posts" className="space-y-6">
                {myPosts.length > 0 ? (
                  myPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onClick={() => handlePostClick(post)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Edit className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">아직 작성한 글이 없습니다.</p>
                    <Button className="mt-4" asChild>
                      <Link to="/team-blog">글 작성하러 가기</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="liked-posts" className="space-y-6">
                {likedPosts.length > 0 ? (
                  likedPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onClick={() => handlePostClick(post)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">좋아요 한 글이 없습니다.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="bookmarked-posts" className="space-y-6">
                {bookmarkedPosts.length > 0 ? (
                  bookmarkedPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onClick={() => handlePostClick(post)}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">북마크 한 글이 없습니다.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="draft-posts" className="space-y-6">
                {draftPosts.length > 0 ? (
                  draftPosts.map((post) => (
                    <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                            <Badge variant="secondary" className="text-xs">임시저장</Badge>
                          </div>
                          <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{post.date}</span>
                            <span>작성자: {post.author}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          계속 작성
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">임시 저장된 글이 없습니다.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="my-comments" className="space-y-6">
                {myComments.length > 0 ? (
                  myComments.map((comment) => (
                    <div key={comment.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-1">{comment.postTitle}</h4>
                        <p className="text-sm text-gray-500">by {comment.postAuthor}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg mb-3">
                        <p className="text-gray-700">{comment.comment}</p>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{comment.date}</span>
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          <span>{comment.likes}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">작성한 댓글이 없습니다.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MyPage;
