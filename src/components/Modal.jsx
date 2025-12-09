import React from "react";
import { X } from "lucide-react";

const Modal = ({  title,  children,  footer,  size,  showHeader,  showCloseButton,  showFooter,  enableEscapeKey,  closeOnOutsideClick,  isOpen,  onClose,  onConfirm,  buttonType,
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

  // Reset input when modal closes
  React.useEffect(() => {
    if (!isOpen) setInputValue("");
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
        <div ref={modalRef} className="modal-content" style={{ animation: "zoomIn .25s" }}>
          {showHeader && (
            <div className="modal-header">
              {title && <h5 id="modal-title" className="modal-title">{title}</h5>}
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

          {/* Body with input auto binding */}
          <div className="modal-body">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child) && child.type === "input") {
                return React.cloneElement(child, {
                  value: inputValue,
                  onChange: (e) => setInputValue(e.target.value),
                });
              }
              return child;
            })}
          </div>

          {/* FOOTER */}
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
                        onConfirm({ isValid: true, value: inputValue });
                      } else {
                        onConfirm({ isValid: false });
                      }
                      setInputValue(""); // clear after confirm
                    }}
                    className="btn btn-primary"
                  >
                    Confirm
                  </button>
                </>
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
