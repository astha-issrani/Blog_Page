import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ── palette & tokens ──────────────────────────────────────────────────────────
const T = {
  cream: "#F2EFE9",
  ink: "#1A1A1A",
  green: "#2D6A2D",
  greenLight: "#3D8B3D",
  greenMuted: "#4a7c59",
  border: "#D9D4CB",
  muted: "#8A8278",
  white: "#FFFFFF",
};

// ── tiny helpers ──────────────────────────────────────────────────────────────
const style = (obj) => obj;

const STYLES = {
  page: style({
    minHeight: "100vh",
    background: T.cream,
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: T.ink,
  }),

  // nav
  nav: style({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
    height: "64px",
    borderBottom: `1px solid ${T.border}`,
    background: T.cream,
    position: "sticky",
    top: 0,
    zIndex: 100,
  }),
  logo: style({
    fontSize: "20px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
    color: T.ink,
    textDecoration: "none",
    fontFamily: "'Georgia', serif",
  }),
  navRight: style({
    display: "flex",
    alignItems: "center",
    gap: "16px",
  }),
  publishBtn: style({
    background: T.green,
    color: T.white,
    border: "none",
    borderRadius: "99px",
    padding: "10px 24px",
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
    cursor: "pointer",
    fontWeight: "600",
    letterSpacing: "0.2px",
    transition: "background 0.2s",
  }),
  saveDraftBtn: style({
    background: "transparent",
    color: T.muted,
    border: "none",
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
    cursor: "pointer",
    padding: "10px 16px",
    borderRadius: "99px",
    transition: "color 0.2s, background 0.2s",
  }),

  // editor wrapper
  editorWrap: style({
    maxWidth: "740px",
    margin: "0 auto",
    padding: "60px 24px 120px",
  }),

  // cover image
  coverArea: style({
    width: "100%",
    marginBottom: "40px",
    borderRadius: "4px",
    overflow: "hidden",
  }),
  coverImg: style({
    width: "100%",
    maxHeight: "380px",
    objectFit: "cover",
    display: "block",
  }),
  coverPlaceholder: style({
    width: "100%",
    height: "220px",
    border: `2px dashed ${T.border}`,
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    cursor: "pointer",
    transition: "border-color 0.2s, background 0.2s",
  }),
  coverPlaceholderText: style({
    color: T.muted,
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
  }),

  // title
  titleInput: style({
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "42px",
    fontWeight: "700",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: T.ink,
    lineHeight: "1.2",
    resize: "none",
    marginBottom: "8px",
    letterSpacing: "-1px",
  }),

  // subtitle
  subtitleInput: style({
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "22px",
    fontFamily: "'Georgia', serif",
    color: T.muted,
    lineHeight: "1.4",
    resize: "none",
    marginBottom: "32px",
  }),

  divider: style({
    width: "100%",
    height: "1px",
    background: T.border,
    marginBottom: "32px",
  }),

  // toolbar
  toolbar: style({
    display: "flex",
    alignItems: "center",
    gap: "4px",
    marginBottom: "24px",
    flexWrap: "wrap",
  }),
  toolBtn: style({
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "6px 10px",
    borderRadius: "4px",
    color: T.muted,
    fontSize: "14px",
    fontFamily: "monospace",
    transition: "background 0.15s, color 0.15s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  toolSep: style({
    width: "1px",
    height: "20px",
    background: T.border,
    margin: "0 4px",
  }),

  // body editor
  bodyEditor: style({
    width: "100%",
    minHeight: "400px",
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "20px",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: T.ink,
    lineHeight: "1.8",
    resize: "none",
  }),

  // tags
  tagSection: style({
    marginTop: "40px",
    paddingTop: "24px",
    borderTop: `1px solid ${T.border}`,
  }),
  tagLabel: style({
    fontSize: "12px",
    fontFamily: "'Georgia', serif",
    color: T.muted,
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "12px",
  }),
  tagRow: style({
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    alignItems: "center",
  }),
  tag: style({
    background: "transparent",
    border: `1px solid ${T.border}`,
    borderRadius: "99px",
    padding: "4px 14px",
    fontSize: "13px",
    fontFamily: "'Georgia', serif",
    color: T.ink,
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "default",
  }),
  tagRemove: style({
    background: "none",
    border: "none",
    cursor: "pointer",
    color: T.muted,
    fontSize: "14px",
    padding: "0",
    lineHeight: 1,
  }),
  tagInput: style({
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "13px",
    fontFamily: "'Georgia', serif",
    color: T.ink,
    minWidth: "120px",
  }),

  // word count bar
  statusBar: style({
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: T.cream,
    borderTop: `1px solid ${T.border}`,
    padding: "10px 40px",
    display: "flex",
    alignItems: "center",
    gap: "24px",
    fontSize: "12px",
    color: T.muted,
    fontFamily: "'Georgia', serif",
    zIndex: 99,
  }),
  dot: style({
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: T.green,
    display: "inline-block",
    marginRight: "6px",
  }),

  // modal overlay
  modal: style({
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 200,
  }),
  modalBox: style({
    background: T.white,
    borderRadius: "8px",
    padding: "40px",
    width: "480px",
    maxWidth: "90vw",
    boxShadow: "0 8px 48px rgba(0,0,0,0.12)",
  }),
  modalTitle: style({
    fontSize: "22px",
    fontWeight: "700",
    fontFamily: "'Georgia', serif",
    marginBottom: "8px",
  }),
  modalSub: style({
    fontSize: "14px",
    color: T.muted,
    fontFamily: "'Georgia', serif",
    marginBottom: "24px",
  }),
  modalPreviewTitle: style({
    fontSize: "18px",
    fontWeight: "700",
    fontFamily: "'Georgia', serif",
    marginBottom: "6px",
  }),
  modalPreviewBody: style({
    fontSize: "14px",
    color: T.muted,
    fontFamily: "'Georgia', serif",
    marginBottom: "24px",
    lineHeight: "1.6",
  }),
  modalRow: style({
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    marginTop: "8px",
  }),
  modalPublish: style({
    background: T.green,
    color: T.white,
    border: "none",
    borderRadius: "99px",
    padding: "12px 28px",
    fontSize: "15px",
    fontFamily: "'Georgia', serif",
    cursor: "pointer",
    fontWeight: "600",
  }),
  modalCancel: style({
    background: "transparent",
    color: T.ink,
    border: `1px solid ${T.border}`,
    borderRadius: "99px",
    padding: "12px 24px",
    fontSize: "15px",
    fontFamily: "'Georgia', serif",
    cursor: "pointer",
  }),
};

// ── icon helpers ──────────────────────────────────────────────────────────────
const Icon = ({ children, title, onClick, active }) => (
  <button
    title={title}
    onClick={onClick}
    style={{
      ...STYLES.toolBtn,
      background: active ? "#e8e3db" : "transparent",
      color: active ? T.ink : T.muted,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#e8e3db";
      e.currentTarget.style.color = T.ink;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = active ? "#e8e3db" : "transparent";
      e.currentTarget.style.color = active ? T.ink : T.muted;
    }}
  >
    {children}
  </button>
);

// ── main component ────────────────────────────────────────────────────────────
export default function WritePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [published, setPublished] = useState(false);

  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const fileRef = useRef(null);

  // auto-resize textareas
  const autoResize = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  useEffect(() => {
    if (titleRef.current) autoResize(titleRef.current);
  }, [title]);

  useEffect(() => {
    if (bodyRef.current) autoResize(bodyRef.current);
  }, [body]);

  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // toolbar actions (execCommand for contenteditable — we use textarea so we simulate)
  const insertMarkdown = (before, after = "") => {
    const el = bodyRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const sel = body.slice(start, end);
    const newBody =
      body.slice(0, start) + before + sel + after + body.slice(end);
    setBody(newBody);
    setTimeout(() => {
      el.selectionStart = start + before.length;
      el.selectionEnd = start + before.length + sel.length;
      el.focus();
    }, 0);
  };

  const handleTagKey = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const t = tagInput.trim().replace(/,/g, "");
      if (t && !tags.includes(t) && tags.length < 5) {
        setTags([...tags, t]);
      }
      setTagInput("");
    }
    if (e.key === "Backspace" && !tagInput && tags.length) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCoverImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSaveDraft = () => {
    // In real app: call API / context to save draft
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePublish = () => {
    if (!title.trim()) {
      alert("Please add a title before publishing.");
      return;
    }
    setShowPublishModal(true);
  };

  const confirmPublish = () => {
    // In real app: POST to backend, then navigate
    setPublished(true);
    setShowPublishModal(false);
    setTimeout(() => navigate("/blog"), 1200);
  };

  return (
    <div style={STYLES.page}>
      {/* ── Navbar ── */}
      <nav style={STYLES.nav}>
        <a href="/" style={STYLES.logo}>
          WriteFlow
        </a>
        <div style={STYLES.navRight}>
          <span
            style={{
              fontSize: "13px",
              color: T.muted,
              fontFamily: "'Georgia', serif",
              opacity: saved ? 1 : 0,
              transition: "opacity 0.4s",
            }}
          >
            Draft saved
          </span>
          <button
            style={STYLES.saveDraftBtn}
            onClick={handleSaveDraft}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = T.ink;
              e.currentTarget.style.background = "#e8e3db";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = T.muted;
              e.currentTarget.style.background = "transparent";
            }}
          >
            Save draft
          </button>
          <button
            style={{
              ...STYLES.publishBtn,
              background: published ? T.greenMuted : T.green,
            }}
            onClick={handlePublish}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = T.greenLight)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = published
                ? T.greenMuted
                : T.green)
            }
          >
            {published ? "Published ✓" : "Publish"}
          </button>
        </div>
      </nav>

      {/* ── Editor ── */}
      <div style={STYLES.editorWrap}>
        {/* Cover image */}
        <div style={STYLES.coverArea}>
          {coverImage ? (
            <div style={{ position: "relative" }}>
              <img src={coverImage} alt="cover" style={STYLES.coverImg} />
              <button
                onClick={() => setCoverImage(null)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "rgba(0,0,0,0.5)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "99px",
                  padding: "4px 12px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontFamily: "'Georgia', serif",
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <div
              style={STYLES.coverPlaceholder}
              onClick={() => fileRef.current?.click()}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = T.greenMuted;
                e.currentTarget.style.background = "rgba(45,106,45,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = T.border;
                e.currentTarget.style.background = "transparent";
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke={T.muted}
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span style={STYLES.coverPlaceholderText}>
                Add a cover image
              </span>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleCoverChange}
              />
            </div>
          )}
        </div>

        {/* Title */}
        <textarea
          ref={titleRef}
          style={STYLES.titleInput}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={1}
        />

        {/* Subtitle */}
        <textarea
          style={STYLES.subtitleInput}
          placeholder="Write a subtitle…"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          rows={1}
        />

        <div style={STYLES.divider} />

        {/* Toolbar */}
        <div style={STYLES.toolbar}>
          <Icon title="Bold" onClick={() => insertMarkdown("**", "**")}>
            <strong>B</strong>
          </Icon>
          <Icon title="Italic" onClick={() => insertMarkdown("*", "*")}>
            <em>I</em>
          </Icon>
          <Icon
            title="Heading"
            onClick={() => insertMarkdown("\n## ", "\n")}
          >
            H
          </Icon>
          <div style={STYLES.toolSep} />
          <Icon
            title="Quote"
            onClick={() => insertMarkdown("\n> ", "\n")}
          >
            ❝
          </Icon>
          <Icon
            title="Code"
            onClick={() => insertMarkdown("`", "`")}
          >
            {"</>"}
          </Icon>
          <Icon
            title="Code block"
            onClick={() => insertMarkdown("\n```\n", "\n```\n")}
          >
            {"{ }"}
          </Icon>
          <div style={STYLES.toolSep} />
          <Icon
            title="Bullet list"
            onClick={() => insertMarkdown("\n- ", "")}
          >
            ≡
          </Icon>
          <Icon
            title="Numbered list"
            onClick={() => insertMarkdown("\n1. ", "")}
          >
            №
          </Icon>
          <div style={STYLES.toolSep} />
          <Icon
            title="Link"
            onClick={() => insertMarkdown("[", "](url)")}
          >
            🔗
          </Icon>
          <Icon
            title="Image"
            onClick={() => insertMarkdown("![alt](", ")")}
          >
            🖼
          </Icon>
          <div style={STYLES.toolSep} />
          <Icon title="Horizontal rule" onClick={() => insertMarkdown("\n---\n", "")}>
            —
          </Icon>
        </div>

        {/* Body */}
        <textarea
          ref={bodyRef}
          style={STYLES.bodyEditor}
          placeholder="Tell your story…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={16}
        />

        {/* Tags */}
        <div style={STYLES.tagSection}>
          <p style={STYLES.tagLabel}>Add up to 5 tags</p>
          <div style={STYLES.tagRow}>
            {tags.map((t) => (
              <span key={t} style={STYLES.tag}>
                {t}
                <button
                  style={STYLES.tagRemove}
                  onClick={() => setTags(tags.filter((x) => x !== t))}
                >
                  ×
                </button>
              </span>
            ))}
            {tags.length < 5 && (
              <input
                style={STYLES.tagInput}
                placeholder="Add a tag…"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKey}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Status bar ── */}
      <div style={STYLES.statusBar}>
        <span>
          <span style={STYLES.dot} />
          {wordCount} {wordCount === 1 ? "word" : "words"}
        </span>
        <span>{readTime} min read</span>
        {title && (
          <span style={{ marginLeft: "auto", color: T.greenMuted }}>
            {title.slice(0, 48)}
            {title.length > 48 ? "…" : ""}
          </span>
        )}
      </div>

      {/* ── Publish modal ── */}
      {showPublishModal && (
        <div style={STYLES.modal} onClick={() => setShowPublishModal(false)}>
          <div
            style={STYLES.modalBox}
            onClick={(e) => e.stopPropagation()}
          >
            <p style={STYLES.modalTitle}>Ready to publish?</p>
            <p style={STYLES.modalSub}>
              Your story will be visible to everyone on WriteFlow.
            </p>

            <div
              style={{
                background: T.cream,
                borderRadius: "6px",
                padding: "16px 20px",
                marginBottom: "20px",
              }}
            >
              <p style={STYLES.modalPreviewTitle}>
                {title || "Untitled"}
              </p>
              <p style={STYLES.modalPreviewBody}>
                {subtitle ||
                  (body ? body.slice(0, 120) + (body.length > 120 ? "…" : "") : "No subtitle")}
              </p>
              {tags.length > 0 && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: "#e8e3db",
                        borderRadius: "99px",
                        padding: "3px 12px",
                        fontSize: "12px",
                        fontFamily: "'Georgia', serif",
                        color: T.ink,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div style={STYLES.modalRow}>
              <button
                style={STYLES.modalCancel}
                onClick={() => setShowPublishModal(false)}
              >
                Cancel
              </button>
              <button style={STYLES.modalPublish} onClick={confirmPublish}>
                Publish now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}