// src/app/blog/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  type BlogPost,
  type FilterCategory,
  BLOG_POSTS,
  FEATURED_POST,
  CATEGORIES,
} from "./data";
import { ArrowRight, Clock, Calendar, Mail, CheckCircle, RefreshCw } from "lucide-react";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/api$/, "");

export default function BlogPage(): React.ReactElement {
  const [filter, setFilter] = useState<FilterCategory>("all");
  const [newsletterMessage, setNewsletterMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subscribing, setSubscribing] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<BlogPost[]>(BLOG_POSTS);
  const [featuredPost, setFeaturedPost] = useState<BlogPost>(FEATURED_POST);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const list: BlogPost[] = data.data;
          const feat = list.find((p) => p.featured) || list[0];
          setFeaturedPost(feat);
          setBlogs(list.filter((p) => (p._id || p.id || p.slug) !== (feat._id || feat.id || feat.slug)));
        }
      } catch (err) {
        console.warn("Failed to fetch blogs from API, using fallback data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribing(true);
    // Simulate subscribe or post
    setTimeout(() => {
      setNewsletterMessage("Thanks! You are now subscribed to DCW shipping updates.");
      setEmail("");
      setSubscribing(false);
      setTimeout(() => setNewsletterMessage(""), 5000);
    }, 600);
  };

  const allDisplayPosts = [featuredPost, ...blogs].filter(Boolean);
  const filteredPosts =
    filter === "all"
      ? blogs
      : blogs.filter((post) => post.category === filter);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0b2f3a] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pb-20">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-[#eef1f0] via-[#f8fafc] to-[#f8fafc] pt-14 pb-10 border-b border-[#d5dcdb]/60">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-2 mb-4 text-xs font-black uppercase tracking-widest text-[#f05a28]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f05a28] animate-pulse"></span>
              <span>DCW Knowledge Hub &amp; Guides</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0b2f3a] tracking-tight leading-tight">
              Logistics Insights, Customs &amp;{" "}
              <span className="text-[#f05a28]">Shipping Guides</span>
            </h1>

            <p className="mt-4 text-base md:text-lg text-[#51626a] max-w-2xl leading-relaxed">
              Practical guides to India → Canada courier transit, CBSA customs duties, door-to-door freight, and supply chain solutions.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2.5 mt-8 pt-4 border-t border-[#d5dcdb]/60">
              {CATEGORIES.map((cat) => {
                const isActive = filter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    type="button"
                    className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-200 ease-out active:scale-95 shadow-sm ${
                      isActive
                        ? "bg-[#0b2f3a] text-white shadow-[#0b2f3a]/25 scale-105"
                        : "bg-white text-[#51626a] hover:text-[#0b2f3a] hover:border-[#f05a28] border border-[#d5dcdb] hover:-translate-y-0.5"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 mt-10 space-y-14">
          {/* FEATURED POST HERO CARD */}
          {filter === "all" && featuredPost && (
            <div className="bg-white rounded-3xl border border-[#d5dcdb] p-6 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-[#f05a28] text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      Featured Guide
                    </span>
                    <span className="bg-[#eef1f0] text-[#0b2f3a] text-xs font-bold px-3 py-1 rounded-full border border-[#d5dcdb]">
                      {featuredPost.tag}
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0b2f3a] group-hover:text-[#f05a28] transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-sm md:text-base text-[#51626a] line-clamp-3 leading-relaxed">
                    {featuredPost.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-[#51626a]">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#0b2f3a] text-[#ffd100] flex items-center justify-center font-black text-xs shadow-sm">
                        {featuredPost.author?.avatarInitials || "DCW"}
                      </div>
                      <span className="font-bold text-[#0b2f3a]">
                        {featuredPost.author?.name || "DCW Logistics Team"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-[#f05a28]" />
                      <span>{featuredPost.readTime || "5 min read"}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#f05a28]" />
                      <span>{featuredPost.publishedDate}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 bg-[#f05a28] hover:bg-[#c2410c] text-white text-xs md:text-sm font-bold px-5 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Read Full Article <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <div className="h-64 md:h-80 w-full rounded-2xl overflow-hidden relative shadow-inner bg-gradient-to-br from-[#0b2f3a] via-[#14434f] to-[#08242c] flex flex-col items-center justify-center text-white p-6 group-hover:scale-[1.02] transition-transform duration-300">
                      {featuredPost.previewImage ? (
                        <img
                          src={featuredPost.previewImage}
                          alt={featuredPost.previewImageAlt || featuredPost.title}
                          className="w-full h-full object-cover"
                        />
                      ) : featuredPost.bannerImage ? (
                        <img
                          src={featuredPost.bannerImage}
                          alt={featuredPost.bannerImageAlt || featuredPost.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          <div className="text-6xl mb-3 drop-shadow-md">
                            {featuredPost.icon || "🇨🇦"}
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest text-[#ffd100] text-center">
                            DCW Official Guide
                          </span>
                        </>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* BLOG GRID */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-black text-[#0b2f3a] tracking-tight">
                  {filter === "all" ? "All Articles & Updates" : `${CATEGORIES.find((c) => c.id === filter)?.label || "Articles"}`}
                </h3>
                <p className="text-xs text-[#51626a] mt-1">
                  Showing {filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>

            {loading ? (
              <div className="py-24 text-center">
                <RefreshCw size={36} className="animate-spin text-[#f05a28] mx-auto mb-3" />
                <p className="text-sm font-bold text-[#51626a]">Loading articles...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#d5dcdb] p-16 text-center shadow-sm">
                <p className="text-base font-bold text-[#0b2f3a]">
                  No articles found in this category yet.
                </p>
                <p className="text-xs text-[#51626a] mt-1">
                  Check back soon or choose another category above.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post._id || post.id || post.slug}
                    className="bg-white rounded-2xl border border-[#d5dcdb] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
                  >
                    <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden">
                      <div className="h-48 w-full bg-gradient-to-br from-[#0b2f3a] to-[#14434f] flex items-center justify-center text-white overflow-hidden">
                        {post.previewImage ? (
                          <img
                            src={post.previewImage}
                            alt={post.previewImageAlt || post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        ) : post.bannerImage ? (
                          <img
                            src={post.bannerImage}
                            alt={post.bannerImageAlt || post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        ) : (
                          <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                            {post.icon || "📦"}
                          </div>
                        )}
                      </div>
                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#0b2f3a] text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md transition-transform duration-200 group-hover:scale-105">
                        {post.tag}
                      </span>
                    </Link>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <Link href={`/blog/${post.slug}`}>
                          <h4 className="text-lg font-bold text-[#0b2f3a] group-hover:text-[#f05a28] transition-colors duration-200 line-clamp-2 leading-snug">
                            {post.title}
                          </h4>
                        </Link>
                        <p className="text-xs text-[#51626a] line-clamp-3 leading-relaxed">
                          {post.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#eef1f0] flex items-center justify-between text-xs text-[#51626a]">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#0b2f3a] text-[#ffd100] flex items-center justify-center font-bold text-[10px] transition-transform duration-200 group-hover:scale-110">
                            {post.author?.avatarInitials || "DCW"}
                          </div>
                          <span className="font-semibold text-[#0b2f3a] text-[11px] truncate max-w-[120px]">
                            {post.author?.name || "DCW Team"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 font-bold text-[#f05a28]">
                          <span>{post.readTime || "5 min"}</span>
                          <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* NEWSLETTER SUBSCRIBE SECTION */}
          <section className="bg-gradient-to-br from-[#0b2f3a] via-[#0e3b48] to-[#08242c] text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="max-w-2xl relative z-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#ffd100]/20 text-[#ffd100] border border-[#ffd100]/30">
                <Mail size={13} /> DCW Courier Dispatch
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Stay updated on Canadian customs tariffs &amp; freight rates
              </h3>
              <p className="text-sm text-[#d5dcdb] leading-relaxed">
                Join our newsletter to receive policy changes from CBSA, seasonal festive deadlines, and exclusive discount promo codes straight to your inbox.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/60 focus:outline-none focus:border-[#ffd100] flex-1"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="bg-[#f05a28] hover:bg-[#c2410c] text-white font-bold text-xs md:text-sm px-6 py-3 rounded-xl transition shadow-md whitespace-nowrap disabled:opacity-50"
                >
                  {subscribing ? "Subscribing..." : "Subscribe"}
                </button>
              </form>

              {newsletterMessage && (
                <div className="flex items-center gap-2 text-xs font-bold text-[#ffd100] pt-1">
                  <CheckCircle size={15} />
                  <span>{newsletterMessage}</span>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

