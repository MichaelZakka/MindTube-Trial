'use client';

import { useState, useEffect } from 'react';
import commentsData from '../comments.json';

export default function Home() {
  const [activeTab, setActiveTab] = useState('comments');
  const [activeCommentCategory, setActiveCommentCategory] = useState('all');
  const [darkMode, setDarkMode] = useState(true);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [videoExpanded, setVideoExpanded] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [displayedCommentsCount, setDisplayedCommentsCount] = useState<{ [key: string]: number }>({});

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (descriptionExpanded) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Prevent scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup function
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [descriptionExpanded]);

  const totalComments = 732;
  const engagementRate = 87.5;

  // Video details data
  const videoDetails = {
    channelName: 'Abdurrahman Dulli || عبد الرحمن ضللي',
    channelSubscribers: '13.2K',
    videoDuration: '18:45',
    uploadDate: '15 Jun 2024',
    views: '117,519',
    likes: '3.2K',
    dislikes: '89',
    likeRatio: 97.9,
    description: `هذا الفيديو مقارنة بين كل الايبادات المتاحة للشراء حالياً ولسا مدعومة بتحديث ال iPads 18، لتعرف اي واحد منهم بيناسبك لتشتريه بالوقت الحالي

رابط موقع Paperlike:

Paperlike.com/Abdurrahmandulli

----------------------------

أقسام الفيديو:

00:00  مقدمة

00:19  ملخص WWDC

02:35  iPad 9

04:06  iPad 10

05:07  iPad Air 4

05:38  iPad mini 6

06:37  فرق الميزات المدعومة

07:03  iPad Air 5

08:04  iPad Air 6

09:17  iPad Pro M1, M2

09:42  iPad Pro M4

10:49  Paperlike

11:13  iPad Pro M4

12:22  الخلاصة

----------------------------

لا تنسوا أهلنا في غزة من الدعاء

أي ايباد تختار

أي ايباد الأنسب لك

اي ايباد بيناسبك`,
    tags: ['آيباد', 'iPad', 'Apple', 'تابلت', 'مراجعة', 'مقارنة', 'شراء', 'تكنولوجيا', 'iOS', 'Apple Pencil'],
    category: 'تكنولوجيا',
    language: 'العربية'
  };

  // All comments from JSON file
  const allComments = (commentsData as { comment: string }[]).map((c, idx) => ({
    text: c.comment,
    likes: Math.floor(Math.random() * 100) + 1,
    id: idx
  }));

  // New Comment Classifications for Comments Tab
  const commentCategories = {
    all: {
      title: 'جميع التعليقات',
      icon: '💬',
      count: allComments.length,
      percentage: 100,
      color: '#6366f1',
      comments: allComments.slice(0, 30)
    },
    positive: {
      title: 'رأي إيجابي',
      icon: '😊',
      count: 245,
      percentage: 33.5,
      color: '#10b981',
      comments: allComments.filter(c => 
        c.text.includes('ممتاز') || c.text.includes('رائع') || c.text.includes('شكر') || 
        c.text.includes('جميل') || c.text.includes('مفيد') || c.text.includes('أفضل') ||
        c.text.includes('بارك') || c.text.includes('❤') || c.text.includes('👍') ||
        c.text.includes('الله يعطيك') || c.text.includes('استمر') || c.text.includes('اسطور')
      ).slice(0, 30)
    },
    negative: {
      title: 'رأي سلبي',
      icon: '😟',
      count: 78,
      percentage: 10.7,
      color: '#ef4444',
      comments: allComments.filter(c => 
        c.text.includes('سريع') || c.text.includes('معقد') || c.text.includes('سيئ') ||
        c.text.includes('ندم') || c.text.includes('مقاطع') || c.text.includes('خسار') ||
        c.text.includes('فاشل') || c.text.includes('مزعج')
      ).slice(0, 30)
    },
    personal: {
      title: 'أسئلة شخصية',
      icon: '👤',
      count: 156,
      percentage: 21.3,
      color: '#8b5cf6',
      comments: allComments.filter(c => 
        c.text.includes('أنا') || c.text.includes('انا') || c.text.includes('عندي') ||
        c.text.includes('ميزانيت') || c.text.includes('تنصحني') || c.text.includes('محتاج')
      ).slice(0, 30)
    },
    content: {
      title: 'أسئلة متعلقة بالمحتوى',
      icon: '📝',
      count: 187,
      percentage: 25.5,
      color: '#3b82f6',
      comments: allComments.filter(c => 
        c.text.includes('هل') || c.text.includes('؟') || c.text.includes('كم') ||
        c.text.includes('ايش') || c.text.includes('وش') || c.text.includes('شنو')
      ).slice(0, 30)
    },
    suggestions: {
      title: 'اقتراحات',
      icon: '💡',
      count: 66,
      percentage: 9.0,
      color: '#f59e0b',
      comments: allComments.filter(c => 
        c.text.includes('ياريت') || c.text.includes('يا ريت') || c.text.includes('فيديو عن') ||
        c.text.includes('اقتراح') || c.text.includes('ممكن تعمل') || c.text.includes('نصيحة')
      ).slice(0, 30)
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
    
    // For 'all' category, load more from allComments array
    if (categoryKey === 'all') {
      return allComments.slice(0, currentCount);
    }
    
    // For other categories, return the filtered comments up to currentCount
    return baseComments.slice(0, Math.min(currentCount, baseComments.length));
  };

  const loadMoreComments = (categoryKey: string, category: any) => {
    const baseCount = category.comments.length;
    const currentCount = displayedCommentsCount[categoryKey] || baseCount;
    const maxCount = categoryKey === 'all' ? allComments.length : category.count;
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
                    title="أي آيباد بيناسبك ب 2024 (بعد التحديث)"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
            <div className="video-metadata">
              <h2 className="video-title">أي آيباد بيناسبك ب 2024 (بعد التحديث)</h2>
              <div className="video-info">
                <span className="info-item">📺 {videoDetails.channelName}</span>
                <span className="info-item">👥 {videoDetails.channelSubscribers} مشترك</span>
                <span className="info-item">📅 {videoDetails.uploadDate}</span>
                <span className="info-item">👁️ {videoDetails.views} مشاهدة</span>
                <span className="info-item">👍 {videoDetails.likes} إعجاب</span>
                <span className="info-item">💬 {totalComments} تعليق</span>
              </div>
              
              {/* Video Description */}
              <div className="video-description-section">
                <div className="description-text-wrapper">
                  <pre className="description-text">{videoDetails.description}</pre>
                </div>
                <button 
                  className="see-more-btn"
                  onClick={() => setDescriptionExpanded(true)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'right',
                    marginTop: '0.75rem',
                    marginBottom: '1rem',
                    color: '#3ea6ff',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    background: 'transparent',
                    border: 'none',
                    padding: '0.75rem 0'
                  }}
                >
                  عرض المزيد
                </button>
                <div className="video-tags">
                  {videoDetails.tags.map((tag, idx) => (
                    <span key={idx} className="video-tag">#{tag}</span>
                  ))}
                </div>
              </div>
              
              {/* Description Modal */}
              {descriptionExpanded && (
                <div className="description-modal-overlay" onClick={() => setDescriptionExpanded(false)}>
                  <div className="description-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                      <h3>وصف الفيديو</h3>
                      <button 
                        className="modal-close-btn"
                        onClick={() => setDescriptionExpanded(false)}
                        aria-label="إغلاق"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="modal-content">
                      <pre className="modal-description-text">{videoDetails.description}</pre>
                      <div className="modal-tags">
                        {videoDetails.tags.map((tag, idx) => (
                          <span key={idx} className="video-tag">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Statistics */}
          {/* <div className="quick-stats">
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
          </div> */}
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
                          const totalCount = key === 'all' ? allComments.length : category.count;
                          const remaining = totalCount - currentCount;
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
                                  عرض {nextBatch} تعليق إضافي ({currentCount} من {totalCount})
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
