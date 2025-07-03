import React, { useState } from 'react';
import { ArrowLeft, User, Heart, Bookmark, Edit, TrendingUp, Calendar, Mail, Github, ExternalLink, Camera, Users } from 'lucide-react';
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
    { id: '1', name: '스마트 시티 플랫폼', role: 'Frontend Developer', posts: 8, status: 'active' },
    { id: '2', name: 'E-commerce 프로젝트', role: 'Frontend Developer', posts: 3, status: 'active' },
    { id: '3', name: '모바일 앱 개발', role: 'React Native Developer', posts: 1, status: 'completed' }
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

  // 인기 아티클 데이터
  const popularArticles = [
    {
      id: '101',
      title: 'React Query와 Zustand를 활용한 상태 관리 패턴',
      excerpt: '복잡한 상태 관리 문제를 해결하기 위한 React Query와 Zustand 조합 사용법',
      author: '김개발',
      team: '스마트 시티 플랫폼',
      teamId: 'smart-city-platform',
      views: 1234,
      likes: 89,
      date: '2024.01.20',
      category: 'Tech Archiving'
    },
    {
      id: '102',
      title: 'Docker를 이용한 마이크로서비스 아키텍처 구축',
      excerpt: '컨테이너 기반 마이크로서비스 설계와 배포 자동화 경험 공유',
      author: '박백엔드',
      team: 'E-commerce 분석 대시보드',
      teamId: 'ecommerce-analytics',
      views: 987,
      likes: 76,
      date: '2024.01.18',
      category: 'Trouble Shooting'
    },
    {
      id: '103',
      title: 'React Native와 WebRTC를 활용한 실시간 통신',
      excerpt: '모바일 앱에서 실시간 화상통화 기능 구현 과정과 최적화 방법',
      author: '이모바일',
      team: '헬스케어 모니터링 앱',
      teamId: 'health-monitoring',
      views: 756,
      likes: 65,
      date: '2024.01.22',
      category: '스프린트 회고'
    },
    {
      id: '104',
      title: 'GraphQL vs REST API 성능 비교 분석',
      excerpt: '실제 프로젝트에서 GraphQL과 REST API의 성능을 비교 분석한 결과',
      author: '이백엔드',
      team: '핀테크 월렛 서비스',
      teamId: 'fintech-wallet',
      views: 892,
      likes: 67,
      date: '2024.01.25',
      category: 'Tech Archiving'
    },
    {
      id: '105',
      title: 'AI 모델 최적화를 통한 응답 시간 50% 단축',
      excerpt: 'GPT 모델 파인튜닝과 캐싱 전략으로 챗봇 응답 속도 개선',
      author: '정AI',
      team: 'AI 챗봇 플랫폼',
      teamId: 'ai-chatbot',
      views: 723,
      likes: 54,
      date: '2024.01.23',
      category: 'Tech Archiving'
    }
  ];

  // 팀 블로그 데이터
  const popularTeams = [
    {
      id: 'smart-city-platform',
      name: '스마트 시티 플랫폼',
      description: 'IoT 센서와 AI를 활용한 스마트 시티 관리 플랫폼 개발',
      members: 5,
      posts: 23,
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=250&fit=crop',
      tags: ['React', 'Node.js', 'IoT', 'AI'],
      lastUpdate: '2024.01.20'
    },
    {
      id: 'fintech-wallet',
      name: '핀테크 월렛 서비스',
      description: '블록체인 기반 디지털 월렛 개발 프로젝트',
      members: 7,
      posts: 42,
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
      tags: ['React', 'Blockchain', 'Web3', 'TypeScript'],
      lastUpdate: '2024.01.25'
    },
    {
      id: 'ai-chatbot',
      name: 'AI 챗봇 플랫폼',
      description: 'GPT 기반 고객 서비스 챗봇 개발',
      members: 4,
      posts: 15,
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=250&fit=crop',
      tags: ['Python', 'FastAPI', 'OpenAI', 'Docker'],
      lastUpdate: '2024.01.23'
    },
    {
      id: 'education-platform',
      name: '온라인 교육 플랫폼',
      description: '인터랙티브 온라인 학습 관리 시스템',
      members: 8,
      posts: 35,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
      tags: ['Angular', 'Spring Boot', 'MySQL', 'AWS'],
      lastUpdate: '2024.01.19'
    },
    {
      id: 'food-delivery',
      name: '푸드 딜리버리 앱',
      description: '실시간 음식 배달 주문 및 관리 시스템',
      members: 5,
      posts: 22,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=250&fit=crop',
      tags: ['React Native', 'Express.js', 'MongoDB', 'Socket.io'],
      lastUpdate: '2024.01.24'
    }
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
                <TabsTrigger value="my-teams">내 팀 목록</TabsTrigger>
                <TabsTrigger value="my-posts">내가 쓴 글</TabsTrigger>
                <TabsTrigger value="liked-posts">좋아요 한 글</TabsTrigger>
                <TabsTrigger value="bookmarked-posts">북마크 한 글</TabsTrigger>
                <TabsTrigger value="popular-articles">인기 아티클</TabsTrigger>
                <TabsTrigger value="team-blogs">팀 블로그</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="my-teams" className="space-y-4">
                {myTeams.length > 0 ? (
                  myTeams.map((team) => (
                    <div key={team.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{team.name}</h4>
                        <p className="text-sm text-gray-500">{team.role} • {team.posts}개 글 작성</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={team.status === 'active' ? 'default' : 'secondary'}>
                          {team.status === 'active' ? '활동중' : '완료'}
                        </Badge>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/team/${team.id}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
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

              <TabsContent value="popular-articles" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularArticles.map((post) => (
                    <Link key={post.id} to={`/post/${post.id}`}>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-64 flex flex-col">
                        <CardHeader className="flex-1">
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{post.category}</Badge>
                              <span>{post.team}</span>
                            </div>
                            <span>{post.date}</span>
                          </div>
                          <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">{post.author}</span>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>👀 {post.views.toLocaleString()}</span>
                              <span>❤️ {post.likes}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="team-blogs" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {popularTeams.map((blog) => (
                    <Link key={blog.id} to={`/team/${blog.id}?view=home`}>
                      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer h-96 flex flex-col">
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={blog.image} 
                            alt={blog.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardHeader className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <CardTitle className="text-xl">{blog.name}</CardTitle>
                            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                          </div>
                          <CardDescription className="text-gray-600 line-clamp-2">
                            {blog.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {blog.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              <span>👥 {blog.members}명</span>
                              <span>📝 {blog.posts}개 글</span>
                            </div>
                            <span>{blog.lastUpdate}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MyPage;
