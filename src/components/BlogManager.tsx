// src/components/BlogManager.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  FileText,
  Check,
  AlertCircle,
  X,
  AlignLeft,
  Heading,
  List,
  HelpCircle,
  Image as ImageIcon,
  Layers,
  Table as TableIcon,
  Link as LinkIcon,
  Bold,
  Italic,
  Link2Off,
  ExternalLink,
} from "lucide-react";
import { BlogBlock, BlogPost, CATEGORIES } from "@/app/blog/data";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
).replace(/\/api$/, "");

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  label?: string;
}

function ImageUploadField({
  value,
  onChange,
  placeholder = "Image URL",
  label,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE}/api/admin/upload-image`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        onChange(data.url);
      } else {
        alert(data.message || "Failed to upload image");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-xs font-bold text-[#51626a] uppercase">
          {label}
        </label>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border border-[#d5dcdb] rounded-lg p-2 text-sm focus:outline-none focus:border-[#f05a28] bg-white text-[#0b2f3a]"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <label className="flex items-center justify-center px-3 py-2 bg-[#eef1f0] hover:bg-[#d5dcdb] border border-[#d5dcdb] rounded-lg cursor-pointer text-xs font-bold text-[#0b2f3a] transition-colors whitespace-nowrap min-w-[100px] shadow-sm select-none">
          {uploading ? (
            <span className="flex items-center gap-1.5">
              <RefreshCw size={12} className="animate-spin" /> Uploading...
            </span>
          ) : (
            "Upload File"
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
}

function MarkdownEditor({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [savedRange, setSavedRange] = useState<Range | null>(null);

  // Link Hover Popover States
  const [activeLinkEl, setActiveLinkEl] = useState<HTMLAnchorElement | null>(null);
  const [isEditingPopoverLink, setIsEditingPopoverLink] = useState(false);
  const [popoverLinkUrlInput, setPopoverLinkUrlInput] = useState("");
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const popoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keep track of the last value to prevent infinite render loops
  const lastValueRef = useRef(value);

  // Helper to convert Markdown to HTML
  const markdownToHtml = (md: string): string => {
    if (!md) return "";
    let html = md;

    // Escape HTML characters
    html = html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Bold-Italic: ***text***
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");

    // Bold: **text**
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Italic: *text*
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Link: [text](url)
    html = html.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#f05a28;text-decoration:underline;">$1</a>'
    );

    // Convert newlines to <br>
    html = html.replace(/\n/g, "<br>");

    return html;
  };

  // Helper to convert HTML back to Markdown
  const htmlToMarkdown = (html: string): string => {
    if (!html) return "";

    let doc: Document;
    try {
      doc = new DOMParser().parseFromString(html, "text/html");
    } catch {
      return html;
    }

    const body = doc.body;

    function processNode(node: Node): string {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent || "";
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tagName = el.tagName.toLowerCase();

        let childrenVal = "";
        for (let i = 0; i < el.childNodes.length; i++) {
          childrenVal += processNode(el.childNodes[i]);
        }

        switch (tagName) {
          case "strong":
          case "b":
            return childrenVal.trim() ? `**${childrenVal}**` : "";
          case "em":
          case "i":
            return childrenVal.trim() ? `*${childrenVal}*` : "";
          case "a":
            const href = el.getAttribute("href") || "";
            return childrenVal.trim() ? `[${childrenVal}](${href})` : "";
          case "br":
            return "\n";
          case "p":
          case "div":
            return childrenVal ? `${childrenVal}\n` : "";
          default:
            return childrenVal;
        }
      }
      return "";
    }

    let markdown = "";
    for (let i = 0; i < body.childNodes.length; i++) {
      markdown += processNode(body.childNodes[i]);
    }

    return markdown
      .replace(/\u00A0/g, " ")
      .replace(/\r/g, "")
      .replace(/\n{3,}/g, "\n\n");
  };

  // Sync state changes from outside
  useEffect(() => {
    if (editorRef.current) {
      const currentMarkdown = htmlToMarkdown(editorRef.current.innerHTML);
      if (value !== currentMarkdown) {
        editorRef.current.innerHTML = markdownToHtml(value);
        lastValueRef.current = value;
        editorRef.current.querySelectorAll("a").forEach((a) => {
          (a as HTMLElement).style.color = "#f05a28";
          (a as HTMLElement).style.textDecoration = "underline";
        });
      }
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      const markdown = htmlToMarkdown(html);
      lastValueRef.current = markdown;
      onChange(markdown);
    }
  };

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      setSavedRange(sel.getRangeAt(0));
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (sel && savedRange) {
      sel.removeAllRanges();
      sel.addRange(savedRange);
    }
  };

  const executeCommand = (command: string, val: string = "") => {
    if (editorRef.current) {
      editorRef.current.focus();
    }

    const sel = window.getSelection();
    const hasSelection = sel && !sel.isCollapsed;

    document.execCommand(command, false, val);

    if (hasSelection && sel && sel.rangeCount > 0) {
      sel.collapseToEnd();

      const range = sel.getRangeAt(0);
      const node = range.startContainer;
      const parentEl = node.parentElement;

      if (
        parentEl &&
        ["STRONG", "B", "EM", "I", "A"].includes(parentEl.tagName)
      ) {
        let outermostEl = parentEl;
        while (
          outermostEl.parentNode &&
          outermostEl.parentNode.nodeType === Node.ELEMENT_NODE &&
          (outermostEl.parentNode as HTMLElement).tagName !== "DIV" &&
          ["STRONG", "B", "EM", "I", "A"].includes(
            (outermostEl.parentNode as HTMLElement).tagName
          )
        ) {
          outermostEl = outermostEl.parentNode as HTMLElement;
        }

        const spaceNode = document.createTextNode("\u00A0");
        if (outermostEl.nextSibling) {
          outermostEl.parentNode?.insertBefore(
            spaceNode,
            outermostEl.nextSibling
          );
        } else {
          outermostEl.parentNode?.appendChild(spaceNode);
        }

        const newRange = document.createRange();
        newRange.setStart(spaceNode, 1);
        newRange.setEnd(spaceNode, 1);
        sel.removeAllRanges();
        sel.addRange(newRange);
      }
    }

    handleInput();
  };

  const styleAllLinks = () => {
    if (editorRef.current) {
      editorRef.current.querySelectorAll("a").forEach((a) => {
        (a as HTMLElement).style.color = "#f05a28";
        (a as HTMLElement).style.textDecoration = "underline";
      });
    }
  };

  const addLink = () => {
    if (!linkUrl) return;
    restoreSelection();
    executeCommand("createLink", linkUrl);
    styleAllLinks();
    setShowLinkInput(false);
    setLinkUrl("");
  };

  const handleMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a");
    if (anchor && editorRef.current) {
      if (popoverTimeoutRef.current) {
        clearTimeout(popoverTimeoutRef.current);
        popoverTimeoutRef.current = null;
      }
      setActiveLinkEl(anchor);
      setPopoverLinkUrlInput(anchor.getAttribute("href") || "");

      const rect = anchor.getBoundingClientRect();
      const editorRect = editorRef.current.getBoundingClientRect();
      setPopoverPosition({
        top: rect.top - editorRect.top - 46,
        left: rect.left - editorRect.left + rect.width / 2 - 110,
      });
    }
  };

  const handleMouseLeave = () => {
    popoverTimeoutRef.current = setTimeout(() => {
      if (!isEditingPopoverLink) {
        setActiveLinkEl(null);
      }
    }, 300);
  };

  const handlePopoverMouseEnter = () => {
    if (popoverTimeoutRef.current) {
      clearTimeout(popoverTimeoutRef.current);
      popoverTimeoutRef.current = null;
    }
  };

  const handlePopoverMouseLeave = () => {
    if (!isEditingPopoverLink) {
      setActiveLinkEl(null);
    }
  };

  const savePopoverLink = () => {
    if (activeLinkEl) {
      activeLinkEl.setAttribute("href", popoverLinkUrlInput);
      setIsEditingPopoverLink(false);
      setActiveLinkEl(null);
      handleInput();
    }
  };

  const removePopoverLink = () => {
    if (activeLinkEl) {
      activeLinkEl.replaceWith(...activeLinkEl.childNodes);
      setActiveLinkEl(null);
      handleInput();
    }
  };

  return (
    <div className="flex flex-col relative w-full">
      {/* Popover on Link Hover */}
      {activeLinkEl && (
        <div
          className="absolute z-50 bg-white border border-[#d5dcdb] rounded-lg shadow-xl p-2.5 flex items-center gap-2 text-xs"
          style={{
            top: `${popoverPosition.top}px`,
            left: `${popoverPosition.left}px`,
            minWidth: "240px",
          }}
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
        >
          {isEditingPopoverLink ? (
            <div className="flex items-center gap-1.5 w-full">
              <input
                type="text"
                className="border border-[#d5dcdb] rounded px-2 py-1 text-xs focus:outline-none focus:border-[#f05a28] flex-1 text-[#0b2f3a]"
                value={popoverLinkUrlInput}
                onChange={(e) => setPopoverLinkUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    savePopoverLink();
                  }
                }}
                autoFocus
              />
              <button
                type="button"
                className="bg-[#f05a28] hover:bg-[#c2410c] text-white px-2 py-1 rounded font-bold transition-colors"
                onClick={savePopoverLink}
              >
                Save
              </button>
              <button
                type="button"
                className="text-[#51626a] hover:text-[#0b2f3a] px-1 py-1 rounded"
                onClick={() => setIsEditingPopoverLink(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <a
                href={activeLinkEl.href}
                target="_blank"
                rel="noreferrer"
                className="text-[#f05a28] hover:underline font-bold truncate max-w-[140px] flex items-center gap-1"
              >
                <ExternalLink size={11} />
                {activeLinkEl.getAttribute("href")}
              </a>
              <div className="flex items-center gap-1 border-l pl-2 border-[#d5dcdb] shrink-0">
                <button
                  type="button"
                  className="text-[#0b2f3a] hover:text-[#f05a28] font-bold transition-colors px-1"
                  onClick={() => {
                    setPopoverLinkUrlInput(
                      activeLinkEl.getAttribute("href") || ""
                    );
                    setIsEditingPopoverLink(true);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 font-bold px-1"
                  onClick={removePopoverLink}
                >
                  Unlink
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-1 mb-0 bg-[#eef1f0] p-1.5 rounded-t-lg border border-[#d5dcdb] border-b-0 w-full overflow-x-auto select-none">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            executeCommand("bold");
          }}
          className="p-1 hover:bg-[#d5dcdb] rounded text-xs text-[#0b2f3a] transition-colors shrink-0 flex items-center justify-center w-6 h-6 font-bold"
          title="Bold"
        >
          <Bold size={14} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            executeCommand("italic");
          }}
          className="p-1 hover:bg-[#d5dcdb] rounded text-xs text-[#0b2f3a] transition-colors shrink-0 flex items-center justify-center w-6 h-6 italic"
          title="Italic"
        >
          <Italic size={14} />
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            saveSelection();
            setShowLinkInput(!showLinkInput);
          }}
          className="px-2 py-1 hover:bg-[#d5dcdb] rounded text-xs font-bold text-[#0b2f3a] transition-colors flex items-center gap-1 shrink-0 h-6"
          title="Link"
        >
          <LinkIcon size={12} /> Link
        </button>
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            executeCommand("unlink");
          }}
          className="px-2 py-1 hover:bg-[#d5dcdb] rounded text-xs font-bold text-red-500 hover:text-red-700 transition-colors shrink-0 h-6"
          title="Remove Link"
        >
          <Link2Off size={12} /> Unlink
        </button>

        {showLinkInput && (
          <div className="flex items-center gap-1 ml-2 pl-2 border-l border-[#d5dcdb] animate-in fade-in duration-200">
            <input
              type="text"
              placeholder="https://"
              className="px-2 py-0.5 text-xs border border-[#d5dcdb] rounded w-36 md:w-48 focus:outline-none focus:border-[#f05a28] h-6 bg-white text-[#0b2f3a]"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addLink();
                }
              }}
              autoFocus
            />
            <button
              type="button"
              className="px-2 py-0.5 bg-[#f05a28] hover:bg-[#c2410c] transition-colors text-white rounded text-xs font-bold shrink-0 h-6"
              onClick={addLink}
            >
              Add
            </button>
            <button
              type="button"
              className="px-2 py-0.5 text-[#51626a] hover:text-[#0b2f3a] rounded text-xs shrink-0 h-6"
              onClick={() => {
                setShowLinkInput(false);
                setLinkUrl("");
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Editor Body */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        className="w-full border border-[#d5dcdb] rounded-b-lg p-3 focus:border-[#f05a28] focus:outline-none text-sm bg-white text-[#0b2f3a] overflow-y-auto leading-relaxed"
        style={{ minHeight: `${rows * 28}px`, maxHeight: "350px" }}
        data-placeholder={placeholder}
      />
    </div>
  );
}

export default function BlogManager() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [insertMenuIndex, setInsertMenuIndex] = useState<number | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("guides");
  const [tag, setTag] = useState("Shipping Guides");
  const [icon, setIcon] = useState("🇨🇦");
  const [description, setDescription] = useState("");
  const [readTime, setReadTime] = useState("5 min");
  const [featured, setFeatured] = useState(false);
  const [publishedDate, setPublishedDate] = useState("");
  const [authorName, setAuthorName] = useState("DCW Logistics Team");
  const [authorInitials, setAuthorInitials] = useState("DCW");
  const [bannerImage, setBannerImage] = useState("");
  const [bannerImageAlt, setBannerImageAlt] = useState("");
  const [mobileBannerImage, setMobileBannerImage] = useState("");
  const [mobileBannerImageAlt, setMobileBannerImageAlt] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [previewImageAlt, setPreviewImageAlt] = useState("");
  const [activeBannerTab, setActiveBannerTab] = useState<"desktop" | "mobile">(
    "desktop"
  );
  const [contentBlocks, setContentBlocks] = useState<BlogBlock[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/blogs`);
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      showMsg("Failed to connect to backend", "error");
    } finally {
      setLoading(false);
    }
  };

  const showMsg = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleOpenNewForm = () => {
    setEditingBlog(null);
    setTitle("");
    setMetaTitle("");
    setMetaDescription("");
    setSlug("");
    setCategory("guides");
    setTag("Shipping Guides");
    setIcon("🇨🇦");
    setDescription("");
    setReadTime("5 min");
    setFeatured(false);
    setPublishedDate(
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );
    setAuthorName("DCW Logistics Team");
    setAuthorInitials("DCW");
    setBannerImage("");
    setBannerImageAlt("");
    setMobileBannerImage("");
    setMobileBannerImageAlt("");
    setPreviewImage("");
    setPreviewImageAlt("");
    setActiveBannerTab("desktop");
    setContentBlocks([{ type: "paragraph", text: "", layout: "none" }]);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (blog: BlogPost) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setMetaTitle(blog.metaTitle || "");
    setMetaDescription(blog.metaDescription || "");
    setSlug(blog.slug);
    setCategory(blog.category);
    setTag(blog.tag);
    setIcon(blog.icon || "🇨🇦");
    setDescription(blog.description);
    setReadTime(blog.readTime || "5 min");
    setFeatured(Boolean(blog.featured));
    setPublishedDate(blog.publishedDate);
    setAuthorName(blog.author?.name || "DCW Logistics Team");
    setAuthorInitials(blog.author?.avatarInitials || "DCW");
    setBannerImage(blog.bannerImage || "");
    setBannerImageAlt(blog.bannerImageAlt || "");
    setMobileBannerImage(blog.mobileBannerImage || "");
    setMobileBannerImageAlt(blog.mobileBannerImageAlt || "");
    setPreviewImage(blog.previewImage || "");
    setPreviewImageAlt(blog.previewImageAlt || "");
    setActiveBannerTab("desktop");
    setContentBlocks(blog.content || []);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/admin/blogs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showMsg("Blog post deleted successfully", "success");
        fetchBlogs();
      } else {
        showMsg(data.message || "Failed to delete post", "error");
      }
    } catch (err) {
      console.error("Delete error:", err);
      showMsg("Failed to delete post", "error");
    }
  };

  // Block Helpers
  const addBlock = (
    type:
      | "paragraph"
      | "subheading"
      | "list"
      | "callout"
      | "image"
      | "heading"
      | "divider"
      | "slideshow"
      | "table",
    insertIndex?: number
  ) => {
    const newBlock: BlogBlock = { type };
    if (type === "paragraph") {
      newBlock.text = "";
      newBlock.layout = "none";
      newBlock.src = "";
      newBlock.alt = "";
      newBlock.caption = "";
    } else if (type === "subheading" || type === "callout") {
      newBlock.text = "";
    } else if (type === "heading") {
      newBlock.text = "";
      newBlock.style = "h2";
    } else if (type === "divider") {
      // visual only
    } else if (type === "slideshow") {
      newBlock.images = [];
    } else if (type === "table") {
      newBlock.tableData = [
        ["Header 1", "Header 2"],
        ["Row 1 Col 1", "Row 1 Col 2"],
      ];
    } else if (type === "list") {
      newBlock.items = [""];
      newBlock.style = "bullet";
    } else if (type === "image") {
      newBlock.src = "";
      newBlock.alt = "";
      newBlock.caption = "";
    }

    if (typeof insertIndex === "number") {
      const newBlocks = [...contentBlocks];
      newBlocks.splice(insertIndex, 0, newBlock);
      setContentBlocks(newBlocks);
    } else {
      setContentBlocks([...contentBlocks, newBlock]);
    }
  };

  const removeBlock = (index: number) => {
    setContentBlocks(contentBlocks.filter((_, idx) => idx !== index));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === contentBlocks.length - 1) return;

    const newBlocks = [...contentBlocks];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIdx];
    newBlocks[targetIdx] = temp;
    setContentBlocks(newBlocks);
  };

  const updateBlockField = (
    index: number,
    field: keyof BlogBlock,
    value: any
  ) => {
    const newBlocks = [...contentBlocks];
    newBlocks[index] = { ...newBlocks[index], [field]: value };
    setContentBlocks(newBlocks);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const blogData: BlogPost = {
      title,
      metaTitle,
      metaDescription,
      slug:
        slug ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      category,
      tag,
      icon,
      description,
      readTime,
      thumbClass:
        category === "gifting"
          ? "thumb-gifting"
          : category === "customs"
          ? "thumb-customs"
          : category === "logistics"
          ? "thumb-logistics"
          : "thumb-featured",
      featured,
      publishedDate,
      bannerImage,
      bannerImageAlt,
      mobileBannerImage,
      mobileBannerImageAlt,
      previewImage,
      previewImageAlt,
      author: {
        name: authorName,
        avatarInitials: authorInitials,
      },
      content: contentBlocks,
    };

    try {
      const url = editingBlog
        ? `${API_BASE}/api/admin/blogs/${editingBlog._id || editingBlog.id}`
        : `${API_BASE}/api/admin/blogs`;
      const method = editingBlog ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();
      if (data.success) {
        showMsg(
          editingBlog
            ? "Blog updated successfully!"
            : "Blog created successfully!",
          "success"
        );
        setIsFormOpen(false);
        fetchBlogs();
      } else {
        showMsg(data.message || "Operation failed", "error");
      }
    } catch (err) {
      console.error("Submit error:", err);
      showMsg("Failed to save blog post", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#d5dcdb]">
        <div>
          <h1 className="text-2xl font-black text-[#0b2f3a] tracking-tight">
            Blog Manager
          </h1>
          <p className="mt-1 text-xs text-[#51626a]">
            Publish educational articles and updates to connect with your customers.
          </p>
        </div>
        {!isFormOpen && (
          <button
            onClick={handleOpenNewForm}
            className="bg-[#f05a28] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#c2410c] transition-all duration-200 shadow-md hover:shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <Plus size={16} />
            Create Blog
          </button>
        )}
      </div>

      {/* Message feedback Banner */}
      {message && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 shadow-sm border ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <Check size={20} className="text-green-600 shrink-0" />
          ) : (
            <AlertCircle size={20} className="text-red-600 shrink-0" />
          )}
          <span className="text-sm font-semibold">{message.text}</span>
        </div>
      )}

      {/* Form Editor Section */}
      {isFormOpen ? (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white border border-[#d5dcdb] rounded-2xl p-6 md:p-8 space-y-6 shadow-sm"
        >
          <div className="flex justify-between items-center border-b border-[#d5dcdb] pb-4">
            <div>
              <h2 className="text-xl font-black text-[#0b2f3a]">
                {editingBlog ? "Edit Blog Post" : "New Blog Post"}
              </h2>
              <p className="text-xs text-[#51626a] mt-0.5">
                Fill in the details below to publish your article.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="text-[#51626a] hover:text-[#0b2f3a] p-1.5 rounded-lg hover:bg-[#eef1f0] transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#0b2f3a] uppercase mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full border border-[#d5dcdb] rounded-xl p-3 focus:border-[#f05a28] focus:outline-none text-sm text-[#0b2f3a] font-medium"
                placeholder="e.g. Sourcing from India to Canada"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0b2f3a] uppercase mb-1">
                Slug (URL endpoint)
              </label>
              <input
                type="text"
                className="w-full border border-[#d5dcdb] rounded-xl p-3 focus:border-[#f05a28] focus:outline-none text-sm text-[#0b2f3a] font-mono text-xs"
                placeholder="e.g. sourcing-from-india (leave blank to auto-generate)"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="admin-blog-category"
                className="block text-xs font-bold text-[#0b2f3a] uppercase mb-1"
              >
                Category
              </label>
              <select
                id="admin-blog-category"
                aria-label="Category"
                className="w-full border border-[#d5dcdb] rounded-xl p-3 focus:border-[#f05a28] focus:outline-none bg-white text-sm text-[#0b2f3a] font-medium"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  const found = CATEGORIES.find((c) => c.id === e.target.value);
                  if (found && found.id !== "all") {
                    setTag(found.label);
                  }
                }}
              >
                {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0b2f3a] uppercase mb-1">
                Category Tag (Display Name) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full border border-[#d5dcdb] rounded-xl p-3 focus:border-[#f05a28] focus:outline-none text-sm text-[#0b2f3a] font-medium"
                placeholder="e.g. Shipping Guides"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0b2f3a] uppercase mb-1">
                Icon / Emoji <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full border border-[#d5dcdb] rounded-xl p-3 focus:border-[#f05a28] focus:outline-none text-sm text-[#0b2f3a] font-medium"
                placeholder="e.g. 🇨🇦, 📦, ✈️"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#0b2f3a] uppercase mb-1">
                Read Time <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full border border-[#d5dcdb] rounded-xl p-3 focus:border-[#f05a28] focus:outline-none text-sm text-[#0b2f3a] font-medium"
                placeholder="e.g. 5 min"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0b2f3a] uppercase mb-1">
                Author Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full border border-[#d5dcdb] rounded-xl p-3 focus:border-[#f05a28] focus:outline-none text-sm text-[#0b2f3a] font-medium"
                placeholder="e.g. DCW Logistics Team"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0b2f3a] uppercase mb-1">
                Author Initials <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={3}
                className="w-full border border-[#d5dcdb] rounded-xl p-3 focus:border-[#f05a28] focus:outline-none text-sm text-[#0b2f3a] font-medium uppercase"
                placeholder="e.g. DCW"
                value={authorInitials}
                onChange={(e) =>
                  setAuthorInitials(
                    e.target.value.replace(/[^A-Za-z]/g, "").toUpperCase()
                  )
                }
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0b2f3a] uppercase mb-1">
                Published Date <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full border border-[#d5dcdb] rounded-xl p-3 focus:border-[#f05a28] focus:outline-none text-sm text-[#0b2f3a] font-medium"
                placeholder="e.g. November 14, 2026"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0b2f3a] uppercase mb-1">
              Short Summary / Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              className="w-full border border-[#d5dcdb] rounded-xl p-3 focus:border-[#f05a28] focus:outline-none text-sm text-[#0b2f3a] font-medium leading-relaxed"
              placeholder="Provide a quick snippet that displays on the home list card..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#0b2f3a] uppercase mb-1">
                Meta Title (SEO)
              </label>
              <input
                type="text"
                className="w-full border border-[#d5dcdb] rounded-xl p-3 focus:border-[#f05a28] focus:outline-none text-sm text-[#0b2f3a]"
                placeholder="e.g. Best Sourcing from India | DCW Solutions"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0b2f3a] uppercase mb-1">
                Meta Description (SEO)
              </label>
              <input
                type="text"
                className="w-full border border-[#d5dcdb] rounded-xl p-3 focus:border-[#f05a28] focus:outline-none text-sm text-[#0b2f3a]"
                placeholder="e.g. Learn how to source directly from India..."
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-[#0b2f3a] uppercase">
                Banner Image (Optional)
              </label>
              <div className="flex bg-[#eef1f0] rounded-lg p-1 border border-[#d5dcdb]">
                <button
                  type="button"
                  onClick={() => setActiveBannerTab("desktop")}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                    activeBannerTab === "desktop"
                      ? "bg-white shadow-sm text-[#0b2f3a]"
                      : "text-[#51626a] hover:text-[#0b2f3a]"
                  }`}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBannerTab("mobile")}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                    activeBannerTab === "mobile"
                      ? "bg-white shadow-sm text-[#0b2f3a]"
                      : "text-[#51626a] hover:text-[#0b2f3a]"
                  }`}
                >
                  Mobile
                </button>
              </div>
            </div>

            {activeBannerTab === "desktop" ? (
              <div className="animate-in fade-in duration-200 space-y-2">
                <ImageUploadField
                  value={bannerImage}
                  onChange={setBannerImage}
                  placeholder="e.g. /customs-banner.jpg or upload an image file"
                  label=""
                />
                <input
                  type="text"
                  className="w-full border border-[#d5dcdb] rounded-lg p-2.5 text-xs focus:border-[#f05a28] focus:outline-none text-[#0b2f3a]"
                  placeholder="Desktop Banner Alt Text"
                  value={bannerImageAlt}
                  onChange={(e) => setBannerImageAlt(e.target.value)}
                />
                <p className="text-[11px] text-[#51626a]">
                  Accepted dimensions:{" "}
                  <strong className="text-[#0b2f3a]">1200 x 440 pixels</strong>{" "}
                  (Landscape ratio).
                </p>
              </div>
            ) : (
              <div className="animate-in fade-in duration-200 space-y-2">
                <ImageUploadField
                  value={mobileBannerImage}
                  onChange={setMobileBannerImage}
                  placeholder="Upload mobile banner image"
                  label=""
                />
                <input
                  type="text"
                  className="w-full border border-[#d5dcdb] rounded-lg p-2.5 text-xs focus:border-[#f05a28] focus:outline-none text-[#0b2f3a]"
                  placeholder="Mobile Banner Alt Text"
                  value={mobileBannerImageAlt}
                  onChange={(e) => setMobileBannerImageAlt(e.target.value)}
                />
                <p className="text-[11px] text-[#51626a]">
                  Accepted dimensions:{" "}
                  <strong className="text-[#0b2f3a]">800 x 600 pixels</strong>{" "}
                  (4:3 ratio). Used on phones.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <ImageUploadField
              value={previewImage}
              onChange={setPreviewImage}
              placeholder="e.g. /preview.jpg or upload an image file"
              label="Preview Thumbnail Image (Optional)"
            />
            <input
              type="text"
              className="w-full border border-[#d5dcdb] rounded-lg p-2.5 text-xs focus:border-[#f05a28] focus:outline-none text-[#0b2f3a]"
              placeholder="Preview Image Alt Text"
              value={previewImageAlt}
              onChange={(e) => setPreviewImageAlt(e.target.value)}
            />
            <p className="text-[11px] text-[#51626a]">
              Accepted dimensions:{" "}
              <strong className="text-[#0b2f3a]">16:9 ratio</strong> (Landscape
              thumbnail on blog list).
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#eef1f0] rounded-xl border border-[#d5dcdb]">
            <input
              type="checkbox"
              id="featured"
              className="h-4 w-4 rounded border-[#d5dcdb] text-[#f05a28] focus:ring-[#f05a28]"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <label
              htmlFor="featured"
              className="text-xs font-bold text-[#0b2f3a] cursor-pointer"
            >
              Feature this post at the top of the blog page
            </label>
          </div>

          {/* Structured Content Blocks */}
          <div className="border-t border-[#d5dcdb] pt-6 space-y-4">
            <div className="mb-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#0b2f3a] mb-2 flex items-center gap-1.5">
                <Plus size={14} className="text-[#f05a28]" /> Append Section
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => addBlock("paragraph")}
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <AlignLeft size={13} /> Paragraph
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("heading")}
                  className="bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Heading size={13} /> Heading (H2-H4)
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("list")}
                  className="bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <List size={13} /> List Items
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("callout")}
                  className="bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <HelpCircle size={13} /> Callout Box
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("image")}
                  className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <ImageIcon size={13} /> Single Image
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("slideshow")}
                  className="bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Layers size={13} /> Slideshow
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("table")}
                  className="bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <TableIcon size={13} /> Table
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("divider")}
                  className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>—</span> Divider
                </button>
              </div>
            </div>

            <div className="space-y-5 bg-[#eef1f0] p-6 rounded-2xl border border-[#d5dcdb]">
              {contentBlocks.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-[#d5dcdb] rounded-xl bg-white">
                  <p className="text-sm text-[#51626a] font-medium">
                    No content blocks added yet. Choose a block type above to
                    construct your article.
                  </p>
                </div>
              ) : (
                contentBlocks.map((block, idx) => {
                  const getBlockStyles = (type: string) => {
                    switch (type) {
                      case "paragraph":
                        return {
                          border: "border-l-4 border-l-blue-500",
                          badge: "bg-blue-50 text-blue-700 border border-blue-200",
                          label: "Paragraph Text",
                          icon: <AlignLeft size={13} className="inline mr-1" />,
                        };
                      case "subheading":
                      case "heading":
                        return {
                          border: "border-l-4 border-l-amber-500",
                          badge: "bg-amber-50 text-amber-700 border border-amber-200",
                          label:
                            type === "subheading"
                              ? "Subheading"
                              : "Section Heading",
                          icon: <Heading size={13} className="inline mr-1" />,
                        };
                      case "list":
                        return {
                          border: "border-l-4 border-l-teal-500",
                          badge: "bg-teal-50 text-teal-700 border border-teal-200",
                          label: "List Items",
                          icon: <List size={13} className="inline mr-1" />,
                        };
                      case "callout":
                        return {
                          border: "border-l-4 border-l-rose-500",
                          badge: "bg-rose-50 text-rose-700 border border-rose-200",
                          label: "Callout Box",
                          icon: <HelpCircle size={13} className="inline mr-1" />,
                        };
                      case "image":
                        return {
                          border: "border-l-4 border-l-emerald-500",
                          badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
                          label: "Single Image",
                          icon: <ImageIcon size={13} className="inline mr-1" />,
                        };
                      case "slideshow":
                        return {
                          border: "border-l-4 border-l-violet-500",
                          badge: "bg-violet-50 text-violet-700 border border-violet-200",
                          label: "Image Slideshow",
                          icon: <Layers size={13} className="inline mr-1" />,
                        };
                      case "table":
                        return {
                          border: "border-l-4 border-l-cyan-500",
                          badge: "bg-cyan-50 text-cyan-700 border border-cyan-200",
                          label: "Data Table",
                          icon: <TableIcon size={13} className="inline mr-1" />,
                        };
                      case "divider":
                        return {
                          border: "border-l-4 border-l-slate-400",
                          badge: "bg-slate-100 text-slate-700 border border-slate-200",
                          label: "Horizontal Divider",
                          icon: <span className="inline mr-1">—</span>,
                        };
                      default:
                        return {
                          border: "border-l-4 border-l-gray-300",
                          badge: "bg-gray-50 text-gray-700 border border-gray-200",
                          label: "Block",
                          icon: null,
                        };
                    }
                  };

                  const blockMeta = getBlockStyles(block.type);

                  return (
                    <div key={idx} className="space-y-4">
                      {insertMenuIndex === idx && (
                        <div className="bg-white border-2 border-dashed border-[#f05a28]/40 rounded-xl p-4 shadow-sm relative animate-in fade-in duration-200">
                          <button
                            type="button"
                            onClick={() => setInsertMenuIndex(null)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 bg-[#eef1f0] rounded-full p-1"
                          >
                            <X size={14} />
                          </button>
                          <div className="text-xs font-bold text-[#f05a28] mb-3 uppercase tracking-wider flex items-center gap-1">
                            <Plus size={14} /> Insert Section
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                addBlock("paragraph", idx);
                                setInsertMenuIndex(null);
                              }}
                              className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs px-3 py-1.5 rounded-lg font-bold"
                            >
                              <AlignLeft size={12} className="inline mr-1" />
                              Paragraph
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                addBlock("heading", idx);
                                setInsertMenuIndex(null);
                              }}
                              className="bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-xs px-3 py-1.5 rounded-lg font-bold"
                            >
                              <Heading size={12} className="inline mr-1" />
                              Heading
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                addBlock("list", idx);
                                setInsertMenuIndex(null);
                              }}
                              className="bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 text-xs px-3 py-1.5 rounded-lg font-bold"
                            >
                              <List size={12} className="inline mr-1" />
                              List
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                addBlock("callout", idx);
                                setInsertMenuIndex(null);
                              }}
                              className="bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs px-3 py-1.5 rounded-lg font-bold"
                            >
                              <HelpCircle size={12} className="inline mr-1" />
                              Callout
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                addBlock("image", idx);
                                setInsertMenuIndex(null);
                              }}
                              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs px-3 py-1.5 rounded-lg font-bold"
                            >
                              <ImageIcon size={12} className="inline mr-1" />
                              Image
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                addBlock("slideshow", idx);
                                setInsertMenuIndex(null);
                              }}
                              className="bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200 text-xs px-3 py-1.5 rounded-lg font-bold"
                            >
                              <Layers size={12} className="inline mr-1" />
                              Slideshow
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                addBlock("table", idx);
                                setInsertMenuIndex(null);
                              }}
                              className="bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-200 text-xs px-3 py-1.5 rounded-lg font-bold"
                            >
                              <TableIcon size={12} className="inline mr-1" />
                              Table
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                addBlock("divider", idx);
                                setInsertMenuIndex(null);
                              }}
                              className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-xs px-3 py-1.5 rounded-lg font-bold"
                            >
                              <span className="inline mr-1">—</span>
                              Divider
                            </button>
                          </div>
                        </div>
                      )}

                      <div
                        className={`bg-white border border-[#d5dcdb] rounded-xl p-5 flex gap-4 items-start shadow-sm hover:shadow-md transition-all duration-200 ${blockMeta.border}`}
                      >
                        {/* Position Controllers */}
                        <div className="flex flex-col gap-1.5 text-[#51626a] self-stretch justify-center items-center px-1 border-r border-[#d5dcdb] pr-3.5">
                          <button
                            type="button"
                            onClick={() => moveBlock(idx, "up")}
                            disabled={idx === 0}
                            className="hover:text-[#f05a28] hover:bg-orange-50 p-1 rounded transition-colors disabled:opacity-20 disabled:hover:bg-transparent"
                            title="Move Up"
                          >
                            <ArrowUp size={16} />
                          </button>
                          <span className="bg-[#eef1f0] text-[#0b2f3a] rounded-md text-[10px] font-black w-6 h-6 flex items-center justify-center select-none shadow-inner">
                            {idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => moveBlock(idx, "down")}
                            disabled={idx === contentBlocks.length - 1}
                            className="hover:text-[#f05a28] hover:bg-orange-50 p-1 rounded transition-colors disabled:opacity-20 disabled:hover:bg-transparent"
                            title="Move Down"
                          >
                            <ArrowDown size={16} />
                          </button>
                        </div>

                        {/* Block Fields */}
                        <div className="flex-1 min-w-0 space-y-3">
                          <div className="flex justify-between items-center border-b border-[#eef1f0] pb-2">
                            <span
                              className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 ${blockMeta.badge}`}
                            >
                              {blockMeta.icon}
                              {blockMeta.label}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setInsertMenuIndex(idx)}
                                className="text-[11px] font-bold text-[#f05a28] hover:bg-orange-50 px-2 py-1 rounded transition-colors mr-1 flex items-center gap-1"
                                title="Insert new block above this one"
                              >
                                <Plus size={12} /> Above
                              </button>
                              <button
                                type="button"
                                onClick={() => setInsertMenuIndex(idx + 1)}
                                className="text-[11px] font-bold text-[#f05a28] hover:bg-orange-50 px-2 py-1 rounded transition-colors mr-2 flex items-center gap-1"
                                title="Insert new block below this one"
                              >
                                <Plus size={12} /> Below
                              </button>
                              <button
                                type="button"
                                onClick={() => removeBlock(idx)}
                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-all"
                                title="Delete Block"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Render custom fields based on block type */}
                          {block.type === "paragraph" && (
                            <div className="space-y-3">
                              <MarkdownEditor
                                rows={3}
                                placeholder="Write paragraph text here..."
                                value={block.text || ""}
                                onChange={(val) =>
                                  updateBlockField(idx, "text", val)
                                }
                              />
                              <div className="bg-[#eef1f0] p-3 rounded-xl border border-dashed border-[#d5dcdb] space-y-3">
                                <div className="text-xs font-bold text-[#0b2f3a] uppercase">
                                  Inline Image (Optional)
                                </div>
                                <div className="space-y-2">
                                  <ImageUploadField
                                    value={block.src || ""}
                                    onChange={(url) =>
                                      updateBlockField(idx, "src", url)
                                    }
                                    placeholder="Image URL or upload file"
                                    label="Image Source"
                                  />
                                  {(block.layout === "left-image" ||
                                    block.layout === "right-image") && (
                                    <p className="text-[10px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200 mt-1 font-semibold">
                                      💡 Left/Right layouts require a 1:1 square.
                                      Recommended: <strong>300 x 300 pixels</strong>.
                                    </p>
                                  )}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div>
                                      <label
                                        htmlFor={`alt-${idx}`}
                                        className="block text-[10px] font-bold text-[#51626a] uppercase"
                                      >
                                        Alt description
                                      </label>
                                      <input
                                        id={`alt-${idx}`}
                                        type="text"
                                        className="border border-[#d5dcdb] rounded-lg p-2 text-xs w-full focus:outline-none focus:border-[#f05a28] mt-1 bg-white text-[#0b2f3a]"
                                        placeholder="Alt description"
                                        value={block.alt || ""}
                                        onChange={(e) =>
                                          updateBlockField(
                                            idx,
                                            "alt",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                    <div>
                                      <label
                                        htmlFor={`layout-${idx}`}
                                        className="block text-[10px] font-bold text-[#51626a] uppercase"
                                      >
                                        Alignment Layout
                                      </label>
                                      <select
                                        id={`layout-${idx}`}
                                        aria-label="Alignment Layout"
                                        className="border border-[#d5dcdb] rounded-lg p-2 text-xs w-full focus:outline-none bg-white font-medium focus:border-[#f05a28] mt-1 text-[#0b2f3a]"
                                        value={block.layout || "none"}
                                        onChange={(e) =>
                                          updateBlockField(
                                            idx,
                                            "layout",
                                            e.target.value
                                          )
                                        }
                                      >
                                        <option value="none">
                                          No Image (Text only)
                                        </option>
                                        <option value="left-image">
                                          Left Image / Right Para
                                        </option>
                                        <option value="right-image">
                                          Right Image / Left Para
                                        </option>
                                        <option value="top-image">
                                          Image Above Para
                                        </option>
                                        <option value="bottom-image">
                                          Image Below Para
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                {block.layout && block.layout !== "none" && (
                                  <input
                                    type="text"
                                    className="border border-[#d5dcdb] rounded-lg p-2 text-xs w-full focus:outline-none focus:border-[#f05a28] bg-white text-[#0b2f3a]"
                                    placeholder="Image caption (Optional)"
                                    value={block.caption || ""}
                                    onChange={(e) =>
                                      updateBlockField(
                                        idx,
                                        "caption",
                                        e.target.value
                                      )
                                    }
                                  />
                                )}
                              </div>
                            </div>
                          )}

                          {block.type === "subheading" && (
                            <input
                              type="text"
                              className="w-full border border-[#d5dcdb] rounded-xl p-3 focus:border-[#f05a28] focus:outline-none text-sm font-bold text-[#0b2f3a]"
                              placeholder="Write section header..."
                              value={block.text || ""}
                              onChange={(e) =>
                                updateBlockField(idx, "text", e.target.value)
                              }
                            />
                          )}

                          {block.type === "heading" && (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                              <div className="md:col-span-3">
                                <input
                                  type="text"
                                  className="w-full border border-[#d5dcdb] rounded-xl p-3 focus:border-[#f05a28] focus:outline-none text-sm font-bold text-[#0b2f3a]"
                                  placeholder="Write heading text here..."
                                  value={block.text || ""}
                                  onChange={(e) =>
                                    updateBlockField(
                                      idx,
                                      "text",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <select
                                  aria-label="Heading style"
                                  className="w-full border border-[#d5dcdb] rounded-xl p-3 focus:border-[#f05a28] focus:outline-none bg-white text-sm font-bold text-[#0b2f3a]"
                                  value={block.style || "h2"}
                                  onChange={(e) =>
                                    updateBlockField(
                                      idx,
                                      "style",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="h2">H2 (Large)</option>
                                  <option value="h3">H3 (Medium)</option>
                                  <option value="h4">H4 (Small)</option>
                                </select>
                              </div>
                            </div>
                          )}

                          {block.type === "divider" && (
                            <div className="border border-dashed border-[#d5dcdb] rounded-xl p-3 bg-[#eef1f0] text-center text-xs font-bold text-[#51626a]">
                              --- Horizontal Section Divider (Visual line) ---
                            </div>
                          )}

                          {block.type === "slideshow" && (
                            <div className="space-y-4 bg-[#eef1f0] p-4 rounded-xl border border-[#d5dcdb]">
                              <div className="text-xs font-black uppercase tracking-wider text-[#0b2f3a]">
                                Slideshow Images ({block.images?.length || 0})
                              </div>

                              <div className="space-y-3">
                                {(block.images || []).map((img, imgIdx) => (
                                  <div
                                    key={imgIdx}
                                    className="bg-white border border-[#d5dcdb] rounded-xl p-3 flex gap-3 items-start shadow-sm"
                                  >
                                    <div className="text-xs font-black text-[#51626a] mt-2">
                                      {imgIdx + 1}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                      <ImageUploadField
                                        value={img.src}
                                        onChange={(url) => {
                                          const newImgs = [
                                            ...(block.images || []),
                                          ];
                                          newImgs[imgIdx] = {
                                            ...newImgs[imgIdx],
                                            src: url,
                                          };
                                          updateBlockField(
                                            idx,
                                            "images",
                                            newImgs
                                          );
                                        }}
                                        placeholder="/slide.jpg or click Upload File"
                                        label="Image URL / Upload"
                                      />
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <div>
                                          <label className="text-[10px] font-bold text-[#51626a] uppercase block mb-1">
                                            Alt description
                                          </label>
                                          <input
                                            type="text"
                                            className="w-full border border-[#d5dcdb] rounded p-2 text-xs focus:outline-none focus:border-[#f05a28] bg-white text-[#0b2f3a]"
                                            value={img.alt || ""}
                                            onChange={(e) => {
                                              const newImgs = [
                                                ...(block.images || []),
                                              ];
                                              newImgs[imgIdx] = {
                                                ...newImgs[imgIdx],
                                                alt: e.target.value,
                                              };
                                              updateBlockField(
                                                idx,
                                                "images",
                                                newImgs
                                              );
                                            }}
                                            placeholder="Alt text"
                                          />
                                        </div>
                                        <div>
                                          <label className="text-[10px] font-bold text-[#51626a] uppercase block mb-1">
                                            Caption (Optional)
                                          </label>
                                          <input
                                            type="text"
                                            className="w-full border border-[#d5dcdb] rounded p-2 text-xs focus:outline-none focus:border-[#f05a28] bg-white text-[#0b2f3a]"
                                            value={img.caption || ""}
                                            onChange={(e) => {
                                              const newImgs = [
                                                ...(block.images || []),
                                              ];
                                              newImgs[imgIdx] = {
                                                ...newImgs[imgIdx],
                                                caption: e.target.value,
                                              };
                                              updateBlockField(
                                                idx,
                                                "images",
                                                newImgs
                                              );
                                            }}
                                            placeholder="Slide caption"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newImgs = (
                                          block.images || []
                                        ).filter((_, i) => i !== imgIdx);
                                        updateBlockField(
                                          idx,
                                          "images",
                                          newImgs
                                        );
                                      }}
                                      className="text-red-500 hover:text-red-700 mt-5 p-1"
                                      title="Remove slide"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                ))}
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  const newImgs = [
                                    ...(block.images || []),
                                    { src: "", alt: "", caption: "" },
                                  ];
                                  updateBlockField(idx, "images", newImgs);
                                }}
                                className="bg-[#f05a28]/10 hover:bg-[#f05a28]/20 text-[#f05a28] text-xs px-3.5 py-2 rounded-lg font-bold transition-colors flex items-center gap-1.5 mt-2"
                              >
                                <Plus size={14} />
                                Add Image to Slideshow
                              </button>
                            </div>
                          )}

                          {block.type === "table" && (
                            <div className="space-y-4 bg-[#eef1f0] p-4 rounded-xl border border-[#d5dcdb]">
                              <div className="flex items-center justify-between">
                                <div className="text-xs font-black uppercase tracking-wider text-[#0b2f3a]">
                                  Table Editor ({block.tableData?.length || 0}{" "}
                                  rows)
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const rows = block.tableData || [];
                                      if (rows.length === 0) return;
                                      const colsCount = rows[0].length;
                                      if (colsCount >= 8) {
                                        alert("Maximum 8 columns allowed.");
                                        return;
                                      }
                                      const newRows = rows.map((r) => [
                                        ...r,
                                        "",
                                      ]);
                                      updateBlockField(
                                        idx,
                                        "tableData",
                                        newRows
                                      );
                                    }}
                                    className="bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 text-xs px-2.5 py-1.5 rounded-lg font-bold transition-all shadow-sm flex items-center gap-1"
                                  >
                                    <Plus size={11} /> Column
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const rows = block.tableData || [];
                                      if (rows.length === 0) return;
                                      if (rows[0].length <= 1) return;
                                      const newRows = rows.map((r) =>
                                        r.slice(0, -1)
                                      );
                                      updateBlockField(
                                        idx,
                                        "tableData",
                                        newRows
                                      );
                                    }}
                                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs px-2.5 py-1.5 rounded-lg font-bold transition-all shadow-sm"
                                  >
                                    - Column
                                  </button>
                                </div>
                              </div>

                              <div className="overflow-x-auto pb-2 w-full">
                                <div className="space-y-2.5 min-w-max p-1">
                                  {(block.tableData || []).map(
                                    (row, rowIdx) => (
                                      <div
                                        key={rowIdx}
                                        className="flex gap-2 items-center"
                                      >
                                        {row.map((cell, colIdx) => (
                                          <input
                                            key={colIdx}
                                            type="text"
                                            className={`border rounded-lg px-3 py-1.5 text-xs transition-all outline-none w-[150px] shadow-sm ${
                                              rowIdx === 0
                                                ? "font-bold bg-[#d5dcdb] border-[#51626a]/30 text-[#0b2f3a] focus:bg-white focus:border-[#f05a28]"
                                                : "bg-white border-[#d5dcdb] text-[#0b2f3a] focus:border-[#f05a28]"
                                            }`}
                                            value={cell}
                                            placeholder={
                                              rowIdx === 0
                                                ? `Header ${colIdx + 1}`
                                                : `Cell data`
                                            }
                                            onChange={(e) => {
                                              const newRows = [
                                                ...(block.tableData || []),
                                              ];
                                              newRows[rowIdx] = [
                                                ...newRows[rowIdx],
                                              ];
                                              newRows[rowIdx][colIdx] =
                                                e.target.value;
                                              updateBlockField(
                                                idx,
                                                "tableData",
                                                newRows
                                              );
                                            }}
                                          />
                                        ))}
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const newRows = [
                                              ...(block.tableData || []),
                                            ];
                                            newRows.splice(rowIdx, 1);
                                            updateBlockField(
                                              idx,
                                              "tableData",
                                              newRows
                                            );
                                          }}
                                          className="text-red-500 hover:text-red-700 hover:bg-red-100 bg-red-50 border border-red-200 rounded-lg shrink-0 transition-all flex items-center justify-center h-8 w-8 shadow-sm"
                                          title="Remove row"
                                        >
                                          <Trash2 size={13} />
                                        </button>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  const rows = block.tableData || [];
                                  const colsCount =
                                    rows.length > 0 ? rows[0].length : 2;
                                  const newRow = Array(colsCount).fill("");
                                  updateBlockField(idx, "tableData", [
                                    ...rows,
                                    newRow,
                                  ]);
                                }}
                                className="bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 mt-2 shadow-sm"
                              >
                                <Plus size={13} />
                                Add Row
                              </button>
                            </div>
                          )}

                          {block.type === "callout" && (
                            <div className="space-y-3">
                              <MarkdownEditor
                                rows={2}
                                placeholder="Write callout / highlight text..."
                                value={block.text || ""}
                                onChange={(val) =>
                                  updateBlockField(idx, "text", val)
                                }
                              />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-amber-50 p-3 rounded-xl border border-amber-200">
                                <div>
                                  <label className="block text-[10px] font-bold text-amber-800 uppercase mb-1">
                                    Button Name (Optional)
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full border border-amber-200 rounded-lg p-2 text-xs focus:outline-none focus:border-[#f05a28] bg-white text-[#0b2f3a]"
                                    placeholder="e.g. Learn More"
                                    value={block.buttonText || ""}
                                    onChange={(e) =>
                                      updateBlockField(
                                        idx,
                                        "buttonText",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-amber-800 uppercase mb-1">
                                    Button Link (Optional)
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full border border-amber-200 rounded-lg p-2 text-xs focus:outline-none focus:border-[#f05a28] bg-white text-[#0b2f3a]"
                                    placeholder="e.g. /get-quote or https://..."
                                    value={block.buttonLink || ""}
                                    onChange={(e) =>
                                      updateBlockField(
                                        idx,
                                        "buttonLink",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {block.type === "list" && (
                            <div className="space-y-2">
                              <div className="flex gap-4">
                                <label className="flex items-center gap-1.5 text-xs text-[#0b2f3a] font-bold">
                                  <input
                                    type="radio"
                                    name={`style-${idx}`}
                                    checked={block.style !== "numbered"}
                                    onChange={() =>
                                      updateBlockField(idx, "style", "bullet")
                                    }
                                  />
                                  Bulleted
                                </label>
                                <label className="flex items-center gap-1.5 text-xs text-[#0b2f3a] font-bold">
                                  <input
                                    type="radio"
                                    name={`style-${idx}`}
                                    checked={block.style === "numbered"}
                                    onChange={() =>
                                      updateBlockField(
                                        idx,
                                        "style",
                                        "numbered"
                                      )
                                    }
                                  />
                                  Numbered
                                </label>
                              </div>
                              <MarkdownEditor
                                rows={3}
                                placeholder="Write each list item on a new line..."
                                value={block.items?.join("\n") || ""}
                                onChange={(val) =>
                                  updateBlockField(idx, "items", val.split("\n"))
                                }
                              />
                            </div>
                          )}

                          {block.type === "image" && (
                            <div className="space-y-3">
                              <ImageUploadField
                                value={block.src || ""}
                                onChange={(url) =>
                                  updateBlockField(idx, "src", url)
                                }
                                placeholder="Image URL or upload file"
                                label="Image Source"
                              />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-xs font-bold text-[#51626a] uppercase mb-1">
                                    Alt description
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full border border-[#d5dcdb] rounded-lg p-2.5 focus:border-[#f05a28] focus:outline-none text-xs text-[#0b2f3a]"
                                    placeholder="Alt description"
                                    value={block.alt || ""}
                                    onChange={(e) =>
                                      updateBlockField(
                                        idx,
                                        "alt",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-[#51626a] uppercase mb-1">
                                    Image caption (Optional)
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full border border-[#d5dcdb] rounded-lg p-2.5 focus:border-[#f05a28] focus:outline-none text-xs text-[#0b2f3a]"
                                    placeholder="Image caption"
                                    value={block.caption || ""}
                                    onChange={(e) =>
                                      updateBlockField(
                                        idx,
                                        "caption",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-6 pt-4 pb-2 border-t border-[#d5dcdb]">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#0b2f3a] mb-3 flex items-center gap-2">
                <Plus size={16} className="text-[#f05a28]" /> Append Section Below
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => addBlock("paragraph")}
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm"
                >
                  <AlignLeft size={13} className="inline mr-1" /> Paragraph
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("heading")}
                  className="bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm"
                >
                  <Heading size={13} className="inline mr-1" /> Heading
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("list")}
                  className="bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm"
                >
                  <List size={13} className="inline mr-1" /> List
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("callout")}
                  className="bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm"
                >
                  <HelpCircle size={13} className="inline mr-1" /> Callout
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("image")}
                  className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm"
                >
                  <ImageIcon size={13} className="inline mr-1" /> Image
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("slideshow")}
                  className="bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm"
                >
                  <Layers size={13} className="inline mr-1" /> Slideshow
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("table")}
                  className="bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm"
                >
                  <TableIcon size={13} className="inline mr-1" /> Table
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("divider")}
                  className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all shadow-sm"
                >
                  <span>—</span> Divider
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#d5dcdb] pt-4">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2.5 border border-[#d5dcdb] rounded-xl text-xs font-bold text-[#0b2f3a] hover:bg-[#eef1f0] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#f05a28] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#c2410c] transition-all duration-200 flex items-center gap-2 disabled:opacity-50 shadow-md hover:shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              {submitting ? (
                <>
                  <RefreshCw className="animate-spin h-4 w-4" />
                  Saving Article...
                </>
              ) : (
                "Save Article"
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Blog List Container */
        <div className="bg-white border border-[#d5dcdb] rounded-2xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="text-center py-20">
              <RefreshCw className="animate-spin h-8 w-8 text-[#f05a28] mx-auto" />
              <p className="mt-3 text-xs font-bold text-[#51626a]">
                Loading blog posts...
              </p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="h-12 w-12 text-[#d5dcdb] mx-auto mb-3" />
              <p className="text-sm font-bold text-[#0b2f3a]">
                No blog posts created yet.
              </p>
              <p className="text-xs text-[#51626a] mt-1">
                Share your first logistics guide or company announcement.
              </p>
              <button
                onClick={handleOpenNewForm}
                className="mt-4 inline-flex items-center gap-2 bg-[#f05a28] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#c2410c] transition shadow-md"
              >
                <Plus size={15} /> Create your first article
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#eef1f0] border-b border-[#d5dcdb] text-[11px] font-black uppercase tracking-wider text-[#0b2f3a]">
                    <th className="px-6 py-4">Title & URL</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Author</th>
                    <th className="px-6 py-4">Published Date</th>
                    <th className="px-6 py-4">Featured</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eef1f0] text-sm text-[#0b2f3a]">
                  {blogs.map((blog) => (
                    <tr
                      key={blog._id || blog.id}
                      className="hover:bg-[#eef1f0]/60 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{blog.icon || "🇨🇦"}</span>
                          <div>
                            <div className="font-bold text-[#0b2f3a]">
                              {blog.title}
                            </div>
                            <div className="text-xs text-[#51626a] font-mono">
                              /blog/{blog.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-[#f05a28]/10 text-[#f05a28] text-xs px-3 py-1 rounded-full font-bold">
                          {blog.tag}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-[#51626a]">
                        {blog.author?.name || "DCW Team"}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-[#51626a]">
                        {blog.publishedDate}
                      </td>
                      <td className="px-6 py-4">
                        {blog.featured ? (
                          <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-0.5 rounded-full font-bold">
                            ★ Featured
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">No</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditForm(blog)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150 inline-flex items-center justify-center hover:scale-110 active:scale-95"
                          title="Edit post"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete((blog._id || blog.id) as string)
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-150 inline-flex items-center justify-center hover:scale-110 active:scale-95"
                          title="Delete post"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

