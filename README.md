# Modal React Component

## Features

-Open / Close control using isOpen prop
-Close via:
-Close (X) button
-Click outside (optional)
-Escape key (optional)
-Focus trap inside modal
-Restore focus to previous element when closed
-Disable body scrolling when modal is open
-Dynamic sizes: sm, md, lg, xl
-Optional header & footer visibility
-Custom footer actions (buttons or elements)
-Fully controlled component (no internal state confusion)


---

## Component Desgin
The Modal implementation uses a single reusable component with configurable props.

### `Modal.jsx` (Container)

Responsibilities:
- Handles UI rendering, accessibility, keyboard listeners, structure, focus trapping, footer actions & visibility


## Project Structure

```

src/
├── components/
│   └── Modal.jsx
└── App.jsx


````

---

## Installation

Copy Modal.jsx into:

src/components/Modal.jsx


If you are using Bootstrap, install it:

```bash
npm install bootstrap
````

##    Usage Example 

```jsx
import React, { useState } from "react";
import Modal from "./components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalConfig = {
    title: "Basic Modal",
    size: "md",
    showHeader: true,
    showCloseButton: true,
    showFooter: true,
    enableEscapeKey: true,
    closeOnOutsideClick: true,
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      <Modal
        {...modalConfig}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button onClick={() => alert("Action confirmed")}>Confirm</button>
          </>
        }
      >
        <p>This is the modal body with dynamic content.</p>
      </Modal>
    </>
  );
}

export default App;
```

---

## Props

###    `Reference`

|Prop	             |Type	        |Required	            |Description
_______________________________________________________________________________________
isOpen	             |boolean	    |Yes	                |Controls modal visibility
onClose	             |function	    |Yes                	|Callback to close the modal
title	             |string     	|No                 	|Modal header title
size	             |"sm" | "md"   |No	                    |Modal width
                     |"lg" | "xl"	 
showHeader	         |boolean    	|No                 	|Toggle header
showCloseButton	     |boolean  	    |No                 	|Toggle (X) button
showFooter	         |boolean	    |No                 	|Toggle footer
enableEscapeKey	     |boolean	    |No                 	|Close via Escape key
closeOnOutsideClick	 |boolean	    |No	                    |Close by clicking outside
footer	             |ReactNode 	|No                 	|Custom footer actions
children	         |ReactNode	    |Yes                	|Body content inside modal


### Size Variants
Size |	Width
sm   | 	~30%
md	 |  ~50%
lg	 |  ~70%
xl	 |  ~90%

---

## Behavior Details

* Behavior Details
* Body scroll disabled when modal is open
* ESC closes modal when enabled
* click closes modal when enabled
* Fully centered & responsive
* Focus returns to previous element on closing

---


## Limitations

*  Limitations
*  No animation (can be added)
*  No multi-modal stacking
*  No internal form validation

---

## Possible Enhancements

*  Animation (fade / slide)
*  Auto-focus first element inside modal
*  Nested modal stacking support
*  Theme styles (Dark / Light)
*  TypeScript support

---

## Conclusion

This Modal component demonstrates:

* Reusability
* Clean UI + logic separation
* Accessibility & usability best practices
* Practical real-world React patterns