
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import PostCard from '@/components/PostCard';
import CreatePostModal from '@/components/CreatePostModal';
import TeamInfo from '@/components/TeamInfo';

// Updated sample data with Smart City project theme
const initialPosts = [
  {
    id: '1',
    title: 'IoT 센서 데이터 실시간 처리 아키텍처 설계',
    content: '스마트 시티 플랫폼에서 수천 개의 IoT 센서로부터 실시간으로 데이터를 수집하고 처리하기 위한 아키텍처를 설계했습니다. Apache Kafka와 Redis를 활용한 메시지 큐 시스템과 마이크로서비스 구조를 적용했습니다.',
    author: '김개발',
    category: 'tech',
    date: '2024.01.15',
    likes: 23,
    comments: 8,
  },
  {
    id: '2',
    title: '2차 스프린트 회고 - 실시간 대시보드 개발',
    content: '시민들이 실시간으로 도시 정보를 확인할 수 있는 대시보드를 개발했습니다. React와 WebSocket을 활용한 실시간 데이터 시각화 과정에서 겪은 어려움과 해결 방법을 공유합니다.',
    author: '이백엔드',
    category: 'sprint',
    date: '2024.01.12',
    likes: 15,
    comments: 6,
  },
  {
    id: '3',
    title: 'Docker 컨테이너 메모리 부족 이슈 해결기',
    content: '마이크로서비스들을 Docker로 배포하는 과정에서 메모리 부족 이슈가 발생했습니다. 컨테이너 리소스 최적화와 메모리 누수 해결 과정을 상세히 기록했습니다.',
    author: '박인프라',
    category: 'troubleshooting',
    date: '2024.01.10',
    likes: 31,
    comments: 12,
    isExternal: true,
    externalUrl: 'https://example.com/docker-memory-solution',
  },
  {
    id: '4',
    title: 'React Query를 활용한 서버 상태 관리 최적화',
    content: '실시간 데이터가 많은 스마트 시티 플랫폼에서 React Query를 도입하여 서버 상태 관리를 최적화한 경험을 공유합니다. 캐싱 전략과 백그라운드 리페치 설정을 중심으로 설명합니다.',
    author: '김개발',
    category: 'tech',
    date: '2024.01.08',
    likes: 18,
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
      // Navigation will be handled by PostCard component
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
