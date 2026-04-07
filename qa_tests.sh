#!/bin/bash
# QA Test Script for Critical Bug Fixes
# Tests: Hero Image, Logo, Offer 0 Terminology

PASS=0
FAIL=0
LOG=""

log_result() {
  if [ "$2" = "PASS" ]; then
    PASS=$((PASS + 1))
    LOG="$LOG\n✅ PASS: $1"
  else
    FAIL=$((FAIL + 1))
    LOG="$LOG\n❌ FAIL: $1 - $3"
  fi
}

echo "========================================"
echo " QA TEST SUITE - Critical Bug Fixes"
echo "========================================"
echo ""

# ─── BUG 1: Hero Section Tests ───
echo "--- BUG 1: Hero Section ---"

# Test 1.1: Hero image file exists
if [ -f "assets/images/vFinal Heritage Bodhi Tree Hero Image Only.png" ]; then
  log_result "Hero image file exists in assets/images/" "PASS"
else
  log_result "Hero image file exists in assets/images/" "FAIL" "File not found"
fi

# Test 1.2: app.js references correct hero image
if grep -q 'vFinal Heritage Bodhi Tree Hero Image Only.png' assets/js/app.js; then
  log_result "app.js references correct hero image filename" "PASS"
else
  log_result "app.js references correct hero image filename" "FAIL" "Image reference not found in app.js"
fi

# Test 1.3: Hero H1 text is correct
if grep -q 'Faith-Grounded' assets/js/app.js && grep -q 'Civic Virtue' assets/js/app.js; then
  log_result "Hero H1 contains 'Faith-Grounded Civic Virtue'" "PASS"
else
  log_result "Hero H1 contains 'Faith-Grounded Civic Virtue'" "FAIL" "H1 text not found"
fi

# Test 1.4: Hero text is left-aligned (alignItems: flex-start)
if grep -q 'alignItems:"flex-start"' assets/js/app.js; then
  log_result "Hero text is left-aligned (flex-start)" "PASS"
else
  log_result "Hero text is left-aligned (flex-start)" "FAIL" "Left alignment not found"
fi

# Test 1.5: Hero subtitle present
if grep -q 'grounded in scripture, hidden in plain view' assets/js/app.js; then
  log_result "Hero subtitle text present" "PASS"
else
  log_result "Hero subtitle text present" "FAIL" "Subtitle not found"
fi

# Test 1.6: Start The Challenge button exists
if grep -q 'Start The Challenge' assets/js/app.js; then
  log_result "Start The Challenge button exists" "PASS"
else
  log_result "Start The Challenge button exists" "FAIL" "Button text not found"
fi

# Test 1.7: View The Path button exists
if grep -q 'View The Path' assets/js/app.js; then
  log_result "View The Path button exists" "PASS"
else
  log_result "View The Path button exists" "FAIL" "Button text not found"
fi

# ─── BUG 2: Logo Tests ───
echo "--- BUG 2: Logo ---"

# Test 2.1: Logo image file exists
if [ -f "assets/images/bodhi-tree-logo-header.png" ]; then
  log_result "Logo image file exists in assets/images/" "PASS"
else
  log_result "Logo image file exists in assets/images/" "FAIL" "File not found"
fi

# Test 2.2: app.js references correct logo
if grep -q 'bodhi-tree-logo-header.png' assets/js/app.js; then
  log_result "app.js references bodhi-tree-logo-header.png" "PASS"
else
  log_result "app.js references bodhi-tree-logo-header.png" "FAIL" "Logo reference not found"
fi

# Test 2.3: Old SVG logo removed
if grep -q 'viewBox="0 0 44 44"' assets/js/app.js; then
  log_result "Old SVG logo removed from Nav" "FAIL" "Old SVG logo still present"
else
  log_result "Old SVG logo removed from Nav" "PASS"
fi

# Test 2.4: Logo uses img tag
if grep -q '<img src="assets/images/bodhi-tree-logo-header.png"' assets/js/app.js; then
  log_result "Logo uses <img> tag with correct src" "PASS"
else
  log_result "Logo uses <img> tag with correct src" "FAIL" "img tag not found"
fi

# ─── BUG 3: Offer 0 Terminology Tests ───
echo "--- BUG 3: Offer 0 Terminology ---"

# Test 3.1: No "Offer 0" in app.js
if grep -iq 'offer.0\|offer_0\|offer0' assets/js/app.js; then
  MATCHES=$(grep -in 'offer.0\|offer_0\|offer0' assets/js/app.js)
  log_result "No 'Offer 0' references in app.js" "FAIL" "Found: $MATCHES"
else
  log_result "No 'Offer 0' references in app.js" "PASS"
fi

# Test 3.2: No "Offer 0" in index.html
if grep -iq 'offer.0\|offer_0\|offer0' index.html; then
  log_result "No 'Offer 0' references in index.html" "FAIL" "Found in index.html"
else
  log_result "No 'Offer 0' references in index.html" "PASS"
fi

# Test 3.3: No "Offer 0" in main.css
if grep -iq 'offer.0\|offer_0\|offer0' assets/css/main.css; then
  log_result "No 'Offer 0' references in main.css" "FAIL" "Found in main.css"
else
  log_result "No 'Offer 0' references in main.css" "PASS"
fi

# Test 3.4: No "Offer 0" in README.md
if grep -iq 'offer.0\|offer_0\|offer0' README.md; then
  log_result "No 'Offer 0' references in README.md" "FAIL" "Found in README.md"
else
  log_result "No 'Offer 0' references in README.md" "PASS"
fi

# Test 3.5: Replacement term exists
if grep -q 'SeekerSignupForm' assets/js/app.js; then
  log_result "SeekerSignupForm function exists (renamed from Offer0SignupForm)" "PASS"
else
  log_result "SeekerSignupForm function exists" "FAIL" "Function not found"
fi

# Test 3.6: "Young Civic Engagement Challenge" appears
if grep -q 'Young Civic Engagement Challenge' assets/js/app.js; then
  log_result "'Young Civic Engagement Challenge' text present" "PASS"
else
  log_result "'Young Civic Engagement Challenge' text present" "FAIL" "Text not found"
fi

# ─── SUMMARY ───
echo ""
echo "========================================"
echo " QA TEST RESULTS"
echo "========================================"
echo -e "$LOG"
echo ""
echo "----------------------------------------"
echo " Total: $((PASS + FAIL)) | ✅ Passed: $PASS | ❌ Failed: $FAIL"
echo "----------------------------------------"

if [ $FAIL -eq 0 ]; then
  echo "🎉 ALL TESTS PASSED!"
  exit 0
else
  echo "⚠️  Some tests failed. Please review."
  exit 1
fi
