
import React, { useState } from 'react';
import { Calendar, User, Heart, MessageCircle, ExternalLink, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  date: string;
  likes: number;
  comments: number;
  isExternal?: boolean;
  externalUrl?: string;
}

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'sprint':
      return 'bg-green-100 text-green-800';
    case 'troubleshooting':
      return 'bg-red-100 text-red-800';
    case 'tech':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryName = (category: string) => {
  switch (category) {
    case 'sprint':
      return '스프린트 회고';
    case 'troubleshooting':
      return '트러블 슈팅';
    case 'tech':
      return 'Tech Archiving';
    default:
      return '기타';
  }
};

const PostCard = ({ post, onClick }: PostCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "북마크가 해제되었습니다" : "북마크에 추가되었습니다",
      duration: 2000,
    });
  };

  const handleCardClick = () => {
    if (post.isExternal && post.externalUrl) {
      onClick();
    } else {
      // Navigate to post detail page
      window.location.href = `/post/${post.id}`;
    }
  };

  return (
    <article 
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={getCategoryColor(post.category)}>
              {getCategoryName(post.category)}
            </Badge>
            {post.isExternal && (
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                <ExternalLink className="h-3 w-3 mr-1" />
                외부 링크
              </Badge>
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBookmark}
          className={`opacity-0 group-hover:opacity-100 transition-opacity ${
            isBookmarked ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {/* Content Preview */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {post.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 hover:text-red-500 transition-colors">
            <Heart className="h-4 w-4" />
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center gap-1 hover:text-blue-500 transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
