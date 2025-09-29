/**
  把日期字串變成「完整日期 + 相對時間」兩種格式
  格式化日期，回傳 "2023年8月15日 (2d ago)" 或 "2023年8月15日"
  時間格式可以寫
  只有日期 "2024-05-08"
  日期+時間 "2024-05-08T13:00:00"
*/
export function formatDate(date: string, includeRelative = false) {
  console.log('formatDate date:', date);

  // 輸入格式：YYYY-MM-DD 或 YYYY-MM-DDTHH:mm:ss
  // 取得今天日期
  const currentDate = new Date();
  if (!date.includes('T')) {
    // 如果沒有時間資訊，補上 00:00:00
    date = `${date}T00:00:00`;
  }

  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = '';

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = 'Today';
  }
  /**
    超過一年 → xx y ago
    超過一個月 → xx mo ago
    超過一天 → xx d ago
    同一天 → Today
   */

  // toLocaleString 用來格式化日期字串
  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (!includeRelative) {
    return fullDate; // 以美式格式輸出完整日期 Month Day, Year 回傳完整日期 "2023年8月15日"
  }

  return `${fullDate} (${formattedDate})`; // 回傳完整日期 (相對時間) "2023年8月15日 (2d ago)"
}
