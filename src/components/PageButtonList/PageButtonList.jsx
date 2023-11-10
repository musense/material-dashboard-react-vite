import React, { useCallback } from "react";
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";

export default function PageButtonList({ totalPage, currentPage, patchType }) {
  const dispatch = useDispatch();

  const buttonProps = useCallback((page, currentPage) => ({
    color: currentPage === page ? 'error' : 'info',
    size: 'small',
    variant: 'contained',
    onClick: () => dispatch({
      type: patchType,
      payload: page
    })
  }), [patchType, dispatch])

  const pageList = Array.from({ length: totalPage }, (_, i) => i + 1);

  return <Stack spacing={2} direction={'row'}>
    {pageList.map(page => {
      return currentPage === page
        ? (<Button {...buttonProps(page, currentPage)} key={page}>{page}</Button>)
        : (<Button {...buttonProps(page, currentPage)} key={page}>{page}</Button>)
    })}
  </Stack>
}
