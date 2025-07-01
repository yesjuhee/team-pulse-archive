
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
      return 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200';
    case 'troubleshooting':
      return 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 border-rose-200';
    case 'tech':
      return 'bg-gradient-to-r from-violet-100 to-purple-100 text-violet-800 border-violet-200';
    default:
      return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200';
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
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(post.likes);
  const { toast } = useToast();

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "북마크가 해제되었습니다" : "북마크에 추가되었습니다",
      duration: 2000,
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setCurrentLikes(prev => isLiked ? prev - 1 : prev + 1);
    toast({
      title: isLiked ? "좋아요가 취소되었습니다" : "좋아요를 눌렀습니다",
      duration: 2000,
    });
  };

  const handleCardClick = () => {
    // Always navigate to post detail page instead of external URL
    window.location.href = `/post/${post.id}`;
  };

  return (
    <article 
      className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100 p-6 hover:shadow-xl hover:shadow-purple-100/50 hover:border-purple-200 transition-all duration-300 cursor-pointer group hover:-translate-y-1"
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={`${getCategoryColor(post.category)} border`}>
              {getCategoryName(post.category)}
            </Badge>
            {post.isExternal && (
              <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
                <ExternalLink className="h-3 w-3 mr-1" />
                외부 링크
              </Badge>
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2">
            {post.title}
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBookmark}
          className={`opacity-0 group-hover:opacity-100 transition-all duration-300 ${
            isBookmarked ? 'text-purple-600 bg-purple-50' : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'
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
          <div className="flex items-center gap-1 hover:text-purple-600 transition-colors">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1 transition-all duration-300 ${
              isLiked ? 'text-pink-500 scale-110' : 'hover:text-pink-500 hover:scale-105'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{currentLikes}</span>
          </button>
          <div className="flex items-center gap-1 hover:text-purple-500 transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
