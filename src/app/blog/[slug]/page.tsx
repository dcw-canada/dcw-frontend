// src/app/blog/[slug]/page.tsx
"use client";

import React, { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { type BlogPost, type BlogBlock, BLOG_POSTS } from "../data";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Share2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/api$/, "");

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

function SlideshowBlock({ block }: { block: BlogBlock }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = block.images || [];

  if (images.length === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[currentIndex];

  return (
    <div className="my-8 bg-[#eef1f0] rounded-2xl p-4 border border-[#d5dcdb] overflow-hidden shadow-sm">
      <div className="relative rounded-xl overflow-hidden bg-black/5 aspect-[16/9] flex items-center justify-center">
        {currentImage.src ? (
          <img
            src={currentImage.src}
            alt={currentImage.alt || `Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-xs text-[#51626a] font-bold">No Image Provided</div>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#0b2f3a] shadow-lg flex items-center justify-center transition-all hover:scale-105"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#0b2f3a] shadow-lg flex items-center justify-center transition-all hover:scale-105"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-3 px-1 text-xs text-[#51626a]">
        {currentImage.caption ? (
          <span className="italic">{currentImage.caption}</span>
        ) : (
          <span></span>
        )}

        {images.length > 1 && (
          <div className="flex items-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-[#f05a28] w-5"
                    : "bg-[#d5dcdb] hover:bg-[#51626a]"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SingleBlogPostPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs/${slug}`);
        const data = await res.json();
        if (data.success && data.data) {
          setPost(data.data);

          // Fetch related
          const allRes = await fetch(`${API_BASE}/api/blogs`);
          const allData = await allRes.json();
          if (allData.success && Array.isArray(allData.data)) {
            const allPosts: BlogPost[] = allData.data;
            const currentPost: BlogPost = data.data;
            const rel = allPosts
              .filter((p) => p.slug !== slug && p.category === currentPost.category)
              .slice(0, 3);
            if (rel.length < 3) {
              const extra = allPosts.filter(
                (p) => p.slug !== slug && p.category !== currentPost.category
              );
              rel.push(...extra.slice(0, 3 - rel.length));
            }
            setRelated(rel);
          }
        } else {
          // Check static local fallback
          const local = BLOG_POSTS.find((p) => p.slug === slug);
          if (local) {
            setPost(local);
            setRelated(BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3));
          }
        }
      } catch (err) {
        console.warn("Failed to load post from API, checking local fallback:", err);
        const local = BLOG_POSTS.find((p) => p.slug === slug);
        if (local) {
          setPost(local);
          setRelated(BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3));
        }
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [slug]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (loading && !post) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-32 space-y-3">
          <RefreshCw size={36} className="animate-spin text-[#f05a28]" />
          <p className="text-sm font-bold text-[#51626a]">Loading article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  const renderBlock = (block: BlogBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        if (
          block.src &&
          (block.layout === "left-image" || block.layout === "right-image")
        ) {
          const isLeft = block.layout === "left-image";
          return (
            <div
              key={index}
              className={`my-6 flex flex-col md:flex-row gap-6 items-center ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="w-full md:w-56 shrink-0 space-y-1">
                <div className="aspect-square rounded-2xl overflow-hidden border border-[#d5dcdb] bg-[#eef1f0] shadow-sm">
                  <img
                    src={block.src}
                    alt={block.alt || "Illustration"}
                    className="w-full h-full object-cover"
                  />
                </div>
                {block.caption && (
                  <p className="text-[11px] text-[#51626a] italic text-center">
                    {block.caption}
                  </p>
                )}
              </div>
              <div className="flex-1 text-base md:text-lg text-[#334155] leading-relaxed">
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => (
                      <p className="mb-3 whitespace-pre-wrap" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a
                        className="text-[#f05a28] font-bold underline hover:text-[#c2410c]"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                  }}
                >
                  {block.text || ""}
                </ReactMarkdown>
              </div>
            </div>
          );
        }

        if (
          block.src &&
          (block.layout === "top-image" || block.layout === "bottom-image")
        ) {
          const isTop = block.layout === "top-image";
          return (
            <div key={index} className="my-6 space-y-4">
              {isTop && (
                <div className="rounded-2xl overflow-hidden border border-[#d5dcdb] bg-[#eef1f0]">
                  <img
                    src={block.src}
                    alt={block.alt || "Article graphic"}
                    className="w-full h-auto max-h-96 object-cover"
                  />
                  {block.caption && (
                    <p className="text-xs text-[#51626a] italic p-2 text-center bg-[#eef1f0]">
                      {block.caption}
                    </p>
                  )}
                </div>
              )}
              <div className="text-base md:text-lg text-[#334155] leading-relaxed">
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => (
                      <p className="mb-3 whitespace-pre-wrap" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a
                        className="text-[#f05a28] font-bold underline hover:text-[#c2410c]"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                  }}
                >
                  {block.text || ""}
                </ReactMarkdown>
              </div>
              {!isTop && (
                <div className="rounded-2xl overflow-hidden border border-[#d5dcdb] bg-[#eef1f0]">
                  <img
                    src={block.src}
                    alt={block.alt || "Article graphic"}
                    className="w-full h-auto max-h-96 object-cover"
                  />
                  {block.caption && (
                    <p className="text-xs text-[#51626a] italic p-2 text-center bg-[#eef1f0]">
                      {block.caption}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        }

        return (
          <div
            key={index}
            className="my-4 text-base md:text-lg text-[#334155] leading-relaxed"
          >
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => (
                  <p className="mb-3 whitespace-pre-wrap" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-[#f05a28] font-bold underline hover:text-[#c2410c]"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
              }}
            >
              {block.text || ""}
            </ReactMarkdown>
          </div>
        );

      case "subheading":
        return (
          <h2
            key={index}
            className="text-2xl md:text-3xl font-black text-[#0b2f3a] tracking-tight mt-10 mb-4 pt-4 border-t border-[#d5dcdb]/40"
          >
            {block.text}
          </h2>
        );

      case "heading":
        const HeadingTag =
          block.style === "h3" ? "h3" : block.style === "h4" ? "h4" : "h2";
        const headingClass =
          HeadingTag === "h3"
            ? "text-xl md:text-2xl font-black text-[#0b2f3a] mt-8 mb-3"
            : HeadingTag === "h4"
            ? "text-lg md:text-xl font-bold text-[#0b2f3a] mt-6 mb-2"
            : "text-2xl md:text-3xl font-black text-[#0b2f3a] tracking-tight mt-10 mb-4 pt-4 border-t border-[#d5dcdb]/40";
        return React.createElement(
          HeadingTag,
          { key: index, className: headingClass },
          block.text
        );

      case "divider":
        return <hr key={index} className="my-10 border-[#d5dcdb]" />;

      case "slideshow":
        return <SlideshowBlock key={index} block={block} />;

      case "table":
        if (!block.tableData || block.tableData.length === 0) return null;
        return (
          <div
            key={index}
            className="my-8 rounded-2xl overflow-hidden border border-[#d5dcdb] bg-white shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#0b2f3a] text-white">
                    {block.tableData[0].map((header, i) => (
                      <th
                        key={i}
                        className="px-6 py-3.5 font-bold uppercase tracking-wider text-xs"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eef1f0] text-[#334155]">
                  {block.tableData.slice(1).map((row, rowIdx) => (
                    <tr
                      key={rowIdx}
                      className={
                        rowIdx % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"
                      }
                    >
                      {row.map((cell, colIdx) => (
                        <td key={colIdx} className="px-6 py-3.5 font-medium">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "list":
        const isNumbered = block.style === "numbered";
        const ListTag = isNumbered ? "ol" : "ul";
        return (
          <ListTag
            key={index}
            className={`my-6 space-y-2.5 text-base md:text-lg text-[#334155] ${
              isNumbered ? "list-decimal pl-6" : "list-disc pl-6"
            }`}
          >
            {block.items?.map((item, itemIdx) => (
              <li key={itemIdx} className="leading-relaxed">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <>{children}</>,
                    a: ({ node, ...props }) => (
                      <a
                        className="text-[#f05a28] font-bold underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                  }}
                >
                  {item || ""}
                </ReactMarkdown>
              </li>
            ))}
          </ListTag>
        );

      case "callout":
        return (
          <div
            key={index}
            className="my-8 bg-amber-50/70 border-l-4 border-l-[#f05a28] border border-amber-200/80 rounded-r-2xl p-6 shadow-sm"
          >
            <div className="text-base text-amber-950 font-medium leading-relaxed">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-0">{children}</p>,
                  a: ({ node, ...props }) => (
                    <a
                      className="text-[#f05a28] font-bold underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),
                }}
              >
                {block.text || ""}
              </ReactMarkdown>
            </div>
            {block.buttonText && block.buttonLink && (
              <div className="mt-4">
                <Link
                  href={block.buttonLink}
                  className="inline-flex items-center gap-2 bg-[#f05a28] hover:bg-[#c2410c] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm"
                >
                  {block.buttonText} <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>
        );

      case "image":
        return (
          <div key={index} className="my-8 space-y-2 text-center">
            {block.src ? (
              <div className="rounded-2xl overflow-hidden border border-[#d5dcdb] bg-[#eef1f0] shadow-sm inline-block max-w-full">
                <img
                  src={block.src}
                  alt={block.alt || "Article Illustration"}
                  className="w-full h-auto max-h-[500px] object-cover"
                />
              </div>
            ) : (
              <div className="h-60 bg-[#eef1f0] rounded-2xl border-2 border-dashed border-[#d5dcdb] flex items-center justify-center text-[#51626a] font-bold text-xs">
                📸 {block.alt || "Illustration Placeholder"}
              </div>
            )}
            {block.caption && (
              <p className="text-xs text-[#51626a] italic">
                {block.caption}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0b2f3a] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-[#d5dcdb]/60 py-3.5">
          <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#51626a] hover:text-[#f05a28] transition-colors"
            >
              <ArrowLeft size={14} /> Back to all articles
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#51626a] hover:text-[#0b2f3a] bg-[#eef1f0] hover:bg-[#d5dcdb] px-3 py-1.5 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-green-600" />
                  <span className="text-green-600">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={13} />
                  <span>Share Article</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Article Container */}
        <article className="max-w-4xl mx-auto px-6 mt-10">
          {/* Header */}
          <header className="space-y-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="bg-[#f05a28]/10 text-[#f05a28] text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
                {post.tag}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0b2f3a] tracking-tight leading-[1.15]">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-[#51626a] leading-relaxed">
              {post.description}
            </p>

            {/* Author / Date / Time */}
            <div className="pt-4 border-t border-[#d5dcdb] flex flex-wrap items-center gap-6 text-xs text-[#51626a]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#0b2f3a] text-[#ffd100] flex items-center justify-center font-black text-xs shadow-sm">
                  {post.author?.avatarInitials || "DCW"}
                </div>
                <div>
                  <div className="font-bold text-[#0b2f3a]">
                    {post.author?.name || "DCW Logistics Team"}
                  </div>
                  <div className="text-[11px] text-[#51626a]">Official Publication</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 font-medium">
                <Calendar size={14} className="text-[#f05a28]" />
                <span>{post.publishedDate}</span>
              </div>

              <div className="flex items-center gap-1.5 font-medium">
                <Clock size={14} className="text-[#f05a28]" />
                <span>{post.readTime || "5 min read"}</span>
              </div>
            </div>
          </header>

          {/* Banner Graphic / Photo */}
          {(post.bannerImage || post.previewImage) && (
            <div className="rounded-3xl overflow-hidden mb-12 border border-[#d5dcdb] shadow-md bg-slate-900">
              <picture>
                {post.mobileBannerImage && (
                  <source
                    media="(max-width: 640px)"
                    srcSet={post.mobileBannerImage}
                  />
                )}
                <img
                  src={post.bannerImage || post.previewImage}
                  alt={post.bannerImageAlt || post.title}
                  className="w-full h-auto max-h-[460px] object-cover"
                />
              </picture>
            </div>
          )}

          {/* Article Body */}
          <div className="space-y-4">
            {post.content && post.content.length > 0 ? (
              post.content.map((block, idx) => renderBlock(block, idx))
            ) : (
              <p className="text-[#51626a] italic">No content blocks available.</p>
            )}
          </div>

          {/* CTA Box at Bottom of Article */}
          <div className="my-16 bg-gradient-to-br from-[#0b2f3a] via-[#14434f] to-[#08242c] rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#ffd100]">
                Ready to ship to Canada?
              </span>
              <h3 className="text-2xl font-black text-white">
                Get an instant quote or book your pickup today
              </h3>
              <p className="text-xs md:text-sm text-[#d5dcdb] max-w-lg">
                Door-to-door courier service across India to all Canadian addresses with full customs clearance support.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/get-quote"
                className="bg-[#f05a28] hover:bg-[#c2410c] text-white text-xs md:text-sm font-bold px-6 py-3 rounded-xl transition shadow-md text-center"
              >
                Get Quote
              </Link>
              <Link
                href="/book-shipment"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs md:text-sm font-bold px-6 py-3 rounded-xl transition text-center"
              >
                Book Shipment
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="border-t border-[#d5dcdb] pt-12 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-[#0b2f3a]">
                  Related Articles &amp; Insights
                </h3>
                <Link
                  href="/blog"
                  className="text-xs font-bold text-[#f05a28] hover:underline flex items-center gap-1"
                >
                  View all <ArrowRight size={13} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="bg-white rounded-2xl border border-[#d5dcdb] p-5 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#f05a28]">
                        {rel.tag}
                      </span>
                      <h4 className="text-sm font-bold text-[#0b2f3a] group-hover:text-[#f05a28] transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-[#51626a] line-clamp-2">
                        {rel.description}
                      </p>
                    </div>
                    <div className="pt-4 flex items-center justify-between text-[11px] text-[#51626a] font-medium">
                      <span>{rel.readTime || "5 min"}</span>
                      <span className="text-[#f05a28] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read <ArrowRight size={11} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}

