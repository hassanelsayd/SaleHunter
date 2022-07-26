import { ConvertToArabicNumbers } from "./ArabicNumbers";
export const ConvertToArabicDates = (day, date, month, year) => {
  let months = [
    "يناير",
    "فبراير",
    "مارس",
    "ابريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];
  let days = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  return `${days[day]} ${ConvertToArabicNumbers(date)} ${
    months[month]
  } ${ConvertToArabicNumbers(year)}`;
};
