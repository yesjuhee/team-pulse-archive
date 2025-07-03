
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

interface HeaderProps {
  onCreatePost: () => void;
  onHomeClick?: () => void;
}

const Header = ({ onCreatePost, onHomeClick }: HeaderProps) => {
  const { teamId } = useParams();
  
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Team Name */}
          <div className="flex items-center mx-0 px-0">
            <button 
              onClick={onHomeClick}
              className="text-2xl font-bold text-gray-800 hover:text-purple-600 transition-colors flex items-center gap-2"
            >
              🏙️ <span>스마트 시티 플랫폼</span>
            </button>
          </div>

          {/* Navigation - 팀 블로그에서는 제거 */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* 팀 블로그 내에서는 네비게이션 숨김 */}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hover:bg-purple-50 hover:text-purple-600">
              <Search className="h-4 w-4" />
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
    </header>
  );
};

export default Header;
