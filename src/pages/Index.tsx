import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PostCard from '../components/PostCard';
import TeamInfo from '../components/TeamInfo';
import CreatePostInline from '../components/CreatePostInline';
import MemberProfileInline from '../components/MemberProfileInline';

// Mock posts data with tags and meeting category
const mockPosts = [
  {
    id: '1',
    title: 'React 상태 관리 라이브러리 선택 과정',
    content: '프로젝트 초기에 Redux vs Zustand vs Context API 중 어떤 것을 선택할지 고민했습니다. 각각의 장단점을 분석하고 팀의 요구사항에 맞는 최적의 선택을 한 과정을 공유합니다.',
    author: '김개발',
    category: 'tech',
    date: '2024.01.15',
    likes: 12,
    comments: 5,
    tags: ['React', 'TypeScript', '성능최적화']
  },
  {
    id: '2',
    title: '스프린트 2주차 회고',
    content: '이번 스프린트에서는 사용자 인증 시스템 구현에 집중했습니다. 예상보다 어려웠던 부분들과 팀원들과의 협업 과정에서 배운 점들을 정리해보았습니다.',
    author: '이백엔드',
    category: 'sprint',
    date: '2024.01.14',
    likes: 8,
    comments: 3,
    tags: ['Node.js', 'API', 'MongoDB']
  },
  {
    id: '3',
    title: 'Docker 컨테이너 메모리 누수 해결기',
    content: '프로덕션 환경에서 발생한 메모리 누수 문제를 해결하는 과정에서 겪었던 시행착오와 최종 해결 방법을 공유합니다.',
    author: '박인프라',
    category: 'troubleshooting',
    date: '2024.01.13',
    likes: 15,
    comments: 7,
    tags: ['Docker', 'AWS']
  },
  {
    id: '4',
    title: 'TypeScript 타입 안정성 향상 방법',
    content: 'TypeScript를 사용하면서 타입 안정성을 높이고 런타임 에러를 줄이기 위해 적용한 다양한 기법들을 소개합니다.',
    author: '김개발',
    category: 'tech',
    date: '2024.01.12',
    likes: 20,
    comments: 9,
    tags: ['TypeScript', 'React']
  },
  {
    id: '5',
    title: 'UI 컴포넌트 라이브러리 구축 경험',
    content: '팀 내에서 재사용 가능한 UI 컴포넌트 라이브러리를 구축하면서 얻은 경험과 노하우를 공유합니다.',
    author: '정디자인',
    category: 'tech',
    date: '2024.01.11',
    likes: 11,
    comments: 4,
    tags: ['React', 'TypeScript']
  },
  {
    id: '6',
    title: '주간 개발팀 회의록 - 2024.01.15',
    content: '이번 주 개발팀 회의에서 논의된 주요 안건들과 결정사항을 정리했습니다. API 설계 변경사항과 다음 스프린트 계획에 대해 다뤘습니다.',
    author: '최기획',
    category: 'meeting',
    date: '2024.01.15',
    likes: 5,
    comments: 2,
    tags: ['API', '회의록']
  }
];

const Index = () => {
  const { teamId } = useParams();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('overview');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [posts, setPosts] = useState(mockPosts);
  const [currentView, setCurrentView] = useState<'home' | 'posts' | 'member' | 'write'>('home');
  const [selectedMember, setSelectedMember] = useState<string>('');

  // Check URL query parameter for view
  useEffect(() => {
    const viewParam = searchParams.get('view');
    if (viewParam === 'home') {
      setCurrentView('home');
      setSelectedCategory('overview');
    } else {
      setCurrentView('posts');
    }
  }, [searchParams]);

  // Filter posts based on selected category, author, and tag
  const filteredPosts = posts.filter(post => {
    const categoryMatch = selectedCategory === 'all' || selectedCategory === 'overview' || post.category === selectedCategory;
    const authorMatch = !selectedAuthor || post.author === selectedAuthor;
    const tagMatch = !selectedTag || (post.tags && post.tags.includes(selectedTag));
    return categoryMatch && authorMatch && tagMatch;
  });

  const handlePostClick = (post: any) => {
    // Navigation is handled in PostCard component
  };

  const handleSavePost = (newPost: any) => {
    setPosts(prev => [newPost, ...prev]);
    setCurrentView('home'); // 글 저장 후 홈으로 돌아가기
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'overview') {
      setCurrentView('home');
    } else {
      setCurrentView('posts');
    }
  };

  const handleHomeClick = () => {
    setCurrentView('home');
    setSelectedCategory('overview');
    setSelectedAuthor('');
    setSelectedTag('');
    setSelectedMember('');
  };

  const handleMemberClick = (memberName: string) => {
    setSelectedMember(memberName);
    setCurrentView('member');
    setSelectedCategory('');
    setSelectedAuthor('');
    setSelectedTag('');
  };

  const handleCreatePost = () => {
    setCurrentView('write');
    setSelectedCategory('');
    setSelectedAuthor('');
    setSelectedTag('');
    setSelectedMember('');
  };

  const getPageTitle = () => {
    if (currentView === 'home' || selectedCategory === 'overview') return '프로젝트 대문';
    if (currentView === 'member' && selectedMember) return `${selectedMember}의 활동`;
    if (currentView === 'write') return '새 글 작성';
    if (selectedAuthor) return `${selectedAuthor}의 글`;
    if (selectedTag) return `#${selectedTag} 태그`;
    
    const categoryName = {
      'all': '전체 글',
      'sprint': '스프린트 회고',
      'meeting': '회의록',
      'troubleshooting': '트러블 슈팅',
      'tech': 'Tech Archiving'
    }[selectedCategory] || '게시물';
    
    return categoryName;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header 
        onCreatePost={handleCreatePost} 
        onHomeClick={handleHomeClick}
      />
      
      <div className="flex">
        <Sidebar 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange}
          selectedAuthor={selectedAuthor}
          onAuthorChange={setSelectedAuthor}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          onMemberClick={handleMemberClick}
        />
        
        <main className="flex-1 p-8">
          {currentView === 'home' || selectedCategory === 'overview' ? (
            <TeamInfo onMemberClick={handleMemberClick} />
          ) : currentView === 'member' && selectedMember ? (
            <MemberProfileInline memberName={selectedMember} teamId={teamId || 'smart-city-platform'} />
          ) : currentView === 'write' ? (
            <CreatePostInline onSave={handleSavePost} onCancel={handleHomeClick} />
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {getPageTitle()}
                </h2>
                <p className="text-gray-600 bg-white/60 px-3 py-1 rounded-full text-sm">
                  {filteredPosts.length}개의 글
                </p>
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
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
