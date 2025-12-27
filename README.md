
# 🧮 Advanced Calculator (Vanilla JavaScript)

A responsive, feature-rich calculator built using **HTML, CSS, and JavaScript**, designed to demonstrate safe expression evaluation, keyboard interaction, and modern UI styling without external libraries.

This project separates **structure, style, and logic** into individual files for better organization and maintainability.

---

## 📁 Project Structure

```
calculator/
 ├── index.html   # Calculator UI and button layout
 ├── style.css    # Styling, layout, and responsive design
 └── script.js    # Calculator logic, validation, and events
```

* The interface is defined in `index.html` 
* Visual styling and responsive behavior are handled in `style.css` 
* All computation logic and event handling are implemented in `script.js` 

---

## ✨ Features

### 🔢 Arithmetic Operations

* Addition (`+`)
* Subtraction (`−`)
* Multiplication (`×`)
* Division (`÷`)
* Modulo (`%`)
* Exponentiation (`xʸ`)
* Square root (`√`)

### 🧠 Smart Expression Handling

* Builds expressions as strings
* Sanitizes input before evaluation
* Converts UI operators (`×`, `÷`, `^`) into JavaScript-safe syntax
* Prevents invalid characters and unsafe execution

### ⌨️ Keyboard Support

* Number keys (`0–9`)
* Operators (`+ - * /`)
* Parentheses (`(` `)`)
* `Enter` → Calculate
* `Backspace` → Delete last input
* `Escape` → Clear all
* `R` → Square root shortcut

### 🧹 Editing & Control

* **Clear (C)** resets the calculator
* **DEL** removes the last character
* **±** toggles the sign of the last number
* Scrollable display for long expressions

---

## 🎨 User Interface & Design

* Modern **glassmorphism-inspired** UI
* Gradient-based operator and action buttons
* Responsive layout optimized for mobile and desktop

All styling is handled purely with CSS—no frameworks required.

---

## ▶️ How to Run

### Method 1: Open Directly (Quick Start)

1. Open the project folder
2. Double-click `index.html`
3. The calculator runs immediately in your browser

### Method 2: Using a Local Server (Recommended)

#### Using Python

```bash
python -m http.server 8000
```

Then open:

```
http://localhost:8000/index.html
```

---

## 🧪 How to Use

* Click buttons or use the keyboard to build expressions
* Press `=` or `Enter` to calculate
* Use `C` or `Escape` to reset
* Use `DEL` or `Backspace` to remove input
* Use `√` or press `R` for square root
* Use `xʸ` to raise numbers to a power

---

## 🔐 Safety & Validation

* Expressions are sanitized before evaluation
* Only numeric and mathematical characters are allowed
* Invalid operations (e.g., √ of negative numbers) display an error
* Uses controlled evaluation via `Function()` with strict filtering

---

## 🌐 Browser Compatibility

* Google Chrome ✅
* Microsoft Edge ✅
* Mozilla Firefox ✅
* Safari ✅
* Internet Explorer 11 ⚠️ (limited support)

---

## ⚙️ Technical Highlights

* **No external dependencies**
* **Modular structure** (HTML / CSS / JS)
* **Event delegation** for button handling
* **Regex-based parsing** for last-number operations
* **Keyboard accessibility**

---

## 📜 License

Open source.
Free to use, modify, and extend for educational or personal projects.

---

