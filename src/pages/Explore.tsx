import React, { useState } from 'react';
import { Search, TrendingUp, Users, ExternalLink, ArrowRight, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for team blogs (확장된 데이터)
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
    id: 'social-media-analytics',
    name: '소셜미디어 분석 도구',
    description: '소셜미디어 트렌드 분석 및 인사이트 제공 플랫폼',
    members: 6,
    posts: 28,
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop',
    tags: ['Vue.js', 'Django', 'Redis', 'Elasticsearch'],
    lastUpdate: '2024.01.21'
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
  },
  {
    id: 'travel-planner',
    name: '여행 계획 도우미',
    description: 'AI 기반 맞춤형 여행 계획 및 추천 서비스',
    members: 4,
    posts: 19,
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop',
    tags: ['React', 'Python', 'TensorFlow', 'Google Maps API'],
    lastUpdate: '2024.01.22'
  }
];

// Mock data for popular posts (확장된 데이터)
const popularPosts = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
    id: '4',
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
    id: '5',
    title: '블록체인 개발 환경 구축기',
    excerpt: 'Hardhat과 Ganache를 활용한 로컬 블록체인 개발 환경 설정 과정',
    author: '박블록체인',
    team: '핀테크 월렛 서비스',
    teamId: 'fintech-wallet',
    views: 1456,
    likes: 112,
    date: '2024.01.24',
    category: 'Trouble Shooting'
  },
  {
    id: '6',
    title: 'AI 모델 최적화를 통한 응답 시간 50% 단축',
    excerpt: 'GPT 모델 파인튜닝과 캐싱 전략으로 챗봇 응답 속도 개선',
    author: '정AI',
    team: 'AI 챗봇 플랫폼',
    teamId: 'ai-chatbot',
    views: 723,
    likes: 54,
    date: '2024.01.23',
    category: 'Tech Archiving'
  },
  {
    id: '7',
    title: '대용량 데이터 처리를 위한 Elasticsearch 활용기',
    excerpt: 'SNS 데이터 실시간 분석을 위한 Elasticsearch 클러스터 구축 경험',
    author: '최데이터',
    team: '소셜미디어 분석 도구',
    teamId: 'social-media-analytics',
    views: 634,
    likes: 43,
    date: '2024.01.21',
    category: 'Trouble Shooting'
  },
  {
    id: '8',
    title: '마이크로서비스 아키텍처 도입 후기',
    excerpt: '모놀리식에서 마이크로서비스로 전환하며 겪은 시행착오와 해결책',
    author: '김아키텍트',
    team: '온라인 교육 플랫폼',
    teamId: 'education-platform',
    views: 1087,
    likes: 78,
    date: '2024.01.19',
    category: '스프린트 회고'
  },
  {
    id: '9',
    title: 'React Native 성능 최적화 실전 가이드',
    excerpt: '모바일 앱 성능 개선을 위한 최적화 기법과 측정 방법',
    author: '이모바일',
    team: '푸드 딜리버리 앱',
    teamId: 'food-delivery',
    views: 845,
    likes: 61,
    date: '2024.01.24',
    category: 'Tech Archiving'
  },
  {
    id: '10',
    title: 'TensorFlow로 추천 시스템 구현하기',
    excerpt: '딥러닝 기반 여행지 추천 알고리즘 개발 과정과 성능 개선',
    author: '박ML',
    team: '여행 계획 도우미',
    teamId: 'travel-planner',
    views: 567,
    likes: 39,
    date: '2024.01.22',
    category: 'Tech Archiving'
  }
];

const Explore = () => {
  const { isLoggedIn, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');
  const [filteredBlogs, setFilteredBlogs] = useState(teamBlogs);
  const [filteredPosts, setFilteredPosts] = useState(popularPosts);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredBlogs(teamBlogs);
      setFilteredPosts(popularPosts);
      return;
    }

    const searchTerm = searchQuery.toLowerCase();
    
    let filteredTeamBlogs = [];
    let filteredPostResults = [];

    switch (searchFilter) {
      case 'team':
        filteredTeamBlogs = teamBlogs.filter(blog => {
          return (
            blog.name.toLowerCase().includes(searchTerm) ||
            blog.description.toLowerCase().includes(searchTerm) ||
            blog.tags.some(tag => tag.toLowerCase().includes(searchTerm))
          );
        });
        filteredPostResults = [];
        break;
        
      case 'post':
        filteredTeamBlogs = [];
        filteredPostResults = popularPosts.filter(post => {
          return (
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.category.toLowerCase().includes(searchTerm)
          );
        });
        break;
        
      case 'author':
        filteredTeamBlogs = [];
        filteredPostResults = popularPosts.filter(post => {
          return post.author.toLowerCase().includes(searchTerm);
        });
        break;
        
      case 'all':
      default:
        filteredTeamBlogs = teamBlogs.filter(blog => {
          return (
            blog.name.toLowerCase().includes(searchTerm) ||
            blog.description.toLowerCase().includes(searchTerm) ||
            blog.tags.some(tag => tag.toLowerCase().includes(searchTerm))
          );
        });
        filteredPostResults = popularPosts.filter(post => {
          return (
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.author.toLowerCase().includes(searchTerm) ||
            post.category.toLowerCase().includes(searchTerm)
          );
        });
        break;
    }
    
    setFilteredBlogs(filteredTeamBlogs);
    setFilteredPosts(filteredPostResults);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredBlogs(teamBlogs);
    setFilteredPosts(popularPosts);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">TeamLog</Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">탐색하기</span>
              {isLoggedIn ? (
                <>
                  <Button variant="ghost" size="sm">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/mypage">
                      <User className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    로그아웃
                  </Button>
                </>
              ) : (
                <Button variant="outline" asChild>
                  <Link to="/">로그인하기</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            팀 블로그와 아티클 탐색하기
          </h1>
          
          <div className="flex gap-2 mb-4">
            <Select value={searchFilter} onValueChange={setSearchFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 검색</SelectItem>
                <SelectItem value="team">팀으로</SelectItem>
                <SelectItem value="post">게시글로</SelectItem>
                <SelectItem value="author">작성자로</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="프로젝트명, 기술스택, 팀명, 게시글, 작성자로 검색해보세요..."
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
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Posts Section */}
        {(!searchQuery || searchFilter === 'all' || searchFilter === 'post' || searchFilter === 'author') && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-orange-500" />
                <h2 className="text-3xl font-bold text-gray-900">
                  {searchQuery ? '검색된 아티클' : '인기 아티클'}
                </h2>
                {searchQuery && (
                  <Badge variant="outline">
                    "{searchQuery}" 검색 결과 {filteredPosts.length}개
                  </Badge>
                )}
              </div>
              {!searchQuery && (
                <Button variant="ghost" className="text-blue-600">
                  더 보기 <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
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

            {filteredPosts.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">검색된 아티클이 없습니다.</p>
                <p className="text-sm text-gray-400">다른 키워드로 검색해보세요.</p>
              </div>
            )}
          </section>
        )}

        {/* Team Blogs Section */}
        {(!searchQuery || searchFilter === 'all' || searchFilter === 'team') && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-blue-500" />
                <h2 className="text-3xl font-bold text-gray-900">
                  {searchQuery ? '검색된 팀 블로그' : '팀 블로그 둘러보기'}
                </h2>
                {searchQuery && (
                  <Badge variant="outline">
                    "{searchQuery}" 검색 결과 {filteredBlogs.length}개
                  </Badge>
                )}
              </div>
              {searchQuery && (
                <Button variant="ghost" onClick={clearSearch}>
                  전체 보기
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
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

            {filteredBlogs.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">검색된 팀 블로그가 없습니다.</p>
                <p className="text-sm text-gray-400">다른 키워드로 검색해보세요.</p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Explore;
