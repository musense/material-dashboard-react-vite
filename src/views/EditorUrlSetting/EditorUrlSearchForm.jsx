import React, { useRef, useCallback } from 'react'
import DateSelector from '@components/DateSelector/DateSelector';
import usePressEnterEventHandler from '@hook/usePressEnterEventHandler';
import Stack from '@mui/material/Stack';
import * as GetEditorUrlAction from '@actions/GetEditorUrlAction';
import * as GetsSearchAction from '@actions/GetSearchAction';

import { useDispatch, useSelector } from 'react-redux';

const InnerDateSelector = React.memo(DateSelector)

const style = {
  width: '100%',
  height: 'fit-content',
  backgroundColor: 'transparent',
  margin: '0 auto 1rem',
  '& h3': {
    textAlign: 'center',
    m: 'unset',
    mb: 2
  },
}

export default function EditorSearchForm() {

  const disableRoute = import.meta.env.VITE_DISABLE_ROUTE_NAME
  const dispatch = useDispatch();
  const url = useSelector((state) => state.getSearchReducer.url);
  const categories = useSelector((state) => state.getSearchReducer.categories);
  const status = useSelector((state) => state.getSearchReducer.status);
  const startDate = useSelector((state) => state.getSearchReducer.startDate);
  const endDate = useSelector((state) => state.getSearchReducer.endDate);

  const submitRef = useRef(null);

  usePressEnterEventHandler(submitRef);

  function onSearchEditorList(e) {
    e.preventDefault()
    // if (startDate === "Invalid Date" && endDate === "Invalid Date") {
    //   dispatch({
    //     type: GetEditorUrlAction.SET_ERROR_MESSAGE,
    //     payload: {
    //       message: "Please select create date"
    //     }
    //   })
    //   return
    // }
    // if (startDate === "Invalid Date") {
    //   dispatch({
    //     type: GetEditorUrlAction.SET_ERROR_MESSAGE,
    //     payload: {
    //       message: "Please select start date"
    //     }
    //   })
    //   return
    // }
    // if (endDate === "Invalid Date") {
    //   dispatch({
    //     type: GetEditorUrlAction.SET_ERROR_MESSAGE,
    //     payload: {
    //       message: "Please select end date"
    //     }
    //   })
    //   return
    // }
    const searchData = {
      url: url ?? '',
      // createDate: {
      //   startDate: startDate,
      //   endDate: endDate
      // }
    }
    console.log("🚀 ~ file: EditorUrlList.jsx:136 ~ onSearchEditorList ~ searchData:", searchData)

    // return
    dispatch({
      type: GetEditorUrlAction.SEARCH_EDITOR_URL_LIST,
      payload: searchData
    })
    return
  }

  const onSearchFormPropertyChange = useCallback((value, property) => {
    dispatch({
      type: GetsSearchAction.SET_SEARCH_FORM_PROPERTY,
      payload: {
        allProps: {
          property: property,
          value: value
        }
      }
    })
  }, [dispatch])


  // const onStartDateChange = useCallback((value) => {
  //   onSearchFormPropertyChange(value, 'startDate')
  // }, [onSearchFormPropertyChange])

  // const onEndDateChange = useCallback((value) => {
  //   onSearchFormPropertyChange(value, 'endDate')
  // }, [onSearchFormPropertyChange])

  const reset = useCallback(() => {
    dispatch({
      type: GetsSearchAction.RESET_SEARCH_FORM
    })
  }, [dispatch])

  return <Stack
    spacing={2} direction={'row'}
    useFlexGap flexWrap="wrap"
    justifyContent={'space-between'}
    sx={style}>
    <form className="editor-list-form" onSubmit={onSearchEditorList}>
      <div className="url" >
        <label htmlFor="url">網址</label>
        <input type="text" name='url'
          value={url} onChange={e => onSearchFormPropertyChange(e.target.value, 'url')} />
      </div>
      {/* <InnerDateSelector
        startDate={startDate}
        endDate={endDate}
        width={'160px'}
        height={'40px'}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        title={'測試'}
      /> */}
      <div className="button-list">
        <input type='button' value='重設' onClick={reset} />
        <input ref={submitRef} type="submit" value="查詢" />
      </div>
    </form>
  </Stack>
}