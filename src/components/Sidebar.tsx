import React from 'react';
import { Book, Users, Calendar, Hash, FileText, Tag } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Link, useParams } from 'react-router-dom';

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedAuthor?: string;
  onAuthorChange: (author: string) => void;
  selectedTag?: string;
  onTagChange: (tag: string) => void;
}

const categories = [
  { id: 'all', name: '전체 글', icon: Book, count: 32 },
  { id: 'sprint', name: '스프린트 회고', icon: Calendar, count: 8 },
  { id: 'meeting', name: '회의록', icon: FileText, count: 6 },
  { id: 'troubleshooting', name: '트러블 슈팅', icon: Hash, count: 12 },
  { id: 'tech', name: 'Tech Archiving', icon: Book, count: 6 },
];

const teamMembers = [
  { 
    name: '김개발', 
    role: 'Frontend Developer', 
    posts: 12,
    avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop'
  },
  { 
    name: '이백엔드', 
    role: 'Backend Developer', 
    posts: 8,
    avatar: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop'
  },
  { 
    name: '박인프라', 
    role: 'DevOps Engineer', 
    posts: 6,
    avatar: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=400&fit=crop'
  },
  { 
    name: '정디자인', 
    role: 'UI/UX Designer', 
    posts: 4,
    avatar: 'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400&h=400&fit=crop'
  },
  { 
    name: '최기획', 
    role: 'Project Manager', 
    posts: 7,
    avatar: null
  },
];

const popularTags = [
  { name: 'React', count: 8 },
  { name: 'TypeScript', count: 6 },
  { name: 'Node.js', count: 5 },
  { name: 'Docker', count: 4 },
  { name: 'AWS', count: 3 },
  { name: 'MongoDB', count: 3 },
  { name: 'API', count: 5 },
  { name: '성능최적화', count: 2 },
];

const Sidebar = ({ 
  selectedCategory, 
  onCategoryChange, 
  selectedAuthor, 
  onAuthorChange,
  selectedTag,
  onTagChange
}: SidebarProps) => {
  const { teamId } = useParams();
  
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-16 overflow-y-auto">
      <div className="p-6">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">카테고리</h2>
          <nav className="space-y-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Tag className="h-5 w-5" />
            태그
          </h2>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => {
              const isSelected = selectedTag === tag.name;
              
              return (
                <button
                  key={tag.name}
                  onClick={() => onTagChange(isSelected ? '' : tag.name)}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                    isSelected 
                      ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{tag.name}</span>
                  <span className={`text-xs ${isSelected ? 'text-blue-500' : 'text-gray-400'}`}>
                    {tag.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            팀원
          </h2>
          <div className="space-y-3">
            {teamMembers.map((member) => {
              const isSelected = selectedAuthor === member.name;
              
              return (
                <div key={member.name} className="relative">
                  <button
                    onClick={() => onAuthorChange(isSelected ? '' : member.name)}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      isSelected 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <Avatar className="w-8 h-8">
                      {member.avatar ? (
                        <AvatarImage src={member.avatar} alt={member.name} />
                      ) : null}
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-sm font-semibold">
                        {member.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className={`text-sm font-medium ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                    <span className={`text-xs ${isSelected ? 'text-blue-600' : 'text-gray-400'}`}>
                      {member.posts}개
                    </span>
                  </button>
                  
                  {/* Profile Link Overlay */}
                  <Link 
                    to={`/team/${teamId}/member/${encodeURIComponent(member.name)}`}
                    className="absolute inset-0 z-10"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
