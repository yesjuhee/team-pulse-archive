import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, X, Palette, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const TeamSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock team data
  const [teamName, setTeamName] = useState('스마트 시티 플랫폼');
  const [teamDescription, setTeamDescription] = useState('IoT 센서와 AI를 활용한 스마트 시티 관리 플랫폼 개발');
  const [projectPeriod, setProjectPeriod] = useState('2023.09 - 2024.02');
  const [teamSize, setTeamSize] = useState('5명');
  const [techStack, setTechStack] = useState(['React', 'Node.js', 'IoT', 'AI']);
  const [newTech, setNewTech] = useState('');
  const [categories, setCategories] = useState([
    { name: '스프린트 회고', template: '## 스프린트 목표\n\n## 완료된 작업\n\n## 발생한 문제\n\n## 해결 방법\n\n## 배운 점\n\n## 다음 스프린트 계획' },
    { name: 'Trouble Shooting', template: '## 문제 상황\n\n## 원인 분석\n\n## 해결 과정\n\n## 최종 해결책\n\n## 배운 점' },
    { name: 'Tech Archiving', template: '## 기술 개요\n\n## 사용 이유\n\n## 구현 과정\n\n## 장단점\n\n## 결론' }
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [githubUrl, setGithubUrl] = useState('https://github.com/team/smart-city');
  const [demoUrl, setDemoUrl] = useState('https://smart-city-demo.com');
  const [selectedTemplate, setSelectedTemplate] = useState(0);

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
    if (newCategory.trim() && !categories.some(cat => cat.name === newCategory.trim())) {
      setCategories([...categories, { 
        name: newCategory.trim(), 
        template: '## 제목\n\n내용을 입력하세요...' 
      }]);
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (categoryName: string) => {
    const defaultCategories = ['스프린트 회고', 'Trouble Shooting', 'Tech Archiving'];
    if (!defaultCategories.includes(categoryName)) {
      setCategories(categories.filter(cat => cat.name !== categoryName));
    }
  };

  const handleTemplateChange = (index: number, newTemplate: string) => {
    const updatedCategories = [...categories];
    updatedCategories[index].template = newTemplate;
    setCategories(updatedCategories);
  };

  const handleSave = () => {
    toast({
      title: "팀 설정이 저장되었습니다",
      description: "변경사항이 성공적으로 적용되었습니다.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" asChild>
              <Link to="/team/smart-city-platform/manage" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                팀 관리로 돌아가기
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">팀 설정</h1>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              저장
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="basic" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">기본 정보</TabsTrigger>
            <TabsTrigger value="categories">카테고리</TabsTrigger>
            <TabsTrigger value="templates">템플릿</TabsTrigger>
            <TabsTrigger value="design">디자인</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>팀/프로젝트 기본 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    팀/프로젝트 이름 *
                  </label>
                  <Input
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="예: 스마트 시티 플랫폼 팀"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    프로젝트 설명 *
                  </label>
                  <Textarea
                    value={teamDescription}
                    onChange={(e) => setTeamDescription(e.target.value)}
                    placeholder="프로젝트의 목적, 주요 기능, 특징 등을 간단히 설명해주세요"
                    className="min-h-[120px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      프로젝트 기간
                    </label>
                    <Input
                      value={projectPeriod}
                      onChange={(e) => setProjectPeriod(e.target.value)}
                      placeholder="예: 2023.09 - 2024.02"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      팀 규모
                    </label>
                    <Input
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      placeholder="예: 5명"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    기술 스택
                  </label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      placeholder="기술 스택 추가"
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
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub 저장소
                    </label>
                    <Input
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/username/repository"
                      type="url"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      데모 사이트
                    </label>
                    <Input
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                      placeholder="https://your-demo-site.com"
                      type="url"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>블로그 카테고리 관리</CardTitle>
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
                    <Badge key={category.name} variant="outline" className="flex items-center gap-1">
                      {category.name}
                      {!['스프린트 회고', 'Trouble Shooting', 'Tech Archiving'].includes(category.name) && (
                        <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveCategory(category.name)} />
                      )}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>카테고리별 작성 템플릿</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-4">
                  {categories.map((category, index) => (
                    <Button
                      key={category.name}
                      variant={selectedTemplate === index ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTemplate(index)}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      {category.name}
                    </Button>
                  ))}
                </div>
                
                {categories[selectedTemplate] && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {categories[selectedTemplate].name} 템플릿
                    </label>
                    <Textarea
                      value={categories[selectedTemplate].template}
                      onChange={(e) => handleTemplateChange(selectedTemplate, e.target.value)}
                      placeholder="마크다운 형식으로 템플릿을 작성하세요..."
                      className="min-h-[300px] font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      이 템플릿은 해당 카테고리 선택 시 글 작성 에디터에 자동으로 로드됩니다.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  디자인 커스터마이징
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    팀 대표 색상
                  </label>
                  <div className="flex gap-2">
                    <input type="color" className="w-12 h-10 border border-gray-300 rounded" defaultValue="#3B82F6" />
                    <Input placeholder="#3B82F6" className="flex-1" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    팀 로고 URL
                  </label>
                  <Input placeholder="https://example.com/logo.png" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    배경 이미지 URL
                  </label>
                  <Input placeholder="https://example.com/background.jpg" />
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">미리보기</h4>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-blue-800 font-semibold">{teamName}</div>
                    <div className="text-blue-600 text-sm">{teamDescription}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TeamSettings;
