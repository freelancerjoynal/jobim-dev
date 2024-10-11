import React from 'react';

export default function page() {
  return (
    <div className='container mx-auto' dir="rtl">
      <div className="pt-11 min-h-screen">
      <h1 className='text-3xl font-bold mb-4'>הצהרת נגישות</h1>
      <p className='mb-4'>
        אנו ב-Jobimonline.co.il פועלים רבות להנגיש את האתר שלנו לאנשים עם מוגבלות, מתוך מחויבות לקידום השוויון בשירותים דיגיטליים.
        אנו משקיעים משאבים רבים כדי להבטיח חוויית גלישה נוחה ומכבדת עבור כלל המשתמשים.
      </p>
      <h2 className='text-2xl font-bold mb-3'>התאמות הנגישות שבוצעו באתר:</h2>
      <ul className='list-disc list-inside mb-4 pr-6'>
        <li className='mb-2'>ניווט באמצעות מקלדת &ndash; האתר מאפשר ניווט באמצעות מקלדת על ידי שימוש במקשי Tab ו-Shift+Tab לניווט קדימה ואחורה בין חלקי האתר.</li>
        <li className='mb-2'>תצוגה מותאמת לקוראי מסך &ndash; האתר מותאם לעבודה עם טכנולוגיות סיוע כגון קוראי מסך (כמו NVDA ו-JAWS).</li>
        <li className='mb-2'>תמיכה בהגדלת טקסט &ndash; ניתן להגדיל את הטקסטים באתר על ידי שימוש בקיצורי הדרך של הדפדפן (Ctrl + להגדלה ו-Ctrl - להקטנה).</li>
        <li className='mb-2'>ניגודיות צבעים &ndash; באתר ישנה אפשרות לשנות את ניגודיות הצבעים כדי לשפר את הנראות עבור אנשים עם לקויות ראייה.</li>
        <li>מבנה כותרות &ndash; האתר בנוי בצורה היררכית על ידי שימוש בכותרות (H1, H2, H3) המאפשרות הבנה ברורה של מבנה התוכן.</li>
      </ul>
      <h2 className='text-2xl font-bold mb-3'>סיוע נוסף</h2>
      <p className='mb-4'>
        אם נתקלתם בקושי לגלוש באתר או יש לכם הצעה לשיפור נגישות, נשמח לשמוע מכם. תוכלו ליצור קשר איתנו בכתובת המייל: 
        <a href='mailto:ilanandgilweb@gmail.com' className='text-blue-600 underline'>ilanandgilweb@gmail.com</a> 
        ואנו נעשה כל שביכולתנו כדי לטפל בפנייתכם בהקדם.
      </p>
      <h2 className='text-2xl font-bold mb-3'>פרטי רכז נגישות:</h2>
      <p className='mb-4'>כתובת מייל: <a href='mailto:ilanandgilweb@gmail.com' className='text-blue-600 underline'>ilanandgilweb@gmail.com</a></p>
      <p className='mb-4'>הצהרה זו עודכנה לאחרונה בתאריך: [הכנס תאריך עדכני]</p>
      </div>
    </div>
  )
}
