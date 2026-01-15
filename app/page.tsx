'use client';

import { useState } from 'react';
import commentsData from '../comments.json';

export default function Home() {
  const [activeTab, setActiveTab] = useState('questions');
  const [activeSection, setActiveSection] = useState('classifications');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const totalComments = 732;
  const engagementRate = 87.5;

  // Comment classifications
  const commentCategories = {
    questions: {
      title: 'أسئلة مباشرة',
      count: 156,
      percentage: 21.3,
      sentiment: 'neutral',
      color: '#3b82f6',
      comments: [
        { text: 'هل 64 جيجا تكفي للجامعة؟', priority: 'high', likes: 45 },
        { text: 'هل آيباد 9 يدعم iOS 18؟', priority: 'high', likes: 32 },
        { text: 'كم سعر ايباد آير 5؟', priority: 'medium', likes: 28 },
        { text: 'ايباد اير 6 يدعم 90 فريم؟', priority: 'high', likes: 24 },
        { text: 'هل الايباد نقدر نعمل فيه مكالمات؟', priority: 'low', likes: 12 }
      ]
    },
    comparisons: {
      title: 'طلبات مقارنة',
      count: 98,
      percentage: 13.4,
      sentiment: 'neutral',
      color: '#8b5cf6',
      comments: [
        { text: 'تنصحني ب Galaxy tap s9 plus او ايباد اير 5؟', priority: 'high', likes: 38 },
        { text: 'iPad Air 5 vs iPad Air 6 - أيهما أفضل؟', priority: 'high', likes: 35 },
        { text: 'ايباد 10 او ايباد اير 5؟', priority: 'high', likes: 29 },
        { text: 'iPad Pro 2020 vs iPad Air 5؟', priority: 'medium', likes: 22 },
        { text: 'سامسونج s9FE vs ايباد للدراسة؟', priority: 'high', likes: 19 }
      ]
    },
    suggestions: {
      title: 'اقتراحات محتوى',
      count: 67,
      percentage: 9.2,
      sentiment: 'positive',
      color: '#10b981',
      comments: [
        { text: 'ياريت فيديو عن البطارية', priority: 'high', likes: 42 },
        { text: 'عايز شرح Apple Pencil وأنواعه', priority: 'high', likes: 35 },
        { text: 'فيديو عن الكيبوردات وأنواعها', priority: 'medium', likes: 28 },
        { text: 'شرح مقارنة بين تابلتات سامسونج وآيباد', priority: 'high', likes: 25 },
        { text: 'ياريت فيديو عن واقيات الشاشة', priority: 'medium', likes: 18 }
      ]
    },
    feedback: {
      title: 'ملاحظات على الفيديو',
      count: 143,
      percentage: 19.5,
      sentiment: 'mixed',
      color: '#f59e0b',
      comments: [
        { text: 'شرح ممتاز ومختصر', priority: 'low', likes: 89, positive: true },
        { text: 'الكلام سريع جداً', priority: 'high', likes: 54, negative: true },
        { text: 'معلومات قيمة ومفيدة', priority: 'low', likes: 47, positive: true },
        { text: 'ما ذكرت موضوع البطارية', priority: 'high', likes: 36, negative: true },
        { text: 'أفضل شرح شفته عن الآيبادات', priority: 'low', likes: 31, positive: true }
      ]
    },
    technical: {
      title: 'مشاكل تقنية',
      count: 34,
      percentage: 4.6,
      sentiment: 'negative',
      color: '#ef4444',
      comments: [
        { text: 'بطارية iPad Air 6 سيئة جداً', priority: 'high', likes: 28 },
        { text: 'iPad 9 يسخن كثير', priority: 'medium', likes: 19 },
        { text: 'السماعة السلكية ما تشتغل على Air 5', priority: 'medium', likes: 12 },
        { text: 'المعالج يصير بطيء بعد التحديث', priority: 'high', likes: 15 },
        { text: 'الشحن بطيء جداً', priority: 'medium', likes: 9 }
      ]
    },
    prices: {
      title: 'استفسارات الأسعار',
      count: 89,
      percentage: 12.2,
      sentiment: 'neutral',
      color: '#06b6d4',
      comments: [
        { text: 'كم سعر ايباد اير 5 في السعودية؟', priority: 'medium', likes: 23 },
        { text: 'شكد سعر iPad 10 بالعراق؟', priority: 'medium', likes: 18 },
        { text: 'متى تنخفض الأسعار؟', priority: 'medium', likes: 16 },
        { text: 'سعر iPad Pro 2020 حالياً؟', priority: 'low', likes: 14 },
        { text: 'أسعار Apple Pencil؟', priority: 'low', likes: 11 }
      ]
    },
    purchases: {
      title: 'قرارات شراء',
      count: 112,
      percentage: 15.3,
      sentiment: 'positive',
      color: '#84cc16',
      comments: [
        { text: 'اشتريت iPad Air 6 وممتاز', priority: 'low', likes: 34, positive: true },
        { text: 'جبت iPad 9 وما ندمت', priority: 'low', likes: 27, positive: true },
        { text: 'اشتريت iPad 9 وخايف من التحديثات', priority: 'medium', likes: 22, negative: true },
        { text: 'قررت أخذ iPad Air 5 بعد الفيديو', priority: 'low', likes: 19, positive: true },
        { text: 'ندمان على شراء iPad 10', priority: 'medium', likes: 15, negative: true }
      ]
    },
    ethical: {
      title: 'مواضيع أخلاقية/سياسية',
      count: 33,
      percentage: 4.5,
      sentiment: 'negative',
      color: '#64748b',
      comments: [
        { text: 'قاطعو آبل - دعم فلسطين', priority: 'low', likes: 21 },
        { text: 'ما أشتري منتجات أمريكية', priority: 'low', likes: 14 },
        { text: 'اتقي الله - آبل مقاطعة', priority: 'low', likes: 8 },
        { text: 'كيف تتكلم عن المقاطعة وأنت تشرح آبل؟', priority: 'low', likes: 6 }
      ]
    }
  };

  // Trending video ideas
  const videoIdeas = [
    {
      id: 1,
      title: 'آيباد ضد سامسونج Galaxy Tab - مقارنة شاملة',
      description: 'مقارنة مباشرة للاستخدام الجامعي والدراسي',
      frequency: 42,
      priority: 'high',
      keywords: ['سامسونج', 'Galaxy Tab', 'مقارنة', 'دراسة'],
      audience: 'طلاب',
      category: 'مقارنات'
    },
    {
      id: 2,
      title: 'دليل شامل لـ Apple Pencil - كل الإصدارات',
      description: 'شرح مفصل لجميع أقلام آبل والتوافق',
      frequency: 38,
      priority: 'high',
      keywords: ['Apple Pencil', 'قلم', 'توافق'],
      audience: 'الجميع',
      category: 'شروحات'
    },
    {
      id: 3,
      title: 'أفضل آيباد للعب ببجي موبايل 90 فريم',
      description: 'تركيز على دعم 90 فريم وأفضل أداء للألعاب',
      frequency: 35,
      priority: 'high',
      keywords: ['ببجي', 'ألعاب', '90 فريم', 'أداء'],
      audience: 'لاعبين',
      category: 'أدلة شراء'
    },
    {
      id: 4,
      title: 'مقارنة عمر البطارية - كل الآيبادات',
      description: 'اختبارات حقيقية لعمر بطارية كل موديل',
      frequency: 32,
      priority: 'high',
      keywords: ['بطارية', 'عمر', 'مقارنة'],
      audience: 'الجميع',
      category: 'شروحات'
    },
    {
      id: 5,
      title: 'دليل التخزين: 64 vs 128 vs 256 جيجا',
      description: 'أي حجم مناسب للجامعة والاستخدام اليومي',
      frequency: 31,
      priority: 'high',
      keywords: ['تخزين', 'مساحة', 'جامعة'],
      audience: 'طلاب',
      category: 'أدلة شراء'
    },
    {
      id: 6,
      title: 'iPad Air 5 (256GB) vs iPad Air 6 (128GB)',
      description: 'مقارنة بنفس السعر - أيهما أفضل؟',
      frequency: 28,
      priority: 'high',
      keywords: ['Air 5', 'Air 6', 'مقارنة', 'سعر'],
      audience: 'ميزانية محدودة',
      category: 'مقارنات'
    },
    {
      id: 7,
      title: 'أفضل آيباد لطلاب الطب - 6 سنوات',
      description: 'جهاز طويل الأمد للدراسات الطبية',
      frequency: 24,
      priority: 'medium',
      keywords: ['طب', 'جامعة', 'دراسة', 'طويل الأمد'],
      audience: 'طلاب الطب',
      category: 'أدلة شراء'
    },
    {
      id: 8,
      title: 'شرح ميزات iOS 18 للآيباد',
      description: 'Math Notes وميزات الذكاء الاصطناعي',
      frequency: 22,
      priority: 'medium',
      keywords: ['iOS 18', 'تحديث', 'ميزات جديدة'],
      audience: 'الجميع',
      category: 'شروحات'
    },
    {
      id: 9,
      title: 'مقارنة الكيبوردات - Magic Keyboard والبدائل',
      description: 'أفضل كيبورد ودعم اللغة العربية',
      frequency: 19,
      priority: 'medium',
      keywords: ['كيبورد', 'Magic Keyboard', 'عربي'],
      audience: 'طلاب',
      category: 'إكسسوارات'
    },
    {
      id: 10,
      title: 'واقيات الشاشة: Paper-like vs الزجاج',
      description: 'أفضل حماية للشاشة حسب الاستخدام',
      frequency: 16,
      priority: 'medium',
      keywords: ['واقي شاشة', 'Paper-like', 'حماية'],
      audience: 'الجميع',
      category: 'إكسسوارات'
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

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`} dir="rtl">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-top">
            <h1 className="page-title">تحليل محتوى الفيديو والتعليقات</h1>
            <button 
              className="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="تبديل الوضع الداكن"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <div className="video-metadata">
            <h2 className="video-title">دليلك الشامل لشراء آيباد في 2024</h2>
            <div className="video-info">
              <span className="info-item">📅 منذ 3 أشهر</span>
              <span className="info-item">👁️ 125,430 مشاهدة</span>
              <span className="info-item">👍 4,250 إعجاب</span>
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
        {/* Right Column - Video Player */}
        <aside className="video-section">
          <div className="video-container">
            <iframe
              className="youtube-iframe"
              src="https://www.youtube.com/embed/O_5nKvs8Ipo"
              title="دليلك الشامل لشراء آيباد في 2024"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="video-details">
            <h3>معلومات الفيديو</h3>
            <div className="detail-item">
              <strong>القناة:</strong>
              <span>Tech Arabia</span>
            </div>
            <div className="detail-item">
              <strong>التصنيف:</strong>
              <span>تقنية، مراجعات</span>
            </div>
            <details className="video-description">
              <summary>وصف الفيديو</summary>
              <p>
                في هذا الفيديو نستعرض دليل شامل لشراء آيباد في 2024، نتحدث عن جميع الموديلات المتاحة
                من iPad 9 إلى iPad Pro M4، المقارنات، الأسعار، والاستخدامات المختلفة.
              </p>
            </details>
          </div>

          {/* Sentiment Overview */}
          <div className="sentiment-overview">
            <h3>تحليل المشاعر</h3>
            <div className="sentiment-bars">
              <div className="sentiment-bar">
                <div className="sentiment-label">
                  <span>😊 إيجابي</span>
                  <span>{sentimentData.positive}%</span>
                </div>
                <div className="sentiment-progress">
                  <div 
                    className="sentiment-fill positive" 
                    style={{ width: `${sentimentData.positive}%` }}
                  ></div>
                </div>
              </div>
              <div className="sentiment-bar">
                <div className="sentiment-label">
                  <span>😐 محايد</span>
                  <span>{sentimentData.neutral}%</span>
                </div>
                <div className="sentiment-progress">
                  <div 
                    className="sentiment-fill neutral" 
                    style={{ width: `${sentimentData.neutral}%` }}
                  ></div>
                </div>
              </div>
              <div className="sentiment-bar">
                <div className="sentiment-label">
                  <span>😟 سلبي</span>
                  <span>{sentimentData.negative}%</span>
                </div>
                <div className="sentiment-progress">
                  <div 
                    className="sentiment-fill negative" 
                    style={{ width: `${sentimentData.negative}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Left Column - Analysis Dashboard */}
        <main className="analysis-section">
          {/* Section Navigation */}
          <nav className="section-nav">
            <button 
              className={`nav-button ${activeSection === 'classifications' ? 'active' : ''}`}
              onClick={() => setActiveSection('classifications')}
            >
              📂 تصنيف التعليقات
            </button>
            <button 
              className={`nav-button ${activeSection === 'ideas' ? 'active' : ''}`}
              onClick={() => setActiveSection('ideas')}
            >
              💡 أفكار الفيديوهات
            </button>
            <button 
              className={`nav-button ${activeSection === 'topics' ? 'active' : ''}`}
              onClick={() => setActiveSection('topics')}
            >
              🔥 المواضيع الرائجة
            </button>
            <button 
              className={`nav-button ${activeSection === 'audience' ? 'active' : ''}`}
              onClick={() => setActiveSection('audience')}
            >
              👥 رؤى الجمهور
            </button>
          </nav>

          {/* Section 1: Comment Classifications */}
          {activeSection === 'classifications' && (
            <section className="content-section">
              <h2 className="section-title">تصنيف التعليقات</h2>
              
              <div className="category-tabs">
                {Object.entries(commentCategories).map(([key, category]) => (
                  <button
                    key={key}
                    className={`category-tab ${activeTab === key ? 'active' : ''}`}
                    onClick={() => setActiveTab(key)}
                    style={{ 
                      borderColor: activeTab === key ? category.color : 'transparent',
                      backgroundColor: activeTab === key ? `${category.color}15` : 'transparent'
                    }}
                  >
                    <div className="tab-header">
                      <span className="tab-title">{category.title}</span>
                      <span 
                        className="tab-badge"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.count}
                      </span>
                    </div>
                    <div className="tab-percentage">{category.percentage}%</div>
                  </button>
                ))}
              </div>

              <div className="category-content">
                {Object.entries(commentCategories).map(([key, category]) => (
                  activeTab === key && (
                    <div key={key} className="category-details">
                      <div className="category-header">
                        <h3>{category.title}</h3>
                        <div className="category-stats">
                          <span className="stat-badge">{category.count} تعليق</span>
                          <span className="stat-badge">{category.percentage}%</span>
                          <span className={`sentiment-badge ${category.sentiment}`}>
                            {category.sentiment === 'positive' && '😊 إيجابي'}
                            {category.sentiment === 'neutral' && '😐 محايد'}
                            {category.sentiment === 'negative' && '😟 سلبي'}
                            {category.sentiment === 'mixed' && '🔀 مختلط'}
                          </span>
                        </div>
                      </div>

                      <div className="comments-list">
                        {category.comments.map((comment, idx) => (
                          <div key={idx} className="comment-card">
                            <div className="comment-content">
                              <p className="comment-text">{comment.text}</p>
                              <div className="comment-meta">
                                <span 
                                  className="priority-badge"
                                  style={{ 
                                    backgroundColor: getPriorityColor(comment.priority),
                                    color: 'white'
                                  }}
                                >
                                  {getPriorityIcon(comment.priority)} أولوية {
                                    comment.priority === 'high' ? 'عالية' :
                                    comment.priority === 'medium' ? 'متوسطة' : 'منخفضة'
                                  }
                                </span>
                                <span className="likes-badge">👍 {comment.likes}</span>
                                {'positive' in comment && comment.positive && (
                                  <span className="feedback-badge positive">✓ إيجابي</span>
                                )}
                                {'negative' in comment && comment.negative && (
                                  <span className="feedback-badge negative">⚠ للمراجعة</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button className="view-all-btn">
                        عرض جميع التعليقات ({category.count})
                      </button>
                    </div>
                  )
                ))}
              </div>
            </section>
          )}

          {/* Section 2: Video Ideas */}
          {activeSection === 'ideas' && (
            <section className="content-section">
              <h2 className="section-title">أفكار فيديوهات رائجة</h2>
              <p className="section-description">
                أفكار محتوى مقترحة بناءً على طلبات المشاهدين وتحليل التعليقات
              </p>

              <div className="ideas-grid">
                {videoIdeas.map((idea) => (
                  <div key={idea.id} className="idea-card">
                    <div className="idea-header">
                      <span 
                        className="priority-indicator"
                        style={{ color: getPriorityColor(idea.priority) }}
                      >
                        {getPriorityIcon(idea.priority)}
                      </span>
                      <span className="idea-category">{idea.category}</span>
                    </div>
                    
                    <h3 className="idea-title">{idea.title}</h3>
                    <p className="idea-description">{idea.description}</p>
                    
                    <div className="idea-stats">
                      <div className="stat-item">
                        <span className="stat-label">طلبات:</span>
                        <span className="stat-value">{idea.frequency}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">الجمهور:</span>
                        <span className="stat-value">{idea.audience}</span>
                      </div>
                    </div>

                    <div className="idea-keywords">
                      {idea.keywords.map((keyword, idx) => (
                        <span key={idx} className="keyword-tag">{keyword}</span>
                      ))}
                    </div>

                    <div className="idea-actions">
                      <button className="action-btn primary">📅 إضافة للجدولة</button>
                      <button className="action-btn secondary">📝 ملاحظات</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 3: Repeated Topics */}
          {activeSection === 'topics' && (
            <section className="content-section">
              <h2 className="section-title">المواضيع الأكثر تكراراً</h2>
              
              {/* Word Cloud */}
              <div className="word-cloud-section">
                <h3 className="subsection-title">سحابة الكلمات</h3>
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
              </div>

              {/* Topics List */}
              <div className="topics-list">
                <h3 className="subsection-title">أكثر 10 مواضيع تكراراً</h3>
                {repeatedTopics.map((topic, idx) => (
                  <div key={idx} className="topic-item">
                    <div className="topic-rank">{idx + 1}</div>
                    <div className="topic-content">
                      <div className="topic-header">
                        <h4 className="topic-name">{topic.name}</h4>
                        <span 
                          className={`trend-indicator ${topic.trend}`}
                          title={
                            topic.trend === 'up' ? 'في تزايد' :
                            topic.trend === 'down' ? 'في تناقص' : 'مستقر'
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
            </section>
          )}

          {/* Section 4: Audience Insights */}
          {activeSection === 'audience' && (
            <section className="content-section">
              <h2 className="section-title">رؤى الجمهور</h2>
              
              {/* User Profiles */}
              <div className="audience-profiles">
                <h3 className="subsection-title">الملفات الشخصية للمتابعين</h3>
                <div className="profiles-grid">
                  {audienceProfiles.map((profile, idx) => (
                    <div key={idx} className="profile-card">
                      <div className="profile-icon">
                        {profile.type === 'طلاب الجامعة' && '🎓'}
                        {profile.type === 'طلاب الطب' && '⚕️'}
                        {profile.type === 'مصممين جرافيك' && '🎨'}
                        {profile.type === 'لاعبين' && '🎮'}
                        {profile.type === 'ميزانية محدودة' && '💰'}
                      </div>
                      <h4 className="profile-type">{profile.type}</h4>
                      <div className="profile-stats">
                        <div className="profile-percentage">{profile.percentage}%</div>
                        <div className="profile-count">{profile.count} متابع</div>
                      </div>
                      <div className="profile-bar">
                        <div 
                          className="profile-fill"
                          style={{ width: `${profile.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Recommendations */}
              <div className="recommendations">
                <h3 className="subsection-title">توصيات قابلة للتنفيذ</h3>
                
                <div className="recommendation-card">
                  <h4 className="recommendation-title">📅 جدولة المحتوى القادم</h4>
                  <ol className="recommendation-list">
                    <li>
                      <strong>الأسبوع القادم:</strong> فيديو مقارنة iPad vs Samsung - طلب عالي جداً (42 إشارة)
                    </li>
                    <li>
                      <strong>خلال أسبوعين:</strong> دليل شامل لـ Apple Pencil - مطلوب بشدة (38 إشارة)
                    </li>
                    <li>
                      <strong>خلال 3 أسابيع:</strong> أفضل آيباد للعب ببجي 90 فريم (35 إشارة)
                    </li>
                    <li>
                      <strong>الشهر القادم:</strong> مقارنة عمر البطارية - موضوع متكرر (32 إشارة)
                    </li>
                  </ol>
                </div>

                <div className="recommendation-card">
                  <h4 className="recommendation-title">💬 أولويات الرد على التعليقات</h4>
                  <ul className="recommendation-list">
                    <li>
                      <span className="priority-high">أولوية عالية:</span> 
                      الرد على أسئلة التخزين (87 سؤال) - يمكن عمل تعليق مثبت
                    </li>
                    <li>
                      <span className="priority-high">أولوية عالية:</span>
                      توضيح مشكلة بطارية iPad Air 6 (28 شكوى)
                    </li>
                    <li>
                      <span className="priority-medium">أولوية متوسطة:</span>
                      الرد على طلبات الأسعار - توجيه لمصادر موثوقة
                    </li>
                  </ul>
                </div>

                <div className="recommendation-card">
                  <h4 className="recommendation-title">🎯 تحسينات مقترحة</h4>
                  <ul className="recommendation-list">
                    <li>
                      <span className="improvement-tag">سرعة الفيديو:</span>
                      38 تعليق ذكروا أن الشرح سريع - يُنصح بتقليل السرعة قليلاً
                    </li>
                    <li>
                      <span className="improvement-tag">موضوع البطارية:</span>
                      42 تعليق يطلبون معلومات عن البطارية - إضافة قسم في الفيديوهات القادمة
                    </li>
                    <li>
                      <span className="improvement-tag">كتابة المصطلحات:</span>
                      بعض المشاهدين يطلبون عرض المصطلحات مكتوبة على الشاشة
                    </li>
                  </ul>
                </div>
              </div>

              {/* Geographic & Demographics */}
              <div className="demographics">
                <h3 className="subsection-title">التوزيع الجغرافي والديموغرافي</h3>
                <div className="demo-grid">
                  <div className="demo-card">
                    <h4>🌍 المناطق الأكثر تفاعلاً</h4>
                    <ul className="demo-list">
                      <li><span className="country">🇸🇦 السعودية</span> <span className="demo-value">35%</span></li>
                      <li><span className="country">🇪🇬 مصر</span> <span className="demo-value">22%</span></li>
                      <li><span className="country">🇮🇶 العراق</span> <span className="demo-value">18%</span></li>
                      <li><span className="country">🇦🇪 الإمارات</span> <span className="demo-value">12%</span></li>
                      <li><span className="country">🇸🇾 سوريا</span> <span className="demo-value">8%</span></li>
                      <li><span className="country">أخرى</span> <span className="demo-value">5%</span></li>
                    </ul>
                  </div>

                  <div className="demo-card">
                    <h4>📊 اهتمامات الجمهور الرئيسية</h4>
                    <ul className="demo-list">
                      <li><span>الدراسة والتعليم</span> <span className="demo-value">68%</span></li>
                      <li><span>الألعاب (خاصة ببجي)</span> <span className="demo-value">23%</span></li>
                      <li><span>التصميم والإبداع</span> <span className="demo-value">15%</span></li>
                      <li><span>المحتوى والإنتاج</span> <span className="demo-value">9%</span></li>
                    </ul>
                  </div>
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
