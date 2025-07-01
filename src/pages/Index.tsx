
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PostCard from '../components/PostCard';
import TeamInfo from '../components/TeamInfo';
import CreatePostModal from '../components/CreatePostModal';

// Mock posts data
const mockPosts = [
  {
    id: '1',
    title: 'React 상태 관리 라이브러리 선택 과정',
    content: '프로젝트 초기에 Redux vs Zustand vs Context API 중 어떤 것을 선택할지 고민했습니다. 각각의 장단점을 분석하고 팀의 요구사항에 맞는 최적의 선택을 한 과정을 공유합니다.',
    author: '김개발',
    category: 'tech',
    date: '2024.01.15',
    likes: 12,
    comments: 5
  },
  {
    id: '2',
    title: '스프린트 2주차 회고',
    content: '이번 스프린트에서는 사용자 인증 시스템 구현에 집중했습니다. 예상보다 어려웠던 부분들과 팀원들과의 협업 과정에서 배운 점들을 정리해보았습니다.',
    author: '이백엔드',
    category: 'sprint',
    date: '2024.01.14',
    likes: 8,
    comments: 3
  },
  {
    id: '3',
    title: 'Docker 컨테이너 메모리 누수 해결기',
    content: '프로덕션 환경에서 발생한 메모리 누수 문제를 해결하는 과정에서 겪었던 시행착오와 최종 해결 방법을 공유합니다.',
    author: '박인프라',
    category: 'troubleshooting',
    date: '2024.01.13',
    likes: 15,
    comments: 7
  },
  {
    id: '4',
    title: 'TypeScript 타입 안정성 향상 방법',
    content: 'TypeScript를 사용하면서 타입 안정성을 높이고 런타임 에러를 줄이기 위해 적용한 다양한 기법들을 소개합니다.',
    author: '김개발',
    category: 'tech',
    date: '2024.01.12',
    likes: 20,
    comments: 9
  },
  {
    id: '5',
    title: 'UI 컴포넌트 라이브러리 구축 경험',
    content: '팀 내에서 재사용 가능한 UI 컴포넌트 라이브러리를 구축하면서 얻은 경험과 노하우를 공유합니다.',
    author: '정디자인',
    category: 'tech',
    date: '2024.01.11',
    likes: 11,
    comments: 4
  }
];

const Index = () => {
  const { teamId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [posts, setPosts] = useState(mockPosts);

  // Filter posts based on selected category and author
  const filteredPosts = posts.filter(post => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const authorMatch = !selectedAuthor || post.author === selectedAuthor;
    return categoryMatch && authorMatch;
  });

  const handlePostClick = (post: any) => {
    // Navigation is handled in PostCard component
  };

  const handleSavePost = (newPost: any) => {
    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreatePost={() => setIsCreatePostModalOpen(true)} />
      
      <div className="flex">
        <Sidebar 
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory}
          selectedAuthor={selectedAuthor}
          onAuthorChange={setSelectedAuthor}
        />
        
        <main className="flex-1 p-8">
          <TeamInfo />
          
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedAuthor ? `${selectedAuthor}의 글` : '최근 게시물'}
              </h2>
              <p className="text-gray-600">{filteredPosts.length}개의 글</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onClick={() => handlePostClick(post)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      <CreatePostModal 
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onSave={handleSavePost}
      />
    </div>
  );
};

export default Index;
