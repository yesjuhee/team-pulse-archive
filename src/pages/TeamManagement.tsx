
import React, { useState } from 'react';
import { ArrowLeft, Users, TrendingUp, MessageSquare, Heart, Settings, UserPlus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const TeamManagement = () => {
  const { teamId } = useParams();
  const { toast } = useToast();
  const [inviteEmail, setInviteEmail] = useState('');

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
    { id: '1', name: '김민준', email: 'kim@example.com', role: 'Frontend Developer', posts: 8, joinDate: '2023.09.01', status: 'active' },
    { id: '2', name: '이서영', email: 'lee@example.com', role: 'Backend Developer', posts: 6, joinDate: '2023.09.01', status: 'active' },
    { id: '3', name: '박지훈', email: 'park@example.com', role: 'DevOps Engineer', posts: 5, joinDate: '2023.09.05', status: 'active' },
    { id: '4', name: '정수연', email: 'jung@example.com', role: 'UI/UX Designer', posts: 3, joinDate: '2023.09.10', status: 'active' },
    { id: '5', name: '최원영', email: 'choi@example.com', role: 'Project Manager', posts: 2, joinDate: '2023.09.15', status: 'active' },
  ];

  const handleInviteMember = () => {
    if (inviteEmail.trim()) {
      toast({
        title: "초대 메일이 발송되었습니다",
        description: `${inviteEmail}로 팀 초대 메일을 발송했습니다.`,
        duration: 3000,
      });
      setInviteEmail('');
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
              <Link to={`/team/${teamId}`} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                팀 블로그로 돌아가기
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">팀 관리</h1>
            <Button variant="outline" asChild>
              <Link to={`/team/${teamId}/settings`}>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Posts */}
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

          {/* Team Member Invitation */}
          <Card>
            <CardHeader>
              <CardTitle>팀원 초대</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="초대할 팀원의 이메일 주소"
                    type="email"
                  />
                  <Button onClick={handleInviteMember}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    초대
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  초대된 팀원은 이메일로 초대 링크를 받게 됩니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members Table */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>팀원 관리</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>이름</TableHead>
                  <TableHead>이메일</TableHead>
                  <TableHead>역할</TableHead>
                  <TableHead>게시글 수</TableHead>
                  <TableHead>가입일</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>관리</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.role}</TableCell>
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
      </main>
    </div>
  );
};

export default TeamManagement;
