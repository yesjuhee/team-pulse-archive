
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import PostCard from '@/components/PostCard';
import CreatePostModal from '@/components/CreatePostModal';
import TeamInfo from '@/components/TeamInfo';

// Sample data
const initialPosts = [
  {
    id: '1',
    title: 'React 상태 관리 라이브러리 선택 과정',
    content: '프로젝트 초기에 Redux vs Zustand vs Context API 중 어떤 것을 선택할지 고민했습니다. 각각의 장단점을 분석하고 팀의 요구사항에 맞는 최적의 선택을 한 과정을 공유합니다.',
    author: '김민준',
    category: 'tech',
    date: '2024.01.15',
    likes: 12,
    comments: 5,
  },
  {
    id: '2',
    title: '1차 스프린트 회고 - 개발 환경 구축',
    content: '첫 번째 스프린트에서 개발 환경 구축과 기본 아키텍처 설계를 완료했습니다. 예상보다 시간이 오래 걸렸던 부분과 다음 스프린트에서 개선할 점들을 정리했습니다.',
    author: '이지혜',
    category: 'sprint',
    date: '2024.01.12',
    likes: 8,
    comments: 3,
  },
  {
    id: '3',
    title: 'CORS 에러 해결기',
    content: 'API 연동 중 CORS 에러가 발생했습니다. 프록시 설정, 서버 설정 변경 등 여러 방법을 시도한 과정과 최종 해결 방법을 상세히 기록했습니다.',
    author: '박서연',
    category: 'troubleshooting',
    date: '2024.01.10',
    likes: 15,
    comments: 7,
    isExternal: true,
    externalUrl: 'https://example.com/cors-solution',
  },
  {
    id: '4',
    title: 'TypeScript 타입 가드 활용법',
    content: 'TypeScript에서 런타임 타입 체크를 위한 타입 가드 패턴들을 정리했습니다. 실제 프로젝트에서 사용한 예제와 함께 설명합니다.',
    author: '김민준',
    category: 'tech',
    date: '2024.01.08',
    likes: 20,
    comments: 4,
  }
];

const Index = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showTeamInfo, setShowTeamInfo] = useState(true);

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handleCreatePost = (newPost: any) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostClick = (post: any) => {
    if (post.isExternal && post.externalUrl) {
      window.open(post.externalUrl, '_blank');
    } else {
      console.log('Post clicked:', post.id);
      // Here you would navigate to the post detail page
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreatePost={() => setIsCreateModalOpen(true)} />
      
      <div className="max-w-7xl mx-auto flex">
        <Sidebar 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <main className="flex-1 p-6">
          {/* Team Info Section */}
          {showTeamInfo && (
            <div className="mb-8">
              <TeamInfo />
              <div className="text-center">
                <button
                  onClick={() => setShowTeamInfo(false)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  팀 소개 접기
                </button>
              </div>
            </div>
          )}

          {!showTeamInfo && (
            <div className="text-center mb-6">
              <button
                onClick={() => setShowTeamInfo(true)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                팀 소개 보기
              </button>
            </div>
          )}

          {/* Posts Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'all' ? '전체 글' : 
                 selectedCategory === 'sprint' ? '스프린트 회고' :
                 selectedCategory === 'troubleshooting' ? '트러블 슈팅' :
                 selectedCategory === 'tech' ? 'Tech Archiving' : ''}
              </h2>
              <span className="text-gray-500 text-sm">
                {filteredPosts.length}개의 글
              </span>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => handlePostClick(post)}
              />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">아직 글이 없습니다</h3>
              <p className="text-gray-500 mb-4">첫 번째 글을 작성해보세요!</p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                글쓰기
              </button>
            </div>
          )}
        </main>
      </div>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreatePost}
      />
    </div>
  );
};

export default Index;
