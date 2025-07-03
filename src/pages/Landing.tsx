
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, User } from 'lucide-react';

const Landing = () => {
  const { login, isLoggedIn, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">TeamLog</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700 font-semibold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link to="/explore">
                  ✨ 탐색하기
                </Link>
              </Button>
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
                    👋 로그아웃
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={login}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  로그인하기
                </Button>
              )}
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
            개발팀의 기술적 여정, 문제해결 과정, 협업 경험을 체계적으로 기록하고 공유하세요. 포트폴리오부터 팀 문화까지, 모든 것을 하나의 플랫폼에서 관리할 수 있습니다.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              onClick={login}
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg rounded-lg font-medium"
            >
              로그인하고 시작하기
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700 font-semibold px-12 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link to="/explore">
                ✨ 탐색하기
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
