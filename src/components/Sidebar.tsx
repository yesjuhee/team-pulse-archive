
import React from 'react';
import { Book, Users, Calendar, Hash } from 'lucide-react';

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: '전체 글', icon: Book, count: 24 },
  { id: 'sprint', name: '스프린트 회고', icon: Calendar, count: 8 },
  { id: 'troubleshooting', name: '트러블 슈팅', icon: Hash, count: 12 },
  { id: 'tech', name: 'Tech Archiving', icon: Book, count: 4 },
];

const teamMembers = [
  { name: '김민준', role: 'Frontend Developer', posts: 8 },
  { name: '이지혜', role: 'Project Manager', posts: 5 },
  { name: '박서연', role: 'Backend Developer', posts: 7 },
  { name: '정수진', role: 'UI/UX Designer', posts: 4 },
];

const Sidebar = ({ selectedCategory, onCategoryChange }: SidebarProps) => {
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

        {/* Team Members */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="h-5 w-5" />
            팀원
          </h2>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
                <span className="text-xs text-gray-400">{member.posts}개</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
