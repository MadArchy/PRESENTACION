# Presenter Keyboard Reference — Venture Hub OS
**Document ID:** VHOS-ARCH-031  
**Specification:** `SPEC-005 — Executive Presenter Cockpit`  
**Phase:** `VHOS-PHASE-005`  

---

## 1. Keyboard Map & Input Isolation

| Key Binding | Action |
| :--- | :--- |
| **`ArrowRight` / `PageDown` / `Space`** | Next Scene |
| **`ArrowLeft` / `PageUp`** | Previous Scene |
| **`Home`** | Jump to First Scene |
| **`End`** | Jump to Last Scene |
| **`Escape`** | Close Overview Drawer or Exit Cockpit |

### Input Isolation Rule:
If the user's cursor is inside an editable input (`<input>`, `<textarea>`, or `[contenteditable]`), all presentation navigation key bindings are bypassed.
