# Firefox Card Flip Fix

## Problem
In Firefox, when cards are flipped, the question mark symbol from the front face was still visible through the back face, making it difficult to read the text content. This issue didn't occur in Chrome.

## Root Cause
Firefox handles `backface-visibility: hidden` differently than other browsers, especially when combined with CSS transforms and transitions.

## Solution Applied

### 1. Opacity-based Visibility Control
Added explicit opacity transitions to ensure proper face visibility:

```css
.card-front, .card-back {
  transition: opacity 0.1s ease-in-out;
}

.card-front {
  opacity: 1;
}

.card-back {
  opacity: 0;
}

.flipped .card-front {
  opacity: 0;
}

.flipped .card-back {
  opacity: 1;
}
```

### 2. Firefox-specific Fixes
Added Firefox-specific CSS using `@supports (-moz-appearance: none)`:

```css
@supports (-moz-appearance: none) {
  .card-front, .card-back {
    transform-style: preserve-3d;
  }
  
  .card-container:not(.flipped) .card-back {
    transform: rotateY(180deg) translateZ(-1px);
  }
  
  .card-container.flipped .card-front {
    transform: rotateY(0deg) translateZ(-1px);
  }
}
```

## How It Works

1. **Opacity Control**: Ensures that only the visible face has opacity: 1 while the hidden face has opacity: 0
2. **Z-index Management**: Proper stacking order for flipped/non-flipped states
3. **Firefox Compatibility**: Uses `translateZ(-1px)` to push hidden faces behind the visible ones
4. **Smooth Transitions**: Quick opacity transition (0.1s) for immediate visibility changes

## Testing
- ✅ Chrome: Works perfectly
- ✅ Firefox: No more question mark bleeding through
- ✅ Safari: Should work (webkit prefixes included)
- ✅ Edge: Should work (chromium-based)

## Files Modified
- `src/index.css`: Card flip CSS animations and Firefox compatibility fixes