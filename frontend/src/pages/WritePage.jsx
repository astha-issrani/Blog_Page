import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from '../utils/api';
import { useAuth } from "../context/AuthContext";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const T = {
  cream: "#F2EFE9", ink: "#1A1A1A", green: "#2D6A2D", greenLight: "#3D8B3D",
  greenMuted: "#4a7c59", border: "#D9D4CB", muted: "#8A8278", white: "#FFFFFF",
};

const style = (obj) => obj;

const STYLES = {
  page: style({ minHeight: "100vh", background: T.cream, fontFamily: "'Georgia', 'Times New Roman', serif", color: T.ink }),
  nav: style({ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: "64px", borderBottom: `1px solid ${T.border}`, background: T.cream, position: "sticky", top: 0, zIndex: 100 }),
  logo: style({ fontSize: "20px", fontWeight: "700", letterSpacing: "-0.5px", color: T.ink, textDecoration: "none", fontFamily: "'Georgia', serif" }),
  navRight: style({ display: "flex", alignItems: "center", gap: "16px" }),
  publishBtn: style({ background: T.green, color: T.white, border: "none", borderRadius: "99px", padding: "10px 24px", fontSize: "14px", fontFamily: "'Georgia', serif", cursor: "pointer", fontWeight: "600", letterSpacing: "0.2px", transition: "background 0.2s" }),
  saveDraftBtn: style({ background: "transparent", color: T.muted, border: "none", fontSize: "14px", fontFamily: "'Georgia', serif", cursor: "pointer", padding: "10px 16px", borderRadius: "99px", transition: "color 0.2s, background 0.2s" }),
  editorWrap: style({ maxWidth: "740px", margin: "0 auto", padding: "60px 24px 120px" }),
  coverArea: style({ width: "100%", marginBottom: "40px", borderRadius: "4px", overflow: "hidden" }),
  coverImg: style({ width: "100%", maxHeight: "380px", objectFit: "cover", display: "block" }),
  coverPlaceholder: style({ width: "100%", height: "220px", border: `2px dashed ${T.border}`, borderRadius: "4px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", cursor: "pointer", transition: "border-color 0.2s, background 0.2s" }),
  coverPlaceholderText: style({ color: T.muted, fontSize: "14px", fontFamily: "'Georgia', serif" }),
  titleInput: style({ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "42px", fontWeight: "700", fontFamily: "'Georgia', 'Times New Roman', serif", color: T.ink, lineHeight: "1.2", resize: "none", marginBottom: "8px", letterSpacing: "-1px" }),
  subtitleInput: style({ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: "22px", fontFamily: "'Georgia', serif", color: T.muted, lineHeight: "1.4", resize: "none", marginBottom: "32px" }),
  divider: style({ width: "100%", height: "1px", background: T.border, marginBottom: "32px" }),
  toolbar: style({ display: "flex", alignItems: "center", gap: "4px", marginBottom: "24px", flexWrap: "wrap" }),
  toolBtn: style({ background: "transparent", border: "none", cursor: "pointer", padding: "6px 10px", borderRadius: "4px", color: T.muted, fontSize: "14px", fontFamily: "monospace", transition: "background 0.15s, color 0.15s", display: "flex", alignItems: "center", justifyContent: "center" }),
  toolSep: style({ width: "1px", height: "20px", background: T.border, margin: "0 4px" }),
  bodyEditor: style({ width: "100%", minHeight: "400px", border: "none", outline: "none", background: "transparent", fontSize: "20px", fontFamily: "'Georgia', 'Times New Roman', serif", color: T.ink, lineHeight: "1.8", resize: "none" }),
  tagSection: style({ marginTop: "40px", paddingTop: "24px", borderTop: `1px solid ${T.border}` }),
  tagLabel: style({ fontSize: "12px", fontFamily: "'Georgia', serif", color: T.muted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px" }),
  tagRow: style({ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }),
  tag: style({ background: "transparent", border: `1px solid ${T.border}`, borderRadius: "99px", padding: "4px 14px", fontSize: "13px", fontFamily: "'Georgia', serif", color: T.ink, display: "flex", alignItems: "center", gap: "6px" }),
  tagRemove: style({ background: "none", border: "none", cursor: "pointer", color: T.muted, fontSize: "14px", padding: "0", lineHeight: 1 }),
  tagInput: style({ border: "none", outline: "none", background: "transparent", fontSize: "13px", fontFamily: "'Georgia', serif", color: T.ink, minWidth: "120px" }),
  statusBar: style({ position: "fixed", bottom: 0, left: 0, right: 0, background: T.cream, borderTop: `1px solid ${T.border}`, padding: "10px 40px", display: "flex", alignItems: "center", gap: "24px", fontSize: "12px", color: T.muted, fontFamily: "'Georgia', serif", zIndex: 99 }),
  dot: style({ width: "6px", height: "6px", borderRadius: "50%", background: T.green, display: "inline-block", marginRight: "6px" }),
  modal: style({ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }),
  modalBox: style({ background: T.white, borderRadius: "8px", padding: "40px", width: "480px", maxWidth: "90vw", boxShadow: "0 8px 48px rgba(0,0,0,0.12)" }),
  modalTitle: style({ fontSize: "22px", fontWeight: "700", fontFamily: "'Georgia', serif", marginBottom: "8px" }),
  modalSub: style({ fontSize: "14px", color: T.muted, fontFamily: "'Georgia', serif", marginBottom: "24px" }),
  modalPreviewTitle: style({ fontSize: "18px", fontWeight: "700", fontFamily: "'Georgia', serif", marginBottom: "6px" }),
  modalPreviewBody: style({ fontSize: "14px", color: T.muted, fontFamily: "'Georgia', serif", marginBottom: "24px", lineHeight: "1.6" }),
  modalRow: style({ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "8px" }),
  modalPublish: style({ background: T.green, color: T.white, border: "none", borderRadius: "99px", padding: "12px 28px", fontSize: "15px", fontFamily: "'Georgia', serif", cursor: "pointer", fontWeight: "600" }),
  modalCancel: style({ background: "transparent", color: T.ink, border: `1px solid ${T.border}`, borderRadius: "99px", padding: "12px 24px", fontSize: "15px", fontFamily: "'Georgia', serif", cursor: "pointer" }),
};

const Icon = ({ children, title, onClick, active }) => (
  <button title={title} onClick={onClick}
    style={{ ...STYLES.toolBtn, background: active ? "#e8e3db" : "transparent", color: active ? T.ink : T.muted }}
    onMouseEnter={e => { e.currentTarget.style.background = "#e8e3db"; e.currentTarget.style.color = T.ink; }}
    onMouseLeave={e => { e.currentTarget.style.background = active ? "#e8e3db" : "transparent"; e.currentTarget.style.color = active ? T.ink : T.muted; }}
  >{children}</button>
);

export default function WritePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const editingDraft = location.state?.draft || null;
  const draftId = location.state?.draftId || null;
  const isEditing = !!draftId;

  const [title, setTitle]       = useState(editingDraft?.title    || "");
  const [subtitle, setSubtitle] = useState(editingDraft?.subtitle || "");
  const [body, setBody]         = useState(editingDraft?.content  || "");
  const [tags, setTags]         = useState(editingDraft?.tags     || []);
  const [tagInput, setTagInput] = useState("");
  const [coverPreview, setCoverPreview] = useState(editingDraft?.coverImage || null);
  const [coverFile, setCoverFile]       = useState(null);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showPreview, setShowPreview]   = useState(false); // ← INSIDE component ✓
  const [saved, setSaved]       = useState(false);
  const [published, setPublished] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError]       = useState("");

  const titleRef    = useRef(null);
  const bodyRef     = useRef(null);
  const fileInputRef = useRef(null);

  const autoResize = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  useEffect(() => { if (titleRef.current) autoResize(titleRef.current); }, [title]);
  useEffect(() => { if (bodyRef.current)  autoResize(bodyRef.current);  }, [body]);
  useEffect(() => { if (!user) navigate("/"); }, [user]);

  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0;
  const readTime  = Math.max(1, Math.ceil(wordCount / 200));

  const insertMarkdown = (before, after = "") => {
    const el = bodyRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end   = el.selectionEnd;
    const sel   = body.slice(start, end);
    const newBody = body.slice(0, start) + before + sel + after + body.slice(end);
    setBody(newBody);
    setTimeout(() => {
      el.selectionStart = start + before.length;
      el.selectionEnd   = start + before.length + sel.length;
      el.focus();
    }, 0);
  };

  const handleTagKey = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const t = tagInput.trim().replace(/,/g, "");
      if (t && !tags.includes(t) && tags.length < 5) setTags([...tags, t]);
      setTagInput("");
    }
    if (e.key === "Backspace" && !tagInput && tags.length) setTags(tags.slice(0, -1));
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setCoverPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const removeCover = () => {
    setCoverPreview(null);
    setCoverFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const buildFormData = (status) => {
    const formData = new FormData();
    formData.append("title",    title.trim());
    formData.append("subtitle", subtitle.trim());
    formData.append("content",  body.trim());
    formData.append("tags",     JSON.stringify(tags));
    formData.append("status",   status);
    if (coverFile) {
      formData.append("coverImage", coverFile);
    } else if (coverPreview && coverPreview.startsWith("http")) {
      formData.append("existingCoverImage", coverPreview);
    }
    return formData;
  };

  const handleSaveDraft = async () => {
    if (!title.trim()) return;
    try {
      const formData = buildFormData("draft");
      if (isEditing) {
        await api.put(`/api/articles/${draftId}`, formData);
      } else {
        await api.post("/api/articles", formData);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  const handlePublish = () => {
    if (!title.trim()) { alert("Please add a title before publishing."); return; }
    if (!body.trim())  { alert("Please write some content before publishing."); return; }
    setError("");
    setShowPublishModal(true);
  };

  const confirmPublish = async () => {
    setPublishing(true);
    setError("");
    try {
      const formData = buildFormData("published");
      if (isEditing) {
        await api.put(`/api/articles/${draftId}`, formData);
      } else {
        await api.post("/api/articles", formData);
      }
      setPublished(true);
      setShowPublishModal(false);
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to publish. Please try again.");
      setPublishing(false);
    }
  };

  return (
    <div style={STYLES.page}>
      {/* NAV */}
      <nav style={STYLES.nav}>
        <a href="/" style={STYLES.logo}>WriteFlow</a>
        <div style={STYLES.navRight}>
          {isEditing && (
            <span style={{ fontSize: 12, background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 100, padding: "4px 12px", fontFamily: "'Georgia',serif", color: "#854d0e", fontWeight: 600 }}>
              Editing draft
            </span>
          )}
          <span style={{ fontSize: "13px", color: T.muted, fontFamily: "'Georgia', serif", opacity: saved ? 1 : 0, transition: "opacity 0.4s" }}>
            {isEditing ? "Draft updated" : "Draft saved"}
          </span>
          <button style={STYLES.saveDraftBtn} onClick={handleSaveDraft}
            onMouseEnter={e => { e.currentTarget.style.color = T.ink; e.currentTarget.style.background = "#e8e3db"; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.background = "transparent"; }}>
            Save draft
          </button>
          <button
            style={{ ...STYLES.publishBtn, background: published ? T.greenMuted : T.green }}
            onClick={handlePublish}
            onMouseEnter={e => e.currentTarget.style.background = T.greenLight}
            onMouseLeave={e => e.currentTarget.style.background = published ? T.greenMuted : T.green}>
            {published ? "Published ✓" : "Publish"}
          </button>
        </div>
      </nav>

      {/* EDITOR */}
      <div style={STYLES.editorWrap}>

        {/* Cover image */}
        <div style={STYLES.coverArea}>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleCoverChange} />
          {coverPreview ? (
            <div style={{ position: "relative" }}>
              <img src={coverPreview} alt="cover" style={STYLES.coverImg} />
              <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 8 }}>
                <button onClick={() => fileInputRef.current?.click()}
                  style={{ background: "rgba(0,0,0,0.5)", color: "#fff", border: "none", borderRadius: "99px", padding: "4px 12px", cursor: "pointer", fontSize: "12px" }}>
                  Change
                </button>
                <button onClick={removeCover}
                  style={{ background: "rgba(0,0,0,0.5)", color: "#fff", border: "none", borderRadius: "99px", padding: "4px 12px", cursor: "pointer", fontSize: "12px" }}>
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <div style={STYLES.coverPlaceholder}
              onClick={() => fileInputRef.current?.click()}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.greenMuted; e.currentTarget.style.background = "rgba(45,106,45,0.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = "transparent"; }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
              <span style={STYLES.coverPlaceholderText}>Add a cover image</span>
            </div>
          )}
        </div>

        <textarea ref={titleRef} style={STYLES.titleInput} placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} rows={1}/>
        <textarea style={STYLES.subtitleInput} placeholder="Write a subtitle…" value={subtitle} onChange={e => setSubtitle(e.target.value)} rows={1}/>
        <div style={STYLES.divider}/>

        {/* TOOLBAR */}
        <div style={STYLES.toolbar}>
          <Icon title="Bold"            onClick={() => insertMarkdown("**", "**")}><strong>B</strong></Icon>
          <Icon title="Italic"          onClick={() => insertMarkdown("*", "*")}><em>I</em></Icon>
          <Icon title="Heading"         onClick={() => insertMarkdown("\n## ", "\n")}>H</Icon>
          <div style={STYLES.toolSep}/>
          <Icon title="Quote"           onClick={() => insertMarkdown("\n> ", "\n")}>❝</Icon>
          <Icon title="Code"            onClick={() => insertMarkdown("`", "`")}>{"</>"}</Icon>
          <div style={STYLES.toolSep}/>
          <Icon title="Bullet list"     onClick={() => insertMarkdown("\n- ", "")}>≡</Icon>
          <Icon title="Numbered list"   onClick={() => insertMarkdown("\n1. ", "")}>№</Icon>
          <div style={STYLES.toolSep}/>
          <Icon title="Link" onClick={() => {
  const el = bodyRef.current
  if (!el) return
  const sel = body.slice(el.selectionStart, el.selectionEnd)
  if (sel) {
    insertMarkdown("[", "](https://)")
  } else {
    insertMarkdown("[link text](https://", ")")
  }
}}>🔗</Icon>
          <Icon title="Horizontal rule" onClick={() => insertMarkdown("\n---\n", "")}>—</Icon>
          <div style={STYLES.toolSep}/>
          {/* Preview toggle button */}
          <button
            onClick={() => setShowPreview(p => !p)}
            style={{
              ...STYLES.toolBtn,
              background: showPreview ? "#e8e3db" : "transparent",
              color: showPreview ? T.ink : T.muted,
              fontSize: 13, padding: "6px 14px", borderRadius: 4,
              fontFamily: "'Georgia', serif",
            }}>
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>

        {/* EDITOR OR PREVIEW — toggled by showPreview */}
        {showPreview ? (
          <div style={{ minHeight: 400, fontSize: 20, lineHeight: 1.8, fontFamily: "'Georgia', 'Times New Roman', serif", color: T.ink }}>
            <style>{`
              .wf-preview h2 { font-size: 26px; font-weight: 700; margin: 32px 0 12px; font-family: 'Georgia', serif; }
              .wf-preview h3 { font-size: 20px; font-weight: 700; margin: 24px 0 10px; font-family: 'Georgia', serif; }
              .wf-preview p  { margin-bottom: 24px; }
              .wf-preview blockquote { border-left: 3px solid #ccc; padding-left: 20px; color: #666; margin: 24px 0; font-style: italic; }
              .wf-preview code { background: #f0ece4; padding: 2px 6px; border-radius: 3px; font-size: 16px; font-family: monospace; }
              .wf-preview pre { background: #f0ece4; padding: 16px; border-radius: 6px; overflow-x: auto; margin-bottom: 24px; }
              .wf-preview ul, .wf-preview ol { padding-left: 24px; margin-bottom: 24px; }
              .wf-preview li { margin-bottom: 8px; }
              .wf-preview a  { color: #2D6A2D; text-decoration: underline; }
              .wf-preview hr { border: none; border-top: 1px solid #D9D4CB; margin: 32px 0; }
              .wf-preview strong { font-weight: 700; }
              .wf-preview em { font-style: italic; }
            `}</style>
            <div className="wf-preview">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{body || '*Nothing to preview yet…*'}</ReactMarkdown>
            </div>
          </div>
        ) : (
          <textarea ref={bodyRef} style={STYLES.bodyEditor} placeholder="Tell your story…" value={body} onChange={e => setBody(e.target.value)} rows={16}/>
        )}

        {/* Tags */}
        <div style={STYLES.tagSection}>
          <p style={STYLES.tagLabel}>Add up to 5 tags</p>
          <div style={STYLES.tagRow}>
            {tags.map(t => (
              <span key={t} style={STYLES.tag}>
                {t}
                <button style={STYLES.tagRemove} onClick={() => setTags(tags.filter(x => x !== t))}>×</button>
              </span>
            ))}
            {tags.length < 5 && (
              <input style={STYLES.tagInput} placeholder="Add a tag…" value={tagInput}
                onChange={e => setTagInput(e.target.value)} onKeyDown={handleTagKey}/>
            )}
          </div>
        </div>
      </div>

      {/* STATUS BAR */}
      <div style={STYLES.statusBar}>
        <span><span style={STYLES.dot}/>{wordCount} {wordCount === 1 ? "word" : "words"}</span>
        <span>{readTime} min read</span>
        {title && <span style={{ marginLeft: "auto", color: T.greenMuted }}>{title.slice(0, 48)}{title.length > 48 ? "…" : ""}</span>}
      </div>

      {/* PUBLISH MODAL */}
      {showPublishModal && (
        <div style={STYLES.modal} onClick={() => setShowPublishModal(false)}>
          <div style={STYLES.modalBox} onClick={e => e.stopPropagation()}>
            <p style={STYLES.modalTitle}>Ready to publish?</p>
            <p style={STYLES.modalSub}>Your story will be visible to everyone on WriteFlow.</p>

            {error && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#dc2626", fontFamily: "'Georgia',serif" }}>
                {error}
              </div>
            )}

            <div style={{ background: T.cream, borderRadius: "6px", padding: "16px 20px", marginBottom: "20px" }}>
              <p style={STYLES.modalPreviewTitle}>{title || "Untitled"}</p>
              <p style={STYLES.modalPreviewBody}>
                {subtitle || (body ? body.slice(0, 120) + (body.length > 120 ? "…" : "") : "No subtitle")}
              </p>
              {coverPreview && (
                <img src={coverPreview} alt="cover preview"
                  style={{ width: "100%", maxHeight: "120px", objectFit: "cover", borderRadius: "4px", marginBottom: "12px" }} />
              )}
              {tags.length > 0 && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {tags.map(t => (
                    <span key={t} style={{ background: "#e8e3db", borderRadius: "99px", padding: "3px 12px", fontSize: "12px", fontFamily: "'Georgia', serif", color: T.ink }}>{t}</span>
                  ))}
                </div>
              )}
            </div>

            <div style={STYLES.modalRow}>
              <button style={STYLES.modalCancel} onClick={() => setShowPublishModal(false)}>Cancel</button>
              <button style={{ ...STYLES.modalPublish, opacity: publishing ? 0.7 : 1 }}
                onClick={confirmPublish} disabled={publishing}>
                {publishing ? "Publishing…" : "Publish now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}