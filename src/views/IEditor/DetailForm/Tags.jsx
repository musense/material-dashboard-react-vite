import React, { useCallback } from "react";
import MultiTagSelectSort from '../../../components/Select/MultiTagSelectSort';

export default function Tags({ tags, onPropertyChange }) {

  const onTagsChange = useCallback((tags) => {
    if (tags.length === 0) return onPropertyChange(null, 'tags', null);
    const transformTags = tags
      ? tags.map((tag) => ({
        _id: tag.value,
        name: tag.label
      }))
      : null
    onPropertyChange(transformTags, 'tags', null);
  }, [onPropertyChange])

  return <section id="tags">
    <div>
      <label htmlFor='tags'>新增標籤</label>
      <MultiTagSelectSort
        creatable
        defaultSelected={tags}
        setState={onTagsChange}
      />
    </div>
  </section>;
}
