import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';
interface HeaderProps {
  onCreatePost: () => void;
}
const Header = ({
  onCreatePost
}: HeaderProps) => {
  return <header className="bg-white/90 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center mx-0 px-0">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
              TeamLog
            </Link>
            <span className="ml-2 text-sm text-gray-500">팀 프로젝트 아카이브</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/team-blog" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              팀 블로그
            </Link>
            <Link to="/create-team" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
              팀 만들기
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hover:bg-purple-50 hover:text-purple-600">
              <Search className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="sm" className="hover:bg-purple-50 hover:text-purple-600">
              <Bell className="h-4 w-4" />
            </Button>
            
            <Button onClick={onCreatePost} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300" size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              글쓰기
            </Button>
            
            <Button variant="ghost" size="sm" asChild className="hover:bg-purple-50 hover:text-purple-600">
              <Link to="/mypage">
                <User className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;