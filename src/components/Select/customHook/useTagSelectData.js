import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getTagList } from '../../../reducers/GetTagsReducer'

export default function useTagData() {
  const tagOptions = useSelector(getTagList)
  console.log("🚀 ~ file: useTagData.jsx:7 ~ useTagData ~ tagOptions:", tagOptions)

  const popularTags = useMemo(() => {
    if (!tagOptions) return []
    return tagOptions
      .filter((tag) => tag.popular)
      .sort((t1, t2) => t1.sorting - t2.sorting)
      .map(tag => ({
        value: tag._id,
        label: tag.name,
      }))
  }, [tagOptions])

  const notPopularTags = useMemo(() => {
    if (!tagOptions) return []
    return tagOptions
      .filter((tag) => !tag.popular)
      .map(tag => ({
        value: tag._id,
        label: tag.name,
      }))
  }, [tagOptions])

  const groupOptions = [
    {
      label: '－熱門－',
      options: popularTags,
    },
    {
      label: '－非熱門－',
      options: notPopularTags,
    }
  ]

  return groupOptions && { groupOptions, popularTags, notPopularTags }
}
