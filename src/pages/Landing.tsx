
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Landing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');
  const { login } = useAuth();

  const handleSearch = () => {
    // 검색 시 탐색 페이지로 이동
    window.location.href = `/explore?search=${encodeURIComponent(searchQuery)}&filter=${searchFilter}`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">TeamLog</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/explore" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                탐색하기
              </Link>
              <Button 
                onClick={login}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
              >
                로그인
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            팀 프로젝트의 모든 이야기가 <br />
            <span className="text-blue-600">한곳에서</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            개발팀의 기술적 여정, 문제해결 과정, 협업 경험을 체계적으로 기록하고 공유하세요.
            포트폴리오부터 팀 문화까지, 모든 것을 하나의 플랫폼에서 관리할 수 있습니다.
          </p>
          
          {/* Search */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex gap-2 bg-white p-2 rounded-xl shadow-lg border border-gray-200">
              <Select value={searchFilter} onValueChange={setSearchFilter}>
                <SelectTrigger className="w-40 border-0 bg-transparent">
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
                <Input
                  type="text"
                  placeholder="프로젝트명, 기술스택, 팀명, 게시글, 작성자로 검색해보세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border-0 bg-transparent text-lg focus:ring-0 focus:outline-none"
                />
              </div>
              <Button onClick={handleSearch} size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                검색
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
