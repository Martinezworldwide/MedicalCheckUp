# MedicalCheckUp

# 🩺 Doctor Checkup Scheduler

This is a **client-side app** built for GitHub Pages that helps you:
- 📋 **View a list of every type of doctor**
- 🗓️ **Schedule checkups by date**
- 💾 **Save your schedule automatically using Local Storage**
- 🖨️ **Print or download your schedule as a PDF**
- 🔍 **Filter checkups by month and year**
- 🛠️ **Edit or delete appointments**
- 📱 Fully **mobile optimized** and works offline

---

## 🚀 Live Demo
👉 [Click here to view the app live on GitHub Pages](https://martinezworldwide.github.io/MedicalCheckUp)  
> Replace the URL with your actual GitHub Pages link after publishing.

---

## 📂 Folder Structure
doctor-checkup-scheduler/
├── index.html         # Main HTML UI
├── styles.css         # CSS for styling and mobile layout
├── script.js          # JavaScript logic (scheduling, filters, PDF, local storage)
└── pdf-lib.min.js     # PDF generation library (can be loaded via CDN or local)

---

## 🔧 Features Overview

| Feature                        | Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|
| 🧠 Smart Doctor List           | Preloaded with 35+ doctor types, including Dentist, Neurologist, etc.       |
| ➕ Add Checkups                | Choose a doctor and date to schedule                                       |
| 🗃️ Auto-Save                   | All checkups are saved in your browser (Local Storage)                     |
| ✏️ Edit/Delete                 | Modify or remove checkups in-place                                        |
| 🖨️ Print Button                | Open a printable view of all checkups                                     |
| 📄 Download as PDF            | Generate a clean summary PDF with all checkups                            |
| 📅 Month & Year Filters        | Filter by month/year to find upcoming checkups easily                      |
| 📱 Mobile Optimized            | Fully responsive layout for smartphones and tablets                        |

---

## 📦 Dependencies
- [`pdf-lib`](https://pdf-lib.js.org/) — Used for client-side PDF generation

---

## 🧑‍💻 How to Use Locally

1. Clone or fork the repository.
2. Open `index.html` in your browser.
3. Or upload the project to GitHub Pages:
    - Go to **Settings → Pages**
    - Select the branch (e.g., `main`) and folder (`/root`)
    - Save and access the generated link

---

## 🛡️ Permissions & Privacy
This app uses **no backend** — all your data is stored locally in your browser only (via `localStorage`). No personal info is shared or tracked.

---

## 📌 Note
- You can customize the doctor list in `script.js` if needed.
- If printing or PDF generation causes memory issues on large lists, try breaking it into smaller sections.

---

## 💡 Future Ideas
- Calendar view of checkups
- Email/SMS reminders
- Export/Import checkup data
- Add profile fields for patient name, notes, location

---

## 📄 License
MIT License. Use freely with credit.


