import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import PageHero from "../components/PageHero";
import AnimatedSection from "../components/AnimatedSection";
import CTASection from "../components/CTASection";
import { ShimmerParagraph } from "../components/Shimmer";
import {
  FiCalendar,
  FiUser,
  FiTag,
  FiClock,
  FiArrowLeft,
  FiShare2,
  FiLinkedin,
  FiFacebook,
  FiTwitter,
} from "react-icons/fi";

// Fallback posts matching the ones in Blog.jsx
const fallbackPosts = [
  {
    id: "1",
    title: "CEO Fraud Alert: A Growing Threat",
    slug: "ceo-fraud-alert",
    category: "Cybersecurity",
    author: "MAAGSYS Team",
    featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60',
    content:
      "<p>Learn about the rising threat of CEO fraud and business email compromise, and how to protect your organization.</p><p>Advanced persistent threats and email security mechanisms are essential to mitigate CEO fraud.</p>",
    excerpt:
      "Learn about the rising threat of CEO fraud and business email compromise, and how to protect your organization.",
    createdAt: { seconds: 1725148800 },
    readTime: "5 min",
    tags: ["Security", "Fraud", "Alert"],
  },
  {
    id: "2",
    title: "Protect Yourself from SIM Swapping",
    slug: "sim-swapping-threat",
    category: "Cybersecurity",
    author: "MAAGSYS Team",
    featuredImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=60',
    content:
      "<p>SIM swapping attacks are on the rise. Understand how this threat works and what steps you can take to stay safe.</p>",
    excerpt:
      "SIM swapping attacks are on the rise. Understand how this threat works and what steps you can take to stay safe.",
    createdAt: { seconds: 1725062400 },
    readTime: "4 min",
    tags: ["Mobile", "Security"],
  },
  {
    id: "3",
    title: "Top 3 APT Groups: Unmasking Cyber Espionage",
    slug: "top-apt-groups",
    category: "Cybersecurity",
    author: "MAAGSYS Team",
    featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
    content:
      "<p>An in-depth look at the most sophisticated Advanced Persistent Threat groups and their tactics.</p>",
    excerpt:
      "An in-depth look at the most sophisticated Advanced Persistent Threat groups and their tactics.",
    createdAt: { seconds: 1724976000 },
    readTime: "7 min",
    tags: ["APT", "Cybersecurity"],
  },
  {
    id: "4",
    title: "Sustainability in Cloud Computing",
    slug: "sustainability-cloud",
    category: "Cloud",
    author: "MAAGSYS Team",
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60',
    content:
      "<p>How organizations can reduce their environmental footprint while leveraging cloud infrastructure.</p>",
    excerpt:
      "How organizations can reduce their environmental footprint while leveraging cloud infrastructure.",
    createdAt: { seconds: 1724889600 },
    readTime: "5 min",
    tags: ["Cloud", "Green IT"],
  },
  {
    id: "5",
    title: "The Power of Data Visualization",
    slug: "data-visualization",
    category: "Data Science",
    author: "MAAGSYS Team",
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    content:
      "<p>Effective data visualization transforms complex datasets into clear, actionable insights for stakeholders.</p>",
    excerpt:
      "Effective data visualization transforms complex datasets into clear, actionable insights for stakeholders.",
    createdAt: { seconds: 1724803200 },
    readTime: "6 min",
    tags: ["Data", "Analytics"],
  },
  {
    id: "6",
    title: "Advances in Natural Language Processing",
    slug: "nlp-advances",
    category: "AI/ML",
    author: "MAAGSYS Team",
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
    content:
      "<p>Exploring the latest developments in NLP and their real-world applications across industries.</p>",
    excerpt:
      "Exploring the latest developments in NLP and their real-world applications across industries.",
    createdAt: { seconds: 1724716800 },
    readTime: "8 min",
    tags: ["AI", "NLP"],
  },
];

const BlogDetailShimmer = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
    <div className="shimmer-block h-8 w-3/4 rounded mb-4" />
    <div className="flex gap-4 mb-8">
      <div className="shimmer-block h-5 w-28 rounded" />
      <div className="shimmer-block h-5 w-28 rounded" />
      <div className="shimmer-block h-5 w-20 rounded" />
    </div>
    <div className="shimmer-block h-72 w-full rounded-sm mb-8" />
    <ShimmerParagraph lines={6} />
    <div className="mt-6">
      <ShimmerParagraph lines={5} />
    </div>
    <div className="mt-6">
      <ShimmerParagraph lines={4} />
    </div>
  </div>
);

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      let docData = null;

      try {
        // 1. Check Firestore by slug
        const q = query(
          collection(db, "blogPosts"),
          where("slug", "==", slug),
          limit(1),
        );
        const snap = await getDocs(q);

        if (!snap.empty) {
          const data = snap.docs[0].data();
          if (data.published !== false) {
            docData = { id: snap.docs[0].id, ...data };
          }
        } else {
          // 2. Fallback check Firestore by document ID
          const docRef = doc(db, "blogPosts", slug);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.published !== false) {
              docData = { id: docSnap.id, ...data };
            }
          }
        }
      } catch (err) {
        console.warn("Firestore fetch failed, checking fallback data:", err);
      }

      // 3. FALLBACK MECHANISM: If not found in Firestore, search fallback array
      if (!docData) {
        docData =
          fallbackPosts.find((p) => p.slug === slug || p.id === slug) || null;
      }

      setPost(docData);

      // 4. Load related posts
      if (docData && docData.category) {
        try {
          const rq = query(
            collection(db, "blogPosts"),
            where("category", "==", docData.category),
            where("published", "==", true),
            limit(4),
          );
          const rsnap = await getDocs(rq);
          const firestoreRelated = rsnap.docs
            .filter((d) => d.id !== docData.id)
            .slice(0, 3)
            .map((d) => ({ id: d.id, ...d.data() }));

          if (firestoreRelated.length > 0) {
            setRelated(firestoreRelated);
          } else {
            // Fallback related posts
            setRelated(
              fallbackPosts
                .filter(
                  (p) => p.category === docData.category && p.id !== docData.id,
                )
                .slice(0, 3),
            );
          }
        } catch {
          // If related query fails, populate from fallback data
          setRelated(
            fallbackPosts
              .filter(
                (p) => p.category === docData.category && p.id !== docData.id,
              )
              .slice(0, 3),
          );
        }
      }

      setLoading(false);
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) return <BlogDetailShimmer />;

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-medium text-gray-900 mb-4">
          Post Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/blog" className="btn-primary">
          Back to Blog
        </Link>
      </div>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const readTime =
    post.readTime || Math.max(3, Math.ceil((post.content?.length || 0) / 1200));

  return (
    <>
      <Helmet>
        <title>{post.title} MAAGSYS Blog</title>
        <meta name="description" content={post.excerpt || post.title} />
      </Helmet>

      <PageHero
        title={post.title}
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Blog", to: "/blog" },
          { label: post.title },
        ]}
      />

      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                  {post.author && (
                    <span className="flex items-center gap-1.5">
                      <FiUser className="w-4 h-4" /> {post.author}
                    </span>
                  )}
                  {post.createdAt && (
                    <span className="flex items-center gap-1.5">
                      <FiCalendar className="w-4 h-4" />
                      {new Date(
                        post.createdAt.seconds
                          ? post.createdAt.seconds * 1000
                          : post.createdAt,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <FiClock className="w-4 h-4" /> {readTime} min read
                  </span>
                  {post.category && (
                    <span className="flex items-center gap-1.5 bg-brand-50 text-brand-700 px-3 py-1 rounded-sm text-xs font-medium">
                      <FiTag className="w-3 h-3" /> {post.category}
                    </span>
                  )}
                </div>

                {/* Featured image */}
                <div className="h-64 bg-gradient-to-br from-brand-50 to-accent-50 flex items-center justify-center overflow-hidden mb-8">
                  {post.featuredImage ? (
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-brand-300 font-display text-5xl font-bold opacity-30">
                      M
                    </span>
                  )}
                </div>

                {/* Article body */}
                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-medium prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-sm prose-strong:text-gray-800 prose-blockquote:border-brand-500 prose-blockquote:text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: post.content || "<p>Content is being loaded...</p>",
                  }}
                />

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-gray-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">
                        Tags:
                      </span>
                      {post.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-surface-100 text-gray-600 px-3 py-1 rounded-sm text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                      <FiShare2 className="w-4 h-4" /> Share:
                    </span>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-surface-100 flex items-center justify-center text-gray-500 hover:bg-brand-600 hover:text-white transition-colors"
                    >
                      <FiLinkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-surface-100 flex items-center justify-center text-gray-500 hover:bg-brand-600 hover:text-white transition-colors"
                    >
                      <FiFacebook className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-surface-100 flex items-center justify-center text-gray-500 hover:bg-brand-600 hover:text-white transition-colors"
                    >
                      <FiTwitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </AnimatedSection>

              {/* Back to blog */}
              <div className="mt-10">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium transition-colors"
                >
                  <FiArrowLeft className="w-4 h-4" /> Back to all articles
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                {/* Related posts */}
                {related.length > 0 && (
                  <AnimatedSection direction="right">
                    <div className="bg-surface-50 rounded-md p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Related Articles
                      </h3>
                      <div className="space-y-4">
                        {related.map((r) => (
                          <Link
                            key={r.id}
                            to={`/blog/${r.slug || r.id}`}
                            className="block group"
                          >
                            <div className="flex gap-3">
                              {r.featuredImage && (
                                <img
                                  src={r.featuredImage}
                                  alt={r.title}
                                  className="w-16 h-16 object-cover rounded-sm flex-shrink-0"
                                />
                              )}
                              <div>
                                <h4 className="text-sm font-medium text-gray-800 group-hover:text-brand-600 transition-colors line-clamp-2">
                                  {r.title}
                                </h4>
                                {r.createdAt && (
                                  <p className="text-xs text-gray-400 mt-1">
                                    {new Date(
                                      r.createdAt.seconds
                                        ? r.createdAt.seconds * 1000
                                        : r.createdAt,
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </p>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>
                )}

                {/* Quick CTA */}
                <AnimatedSection direction="right" delay={0.1}>
                  <div className="bg-gradient-to-br from-brand-700 to-brand-900 rounded-md p-6 text-white">
                    <h3 className="text-lg font-medium mb-2">
                      Need Expert Help?
                    </h3>
                    <p className="text-brand-100 text-sm mb-4">
                      Get in touch to discuss how MAAGSYS can help your
                      business.
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center w-full bg-white text-brand-700 font-medium py-2.5 px-4 rounded-sm hover:bg-brand-50 transition-colors text-sm"
                    >
                      Contact Us
                    </Link>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import { doc, getDoc, collection, query, where, limit, getDocs, orderBy } from 'firebase/firestore';
// import { db } from '../firebase';
// import PageHero from '../components/PageHero';
// import AnimatedSection from '../components/AnimatedSection';
// import CTASection from '../components/CTASection';
// import { ShimmerLine, ShimmerParagraph } from '../components/Shimmer';
// import {
//   FiCalendar, FiUser, FiTag, FiClock, FiArrowLeft,
//   FiShare2, FiLinkedin, FiFacebook, FiTwitter
// } from 'react-icons/fi';

// const BlogDetailShimmer = () => (
//   <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
//     <div className="shimmer-block h-8 w-3/4 rounded mb-4" />
//     <div className="flex gap-4 mb-8">
//       <div className="shimmer-block h-5 w-28 rounded" />
//       <div className="shimmer-block h-5 w-28 rounded" />
//       <div className="shimmer-block h-5 w-20 rounded" />
//     </div>
//     <div className="shimmer-block h-72 w-full rounded-sm mb-8" />
//     <ShimmerParagraph lines={6} />
//     <div className="mt-6"><ShimmerParagraph lines={5} /></div>
//     <div className="mt-6"><ShimmerParagraph lines={4} /></div>
//   </div>
// );

// export default function BlogDetail() {
//   const { slug } = useParams();
//   const [post, setPost] = useState(null);
//   const [related, setRelated] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPost = async () => {
//       setLoading(true);
//       try {
//         const q = query(collection(db, 'blogPosts'), where('slug', '==', slug), limit(1));
//         const snap = await getDocs(q);
//         if (!snap.empty) {
//           const data = { id: snap.docs[0].id, ...snap.docs[0].data() };
//           setPost(data);

//           // fetch related posts by same category
//           if (data.category) {
//             const rq = query(
//               collection(db, 'blogPosts'),
//               where('category', '==', data.category),
//               where('published', '==', true),
//               orderBy('createdAt', 'desc'),
//               limit(4)
//             );
//             const rsnap = await getDocs(rq);
//             setRelated(rsnap.docs.filter(d => d.id !== data.id).slice(0, 3).map(d => ({ id: d.id, ...d.data() })));
//           }
//         }
//       } catch (err) {
//         console.error('Error fetching post:', err);
//       }
//       setLoading(false);
//     };
//     fetchPost();
//   }, [slug]);

//   if (loading) return <BlogDetailShimmer />;

//   if (!post) {
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
//         <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h2>
//         <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
//         <Link to="/blog" className="btn-primary">Back to Blog</Link>
//       </div>
//     );
//   }

//   const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
//   const readTime = post.readTime || Math.max(3, Math.ceil((post.content?.length || 0) / 1200));

//   return (
//     <>
//       <Helmet>
//         <title>{post.title} MAAGSYS Blog</title>
//         <meta name="description" content={post.excerpt || post.title} />
//       </Helmet>

//       <PageHero
//         title={post.title}
//         breadcrumbs={[
//           { label: 'Home', to: '/' },
//           { label: 'Blog', to: '/blog' },
//           { label: post.title },
//         ]}
//       />

//       <section className="py-16 lg:py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-3 gap-12">
//             {/* Main content */}
//             <div className="lg:col-span-2">
//               <AnimatedSection>
//                 {/* Meta */}
//                 <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
//                   {post.author && (
//                     <span className="flex items-center gap-1.5">
//                       <FiUser className="w-4 h-4" /> {post.author}
//                     </span>
//                   )}
//                   {post.createdAt && (
//                     <span className="flex items-center gap-1.5">
//                       <FiCalendar className="w-4 h-4" />
//                       {new Date(post.createdAt.seconds ? post.createdAt.seconds * 1000 : post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
//                     </span>
//                   )}
//                   <span className="flex items-center gap-1.5">
//                     <FiClock className="w-4 h-4" /> {readTime} min read
//                   </span>
//                   {post.category && (
//                     <span className="flex items-center gap-1.5 bg-brand-50 text-brand-700 px-3 py-0.5 rounded-full text-xs font-medium">
//                       <FiTag className="w-3.5 h-3.5" /> {post.category}
//                     </span>
//                   )}
//                 </div>

//                 {/* Featured image */}
//                 {post.featuredImage && (
//                   <div className="rounded-2xl overflow-hidden mb-8">
//                     <img src={post.featuredImage} alt={post.title} className="w-full h-auto object-cover" />
//                   </div>
//                 )}

//                 {/* Article body */}
//                 <div
//                   className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-strong:text-gray-800 prose-blockquote:border-brand-500 prose-blockquote:text-gray-600"
//                   dangerouslySetInnerHTML={{ __html: post.content || '<p>Content is being loaded...</p>' }}
//                 />

//                 {/* Tags */}
//                 {post.tags && post.tags.length > 0 && (
//                   <div className="mt-10 pt-6 border-t border-gray-100">
//                     <div className="flex flex-wrap items-center gap-2">
//                       <span className="text-sm font-semibold text-gray-700">Tags:</span>
//                       {post.tags.map((tag, i) => (
//                         <span key={i} className="bg-surface-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Share */}
//                 <div className="mt-8 pt-6 border-t border-gray-100">
//                   <div className="flex items-center gap-3">
//                     <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
//                       <FiShare2 className="w-4 h-4" /> Share:
//                     </span>
//                     <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-surface-100 flex items-center justify-center text-gray-500 hover:bg-brand-600 hover:text-white transition-colors">
//                       <FiLinkedin className="w-4 h-4" />
//                     </a>
//                     <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-surface-100 flex items-center justify-center text-gray-500 hover:bg-brand-600 hover:text-white transition-colors">
//                       <FiFacebook className="w-4 h-4" />
//                     </a>
//                     <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-surface-100 flex items-center justify-center text-gray-500 hover:bg-brand-600 hover:text-white transition-colors">
//                       <FiTwitter className="w-4 h-4" />
//                     </a>
//                   </div>
//                 </div>
//               </AnimatedSection>

//               {/* Back to blog */}
//               <div className="mt-10">
//                 <Link to="/blog" className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium transition-colors">
//                   <FiArrowLeft className="w-4 h-4" /> Back to all articles
//                 </Link>
//               </div>
//             </div>

//             {/* Sidebar */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-28 space-y-8">
//                 {/* Related posts */}
//                 {related.length > 0 && (
//                   <AnimatedSection direction="right">
//                     <div className="bg-surface-50 rounded-2xl p-6">
//                       <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
//                       <div className="space-y-4">
//                         {related.map((r) => (
//                           <Link key={r.id} to={`/blog/${r.slug}`} className="block group">
//                             <div className="flex gap-3">
//                               {r.featuredImage && (
//                                 <img src={r.featuredImage} alt={r.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
//                               )}
//                               <div>
//                                 <h4 className="text-sm font-semibold text-gray-800 group-hover:text-brand-600 transition-colors line-clamp-2">
//                                   {r.title}
//                                 </h4>
//                                 {r.createdAt && (
//                                   <p className="text-xs text-gray-400 mt-1">
//                                     {new Date(r.createdAt.seconds ? r.createdAt.seconds * 1000 : r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   </AnimatedSection>
//                 )}

//                 {/* Quick CTA */}
//                 <AnimatedSection direction="right" delay={0.1}>
//                   <div className="bg-gradient-to-br from-brand-700 to-brand-900 rounded-2xl p-6 text-white">
//                     <h3 className="text-lg font-bold mb-2">Need Expert Help?</h3>
//                     <p className="text-blue-100 text-sm mb-4">Get in touch to discuss how MAAGSYS can help your business.</p>
//                     <Link to="/contact" className="inline-flex items-center justify-center w-full bg-white text-brand-700 font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-50 transition-colors text-sm">
//                       Contact Us
//                     </Link>
//                   </div>
//                 </AnimatedSection>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <CTASection />
//     </>
//   );
// }
