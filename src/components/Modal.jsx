import React from "react";
import { X } from "lucide-react";

const Modal = ({
  title,  children,  footer,  size,  showHeader,  showCloseButton,  showFooter,  enableEscapeKey,  closeOnOutsideClick,  isOpen,  onClose,  onConfirm,  buttonType,
}) => {
  const modalRef = React.useRef(null);
  const previousFocusRef = React.useRef(null);
  const closeButtonRef = React.useRef(null);

  const [inputValue, setInputValue] = React.useState("");

  // Handle Escape key
  React.useEffect(() => {
    if (!enableEscapeKey) return;
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose, enableEscapeKey]);

  // Focus handling
  React.useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // Focus trap in modal
  React.useEffect(() => {
    if (!isOpen) return;
    const modal = modalRef.current;
    if (!modal) return;

    const focusableEl = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusableEl[0];
    const last = focusableEl[focusableEl.length - 1];

    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    modal.addEventListener("keydown", handleTab);
    return () => modal.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  // Prevent body scroll
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (closeOnOutsideClick && e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  const sizeClass =
    size === "sm" ? "modal-sm" : size === "lg" ? "modal-lg" : "";

  return (
    <div
      className="modal fade show d-block"
      onClick={handleBackdropClick}
      aria-labelledby={title ? "modal-title" : undefined}
      aria-modal="true"
      role="dialog"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1050,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className={`modal-dialog modal-dialog-centered ${sizeClass}`}
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", zIndex: 1051 }}
      >
        <div
          ref={modalRef}
          className="modal-content"
          style={{ animation: "zoomIn .25s" }}
        >
          {showHeader && (
            <div className="modal-header">
              {title && (
                <h5 id="modal-title" className="modal-title">
                  {title}
                </h5>
              )}
              {showCloseButton && (
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  type="button"
                  className="btn-close"
                  aria-label="Close modal"
                />
              )}
            </div>
          )}
          <div className="modal-body">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child) && child.type === "input") {
                return React.cloneElement(child, {
                  onChange: (e) => setInputValue(e.target.value),
                });
              }
              return child;
            })}
          </div>

          {showFooter && (
            <div className="modal-footer">
              {footer}

              {buttonType === "both" && (
                <>
                  <button onClick={onClose} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (inputValue.trim()) {
                        onConfirm({ value: inputValue });
                      } else {
                        onConfirm({ isValid: false });
                      }
                    }}
                    className="btn btn-primary"
                  >
                    Confirm
                  </button>
                </>
              )}

              {buttonType === "cancel" && (
                <button onClick={onClose} className="btn btn-secondary">
                  Cancel
                </button>
              )}

              {buttonType === "confirm" && (
                <button onClick={onConfirm} className="btn btn-primary">
                  Confirm
                </button>
              )}

            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes zoomIn {
          from { transform: scale(0.9); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Modal;
