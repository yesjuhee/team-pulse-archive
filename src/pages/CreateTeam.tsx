
import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CreateTeam = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // 기본 정보
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [projectPeriod, setProjectPeriod] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  
  // 기술 스택
  const [techStack, setTechStack] = useState<string[]>([]);
  const [newTech, setNewTech] = useState('');
  
  // 카테고리
  const [categories, setCategories] = useState<string[]>(['스프린트 회고', '트러블 슈팅', 'Tech Archiving']);
  const [newCategory, setNewCategory] = useState('');
  
  // 디자인 설정
  const [cardImage, setCardImage] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [teamLogo, setTeamLogo] = useState('');

  const handleAddTech = () => {
    if (newTech.trim() && !techStack.includes(newTech.trim())) {
      setTechStack([...techStack, newTech.trim()]);
      setNewTech('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechStack(techStack.filter(t => t !== tech));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (category: string) => {
    setCategories(categories.filter(c => c !== category));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!teamName.trim()) {
      toast({
        title: "팀명을 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    if (!teamDescription.trim()) {
      toast({
        title: "프로젝트 설명을 입력해주세요",
        variant: "destructive",
      });
      return;
    }
    
    // 팀 생성 로직 (실제로는 API 호출)
    const teamId = teamName.toLowerCase().replace(/\s+/g, '-');
    
    toast({
      title: "팀 블로그가 생성되었습니다!",
      description: `${teamName} 팀 블로그가 성공적으로 생성되었습니다.`,
      duration: 3000,
    });

    // 3초 후 생성된 팀 페이지로 이동하여 실제 생성 확인
    setTimeout(() => {
      navigate(`/team/${teamId}`);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                홈으로 돌아가기
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">새 팀 블로그 만들기</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">기본 정보</TabsTrigger>
              <TabsTrigger value="tech">기술 스택</TabsTrigger>
              <TabsTrigger value="categories">카테고리</TabsTrigger>
              <TabsTrigger value="design">디자인</TabsTrigger>
            </TabsList>

            {/* 기본 정보 탭 */}
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>팀 기본 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="team-name">팀/프로젝트 이름 *</Label>
                    <Input
                      id="team-name"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="예: 스마트 시티 플랫폼 팀"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="team-description">프로젝트 설명 *</Label>
                    <Textarea
                      id="team-description"
                      value={teamDescription}
                      onChange={(e) => setTeamDescription(e.target.value)}
                      placeholder="프로젝트의 목적, 주요 기능, 특징 등을 간단히 설명해주세요"
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="project-period">프로젝트 기간</Label>
                      <Input
                        id="project-period"
                        value={projectPeriod}
                        onChange={(e) => setProjectPeriod(e.target.value)}
                        placeholder="예: 2023.09 - 2024.02"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="team-size">팀 규모</Label>
                      <Input
                        id="team-size"
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        placeholder="예: 5명"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="github-url">GitHub 저장소</Label>
                    <Input
                      id="github-url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/username/repository"
                      type="url"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="demo-url">데모 사이트</Label>
                    <Input
                      id="demo-url"
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                      placeholder="https://your-demo-site.com"
                      type="url"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 기술 스택 탭 */}
            <TabsContent value="tech">
              <Card>
                <CardHeader>
                  <CardTitle>사용 기술 스택</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      placeholder="기술 스택 추가 (예: React, Node.js)"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                    />
                    <Button type="button" onClick={handleAddTech}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                        {tech}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTech(tech)} />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 카테고리 탭 */}
            <TabsContent value="categories">
              <Card>
                <CardHeader>
                  <CardTitle>블로그 카테고리 설정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="새 카테고리 추가"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                    />
                    <Button type="button" onClick={handleAddCategory}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge key={category} variant="outline" className="flex items-center gap-1">
                        {category}
                        {!['스프린트 회고', '트러블 슈팅', 'Tech Archiving'].includes(category) && (
                          <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveCategory(category)} />
                        )}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 디자인 탭 */}
            <TabsContent value="design">
              <Card>
                <CardHeader>
                  <CardTitle>팀 블로그 디자인</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="card-image">카드 대표 이미지 URL</Label>
                    <Input
                      id="card-image"
                      value={cardImage}
                      onChange={(e) => setCardImage(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      type="url"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">메인 컬러</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="primary-color"
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        placeholder="#3B82F6"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="team-logo">팀 로고 URL</Label>
                    <Input
                      id="team-logo"
                      value={teamLogo}
                      onChange={(e) => setTeamLogo(e.target.value)}
                      placeholder="https://example.com/logo.png"
                      type="url"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 생성 버튼 */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate('/')}>
                취소
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                팀 블로그 생성
              </Button>
            </div>
          </Tabs>
        </form>
      </main>
    </div>
  );
};

export default CreateTeam;
