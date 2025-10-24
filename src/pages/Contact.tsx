import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Сообщение отправлено!',
        description: 'Мы получили ваше сообщение и свяжемся с вами в ближайшее время.',
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: 'Mail',
      title: 'Email',
      value: 'info@rickandmorty-fan.ru',
      description: 'Для общих вопросов и предложений',
      link: 'mailto:info@rickandmorty-fan.ru'
    },
    {
      icon: 'MessageCircle',
      title: 'Telegram',
      value: 'Наше сообщество',
      description: 'Присоединяйтесь к обсуждениям',
      link: 'https://t.me/+QgiLIa1gFRY4Y2Iy'
    },
    {
      icon: 'Github',
      title: 'GitHub',
      value: 'Open Source',
      description: 'Код проекта и вклад в развитие',
      link: '#'
    },
    {
      icon: 'Twitter',
      title: 'Twitter/X',
      value: '@RickMortyRU',
      description: 'Новости и обновления',
      link: '#'
    }
  ];

  const faqItems = [
    {
      question: 'Как связаться с администрацией сайта?',
      answer: 'Вы можете написать нам на email info@rickandmorty-fan.ru или воспользоваться формой обратной связи на этой странице. Мы отвечаем на все сообщения в течение 24-48 часов.'
    },
    {
      question: 'Как предложить статью для публикации в блоге?',
      answer: 'Отправьте нам черновик статьи или развернутое описание темы на email с пометкой "Предложение статьи". Укажите тему, основные тезисы и почему эта статья будет интересна нашим читателям. Наши редакторы рассмотрят предложение и свяжутся с вами.'
    },
    {
      question: 'Как сообщить об ошибке на сайте?',
      answer: 'Воспользуйтесь формой обратной связи, указав в теме "Ошибка на сайте". Опишите проблему максимально подробно: на какой странице обнаружена ошибка, что именно работает неправильно, какой браузер вы используете. Это поможет нам быстрее исправить проблему.'
    },
    {
      question: 'Можно ли стать автором на вашем сайте?',
      answer: 'Да! Мы всегда рады новым авторам. Напишите нам с примерами своих работ или темами, которые вы хотели бы осветить. Мы ищем людей, способных создавать качественный аналитический контент о Rick and Morty.'
    },
    {
      question: 'Как попасть в команду модераторов Telegram-сообщества?',
      answer: 'Активно участвуйте в обсуждениях, помогайте новичкам и следите за соблюдением правил сообщества. Модераторов мы выбираем из числа наиболее активных и дружелюбных участников. Также можете написать нам о своем желании помогать сообществу.'
    },
    {
      question: 'Есть ли возможность рекламы на сайте?',
      answer: 'По вопросам рекламы и партнерства пишите на info@rickandmorty-fan.ru с темой "Реклама". Мы рассмотрим ваше предложение и предоставим медиакит с информацией о посещаемости и возможных форматах размещения.'
    },
    {
      question: 'Как получить помощь по использованию сайта?',
      answer: 'Большинство вопросов можно решить через FAQ на странице "О сайте". Для более сложных вопросов используйте форму обратной связи или напишите в наше Telegram-сообщество, где активные участники с радостью помогут.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      <div className="pt-20">
        <Breadcrumbs />
      </div>
      
      <SEO
        title="Контакты"
        description="Свяжитесь с командой Rick and Morty Fan Site. Email, Telegram-сообщество, форма обратной связи. Мы всегда рады ответить на ваши вопросы и предложения."
        keywords="Rick and Morty, контакты, связаться, email, telegram, обратная связь, поддержка"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 flex items-center justify-center animate-pulse">
              <Icon name="MessageSquare" size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 mb-6">
            Свяжитесь с нами
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Есть вопросы, предложения или хотите поделиться своей теорией о Rick and Morty? 
            Мы всегда рады услышать от вас! Выберите удобный способ связи.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-cyan-500/30">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Icon name="Send" size={32} className="text-cyan-400" />
                  Форма обратной связи
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                      Ваше имя
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Введите ваше имя"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
                      Сообщение
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Напишите ваше сообщение..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold py-6"
                  >
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader" size={20} className="mr-2 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={20} className="mr-2" />
                        Отправить сообщение
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <p className="text-sm text-gray-300 flex items-start gap-2">
                    <Icon name="Info" size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>
                      Мы отвечаем на все сообщения в течение 24-48 часов. Пожалуйста, проверьте папку "Спам", 
                      если не получили ответ.
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Methods */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Icon name="Phone" size={28} className="text-cyan-400" />
              Способы связи
            </h2>
            {contactMethods.map((method, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 transition-all group">
                <CardContent className="p-6">
                  <a 
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : undefined}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors flex-shrink-0">
                        <Icon name={method.icon as any} size={24} className="text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{method.title}</h3>
                        <p className="text-cyan-400 text-sm mb-1 break-all">{method.value}</p>
                        <p className="text-gray-400 text-xs">{method.description}</p>
                      </div>
                    </div>
                  </a>
                </CardContent>
              </Card>
            ))}

            {/* Quick Links */}
            <Card className="bg-gradient-to-r from-cyan-900/20 to-green-900/20 border-cyan-500/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Icon name="Link" size={20} className="text-cyan-400" />
                  Полезные ссылки
                </h3>
                <div className="space-y-3">
                  <a href="/about" className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                    <Icon name="Info" size={16} />
                    <span className="text-sm">О сайте</span>
                  </a>
                  <a href="/blog" className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                    <Icon name="BookOpen" size={16} />
                    <span className="text-sm">Блог</span>
                  </a>
                  <a href="/episodes" className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                    <Icon name="Film" size={16} />
                    <span className="text-sm">Эпизоды</span>
                  </a>
                  <a href="/theories" className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                    <Icon name="Lightbulb" size={16} />
                    <span className="text-sm">Теории</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Social Media */}
        <Card className="bg-gray-800/50 border-gray-700 mb-16">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Icon name="Share2" size={32} className="text-cyan-400" />
              Мы в социальных сетях
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a 
                href="https://t.me/+QgiLIa1gFRY4Y2Iy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-gray-900/50 rounded-lg hover:bg-cyan-500/10 border border-gray-700 hover:border-cyan-500/50 transition-all group"
              >
                <Icon name="MessageCircle" size={40} className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-white font-semibold">Telegram</span>
                <span className="text-gray-400 text-sm mt-1">Основное сообщество</span>
              </a>

              <a 
                href="#" 
                className="flex flex-col items-center p-6 bg-gray-900/50 rounded-lg hover:bg-blue-500/10 border border-gray-700 hover:border-blue-500/50 transition-all group"
              >
                <Icon name="Twitter" size={40} className="text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-white font-semibold">Twitter/X</span>
                <span className="text-gray-400 text-sm mt-1">Новости и анонсы</span>
              </a>

              <a 
                href="#" 
                className="flex flex-col items-center p-6 bg-gray-900/50 rounded-lg hover:bg-red-500/10 border border-gray-700 hover:border-red-500/50 transition-all group"
              >
                <Icon name="Youtube" size={40} className="text-red-400 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-white font-semibold">YouTube</span>
                <span className="text-gray-400 text-sm mt-1">Видео-обзоры</span>
              </a>

              <a 
                href="#" 
                className="flex flex-col items-center p-6 bg-gray-900/50 rounded-lg hover:bg-purple-500/10 border border-gray-700 hover:border-purple-500/50 transition-all group"
              >
                <Icon name="Instagram" size={40} className="text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-white font-semibold">Instagram</span>
                <span className="text-gray-400 text-sm mt-1">Арты и мемы</span>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <div className="mb-16">
          <FAQ items={faqItems} title="Часто задаваемые вопросы о контактах" />
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-cyan-500/50">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <Icon name="Clock" size={32} className="text-cyan-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Время ответа</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Мы стараемся отвечать на все обращения в течение 24-48 часов. 
                    В выходные дни ответ может занять немного больше времени. 
                    Срочные вопросы лучше задавать в Telegram-сообществе.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-900/20 to-cyan-900/20 border-green-500/50">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <Icon name="Globe" size={32} className="text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">Языки</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Мы работаем преимущественно на русском языке, но также можем общаться 
                    на английском. Наша команда находится в России, работаем по московскому времени (UTC+3).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;