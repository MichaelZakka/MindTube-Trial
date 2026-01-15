'use client';

import { useState } from 'react';
import commentsData from '../comments.json';

export default function Home() {
  const [activeTab, setActiveTab] = useState('comments');
  const [activeCommentCategory, setActiveCommentCategory] = useState('positive');
  const [darkMode, setDarkMode] = useState(true);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [videoExpanded, setVideoExpanded] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [displayedCommentsCount, setDisplayedCommentsCount] = useState<{ [key: string]: number }>({});

  const totalComments = 732;
  const engagementRate = 87.5;

  // Video details data
  const videoDetails = {
    channelName: 'قناة التقنية',
    channelSubscribers: '1.2 مليون',
    videoDuration: '18:45',
    uploadDate: '15 أكتوبر 2024',
    views: '125,430',
    likes: '4,250',
    dislikes: '89',
    likeRatio: 97.9,
    description: `في هذا الفيديو الشامل، سنأخذك في رحلة كاملة لشراء آيباد في عام 2024. سنغطي جميع الموديلات المتاحة من آيباد 9 إلى آيباد برو، مع مقارنات مفصلة حول الأسعار والمميزات والاستخدامات المناسبة لكل موديل.

🎯 ما ستتعلمه في هذا الفيديو:
• مقارنة شاملة بين جميع موديلات الآيباد
• أفضل آيباد حسب الاستخدام (دراسة، رسم، ألعاب)
• نصائح مهمة حول التخزين والذاكرة
• معلومات عن Apple Pencil والتوافق
• نصائح الشراء والأسعار

📱 الموديلات المغطاة:
- iPad 9
- iPad 10
- iPad Air 5
- iPad Air 6
- iPad Pro 11"
- iPad Pro 12.9"

لا تنسى الاشتراك في القناة والضغط على زر الإعجاب إذا استفدت من المحتوى!`,
    tags: ['آيباد', 'iPad', 'Apple', 'تابلت', 'مراجعة', 'مقارنة', 'شراء', 'تكنولوجيا', 'iOS', 'Apple Pencil'],
    category: 'تكنولوجيا',
    language: 'العربية'
  };

  // New Comment Classifications for Comments Tab
  const commentCategories = {
    positive: {
      title: 'رأي إيجابي',
      icon: '😊',
      count: 245,
      percentage: 33.5,
      color: '#10b981',
      comments: [
        { text: 'شرح ممتاز ومختصر', likes: 89 },
        { text: 'معلومات قيمة ومفيدة', likes: 47 },
        { text: 'أفضل شرح شفته عن الآيبادات', likes: 31 },
        { text: 'اشتريت iPad Air 6 وممتاز', likes: 34 },
        { text: 'جبت iPad 9 وما ندمت', likes: 27 },
        { text: 'محتوى جميل ومفيد', likes: 42 },
        { text: 'الفيديو ساعدني اختار ايباد اير ٥', likes: 35 }
      ]
    },
    negative: {
      title: 'رأي سلبي',
      icon: '😟',
      count: 78,
      percentage: 10.7,
      color: '#ef4444',
      comments: [
        { text: 'الكلام سريع جداً', likes: 54 },
        { text: 'ما ذكرت موضوع البطارية', likes: 36 },
        { text: 'بطارية iPad Air 6 سيئة جداً', likes: 28 },
        { text: 'ندمان على شراء iPad 10', likes: 15 },
        { text: 'iPad 9 يسخن كثير', likes: 19 }
      ]
    },
    personal: {
      title: 'أسئلة شخصية',
      icon: '👤',
      count: 156,
      percentage: 21.3,
      color: '#8b5cf6',
      comments: [
        { text: 'أنا طالب طب، أي آيباد تنصحني؟', likes: 45 },
        { text: 'ميزانيتي 500 دولار، وش الأفضل؟', likes: 38 },
        { text: 'أبغى آيباد للرسم والتصميم', likes: 32 },
        { text: 'محتاج آيباد يستمر معي 6 سنوات', likes: 28 },
        { text: 'أنا لاعب ببجي، وش تنصحني؟', likes: 24 }
      ]
    },
    content: {
      title: 'أسئلة متعلقة بالمحتوى',
      icon: '📝',
      count: 187,
      percentage: 25.5,
      color: '#3b82f6',
      comments: [
        { text: 'هل 64 جيجا تكفي للجامعة؟', likes: 45 },
        { text: 'هل آيباد 9 يدعم iOS 18؟', likes: 32 },
        { text: 'ايباد اير 6 يدعم 90 فريم؟', likes: 24 },
        { text: 'iPad Air 5 vs iPad Air 6 - أيهما أفضل؟', likes: 35 },
        { text: 'كم سعر ايباد آير 5؟', likes: 28 },
        { text: 'أي قلم يعمل مع أي آيباد؟', likes: 22 }
      ]
    },
    suggestions: {
      title: 'اقتراحات',
      icon: '💡',
      count: 66,
      percentage: 9.0,
      color: '#f59e0b',
      comments: [
        { text: 'ياريت فيديو عن البطارية', likes: 42 },
        { text: 'عايز شرح Apple Pencil وأنواعه', likes: 35 },
        { text: 'فيديو عن الكيبوردات وأنواعها', likes: 28 },
        { text: 'شرح مقارنة بين تابلتات سامسونج وآيباد', likes: 25 },
        { text: 'ياريت فيديو عن واقيات الشاشة', likes: 18 }
      ]
    }
  };

  // Video ideas based on comments
  const commentBasedIdeas = [
    {
      id: 1,
      title: 'مقارنة عمر البطارية - كل الآيبادات',
      description: 'اختبارات حقيقية لعمر بطارية كل موديل - مطلوب بشدة من التعليقات',
      frequency: 42,
      source: 'التعليقات'
    },
    {
      id: 2,
      title: 'دليل شامل لـ Apple Pencil - كل الإصدارات',
      description: 'شرح مفصل لجميع أقلام آبل والتوافق - كثير من الأسئلة حوله',
      frequency: 38,
      source: 'التعليقات'
    },
    {
      id: 3,
      title: 'دليل التخزين: 64 vs 128 vs 256 جيجا',
      description: 'أي حجم مناسب للجامعة؟ - أكثر سؤال متكرر',
      frequency: 35,
      source: 'التعليقات'
    },
    {
      id: 4,
      title: 'iPad Air 5 vs iPad Air 6 - مقارنة شاملة',
      description: 'مقارنة مفصلة بين الجيلين - طلب متكرر جداً',
      frequency: 32,
      source: 'التعليقات'
    },
    {
      id: 5,
      title: 'أفضل آيباد لطلاب الطب',
      description: 'جهاز يستمر 6 سنوات للدراسات الطبية',
      frequency: 24,
      source: 'التعليقات'
    }
  ];

  // Trending ideas
  const trendingIdeas = [
    {
      id: 1,
      title: 'أفضل آيباد للعب ببجي موبايل 90 فريم',
      description: 'موضوع تريندي - دعم 90 فريم وأفضل أداء للألعاب',
      trending: true
    },
    {
      id: 2,
      title: 'آيباد ضد سامسونج Galaxy Tab - مقارنة شاملة',
      description: 'مقارنة مباشرة للاستخدام الجامعي والدراسي',
      trending: true
    },
    {
      id: 3,
      title: 'شرح ميزات iOS 18 للآيباد',
      description: 'Math Notes وميزات الذكاء الاصطناعي الجديدة',
      trending: true
    },
    {
      id: 4,
      title: 'مقارنة الكيبوردات - Magic Keyboard والبدائل',
      description: 'أفضل كيبورد ودعم اللغة العربية',
      trending: true
    },
    {
      id: 5,
      title: 'واقيات الشاشة: Paper-like vs الزجاج',
      description: 'أفضل حماية للشاشة حسب الاستخدام',
      trending: true
    }
  ];

  // Most repeated topics
  const repeatedTopics = [
    { name: 'مساحة التخزين (64 vs 128 vs 256)', mentions: 87, percentage: 11.9, trend: 'up' },
    { name: 'iPad Air 5 vs iPad Air 6', mentions: 76, percentage: 10.4, trend: 'up' },
    { name: 'Apple Pencil - التوافق والأنواع', mentions: 68, percentage: 9.3, trend: 'stable' },
    { name: 'ببجي موبايل - دعم 90 فريم', mentions: 54, percentage: 7.4, trend: 'up' },
    { name: 'عمر iPad 9 والتحديثات', mentions: 48, percentage: 6.6, trend: 'down' },
    { name: 'عمر البطارية', mentions: 42, percentage: 5.7, trend: 'up' },
    { name: 'سرعة الشرح في الفيديو', mentions: 38, percentage: 5.2, trend: 'stable' },
    { name: 'مقارنات الأسعار', mentions: 35, percentage: 4.8, trend: 'stable' },
    { name: 'iPad 10 vs iPad Air 5', mentions: 32, percentage: 4.4, trend: 'up' },
    { name: 'مقاطعة Apple', mentions: 21, percentage: 2.9, trend: 'down' }
  ];

  // Word cloud data
  const wordCloudData = [
    { word: 'iPad Air 5', count: 89, type: 'product', color: '#3b82f6' },
    { word: 'iPad Air 6', count: 76, type: 'product', color: '#3b82f6' },
    { word: 'دراسة', count: 124, type: 'usecase', color: '#10b981' },
    { word: 'جامعة', count: 98, type: 'usecase', color: '#10b981' },
    { word: 'بطارية', count: 67, type: 'concern', color: '#ef4444' },
    { word: 'تخزين', count: 87, type: 'feature', color: '#8b5cf6' },
    { word: 'قلم', count: 71, type: 'accessory', color: '#f59e0b' },
    { word: 'سعر', count: 93, type: 'question', color: '#06b6d4' },
    { word: 'iPad 9', count: 82, type: 'product', color: '#3b82f6' },
    { word: 'iPad 10', count: 56, type: 'product', color: '#3b82f6' },
    { word: 'Galaxy Tab', count: 43, type: 'product', color: '#84cc16' },
    { word: 'ببجي', count: 54, type: 'usecase', color: '#10b981' },
    { word: '90 فريم', count: 38, type: 'feature', color: '#8b5cf6' },
    { word: 'شاشة', count: 45, type: 'feature', color: '#8b5cf6' },
    { word: 'معالج', count: 34, type: 'feature', color: '#8b5cf6' },
    { word: 'iOS 18', count: 41, type: 'feature', color: '#8b5cf6' },
    { word: 'تحديثات', count: 52, type: 'concern', color: '#ef4444' },
    { word: 'كيبورد', count: 29, type: 'accessory', color: '#f59e0b' },
    { word: 'طب', count: 24, type: 'usecase', color: '#10b981' },
    { word: 'رسم', count: 31, type: 'usecase', color: '#10b981' }
  ];

  // Audience insights
  const audienceProfiles = [
    { type: 'طلاب الجامعة', percentage: 42, count: 307 },
    { type: 'طلاب الطب', percentage: 12, count: 88 },
    { type: 'مصممين جرافيك', percentage: 8, count: 59 },
    { type: 'لاعبين', percentage: 15, count: 110 },
    { type: 'ميزانية محدودة', percentage: 23, count: 168 }
  ];

  const sentimentData = {
    positive: 64,
    neutral: 28,
    negative: 8
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#64748b';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔥';
      case 'medium': return '⚡';
      case 'low': return '💡';
      default: return '●';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      case 'stable': return '→';
      default: return '→';
    }
  };

  // Function to get comments for a category (incremental loading)
  const getDisplayedComments = (categoryKey: string, category: any) => {
    const baseComments = category.comments;
    const currentCount = displayedCommentsCount[categoryKey] || baseComments.length;
    
    // If we're showing more than base comments, generate additional ones
    if (currentCount > baseComments.length) {
      const additionalComments = [];
      
      // Sample variations for each category type
      const variations: { [key: string]: string[] } = {
        positive: [
          'شكراً على الشرح الوافي',
          'محتوى رائع ومفيد جداً',
          'استفدت كثير من الفيديو',
          'شرح واضح ومفصل',
          'أفضل فيديو عن الآيباد',
          'معلومات دقيقة ومفيدة',
          'شكراً على المجهود',
          'ممتاز جداً',
          'شرح مفيد للغاية',
          'أشكرك على المحتوى',
          'محتوى عالي الجودة',
          'شرح شامل ومفيد',
          'استفدت كثيراً',
          'معلومات قيمة',
          'شكراً جزيلاً'
        ],
        negative: [
          'الشرح يحتاج تفصيل أكثر',
          'ما وضحت بعض النقاط المهمة',
          'المحتوى سريع شوي',
          'ناقص معلومات عن البطارية',
          'ما ذكرت الأسعار الحالية',
          'الشرح غير واضح',
          'ناقص تفاصيل مهمة',
          'المحتوى سطحي',
          'ما كفى الشرح',
          'ناقص أمثلة عملية'
        ],
        personal: [
          'أنا طالب هندسة، وش تنصحني؟',
          'ميزانيتي محدودة، وش الأفضل؟',
          'أحتاج آيباد للبرمجة',
          'أنا مصور، أي موديل مناسب؟',
          'أحتاج آيباد للدراسة فقط',
          'أنا طالب طب، وش الأفضل؟',
          'ميزانيتي 300 دولار',
          'أحتاج آيباد للرسم',
          'أنا مطور تطبيقات',
          'أحتاج آيباد للألعاب'
        ],
        content: [
          'هل يدعم Apple Pencil 2؟',
          'كم عمر البطارية؟',
          'هل يدعم 5G؟',
          'ما الفرق بين الموديلات؟',
          'أي إصدار iOS يدعم؟',
          'كم سعة التخزين؟',
          'هل يدعم الشحن السريع؟',
          'ما سرعة المعالج؟',
          'هل يدعم Wi-Fi 6؟',
          'كم حجم الشاشة؟'
        ],
        suggestions: [
          'فيديو عن الإكسسوارات',
          'مقارنة مع سامسونج',
          'شرح عن iOS 18',
          'فيديو عن الكيبوردات',
          'دليل شامل للشراء',
          'فيديو عن واقيات الشاشة',
          'مقارنة الأسعار',
          'فيديو عن البطارية',
          'شرح عن Apple Pencil',
          'مقارنة مع Huawei'
        ]
      };
      
      const categoryVariations = variations[categoryKey] || [];
      
      // Generate additional comments up to currentCount
      for (let i = 0; i < currentCount - baseComments.length; i++) {
        const variationIndex = i % categoryVariations.length;
        const baseComment = baseComments[i % baseComments.length];
        
        additionalComments.push({
          text: categoryVariations.length > 0 
            ? categoryVariations[variationIndex]
            : `${baseComment.text} - تعليق ${i + 1}`,
          likes: Math.max(1, Math.floor(Math.random() * 50) + 5)
        });
      }
      
      return [...baseComments, ...additionalComments];
    }
    return baseComments;
  };

  const loadMoreComments = (categoryKey: string, category: any) => {
    const baseCount = category.comments.length;
    const currentCount = displayedCommentsCount[categoryKey] || baseCount;
    const maxCount = category.count;
    const nextCount = Math.min(currentCount + 30, maxCount);
    
    setDisplayedCommentsCount(prev => ({
      ...prev,
      [categoryKey]: nextCount
    }));
  };

  const collapseComments = (categoryKey: string, category: any) => {
    setDisplayedCommentsCount(prev => {
      const newState = { ...prev };
      delete newState[categoryKey];
      return newState;
    });
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`} dir="rtl">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-top">
            <h1 className="page-title">تحليل محتوى الفيديو والتعليقات</h1>
          </div>
          {/* Video in Header */}
          <div className={`header-video-wrapper ${videoExpanded ? 'expanded' : ''}`}>
            <div className="header-video-container">
              {!videoExpanded ? (
                <div 
                  className="video-thumbnail"
                  onClick={() => setVideoExpanded(true)}
                >
                  <div className="video-thumbnail-overlay">
                    <div className="play-button-large">▶</div>
                  </div>
                  <img 
                    src={`https://img.youtube.com/vi/O_5nKvs8Ipo/maxresdefault.jpg`}
                    alt="Video thumbnail"
                    className="thumbnail-image"
                  />
                </div>
              ) : (
                <div className="expanded-video-container">
                  <button 
                    className="close-video-btn"
                    onClick={() => setVideoExpanded(false)}
                    aria-label="تصغير الفيديو"
                  >
                    ✕
                  </button>
                  <iframe
                    className="youtube-iframe-expanded"
                    src="https://www.youtube.com/embed/O_5nKvs8Ipo?autoplay=1"
                    title="دليلك الشامل لشراء آيباد في 2024"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
            <div className="video-metadata">
              <h2 className="video-title">دليلك الشامل لشراء آيباد في 2024</h2>
              <div className="video-info">
                <span className="info-item">📅 منذ 3 أشهر</span>
                <span className="info-item">👁️ 125,430 مشاهدة</span>
                <span className="info-item">👍 4,250 إعجاب</span>
              </div>
            </div>
          </div>
          
          {/* Quick Statistics */}
          <div className="quick-stats">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-value">{totalComments}</div>
                <div className="stat-label">إجمالي التعليقات</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-content">
                <div className="stat-value">3</div>
                <div className="stat-label">مواضيع رائجة</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-value">{engagementRate}%</div>
                <div className="stat-label">معدل التفاعل</div>
              </div>
            </div>
            <div className="stat-card positive">
              <div className="stat-icon">💬</div>
              <div className="stat-content">
                <div className="stat-value">{sentimentData.positive}%</div>
                <div className="stat-label">تعليقات إيجابية</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <div className="stat-value">مقارنات الآيباد</div>
                <div className="stat-label">الموضوع الأكثر طلباً</div>
              </div>
            </div>
            <div className="stat-card warning">
              <div className="stat-icon">⏱️</div>
              <div className="stat-content">
                <div className="stat-value">سريع قليلاً</div>
                <div className="stat-label">سرعة الشرح</div>
              </div>
            </div>
          </div>
        </div>
      </header>


      {/* Main Layout */}
      <div className="main-layout">
        {/* Analysis Dashboard */}
        <main className="analysis-section-full">
          {/* Main Tabs Navigation */}
          <nav className="main-tabs">
            <button 
              className={`main-tab ${activeTab === 'comments' ? 'active' : ''}`}
              onClick={() => setActiveTab('comments')}
            >
              💬 التعليقات
            </button>
            <button 
              className={`main-tab ${activeTab === 'analysis' ? 'active' : ''}`}
              onClick={() => setActiveTab('analysis')}
            >
              📊 تحليل الفيديو
            </button>
          </nav>

          {/* Tab 1: Comments */}
          {activeTab === 'comments' && (
            <section className="content-section">
              <h2 className="section-title">تصنيف التعليقات</h2>
              
              {/* Comment Category Tabs */}
              <div className="category-tabs">
                {Object.entries(commentCategories).map(([key, category]) => (
                  <button
                    key={key}
                    className={`category-tab ${activeCommentCategory === key ? 'active' : ''}`}
                    onClick={() => setActiveCommentCategory(key)}
                    style={{ 
                      borderColor: activeCommentCategory === key ? category.color : 'transparent',
                      backgroundColor: activeCommentCategory === key ? `${category.color}20` : 'transparent'
                    }}
                  >
                    <div className="tab-header">
                      <span className="tab-icon">{category.icon}</span>
                      <span className="tab-title">{category.title}</span>
                    </div>
                    <div className="tab-stats">
                      <span className="tab-badge" style={{ backgroundColor: category.color }}>
                        {category.count}
                      </span>
                      <span className="tab-percentage">{category.percentage}%</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Category Content */}
              <div className="category-content">
                {Object.entries(commentCategories).map(([key, category]) => (
                  activeCommentCategory === key && (
                    <div key={key} className="category-details">
                      <div className="category-header">
                        <div className="category-title-row">
                          <span className="category-icon">{category.icon}</span>
                          <h3>{category.title}</h3>
                        </div>
                        <div className="category-stats">
                          <span className="stat-badge">{category.count} تعليق</span>
                          <span className="stat-badge">{category.percentage}%</span>
                        </div>
                      </div>

                      <div className="comments-list">
                        {getDisplayedComments(key, category).map((comment: { text: string; likes: number }, idx: number) => (
                          <div key={idx} className="comment-card" style={{ animationDelay: `${idx * 0.05}s` }}>
                            <div className="comment-content">
                              <p className="comment-text">{comment.text}</p>
                              <div className="comment-meta">
                                <span className="likes-badge">👍 {comment.likes}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="comments-buttons">
                        {(() => {
                          const currentCount = displayedCommentsCount[key] || category.comments.length;
                          const remaining = category.count - currentCount;
                          const canLoadMore = remaining > 0;
                          const isExpanded = currentCount > category.comments.length;
                          const nextBatch = Math.min(30, remaining);
                          
                          return (
                            <>
                              {isExpanded && (
                                <button 
                                  className="collapse-btn"
                                  onClick={() => collapseComments(key, category)}
                                >
                                  تصغير إلى التعليقات الافتراضية
                                </button>
                              )}
                              {canLoadMore && (
                                <button 
                                  className="view-all-btn"
                                  onClick={() => loadMoreComments(key, category)}
                                >
                                  عرض {nextBatch} تعليق إضافي ({currentCount} من {category.count})
                                </button>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Tab 2: Video Analysis */}
          {activeTab === 'analysis' && (
            <section className="content-section">
              <h2 className="section-title">تحليل الفيديو</h2>
              
              {/* Sub-section 1: Video Ideas Based on Comments */}
              <div className="analysis-subsection">
                <h3 className="subsection-title">
                  <span className="subsection-icon">💬</span>
                  اقتراح أفكار فيديوهات بناءً على التعليقات
                </h3>
                <div className="ideas-list">
                  {commentBasedIdeas.map((idea, idx) => (
                    <div key={idea.id} className="idea-card-simple" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <div className="idea-number">{idea.id}</div>
                      <div className="idea-content">
                        <h4 className="idea-title">{idea.title}</h4>
                        <p className="idea-description">{idea.description}</p>
                      </div>
                      <div className="idea-frequency">
                        <span className="frequency-count">{idea.frequency}</span>
                        <span className="frequency-label">طلب</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-section 2: Trending Ideas */}
              <div className="analysis-subsection">
                <h3 className="subsection-title">
                  <span className="subsection-icon">🔥</span>
                  اقتراح أفكار تريندي
                </h3>
                <div className="trending-list">
                  {trendingIdeas.map((idea, idx) => (
                    <div key={idea.id} className="trending-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <div className="trending-badge">🔥 تريند</div>
                      <h4 className="trending-title">{idea.title}</h4>
                      <p className="trending-description">{idea.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-section 3: Most Discussed Topics */}
              <div className="analysis-subsection">
                <h3 className="subsection-title">
                  <span className="subsection-icon">📊</span>
                  أكثر المواضيع تم التحدث عنها في التعليقات
                </h3>
                <div className="topics-list">
                  {repeatedTopics.map((topic, idx) => (
                    <div key={idx} className="topic-item" style={{ animationDelay: `${idx * 0.05}s` }}>
                      <div className="topic-rank">{idx + 1}</div>
                      <div className="topic-content">
                        <div className="topic-header">
                          <h4 className="topic-name">{topic.name}</h4>
                          <span 
                            className={`trend-indicator ${topic.trend}`}
                            title={
                              topic.trend === 'up' ? 'في تزايد' :
                              topic.trend === 'stable' ? 'مستقر' : 'في تناقص'
                            }
                          >
                            {getTrendIcon(topic.trend)}
                          </span>
                        </div>
                        <div className="topic-stats">
                          <span className="mentions">{topic.mentions} إشارة</span>
                          <span className="percentage">{topic.percentage}%</span>
                        </div>
                        <div className="topic-bar">
                          <div 
                            className="topic-fill"
                            style={{ width: `${topic.percentage * 8}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-section 4: Word Cloud */}
              <div className="analysis-subsection">
                <h3 className="subsection-title">
                  <span className="subsection-icon">☁️</span>
                  مخطط WordCloud
                </h3>
                <div className="word-cloud">
                  {wordCloudData.map((item, idx) => {
                    const fontSize = Math.max(14, Math.min(48, item.count / 3));
                    return (
                      <button
                        key={idx}
                        className={`word-item ${selectedWord === item.word ? 'selected' : ''}`}
                        style={{ 
                          fontSize: `${fontSize}px`,
                          color: item.color,
                          opacity: selectedWord && selectedWord !== item.word ? 0.4 : 1
                        }}
                        onClick={() => setSelectedWord(selectedWord === item.word ? null : item.word)}
                        title={`${item.count} إشارة`}
                      >
                        {item.word}
                      </button>
                    );
                  })}
                </div>
                {selectedWord && (
                  <div className="word-details">
                    <p>
                      <strong>{selectedWord}</strong> تم ذكرها {
                        wordCloudData.find(w => w.word === selectedWord)?.count
                      } مرة في التعليقات
                    </p>
                  </div>
                )}
                <div className="word-cloud-legend">
                  <div className="legend-item"><span style={{ background: '#3b82f6' }}></span> منتجات</div>
                  <div className="legend-item"><span style={{ background: '#10b981' }}></span> استخدامات</div>
                  <div className="legend-item"><span style={{ background: '#ef4444' }}></span> مخاوف</div>
                  <div className="legend-item"><span style={{ background: '#8b5cf6' }}></span> مميزات</div>
                  <div className="legend-item"><span style={{ background: '#f59e0b' }}></span> إكسسوارات</div>
                  <div className="legend-item"><span style={{ background: '#06b6d4' }}></span> أسئلة</div>
                </div>
              </div>
            </section>
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>أدوات التصدير</h4>
            <div className="export-buttons">
              <button className="export-btn">📄 تصدير PDF</button>
              <button className="export-btn">📊 تصدير Excel</button>
              <button className="export-btn">🖼️ تصدير الرسوم</button>
            </div>
          </div>
          <div className="footer-section">
            <h4>آخر تحديث</h4>
            <p>15 يناير 2026 - 3:45 مساءً</p>
            <button className="refresh-btn">🔄 تحديث البيانات</button>
          </div>
          <div className="footer-section">
            <h4>مشاركة التحليل</h4>
            <button className="share-btn">🔗 نسخ الرابط</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
