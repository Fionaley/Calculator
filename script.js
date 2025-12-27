/* Simple calculator: builds expression string, evaluates with safe sanitization */
const display = document.getElementById('display');
const historyEl = document.getElementById('history');
const keys = document.querySelector('.keys');


let expression = '';
let lastResult = null;
let justCalculated = false;

function updateDisplay(){
  display.textContent = expression || "0";

  // Auto-scroll to the right (latest input)
  display.scrollLeft = display.scrollWidth;
}

function appendValue(v){
  if (justCalculated){
    // start new expression if next char is a digit or dot
    if (/\d|\./.test(v)) {
      expression = v;
      justCalculated = false;
      updateDisplay();
      return;
    }
    // if operator, continue from lastResult
    expression = String(lastResult);
    justCalculated = false;
  }

  // avoid multiple leading zeros
  if (expression === '0' && v === '0') return;

  expression += v;
  updateDisplay();
}

function applyOperator(op){
  if (expression === '' && lastResult !== null) {
    expression = String(lastResult);
  }
  // prevent two operators in a row
  if (/[+\-*/]$/.test(expression)) {
    expression = expression.slice(0,-1) + op;
  } else {
    expression += op;
  }
  updateDisplay();
}

function clearAll(){
  expression = '';
  lastResult = null;
  justCalculated = false;
  historyEl.textContent = '';
  updateDisplay();
}

function togglePosNeg(){
  if (expression === '') return;
  // try to toggle sign of the last number
  expression = expression.replace(/(\d+(?:\.\d+)?)(?!.*\d)/, (m)=>{
    return m.startsWith('-') ? m.slice(1) : '-' + m;
  });
  updateDisplay();
}

function percent(){
  if (expression === '') return;
  // convert last number to percent
  expression = expression.replace(/(\d+(?:\.\d+)?)(?!.*\d)/, (m)=> String(parseFloat(m)/100));
  updateDisplay();
}

function squareRoot(){
  if (expression === '') return;

  expression = expression.replace(/(\-?\d+(\.\d+)?)(?!.*\d)/, (match)=>{
    const value = parseFloat(match);

    // Prevent invalid square root
    if (value < 0) {
      display.textContent = 'Error';
      expression = '';
      return '';
    }

    return String(Math.sqrt(value));
  });

  updateDisplay();
}

function power(){
  // If starting fresh but have a previous result
  if (expression === '' && lastResult !== null) {
    expression = String(lastResult);
  }

  // Prevent duplicate operators
  if (/[+\-×÷*/^]$/.test(expression)) {
    expression = expression.slice(0, -1) + '^';
  } else {
    expression += '^';
  }

  justCalculated = false;
  updateDisplay();
}


function sanitize(expr){
  // Convert UI operators to JS-safe operators
  let safe = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/');

  // Convert exponent operator to Math.pow
  safe = safe.replace(/(\-?\d+(?:\.\d+)?)\s*\^\s*(\-?\d+(?:\.\d+)?)/g, 'Math.pow($1,$2)');

  if (!/^[0-9+\-*/().\sMathpow,]+$/.test(safe)) {
    throw new Error('Invalid characters');
  }

  return safe;
}

function calculate(){
  if (expression === '') return;
  try {
    const safe = sanitize(expression);
    // Use Function constructor to evaluate in local scope
    const result = Function(`"use strict";return (${safe})`)();
    if (typeof result === 'number' && !Number.isFinite(result)) throw new Error('Result not finite');
    historyEl.textContent = expression + ' =';
    expression = String(result);
    lastResult = result;
    justCalculated = true;
    updateDisplay();

  } catch(e){
    display.textContent = 'Error';
    expression = '';
    lastResult = null;
    justCalculated = false;
    console.warn('Calc error', e);
  }
}

function deleteLast(){
  if (justCalculated){
    expression = String(lastResult !== null ? lastResult : '');
    justCalculated = false;
  }
  expression = expression.slice(0, -1);
  updateDisplay();
}

keys.addEventListener('click', (e)=>{
  const btn = e.target.closest('button');
  if (!btn) return;
  const action = btn.dataset.action;
  const value = btn.dataset.value;

  if (action === 'clear') clearAll();
  else if (action === 'delete') deleteLast();
  else if (action === 'posneg') togglePosNeg();
  else if (action === 'percent') percent();
  else if (action === 'sqrt') squareRoot();       
  else if (action === 'power') power();
  else if (action === 'operator') applyOperator(value);
  else if (action === 'calculate') calculate();
  else if (value) appendValue(value);
});

// keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  // numbers
  if (!isNaN(key)) {
    appendValue(key);
    return;
  }

  // operators + dot + parentheses ✅
  if (["+", "-", "*", "/", ".", "(", ")", "^", ""].includes(key)) {
    appendValue(key);
    return;
  }

  if (key === "Enter") {
    e.preventDefault();
    calculate();
    return;
  }

  if (key === "Backspace") {
    deleteLast();
    return;
  }

  if (key === "Escape") {
    clearAll();
    return;
  }
  // Square root shortcut (r or R)
if (key.toLowerCase() === "r") {
  applySqrt();
  return;
}

});


updateDisplay();

document.querySelector('[data-fn="sqrt"]').onclick = applySqrt;
function applySqrt() {
  squareRoot();
} 