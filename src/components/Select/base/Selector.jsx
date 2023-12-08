import useSetSelectorValue from '../customHook/useSetSelectorValue';
import useSelectorStyle from '../customHook/useSelectorStyle';
import useSelectorProps from '../customHook/useSelectorProps';
import useSelectorCreatableProps from '../customHook/useSelectorCreatableProps';
import SortableCreatableSelect from '../react-select/SortableCreatableSelect';
import SortableSelect from '../react-select/SortableSelect';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

const Selector = ({
  isMulti = false,
  creatable = false,
  options,
  controlWidth = null,
  controlHeight = null,
  setState = null,
  defaultSelected = null,
  name = '',
  formatGroupLabel = null,
}) => {

  const { selected, setSelected } = useSetSelectorValue(defaultSelected)

  const styles = useSelectorStyle(controlWidth, controlHeight)
  const props = useSelectorProps({
    options,
    selected,
    setSelected,
    setState,
    styles,
    isMulti,
    formatGroupLabel,
  })
  const creatableProps = useSelectorCreatableProps({ name })

  let select = null
  let selectProps
  if (isMulti && creatable) {
    selectProps = {
      ...props,
      ...creatableProps
    }
    select = <SortableCreatableSelect {...selectProps} />
  }

  if (isMulti & !creatable) {
    selectProps = {
      ...props,
    }
    select = <SortableSelect  {...selectProps} />
  }

  if (!isMulti && creatable) {
    selectProps = {
      ...props,
      ...creatableProps
    }
    select = <CreatableSelect {...selectProps} />
  }

  if (!isMulti && !creatable) {
    selectProps = {
      ...props,
    }
    select = <Select {...selectProps} />
  }

  return select
}

export default Selector;
