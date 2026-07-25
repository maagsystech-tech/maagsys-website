import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { collection, query, where, orderBy, limit, getDocs, startAfter } from 'firebase/firestore';
import { db } from '../firebase';
import { HiArrowRight, HiCalendar, HiClock } from 'react-icons/hi';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import { ShimmerBlogCard } from '../components/Shimmer';

const POSTS_PER_PAGE = 9;

const categories = ['All', 'Cybersecurity', 'Cloud', 'Data Science', 'AI/ML', 'Technology'];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPosts = async (category = 'All', append = false) => {
    if (!append) setLoading(true);
    else setLoadingMore(true);

    try {
      let docs = [];
      let newLastDoc = null;
      let checkHasMore = false;

      try {
        // Primary Query: Filter by published, category, sort by createdAt desc, and limit
        const constraints = [where('published', '==', true)];
        if (category !== 'All') constraints.push(where('category', '==', category));
        constraints.push(orderBy('createdAt', 'desc'));
        if (append && lastDoc) constraints.push(startAfter(lastDoc));
        constraints.push(limit(POSTS_PER_PAGE));

        const q = query(collection(db, 'blogPosts'), ...constraints);
        const snapshot = await getDocs(q);
        docs = snapshot.docs;
        newLastDoc = snapshot.docs[snapshot.docs.length - 1] || null;
        checkHasMore = snapshot.docs.length === POSTS_PER_PAGE;
      } catch (indexErr) {
        console.warn('Index might be missing, falling back to client-side filtering/sorting:', indexErr);

        // Fallback Query: Query all published posts (requires no composite indexes)
        const q = query(collection(db, 'blogPosts'), where('published', '==', true));
        const snapshot = await getDocs(q);

        let allPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (category !== 'All') {
          allPosts = allPosts.filter(p => p.category === category);
        }
        allPosts.sort((a, b) => {
          const aTime = a.createdAt?.seconds || 0;
          const bTime = b.createdAt?.seconds || 0;
          return bTime - aTime;
        });

        // Mock pagination client-side
        const startIndex = append ? posts.length : 0;
        const pagePosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

        // Mock docs for local state updates
        docs = pagePosts.map(p => ({ id: p.id, data: () => p }));
        newLastDoc = null; // No cursor for local pagination
        checkHasMore = allPosts.length > startIndex + POSTS_PER_PAGE;
      }

      const newPosts = docs.map(doc => {
        if (typeof doc.data === 'function') {
          return { id: doc.id, ...doc.data() };
        }
        return doc;
      });

      if (append) setPosts(prev => [...prev, ...newPosts]);
      else setPosts(newPosts);

      setLastDoc(newLastDoc);
      setHasMore(checkHasMore);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
    }
    setLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => {
    fetchPosts(activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setLastDoc(null);
    setHasMore(true);
  };

  // Fallback static posts for when Firebase isn't connected
  // const fallbackPosts = [
  //   { id: '1', title: 'CEO Fraud Alert: A Growing Threat', slug: 'ceo-fraud-alert', category: 'Cybersecurity', excerpt: 'Learn about the rising threat of CEO fraud and business email compromise, and how to protect your organization.', createdAt: { seconds: 1725148800 }, readTime: '5 min' },
  //   { id: '2', title: 'Protect Yourself from SIM Swapping', slug: 'sim-swapping-threat', category: 'Cybersecurity', excerpt: 'SIM swapping attacks are on the rise. Understand how this threat works and what steps you can take to stay safe.', createdAt: { seconds: 1725062400 }, readTime: '4 min' },
  //   { id: '3', title: 'Top 3 APT Groups: Unmasking Cyber Espionage', slug: 'top-apt-groups', category: 'Cybersecurity', excerpt: 'An in-depth look at the most sophisticated Advanced Persistent Threat groups and their tactics.', createdAt: { seconds: 1724976000 }, readTime: '7 min' },
  //   { id: '4', title: 'Sustainability in Cloud Computing', slug: 'sustainability-cloud', category: 'Cloud', excerpt: 'How organizations can reduce their environmental footprint while leveraging cloud infrastructure.', createdAt: { seconds: 1724889600 }, readTime: '5 min' },
  //   { id: '5', title: 'The Power of Data Visualization', slug: 'data-visualization', category: 'Data Science', excerpt: 'Effective data visualization transforms complex datasets into clear, actionable insights for stakeholders.', createdAt: { seconds: 1724803200 }, readTime: '6 min' },
  //   { id: '6', title: 'Advances in Natural Language Processing', slug: 'nlp-advances', category: 'AI/ML', excerpt: 'Exploring the latest developments in NLP and their real-world applications across industries.', createdAt: { seconds: 1724716800 }, readTime: '8 min' },
  // ];

  // Replace your existing fallbackPosts array in Blog.jsx with this:

  const fallbackPosts = [
    {
      id: '1',
      title: 'CEO Fraud Alert: A Growing Threat',
      slug: 'ceo-fraud-alert',
      category: 'Cybersecurity',
      excerpt: 'Learn about the rising threat of CEO fraud and business email compromise, and how to protect your organization.',
      featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60',
      createdAt: { seconds: 1725148800 },
      readTime: '5 min'
    },
    {
      id: '2',
      title: 'Protect Yourself from SIM Swapping',
      slug: 'sim-swapping-threat',
      category: 'Cybersecurity',
      excerpt: 'SIM swapping attacks are on the rise. Understand how this threat works and what steps you can take to stay safe.',
      featuredImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=60',
      createdAt: { seconds: 1725062400 },
      readTime: '4 min'
    },
    {
      id: '3',
      title: 'Top 3 APT Groups: Unmasking Cyber Espionage',
      slug: 'top-apt-groups',
      category: 'Cybersecurity',
      excerpt: 'An in-depth look at the most sophisticated Advanced Persistent Threat groups and their tactics.',
      featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
      createdAt: { seconds: 1724976000 },
      readTime: '7 min'
    },
    {
      id: '4',
      title: 'Sustainability in Cloud Computing',
      slug: 'sustainability-cloud',
      category: 'Cloud',
      excerpt: 'How organizations can reduce their environmental footprint while leveraging cloud infrastructure.',
      featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60',
      createdAt: { seconds: 1724889600 },
      readTime: '5 min'
    },
    {
      id: '5',
      title: 'The Power of Data Visualization',
      slug: 'data-visualization',
      category: 'Data Science',
      excerpt: 'Effective data visualization transforms complex datasets into clear, actionable insights for stakeholders.',
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
      createdAt: { seconds: 1724803200 },
      readTime: '6 min'
    },
    {
      id: '6',
      title: 'Advances in Natural Language Processing',
      slug: 'nlp-advances',
      category: 'AI/ML',
      excerpt: 'Exploring the latest developments in NLP and their real-world applications across industries.',
      featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
      createdAt: { seconds: 1724716800 },
      readTime: '8 min'
    },
  ];

  const displayPosts = posts.length > 0 ? posts : (loading ? [] : fallbackPosts);
  const filteredPosts = activeCategory === 'All' ? displayPosts : displayPosts.filter(p => p.category === activeCategory);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <>
      <Helmet>
        <title>Blog MAAGSYS Insights on Cybersecurity, Cloud & AI</title>
        <meta name="description" content="Stay up to date with the latest in cybersecurity, cloud engineering, data science, and AI/ML. Expert insights from the MAAGSYS team." />
      </Helmet>

      <PageHero
        tag="Blog"
        title="Insights & Perspectives"
        subtitle="Expert analysis and practical guidance on cybersecurity, cloud computing, data engineering, AI/ML, and digital transformation."
        breadcrumbs={[{ label: 'Blog' }]}
      />

      <section className="py-14 sm:py-20 bg-white">
        <div className="container-main section-padding">
          {/* Category filter */}
          <AnimatedSection className="mb-12">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-5 py-2 rounded-sm text-sm font-medium transition-all ${activeCategory === cat
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-surface-100 text-gray-600 hover:bg-surface-200'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Posts grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => <ShimmerBlogCard key={i} />)}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No posts found in this category.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, i) => (
                  <AnimatedSection key={post.id} delay={i * 80}>
                    <Link to={`/blog/${post.slug || post.id}`} className="group block h-full">
                      <article className="bg-white rounded-sm border border-surface-200 overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-brand-100 hover:-translate-y-1">
                        <div className="h-48 bg-gradient-to-br from-brand-50 to-accent-50 flex items-center justify-center overflow-hidden">
                          {post.featuredImage ? (
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          ) : (
                            <span className="text-brand-300 font-display text-5xl font-bold opacity-30">M</span>
                          )}
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-sm">{post.category}</span>
                            <span className="text-xs text-gray-400 flex items-center gap-1"><HiCalendar className="w-3 h-3" />{formatDate(post.createdAt)}</span>
                          </div>
                          <h3 className="font-display font-medium text-gray-900 mb-2 group-hover:text-brand-600 transition-colors leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                          <span className="btn-ghost text-sm mt-auto">
                            Read article <HiArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </article>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>

              {hasMore && posts.length > 0 && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => fetchPosts(activeCategory, true)}
                    disabled={loadingMore}
                    className="btn-secondary"
                  >
                    {loadingMore ? 'Loading...' : 'Load More Posts'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
