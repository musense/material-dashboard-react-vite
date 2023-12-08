export default function useStatusSelectData() {
  const statusOptions = [
    { value: 0, label: '全部' },
    { value: 1, label: '草稿' },
    { value: 2, label: '已排程' },
    { value: 3, label: '隱藏文章' },
    { value: 4, label: '已發布' },
  ]
  return statusOptions;
}
