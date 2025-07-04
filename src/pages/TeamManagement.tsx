import React, { useState } from 'react';
import { ArrowLeft, Users, TrendingUp, MessageSquare, Heart, Settings, UserPlus, Trash2, Search, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const TeamManagement = () => {
  const { toast } = useToast();

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('');
  const [inviteDescription, setInviteDescription] = useState('');

  // Mock data
  const teamStats = {
    totalPosts: 24,
    totalViews: 1250,
    totalLikes: 89,
    totalComments: 156,
    activeMembers: 5,
  };

  const recentPosts = [
    { id: '1', title: 'React 상태 관리 패턴 정리', author: '김민준', date: '2024.01.15', views: 45, likes: 8, comments: 12 },
    { id: '2', title: 'AWS 배포 자동화 구축기', author: '이서영', date: '2024.01.14', views: 38, likes: 6, comments: 9 },
    { id: '3', title: '데이터베이스 성능 최적화', author: '박지훈', date: '2024.01.13', views: 52, likes: 11, comments: 15 },
  ];

  const teamMembers = [
    { 
      id: '1', 
      name: '김민준', 
      email: 'kim@example.com', 
      role: 'Frontend Developer', 
      description: 'React와 TypeScript 전문가',
      posts: 8, 
      joinDate: '2023.09.01', 
      status: 'active',
      profileImage: null,
      githubUrl: 'https://github.com/kimuser',
      blogUrl: 'https://blog.kimuser.com'
    },
    { 
      id: '2', 
      name: '이서영', 
      email: 'lee@example.com', 
      role: 'Backend Developer', 
      description: 'Node.js와 데이터베이스 설계 담당',
      posts: 6, 
      joinDate: '2023.09.01', 
      status: 'active',
      profileImage: null,
      githubUrl: 'https://github.com/leeuser',
      blogUrl: null
    },
    { 
      id: '3', 
      name: '박지훈', 
      email: 'park@example.com', 
      role: 'DevOps Engineer', 
      description: 'CI/CD 파이프라인과 인프라 관리',
      posts: 5, 
      joinDate: '2023.09.05', 
      status: 'active',
      profileImage: null,
      githubUrl: 'https://github.com/parkuser',
      blogUrl: null
    },
    { 
      id: '4', 
      name: '정수연', 
      email: 'jung@example.com', 
      role: 'UI/UX Designer', 
      description: '사용자 경험 설계와 디자인 시스템 구축',
      posts: 3, 
      joinDate: '2023.09.10', 
      status: 'active',
      profileImage: null,
      githubUrl: null,
      blogUrl: 'https://blog.junguser.com'
    },
    { 
      id: '5', 
      name: '최원영', 
      email: 'choi@example.com', 
      role: 'Project Manager', 
      description: '프로젝트 일정 관리와 팀 커뮤니케이션 담당',
      posts: 2, 
      joinDate: '2023.09.15', 
      status: 'active',
      profileImage: null,
      githubUrl: null,
      blogUrl: null
    },
  ];

  const pendingInvites = [
    { email: 'newmember@example.com', role: 'Frontend Developer', sentDate: '2024.01.20', status: 'pending' },
    { email: 'designer@example.com', role: 'UI/UX Designer', sentDate: '2024.01.18', status: 'pending' },
  ];

  const handleInviteMember = () => {
    if (inviteEmail.trim() && inviteRole.trim()) {
      toast({
        title: "초대 메일이 발송되었습니다",
        description: `${inviteEmail}로 팀 초대 메일을 발송했습니다.`,
        duration: 3000,
      });
      setInviteEmail('');
      setInviteRole('');
      setInviteDescription('');
    }
  };

  const handleRemoveMember = (memberName: string) => {
    toast({
      title: "팀원이 제거되었습니다",
      description: `${memberName}님이 팀에서 제거되었습니다.`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" asChild>
              <Link to="/team/smart-city-platform?view=home" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                팀 블로그로 돌아가기
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">팀 관리</h1>
            <Button variant="outline" asChild>
              <Link to="/team/smart-city-platform/settings">
                <Settings className="h-4 w-4 mr-2" />
                팀 설정
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">총 게시글</p>
                  <p className="text-2xl font-bold text-gray-900">{teamStats.totalPosts}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">총 조회수</p>
                  <p className="text-2xl font-bold text-gray-900">{teamStats.totalViews}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">총 좋아요</p>
                  <p className="text-2xl font-bold text-gray-900">{teamStats.totalLikes}</p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">총 댓글</p>
                  <p className="text-2xl font-bold text-gray-900">{teamStats.totalComments}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">활성 멤버</p>
                  <p className="text-2xl font-bold text-gray-900">{teamStats.activeMembers}</p>
                </div>
                <Users className="h-8 w-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="members" className="space-y-8">
          <TabsList>
            <TabsTrigger value="members">팀원 관리</TabsTrigger>
            <TabsTrigger value="invite">팀원 초대</TabsTrigger>
            <TabsTrigger value="analytics">활동 현황</TabsTrigger>
          </TabsList>

          {/* Team Members Tab */}
          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>팀원 목록</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>팀원</TableHead>
                      <TableHead>역할</TableHead>
                      <TableHead>설명</TableHead>
                      <TableHead>게시글</TableHead>
                      <TableHead>가입일</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {member.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-gray-500">{member.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate">{member.description}</div>
                        </TableCell>
                        <TableCell>{member.posts}개</TableCell>
                        <TableCell>{member.joinDate}</TableCell>
                        <TableCell>
                          <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                            {member.status === 'active' ? '활성' : '비활성'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMember(member.name)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Invitation Tab */}
          <TabsContent value="invite" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>새 팀원 초대</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 주소 *
                    </label>
                    <Input
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="초대할 팀원의 이메일 주소"
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      역할 *
                    </label>
                    <Input
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value)}
                      placeholder="예: Frontend Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      팀원 설명
                    </label>
                    <Input
                      value={inviteDescription}
                      onChange={(e) => setInviteDescription(e.target.value)}
                      placeholder="팀원의 역할이나 전문성에 대한 간단한 설명"
                    />
                  </div>
                  <Button onClick={handleInviteMember} className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    초대 메일 발송
                  </Button>
                  <p className="text-sm text-gray-500">
                    초대된 팀원은 이메일로 초대 링크를 받게 됩니다.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>대기 중인 초대</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingInvites.map((invite, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{invite.email}</div>
                          <div className="text-xs text-gray-500">{invite.role}</div>
                          <div className="text-xs text-gray-400">발송일: {invite.sentDate}</div>
                        </div>
                        <Badge variant="outline">대기중</Badge>
                      </div>
                    ))}
                    {pendingInvites.length === 0 && (
                      <p className="text-gray-500 text-center py-4">대기 중인 초대가 없습니다.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>최근 게시글 현황</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{post.title}</h4>
                        <p className="text-sm text-gray-500">{post.author} • {post.date}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>조회 {post.views}</span>
                        <span>좋아요 {post.likes}</span>
                        <span>댓글 {post.comments}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TeamManagement;
