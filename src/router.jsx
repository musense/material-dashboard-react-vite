import { createBrowserRouter } from "react-router-dom";
import Auth from "@layouts/Auth.jsx";
import Admin from "@layouts/Admin.jsx";
import EditorClassList from "@views/EditorClassList";
import EditorList from "@views/EditorList";
import EditorTypeList from "@views/EditorTypeList";
import NewIEditor from "@views/IEditor";
import IEditor from "@views/IEditor/[id]";
import LoginPage from "@views/Pages/LoginPage";
import RegisterPage from "@views/Pages/RegisterPage";
import TagList from "@views/TagList";
import BannerManager from "@views/BannerManager";
import EditorUrlSetting from "@views/EditorUrlSetting";
import { useDispatch } from "react-redux";
import bannerListGetter from "@utils/bannerListGetter";
import { RouterProvider } from "react-router-dom";
import React from "react";
import getRouterChildren from "./utils/getRouterChildren";

function RouterIndex() {

  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "",
      name: "AuthPage",
      element: <Auth />,
      children: [
        {
          path: "/login",
          needAuth: true,
          name: "LoginPage",
          element: <LoginPage />,
        },
        {
          path: "/register",
          needAuth: true,
          name: "RegisterPage",
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: "/admin",
      name: "AdminPage",
      element: <Admin />,
      children: [
        {
          path: "banner",
          name: "Banner管理",
          showOnSideBar: true,
          element: <BannerManager />,
          loader: bannerListGetter(dispatch)
        },
        {
          path: "tag",
          name: "標籤管理",
          showOnSideBar: true,
          element: <TagList />
        },
        {
          path: "editorClassList",
          name: "文章分類管理",
          showOnSideBar: true,
          element: <EditorClassList />
        },
        {
          path: "editorList",
          children: [
            {
              index: true,
              name: "文章列表",
              showOnSideBar: true,
              element: <EditorList />
            },
            {
              path: 'types',
              name: "文章類別管理",
              showOnSideBar: true,
              element: <EditorTypeList />,
            },
            {
              path: "new",
              name: "新增文章",
              showOnSideBar: true,
              element: <NewIEditor />
            },
            {
              path: ":id",
              name: "編輯文章",
              element: <IEditor />,
            },
            {
              path: "editorUrl",
              name: "內文連結管理",
              showOnSideBar: true,
              element: <EditorUrlSetting />
            },
          ]
        },
      ],
    }
  ]);

  dispatch({
    type: "SET_ROUTER",
    payload: {
      router: getRouterChildren(router.routes, undefined)
    }
  })
  return <RouterProvider router={router} />
}

export default RouterIndex