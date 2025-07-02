
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MessageCircle, FileText, ExternalLink, Github, Linkedin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// 임시 데이터 - 실제로는 API나 상태 관리에서 가져올 데이터
const memberData = {
  '김개발': {
    name: '김개발',
    role: 'Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop',
    intro: 'React와 TypeScript로 사용자 친화적인 UI를 만드는 것을 좋아합니다. 성능 최적화에 관심이 많아요.',
    description: '3년차 프론트엔드 개발자로, 사용자 경험을 최우선으로 생각하며 개발합니다. 특히 React 생태계에 깊은 이해를 가지고 있으며, 성능 최적화와 접근성을 고려한 웹 애플리케이션 개발에 전문성을 가지고 있습니다.',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Jest'],
    links: {
      github: 'https://github.com/kimdev',
      linkedin: 'https://linkedin.com/in/kimdev',
      blog: 'https://kimdev.blog'
    },
    posts: [
      {
        id: 1,
        title: 'React 성능 최적화 전략',
        category: 'Tech Archiving',
        date: '2024.01.15',
        excerpt: 'React 애플리케이션의 성능을 향상시키는 다양한 방법들을 정리했습니다.'
      },
      {
        id: 2,
        title: 'TypeScript 활용한 안전한 프론트엔드 개발',
        category: 'Tech Archiving',
        date: '2024.01.08',
        excerpt: 'TypeScript를 통해 런타임 에러를 줄이고 개발 생산성을 높이는 방법'
      },
      {
        id: 3,
        title: '1차 스프린트 회고',
        category: '스프린트 회고',
        date: '2023.12.20',
        excerpt: '첫 번째 스프린트를 마치며 느낀 점들과 개선사항들을 정리했습니다.'
      }
    ],
    comments: [
      {
        id: 1,
        postTitle: 'Docker 컨테이너 최적화 방법',
        author: '박인프라',
        content: '실제 프로덕션에서 이 방법을 적용해보니 빌드 시간이 30% 단축되었어요! 좋은 팁 감사합니다.',
        date: '2024.01.12'
      },
      {
        id: 2,
        postTitle: 'PostgreSQL 인덱스 전략',
        author: '이백엔드',
        content: '프론트엔드 관점에서도 이런 DB 최적화가 사용자 경험에 얼마나 중요한지 다시 한번 느꼈습니다.',
        date: '2024.01.05'
      }
    ]
  }
};

const MemberProfile = () => {
  const { teamId, memberName } = useParams();
  const member = memberData[memberName as keyof typeof memberData];

  if (!member) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">팀원을 찾을 수 없습니다</h1>
          <Link to={`/team/${teamId}`} className="text-purple-600 hover:text-purple-700">
            팀 페이지로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="hover:bg-white/50">
            <Link to={`/team/${teamId}`} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              팀 페이지로 돌아가기
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    {member.avatar ? (
                      <AvatarImage src={member.avatar} alt={member.name} />
                    ) : null}
                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-2xl font-semibold">
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h1>
                  <Badge variant="secondary" className="mb-4">
                    {member.role}
                  </Badge>
                  <p className="text-gray-600 text-sm mb-4">{member.intro}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">소개</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">기술 스택</h3>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">링크</h3>
                    <div className="space-y-2">
                      {member.links.github && (
                        <a href={member.links.github} target="_blank" rel="noopener noreferrer" 
                           className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors">
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                      )}
                      {member.links.linkedin && (
                        <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors">
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </a>
                      )}
                      {member.links.blog && (
                        <a href={member.links.blog} target="_blank" rel="noopener noreferrer"
                           className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors">
                          <ExternalLink className="h-4 w-4" />
                          개인 블로그
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  작성한 글 ({member.posts.length}개)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {member.posts.map((post) => (
                    <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 hover:text-purple-600 cursor-pointer">
                          {post.title}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  작성한 댓글 ({member.comments.length}개)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {member.comments.map((comment) => (
                    <div key={comment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="mb-2">
                        <span className="text-sm text-gray-500">
                          <span className="font-medium text-gray-700">{comment.author}</span>의 글 
                          <span className="font-medium text-purple-600 hover:text-purple-700 cursor-pointer ml-1">
                            "{comment.postTitle}"
                          </span>
                          에 댓글
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 mb-2">{comment.content}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{comment.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
