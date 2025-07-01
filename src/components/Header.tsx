
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onCreatePost: () => void;
}

const Header = ({ onCreatePost }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              TeamLog
            </Link>
            <span className="ml-2 text-sm text-gray-500">팀 프로젝트 아카이브</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/team-blog" className="text-gray-700 hover:text-blue-600 transition-colors">
              팀 블로그
            </Link>
            <Link to="/create-team" className="text-gray-700 hover:text-blue-600 transition-colors">
              팀 만들기
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            
            <Button 
              onClick={onCreatePost}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              글쓰기
            </Button>
            
            <Button variant="ghost" size="sm" asChild>
              <Link to="/mypage">
                <User className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
