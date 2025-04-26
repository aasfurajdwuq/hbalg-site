import { growTogetherBadge, certifiedOrganicBadge, bestInAlgeriaBadge } from '@/assets/image-imports';
import { useLanguage } from '@/lib/i18n';

interface BadgeProps {
  type: 'growTogether' | 'certifiedOrganic' | 'bestInAlgeria';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const BadgeComponent: React.FC<BadgeProps> = ({ type, className = '', size = 'md' }) => {
  const { t } = useLanguage();
  
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const getBadgeInfo = () => {
    switch (type) {
      case 'growTogether':
        return {
          src: growTogetherBadge,
          alt: t('badge.growTogether'),
          title: t('badge.growTogether')
        };
      case 'certifiedOrganic':
        return {
          src: certifiedOrganicBadge,
          alt: 'Certified Organic',
          title: 'Certified Organic'
        };
      case 'bestInAlgeria':
        return {
          src: bestInAlgeriaBadge,
          alt: t('badge.algeria'),
          title: t('badge.algeria')
        };
      default:
        return {
          src: growTogetherBadge,
          alt: t('badge.growTogether'),
          title: t('badge.growTogether')
        };
    }
  };

  const { src, alt, title } = getBadgeInfo();

  return (
    <div className={`inline-block ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        title={title}
        className={`${sizeClasses[size]} object-contain`}
      />
    </div>
  );
};

export default BadgeComponent;