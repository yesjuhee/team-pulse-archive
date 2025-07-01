
import React from 'react';
import { Github, ExternalLink, Users, Calendar, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TeamInfo = () => {
  const techStack = ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'Redis'];
  const teamMembers = [
    { name: '김개발', role: 'Frontend Developer', github: 'kim-dev' },
    { name: '이백엔드', role: 'Backend Developer', github: 'lee-backend' },
    { name: '박인프라', role: 'DevOps Engineer', github: 'park-infra' },
    { name: '정디자인', role: 'UI/UX Designer', github: 'jung-design' },
    { name: '최기획', role: 'Project Manager', github: 'choi-pm' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
      {/* Project Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          스마트 시티 플랫폼 프로젝트
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          IoT 센서와 AI를 활용하여 도시 인프라를 효율적으로 관리하고 
          시민들에게 실시간 정보를 제공하는 통합 스마트 시티 관리 플랫폼
        </p>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">프로젝트 기간</h3>
          <p className="text-gray-600">2023.09 - 2024.02 (6개월)</p>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">팀 구성</h3>
          <p className="text-gray-600">5명 (풀스택)</p>
        </div>
        
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <Code className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">개발 스택</h3>
          <p className="text-gray-600">{techStack.length}개 기술</p>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">기술 스택</h2>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="px-3 py-1 text-sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Team Members */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">팀원 소개</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {member.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Project Links */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button className="bg-gray-900 hover:bg-gray-800 text-white">
          <Github className="h-4 w-4 mr-2" />
          GitHub Repository
        </Button>
        <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
          <ExternalLink className="h-4 w-4 mr-2" />
          Live Demo
        </Button>
      </div>
    </div>
  );
};

export default TeamInfo;
