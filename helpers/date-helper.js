export function getPreviousMonthToday() {
  const today = new Date();

  today.setMonth(today.getMonth() - 1);

  return today.toISOString().split('T')[0];
}

export function getToday() {
  return new Date().toISOString().split('T')[0];
}
