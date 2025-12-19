# Week 3 – Next.js + TailwindCSS Dashboard (Frontend Only)

This project is part of **Week 3 – Advanced Frontend Training**.  
The goal of this week is to learn how to build **modern, production-grade frontend UIs** using:

- **Next.js (App Router)**
- **TailwindCSS**
- **Reusable component architecture**
- **Real dashboard layout patterns**

This project focuses purely on **frontend UI** (no backend).

---

## 🚀 Tech Stack

- **Next.js 16 (App Router)**
- **React**
- **TailwindCSS**
- **Next/Image & Next/Link**
- **File-based Routing**

---

## 📂 Folder Structure

app/
├─ layout.js # Root layout (Navbar + Sidebar)
├─ page.js # Landing page
└─ dashboard/
├─ page.js
├─ tables/page.js
├─ billing/page.js
├─ rtl/page.js
└─ profile/page.js

components/
└─ ui/
├─ Sidebar.jsx
└─ Navbar.jsx

public/
└─ icons/
dashboard.png
tables.png
billing.png
RTL.png
profile.png
signin.png
signup.png
needhelp.png
search.png
user.png
settings.png
notification.png


---

## 🧠 Key Concepts Learned

- File-based routing in Next.js
- App Router & layout system
- Difference between **Server Components** and **Client Components**
- Sidebar as a **navigation system**
- Navbar reacting to route changes
- Utility-first styling using TailwindCSS
- Component reusability & clean structure

---

## 📅 Day-Wise Learning Breakdown

---

### ✅ Day 1 – TailwindCSS + Layout System (Completed)

#### What was built
- **Dashboard layout skeleton**
- **Reusable Sidebar component**
- **Reusable Navbar component**
- Proper page layout using `app/layout.js`

#### Key learnings
- How `layout.js` wraps all pages
- Why Sidebar & Navbar should live outside `page.js`
- How to structure a dashboard layout using Flexbox
- How to avoid layout bugs like unwanted black areas
- Using `next/image` for optimized images
- Using `next/link` for navigation
- Detecting active routes using `usePathname()`

#### Important architectural decisions
- Sidebar controls **navigation**
- Navbar reads **current route context**
- Routes exist physically as folders (`page.js`)
- Layout controls height (`min-h-screen`), not components

---

### 🔜 Day 2 – Component Library (Upcoming)

Planned components:
- Button
- Card
- Badge
- Modal
- Input

Focus:
- Props
- Variants
- Reusability
- Atomic design mindset

---

### 🔜 Day 3 – Routing & Nested Layouts

- Multi-page routing
- Nested layouts inside `/dashboard`
- Shared UI across pages

---

### 🔜 Day 4 – Responsive UI + SEO

- Responsive dashboard & landing page
- `next/image` optimization
- SEO metadata
- Typography system

---

### 🔜 Day 5 – Capstone Mini Project

- Login page
- Dashboard widgets
- Users table
- Profile page
- Fully responsive UI
- Component reuse across pages

---

## 🧩 Current Status

✔ Layout system complete  
✔ Sidebar navigation working  
✔ Navbar updates based on route  
✔ Icons & assets integrated  
✔ Ready for Day-2 components  

---

## 📌 Notes

- No backend is used in this project.
- All data is static or mocked.
- Focus is on **frontend architecture & UI thinking**, not just visuals.

---

## ✨ Author

**Anay Gupta**  
Frontend Training – Week 3  
