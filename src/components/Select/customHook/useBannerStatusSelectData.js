export default function useBannerStatusSelectData() {

  const statusOptions = [
    { value: 0, label: '已排程' },
    { value: 1, label: '進行中' },
    { value: 2, label: '下架' },
  ]
  return statusOptions;
}
