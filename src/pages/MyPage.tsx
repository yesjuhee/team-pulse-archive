
import React, { useState } from 'react';
import { ArrowLeft, User, Heart, Bookmark, Edit, TrendingUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import PostCard from '@/components/PostCard';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('my-posts');

  // Mock user data
  const userInfo = {
    name: '김민준',
    email: 'kim@example.com',
    role: 'Frontend Developer',
    joinDate: '2023.09.01',
    profileImage: null,
  };

  const userStats = {
    totalPosts: 12,
    totalLikes: 89,
    totalComments: 45,
    totalBookmarks: 23,
  };

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

  const handlePostClick = (post: any) => {
    // Navigate to post detail or handle external link
    if (post.isExternal && post.externalUrl) {
      window.open(post.externalUrl, '_blank');
    }
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
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {userInfo.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{userInfo.name}</h2>
                <p className="text-gray-600 mb-1">{userInfo.role}</p>
                <p className="text-sm text-gray-500">{userInfo.email}</p>
                <p className="text-sm text-gray-500">가입일: {userInfo.joinDate}</p>
              </div>
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                프로필 편집
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">작성한 글</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.totalPosts}</p>
                </div>
                <Edit className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">받은 좋아요</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.totalLikes}</p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">작성한 댓글</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.totalComments}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">북마크</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.totalBookmarks}</p>
                </div>
                <Bookmark className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Card>
          <CardHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="my-posts">내가 쓴 글</TabsTrigger>
                <TabsTrigger value="liked-posts">좋아요 한 글</TabsTrigger>
                <TabsTrigger value="bookmarked-posts">북마크 한 글</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
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
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MyPage;
