import React, { useCallback } from "react";
import SingleClassificationSelect from "../../../components/Select/SingleClassificationSelect";

export default function Classification({ categories, onPropertyChange }) {
  const onClassificationChange = useCallback((category) => {
    const transformCategory = category
      ? ({
        _id: category.value,
        name: category.label
      })
      : null
    onPropertyChange(transformCategory, 'categories', null);
  }, [onPropertyChange])

  return <section id="categories">
    <div>
      <label htmlFor='categories'>分類</label>
      <SingleClassificationSelect
        defaultSelected={categories}
        setState={onClassificationChange}
      />
    </div>
  </section>;


}
