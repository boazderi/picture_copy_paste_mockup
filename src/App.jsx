import { useState } from 'react'

function App() {
  const [platform, setPlatform] = useState('facebook')
  const [shareCount, setShareCount] = useState(0)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const maxShares = 3

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImagePaste = async (e) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile()
        setImage(blob)
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result)
        }
        reader.readAsDataURL(blob)
        break
      }
    }
  }

  const handleShareImage = async () => {
    if (!imagePreview) {
      alert('אנא בחר תמונה תחילה')
      return
    }

    try {
      // המרת base64 ל-blob
      const response = await fetch(imagePreview)
      const blob = await response.blob()

      // יצירת ClipboardItem
      const item = new ClipboardItem({ [blob.type]: blob })

      // העתקה ללוח
      await navigator.clipboard.write([item])

      // עדכון מונה השיתופים
      if (shareCount < maxShares) {
        setShareCount(shareCount + 1)
      }

      alert(`התמונה הועתקה בהצלחה! כעת אפשר להדביק אותה ב${platform === 'facebook' ? 'פייסבוק' : 'X'}`)
    } catch (err) {
      console.error('שגיאה בהעתקת התמונה:', err)
      alert('מצטערים, הדפדפן לא תומך בהעתקת תמונות ללוח. נסה דפדפן אחר או העלה תמונה ידנית.')
    }
  }

  const handleReplaceImage = () => {
    document.getElementById('file-input').click()
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-brand-blue to-brand-blue-light text-white"
      onPaste={handleImagePaste}
      tabIndex="0"
    >
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* כותרת המותג */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">SharePic</h1>
          <p className="text-gray-300 text-sm">שתף תמונות בקלות בכל מכשיר</p>
        </div>

        {/* בחירת פלטפורמה */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <label className="block mb-2 text-sm font-medium">בחר פלטפורמה:</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value="facebook" className="text-gray-900">פייסבוק</option>
            <option value="x" className="text-gray-900">X (טוויטר לשעבר)</option>
          </select>
        </div>

        {/* סרגל התקדמות */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">התקדמות שיתופים</span>
            <span className="text-sm font-medium">{shareCount} / {maxShares}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(shareCount / maxShares) * 100}%` }}
            />
          </div>
          {shareCount >= maxShares && (
            <p className="text-green-300 text-sm mt-2 text-center font-medium">
              מצוין! השלמת את יעד השיתופים! 🎉
            </p>
          )}
        </div>

        {/* תצוגה מקדימה של התמונה */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">תצוגה מקדימה</h2>
          <div className="bg-white/5 border-2 border-dashed border-white/30 rounded-lg min-h-[300px] flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="תצוגה מקדימה"
                className="max-w-full max-h-[400px] object-contain"
              />
            ) : (
              <div className="text-center p-8">
                <svg
                  className="mx-auto h-16 w-16 text-white/40 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-white/60 mb-2">לא נבחרה תמונה</p>
                <p className="text-white/40 text-sm">
                  הדבק תמונה (Ctrl+V / Cmd+V) או לחץ על "בחר תמונה"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* כפתורים */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          <button
            onClick={handleReplaceImage}
            className="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 border border-white/30"
          >
            {imagePreview ? 'החלף תמונה' : 'בחר תמונה'}
          </button>

          <button
            onClick={handleShareImage}
            disabled={!imagePreview}
            className="flex-1 bg-white text-brand-blue font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            שתף תמונה
          </button>
        </div>

        {/* הוראות שימוש */}
        <div className="mt-8 bg-white/5 rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-2">איך להשתמש:</h3>
          <ol className="text-sm text-white/70 space-y-1 list-decimal list-inside">
            <li>הדבק תמונה מהלוח (Ctrl+V או Cmd+V) או העלה קובץ</li>
            <li>בחר את הפלטפורמה שבה תרצה לשתף</li>
            <li>לחץ על "שתף תמונה" להעתקת התמונה ללוח</li>
            <li>הדבק את התמונה ישירות בפייסבוק או X</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default App
