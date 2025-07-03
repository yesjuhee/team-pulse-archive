
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, User, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for user's blogs
const myBlogs = [
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

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">TeamLog</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/explore" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                탐색하기
              </Link>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={logout}>
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">안녕하세요! 👋</h2>
          <p className="text-gray-600">오늘도 멋진 프로젝트를 기록해보세요.</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/create-team">팀 블로그 만들기</Link>
          </Button>
        </div>

        {/* My Blogs Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">내 블로그</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBlogs.map((blog) => (
              <Link key={blog.id} to={`/team/${blog.id}?view=home`}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg">{blog.name}</CardTitle>
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
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
