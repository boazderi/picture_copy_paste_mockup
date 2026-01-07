# SharePic - העתק והדבק תמונות בקלות

אתר פשוט לשיתוף תמונות בפלטפורמות שונות (פייסבוק, X) עם תמיכה בהעתקה והדבקה.

## 🚀 הפעלת האתר בענן (GitHub Pages)

### להפעלת GitHub Pages:
1. עבור להגדרות הריפו: https://github.com/boazderi/picture_copy_paste_mockup/settings/pages
2. תחת "Build and deployment":
   - Source: בחר "GitHub Actions"
3. ה-workflow יתחיל לרוץ אוטומטית
4. לאחר מספר דקות, האתר יהיה זמין בכתובת:
   **https://boazderi.github.io/picture_copy_paste_mockup/**

## 💻 הפעלה מקומית

```bash
# התקנת תלויות
npm install

# הרצה במצב פיתוח
npm run dev

# בניית גרסת ייצור
npm run build
```

## ✨ תכונות

- העתק והדבק תמונות (Ctrl+V / Cmd+V)
- העלאת קבצי תמונה
- בחירת פלטפורמה (פייסבוק / X)
- מעקב אחר התקדמות שיתופים
- העתקה ללוח (Clipboard API)
- רספונסיבי לחלוטין
- תמיכה ב-RTL

## 🛠️ טכנולוגיות

- React 18
- Vite
- Tailwind CSS