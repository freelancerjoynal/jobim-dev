import React from 'react';

export default function Page() {
  return (
    <div className="container mx-auto p-4" dir="rtl">
      <div className="py-20">
      <h1 className="text-3xl font-bold mb-6">טיפים לכתיבת קורות חיים</h1>
      
      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">1. התאמת הקורות חיים למשרה</h2>
        <p>חשוב להתאים את הקורות חיים לכל משרה שאתה מגיש. הדגש כישורים ונסיון שקשורים ישירות לדרישות התפקיד.</p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">2. מבנה מסודר וקריא</h2>
        <ul className="list-disc pl-5">
          <li>השתמש בפונט מקצועי ונקי כמו Arial או Calibri.</li>
          <li>סידור ברור והיררכי: כותרות ברורות לכל חלק (השכלה, ניסיון תעסוקתי, כישורים וכו&apos;).</li>
          <li>אל תעמיס מידע, קורות חיים צריכים להיות ממוקדים ונגישים לקריאה מהירה.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">3. מידע אישי חיוני</h2>
        <p>בראש הדף, כלול שם, פרטי יצירת קשר (טלפון, מייל), מקום מגורים. אל תכלול פרטים כמו מספר זהות או תמונה אלא אם מבקשים באופן ספציפי.</p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">4. תמצות ופירוט</h2>
        <p>כלול רק מידע רלוונטי. אין צורך לציין כל עבודה שאי פעם עבדת בה. הקפד לרשום את הניסיון התעסוקתי בסדר כרונולוגי יורד (מהעדכני לישן).</p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">5. הישגים ומיומנויות</h2>
        <p>פרט הישגים בולטים בכל עבודה, במיוחד כאלו שמראים יכולות או תוצאות מוחשיות.</p>
        <p>הדגש כישורים טכניים ומיומנויות רכות כגון תקשורת ועבודת צוות.</p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">6. שימוש במספרים</h2>
        <p>הצג הצלחות כמותיות במידת האפשר, לדוגמה: &quot;הגדלתי את המכירות ב-15%&quot;.</p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">7. השכלה</h2>
        <p>ציין את ההשכלה האקדמית שלך, כולל תארים, מוסד הלימוד ושנת סיום. אם רלוונטי, ציין גם הכשרות מקצועיות וקורסים שתומכים במשרה שאתה מגיש אליה.</p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">8. שפות</h2>
        <p>ציין שפות שאתה דובר, במיוחד אם מדובר בדרישה למשרה.</p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">9. תחביבים והתנדבות</h2>
        <p>במידה ויש לך תחביבים מעניינים או התנדבויות שתורמים לכישוריך, תוכל לציין אותם בסוף.</p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">10. בדיקת שגיאות</h2>
        <p>עבר על הקורות חיים מספר פעמים וודא שאין בהם שגיאות כתיב או ניסוח.</p>
      </section>
      
      <p className="text-lg font-medium mt-6">
        קורות חיים הם הדרך הראשונה להרשים את המעסיק, ולכן חשוב להשקיע בהם זמן ומחשבה!
      </p>
      </div>
    </div>
  );
}
