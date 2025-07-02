
import React, { useState } from 'react';
import { Search, TrendingUp, Users, ExternalLink, ArrowRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';

// Mock data for team blogs
const teamBlogs = [
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
    id: 'ecommerce-analytics',
    name: 'E-commerce 분석 대시보드',
    description: '실시간 판매 데이터 분석 및 시각화 플랫폼',
    members: 4,
    posts: 18,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    tags: ['Vue.js', 'Python', 'D3.js', 'PostgreSQL'],
    lastUpdate: '2024.01.18'
  },
  {
    id: 'health-monitoring',
    name: '헬스케어 모니터링 앱',
    description: '웨어러블 기기 연동 건강 관리 모바일 애플리케이션',
    members: 6,
    posts: 31,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
    tags: ['React Native', 'Firebase', 'GraphQL', 'MongoDB'],
    lastUpdate: '2024.01.22'
  }
];

// Mock data for popular posts
const popularPosts = [
  {
    id: '1',
    title: 'React Query와 Zustand를 활용한 상태 관리 패턴',
    excerpt: '복잡한 상태 관리 문제를 해결하기 위한 React Query와 Zustand 조합 사용법',
    author: '김개발',
    team: '스마트 시티 플랫폼',
    views: 1234,
    likes: 89,
    date: '2024.01.20',
    category: 'Tech Archiving'
  },
  {
    id: '2',
    title: 'Docker를 이용한 마이크로서비스 아키텍처 구축',
    excerpt: '컨테이너 기반 마이크로서비스 설계와 배포 자동화 경험 공유',
    author: '박백엔드',
    team: 'E-commerce 분석 대시보드',
    views: 987,
    likes: 76,
    date: '2024.01.18',
    category: 'Trouble Shooting'
  },
  {
    id: '3',
    title: 'React Native와 WebRTC를 활용한 실시간 통신',
    excerpt: '모바일 앱에서 실시간 화상통화 기능 구현 과정과 최적화 방법',
    author: '이모바일',
    team: '헬스케어 모니터링 앱',
    views: 756,
    likes: 65,
    date: '2024.01.22',
    category: '스프린트 회고'
  }
];

const Landing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');
  const [filteredBlogs, setFilteredBlogs] = useState(teamBlogs);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredBlogs(teamBlogs);
      return;
    }

    const filtered = teamBlogs.filter(blog => {
      const searchTerm = searchQuery.toLowerCase();
      
      switch (searchFilter) {
        case 'name':
          return blog.name.toLowerCase().includes(searchTerm);
        case 'tech':
          return blog.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        case 'all':
        default:
          return (
            blog.name.toLowerCase().includes(searchTerm) ||
            blog.description.toLowerCase().includes(searchTerm) ||
            blog.tags.some(tag => tag.toLowerCase().includes(searchTerm))
          );
      }
    });
    
    setFilteredBlogs(filtered);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">TeamLog</h1>
              <span className="ml-2 text-sm text-gray-500">팀 프로젝트 아카이브</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/mypage">마이페이지</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/create-team">팀 블로그 만들기</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            팀 프로젝트의 모든 이야기가 <br />
            <span className="text-blue-600">한곳에서</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            개발팀의 기술적 여정, 문제해결 과정, 협업 경험을 체계적으로 기록하고 공유하세요.
            포트폴리오부터 팀 문화까지, 모든 것을 하나의 플랫폼에서 관리할 수 있습니다.
          </p>
          
          {/* Enhanced Search */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex gap-2 mb-4">
              <Select value={searchFilter} onValueChange={setSearchFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 검색</SelectItem>
                  <SelectItem value="name">팀명으로</SelectItem>
                  <SelectItem value="tech">기술스택으로</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="프로젝트명, 기술스택, 팀명으로 검색해보세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-12 pr-4 py-4 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button onClick={handleSearch} size="lg">
                <Search className="h-4 w-4 mr-2" />
                검색
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Posts Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-orange-500" />
              <h2 className="text-3xl font-bold text-gray-900">인기 아티클</h2>
            </div>
            <Button variant="ghost" className="text-blue-600">
              더 보기 <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
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
            ))}
          </div>
        </section>

        {/* Team Blogs Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-blue-500" />
              <h2 className="text-3xl font-bold text-gray-900">팀 블로그 둘러보기</h2>
              {searchQuery && (
                <Badge variant="outline">
                  "{searchQuery}" 검색 결과 {filteredBlogs.length}개
                </Badge>
              )}
            </div>
            {searchQuery && (
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSearchQuery('');
                  setFilteredBlogs(teamBlogs);
                }}
              >
                전체 보기
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{blog.name}</CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/team/${blog.id}`}>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
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
            ))}
          </div>

          {filteredBlogs.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">검색 결과가 없습니다.</p>
              <p className="text-sm text-gray-400">다른 키워드로 검색해보세요.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Landing;
