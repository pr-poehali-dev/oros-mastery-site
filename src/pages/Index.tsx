import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const programs = [
    {
      title: 'Базовый курс',
      duration: '2 месяца',
      lessons: '16 занятий',
      price: '25 000 ₽',
      features: ['Основы ораторского искусства', 'Работа с дыханием и голосом', 'Уверенность на публике', 'Практические выступления'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Продвинутый курс',
      duration: '3 месяца',
      lessons: '24 занятия',
      price: '45 000 ₽',
      features: ['Продвинутые техники убеждения', 'Работа с аудиторией', 'Импровизация', 'Подготовка презентаций', 'Видеоанализ выступлений'],
      gradient: 'from-pink-500 to-orange-500',
      popular: true
    },
    {
      title: 'Индивидуальный',
      duration: 'Гибкий график',
      lessons: '12 занятий',
      price: '60 000 ₽',
      features: ['Персональная программа', 'Работа 1 на 1', 'Гибкое расписание', 'Специализированные техники'],
      gradient: 'from-orange-500 to-blue-500'
    }
  ];

  const teachers = [
    {
      name: 'Анна Волкова',
      position: 'Основатель школы',
      experience: '15 лет опыта',
      description: 'Преподаватель ораторского мастерства, тренер по публичным выступлениям, автор курса "Искусство убеждения"',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/0367211d-ec5f-4790-881a-79f629bca1a5.jpg'
    },
    {
      name: 'Дмитрий Соколов',
      position: 'Преподаватель',
      experience: '10 лет опыта',
      description: 'Актёр театра и кино, специалист по технике речи и сценическому движению',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/dbaa532e-f1e8-43ee-b27c-f4f86279408d.jpg'
    }
  ];

  const testimonials = [
    {
      name: 'Елена Петрова',
      role: 'Менеджер по продажам',
      rating: 5,
      text: 'После курса я стала намного увереннее выступать перед клиентами. Продажи выросли на 40%!',
      date: '2 месяца назад'
    },
    {
      name: 'Михаил Иванов',
      role: 'Предприниматель',
      rating: 5,
      text: 'Отличные преподаватели и атмосфера! Научился держаться на публике и убедительно презентовать свои идеи.',
      date: '1 месяц назад'
    },
    {
      name: 'Ольга Смирнова',
      role: 'HR-директор',
      rating: 5,
      text: 'Рекомендую всем, кто хочет развить навыки публичных выступлений. Очень практичный курс!',
      date: '3 недели назад'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        
        <div className="container relative z-10 px-4 py-20 text-center text-white animate-fade-in">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm px-4 py-2">
            🎤 Курсы ораторского мастерства в Москве
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Научись говорить так,<br />чтобы тебя слушали
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Преодолей страх публичных выступлений и стань уверенным оратором всего за 2 месяца
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-6 h-auto font-semibold shadow-2xl transform hover:scale-105 transition-all"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Записаться на курс
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-6 h-auto font-semibold backdrop-blur-sm transform hover:scale-105 transition-all"
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Узнать больше
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-slide-up">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-white/90">Выпускников</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-white/90">Лет опыта</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold mb-2">4.9</div>
              <div className="text-white/90">Средний рейтинг</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={40} className="text-white/70" />
        </div>
      </section>

      <section id="programs" className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="container px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">Наши программы</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Выберите свой курс</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Программы разработаны для разных уровней подготовки
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {programs.map((program, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-scale-in ${program.popular ? 'border-pink-400 shadow-xl' : 'border-gray-200'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {program.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0">
                      Популярный
                    </Badge>
                  </div>
                )}
                
                <div className={`h-3 bg-gradient-to-r ${program.gradient}`}></div>
                
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">{program.title}</CardTitle>
                  <CardDescription className="text-lg">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        {program.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="BookOpen" size={16} />
                        {program.lessons}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-6">
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {program.price}
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full bg-gradient-to-r ${program.gradient} text-white border-0 hover:opacity-90 font-semibold`}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Записаться
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="teachers" className="py-24 bg-white">
        <div className="container px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200">Наша команда</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Преподаватели</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Опытные специалисты с практическим опытом
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {teachers.map((teacher, index) => (
              <Card 
                key={index} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                  <img 
                    src={teacher.image} 
                    alt={teacher.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <CardHeader>
                  <CardTitle className="text-2xl">{teacher.name}</CardTitle>
                  <CardDescription className="text-base">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name="Briefcase" size={16} />
                      {teacher.position}
                    </div>
                    <div className="flex items-center gap-2 text-purple-600 font-medium">
                      <Icon name="Award" size={16} />
                      {teacher.experience}
                    </div>
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{teacher.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24 bg-gradient-to-b from-purple-50 to-white">
        <div className="container px-4">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 bg-pink-100 text-pink-700 border-pink-200">Отзывы</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Что говорят наши студенты</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Реальные истории успеха выпускников
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 border-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <CardTitle className="text-lg mb-1">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{testimonial.text}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    {testimonial.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        
        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">Контакты</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Запишитесь на курс</h2>
              <p className="text-xl font-light">
                Оставьте заявку и мы свяжемся с вами в течение часа
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Свяжитесь с нами</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Icon name="MapPin" size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Адрес</div>
                      <div className="text-white/80">Москва, ул. Тверская, 15</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Icon name="Phone" size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Телефон</div>
                      <div className="text-white/80">+7 (495) 123-45-67</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Icon name="Mail" size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <div className="text-white/80">info@oratory-school.ru</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Icon name="Clock" size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Время работы</div>
                      <div className="text-white/80">Пн-Вс: 10:00 - 21:00</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <CardTitle className="text-2xl">Оставьте заявку</CardTitle>
                  <CardDescription>Мы перезвоним в течение часа</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Ваше имя"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="border-2"
                      />
                    </div>
                    
                    <div>
                      <Input
                        type="tel"
                        placeholder="Телефон"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="border-2"
                      />
                    </div>
                    
                    <div>
                      <Textarea
                        placeholder="Ваше сообщение (необязательно)"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="min-h-[100px] border-2"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-semibold text-lg py-6 h-auto"
                    >
                      Отправить заявку
                      <Icon name="Send" className="ml-2" size={18} />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Школа Ораторства
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Курсы ораторского мастерства в Москве для всех, кто хочет научиться говорить уверенно и убедительно
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Навигация</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#programs" className="hover:text-pink-400 transition-colors flex items-center gap-2">
                    <Icon name="ChevronRight" size={16} />
                    Программы
                  </a>
                </li>
                <li>
                  <a href="#teachers" className="hover:text-pink-400 transition-colors flex items-center gap-2">
                    <Icon name="ChevronRight" size={16} />
                    Преподаватели
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:text-pink-400 transition-colors flex items-center gap-2">
                    <Icon name="ChevronRight" size={16} />
                    Отзывы
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-pink-400 transition-colors flex items-center gap-2">
                    <Icon name="ChevronRight" size={16} />
                    Контакты
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Москва, ул. Тверская, 15
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@oratory-school.ru
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Школа Ораторства. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
