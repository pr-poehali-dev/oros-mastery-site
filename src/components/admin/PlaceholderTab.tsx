import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface PlaceholderTabProps {
  title: string;
  description: string;
  iconName: string;
  color: string;
}

const PlaceholderTab = ({ title, description, iconName, color }: PlaceholderTabProps) => {
  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className={`text-2xl text-white flex items-center gap-2`}>
          <Icon name={iconName as any} size={24} className={`text-${color}-400`} />
          {title}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${color}-500/20 mb-4`}>
            <Icon name="Construction" size={32} className={`text-${color}-400`} />
          </div>
          <p className="text-gray-400 mb-2">Раздел в разработке</p>
          <p className="text-sm text-gray-500">
            Функционал управления {title.toLowerCase()} будет добавлен позже
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceholderTab;
