
import React from 'react';
import { Calendar, MapPin, Users, Github, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Link, useParams } from 'react-router-dom';

const teamData = {
  name: '스마트 시티 플랫폼',
  description: 'IoT 센서와 AI를 활용한 스마트 시티 관리 플랫폼을 개발하는 팀입니다. 도시의 교통, 환경, 안전 데이터를 실시간으로 수집하고 분석하여 시민들에게 더 나은 도시 서비스를 제공하는 것이 목표입니다.',
  period: '2023.09 - 2024.03',
  location: '서울, 대한민국',
  members: [
    { 
      name: '김개발', 
      role: 'Frontend Developer',
      avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop',
      intro: 'React와 TypeScript로 사용자 친화적인 UI를 만드는 것을 좋아합니다. 성능 최적화에 관심이 많아요.'
    },
    { 
      name: '이백엔드', 
      role: 'Backend Developer',
      avatar: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop',
      intro: 'Node.js와 PostgreSQL로 안정적인 서버를 구축합니다. 클린 아키텍처를 추구해요.'
    },
    { 
      name: '박인프라', 
      role: 'DevOps Engineer',
      avatar: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=400&fit=crop',
      intro: 'Docker와 AWS를 활용한 자동화된 배포 시스템을 구축합니다. CI/CD 파이프라인 전문가예요.'
    },
    { 
      name: '정디자인', 
      role: 'UI/UX Designer',
      avatar: 'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400&h=400&fit=crop',
      intro: '사용자 중심의 디자인을 추구합니다. 데이터 시각화와 인터랙션 디자인에 특화되어 있어요.'
    },
    { 
      name: '최기획', 
      role: 'Project Manager',
      avatar: null,
      intro: '팀의 소통과 일정 관리를 담당합니다. 애자일 방법론으로 효율적인 프로젝트 진행을 이끌어요.'
    },
  ],
  techStack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'IoT', 'AI/ML'],
  links: {
    github: 'https://github.com/smart-city-platform',
    demo: 'https://smart-city-demo.com'
  }
};

const TeamInfo = () => {
  const { teamId } = useParams();
  
  return (
    <Card className="mb-8">
      <CardContent className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{teamData.name}</h1>
            <p className="text-gray-600 leading-relaxed mb-4">{teamData.description}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{teamData.period}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{teamData.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{teamData.members.length}명</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/team/smart-city-platform/manage">
                팀 관리
              </Link>
            </Button>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">기술 스택</h3>
          <div className="flex flex-wrap gap-2">
            {teamData.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Team Members - Single Column Layout */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">팀원</h3>
          <div className="space-y-4">
            {teamData.members.map((member) => (
              <Link 
                key={member.name} 
                to={`/team/${teamId}/member/${encodeURIComponent(member.name)}`}
                className="block"
              >
                <div className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <Avatar className="w-16 h-16 flex-shrink-0">
                    {member.avatar ? (
                      <AvatarImage src={member.avatar} alt={member.name} />
                    ) : null}
                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold text-lg">
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900 text-lg">{member.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {member.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {member.intro}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">프로젝트 링크</h3>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href={teamData.links.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={teamData.links.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                데모 보기
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamInfo;
