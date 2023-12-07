import { useMemo } from "react";

export default function useModalResult({
  message,
  name = '',
  data = undefined,
  isEditor = false
}) {
  console.log("🚀 ~ file: useModalResult.js:9 ~ data:", data)

  const caseMessage = useMemo(() => {
    if (!message) return undefined
    if (message.includes('Password must')) return 'Password error'

    return message
  }, [message])

  const modalResults = modalResultBuilder({ caseMessage, name, data, isEditor })

  return modalResults;
}


function modalResultBuilder({ caseMessage, name, data, isEditor }) {
  console.log("🚀 ~ file: useModalResult.js:25 ~ modalResultBuilder ~ caseMessage:", caseMessage)
  let modalResults = {
    title: null,
    content: null,
    success: null,
    sitemapUrl: null,
    editorID: null,
    editorDraft: null,
  }
  switch (caseMessage) {
    case "can't find user or email!":
    case "can't find user!": {
      modalResults = {
        title: '登入失敗',
        content: '無此帳號',
        success: false
      }
    }
      break
    case "login failed: password not correct": {
      modalResults = {
        title: '登入失敗',
        content: '密碼輸入錯誤',
        success: false
      }
    }
      break
    case "ERR_NETWORK": {
      modalResults = {
        title: '登入失敗',
        content: '連線錯誤！',
        success: false
      }
    }
      break
    case "login successfully": {
      modalResults = {
        title: '登入成功',
        content: '登入成功！',
        success: true
      }
    }
      break
    case "logout successfully": {
      modalResults = {
        title: 'Success',
        content: '您已登出！',
        success: true
      }
    }
      break
    case "login failed": {
      modalResults = {
        title: '登入失敗',
        content: '登入失敗！',
        success: false
      }
    }
      break
    case "user validation failed: email: email not valid!":
    case "email has been used": {
      modalResults = {
        title: '註冊失敗',
        content: '信箱格式錯誤！',
        success: false
      }
    }
      break;
    case "username has been used": {
      modalResults = {
        title: '註冊失敗',
        content: '此名稱已註冊！',
        success: false
      }
    }
      break;
    case "Password error": {
      modalResults = {
        title: '註冊失敗',
        content: '密碼規則錯誤！需英文大小寫+數字共六碼！',
        success: false
      }
    }
      break;
    case "register successfully": {
      modalResults = {
        title: '註冊成功',
        content: '註冊成功！',
        success: true
      }
    }
      break;
    case 'add fail!': {
      modalResults = {
        title: 'Failed!',
        content: `${name}新增失敗！`,
        success: false
      }
    }
      break
    case 'duplicate key error': {
      modalResults = {
        title: 'Failed!',
        ...isEditor ? { content: '文章標題不可重複！' } : { content: `${name}名稱不可重複！` },
        success: false
      }
    }
      break
    case 'duplicate sorting error': {
      modalResults = {
        title: 'Failed!',
        ...isEditor ? { content: '排序不可重複！' } : { content: `${name}排序不可重複！` },
        success: false
      }
    }
      break
    case 'duplicate tag name error': {
      modalResults = {
        title: 'Failed!',
        content: '標籤名稱不可重複！',
        success: false
      }
    }
      break
    case 'add successfully': {
      modalResults = {
        title: 'Success',
        content: `${name}新增成功！`,
        success: true,
        ...isEditor && {
          editorID: data._id,
          editorDraft: data.draft,
          sitemapUrl: data.tempSitemapUrl
        }
      }
    }
      break
    case 'please add tag name':
    case 'please add title': {
      modalResults = {
        title: 'Warning',
        content: `請輸入[${name}名稱]！`,
        success: false
      }
    }
      break
    case 'please add keyname': {
      modalResults = {
        title: 'Warning',
        content: `請輸入${name}[英文名稱]！`,
        success: false
      }
    }
      break
    case 'content title required!': {
      modalResults = {
        title: 'Warning',
        content: '文章標題與文案為必填！',
        success: false
      }
    }
      break
    case 'title required!': {
      modalResults = {
        title: 'Warning',
        content: '文章標題為必填！',
        success: false
      }
    }
      break
    case 'content required!': {
      modalResults = {
        title: 'Warning',
        content: '文案為必填！',
        success: false
      }
    }
      break
    case 'nothing to add!': {
      modalResults = {
        title: 'Warning',
        content: '沒有新增任何資訊！',
        success: false
      }
    }
      break
    case 'nothing to update!': {
      modalResults = {
        title: 'Warning',
        content: '沒有更新任何資訊！',
        success: false
      }
    }
      break
    case 'sorting should be typeof number': {
      modalResults = {
        title: 'Warning',
        content: `${name}排序為數字！`,
        success: false
      }
    }
      break
    case 'sorting should be equal or greater than 1': {
      modalResults = {
        title: 'Warning',
        content: `${name}排序必須大於等於1！`,
        success: false
      }
    }
      break
    case 'delete one': {
      modalResults = {
        title: `是否刪除此${name}？`,
        content: `${name}名稱：${data}`,
        success: null
      }
    }
      break
    case 'copy sitemapUrl successfully': {
      modalResults = {
        title: '複製成功',
        content: `您已複製url: ${data}`,
        success: true
      }
    }
      break
    case 'copy sitemapUrl failed': {
      modalResults = {
        title: '複製失敗！',
        content: '有什麼地方出錯了QQ',
        success: false
      }
    }
      break
    case 'delete successfully': {
      modalResults = {
        title: 'Success',
        content: `${name}刪除成功！`,
        success: true
      }
    }
      break
    case 'delete fail!': {
      modalResults = {
        title: 'Failed!',
        content: `${name}刪除失敗！`,
        success: false
      }
    }
      break
    case 'update successfully': {
      modalResults = {
        title: 'Success',
        content: `${name}更新成功！`,
        success: true,
        ...isEditor && {
          sitemapUrl: data.tempSitemapUrl
        }
      }
    }
      break
    case 'update fail!': {
      modalResults = {
        title: 'Failed!',
        content: `${name}更新失敗！`,
        success: false
      }
    }
      break
    case 'Please select create date': {
      modalResults = {
        title: 'Warning',
        content: '請輸入創建日期！',
        success: false
      }
    }
      break
    case 'Please select start date': {
      modalResults = {
        title: 'Warning',
        content: '請輸入創建開始日期！',
        success: false
      }
    }
      break
    case 'Please select end date': {
      modalResults = {
        title: 'Warning',
        content: '請輸入創建結束日期！',
        success: false
      }
    }
      break
    case 'Please login first': {
      modalResults = {
        title: 'Error',
        content: '您已被登出！',
        success: false
      }
    }
      break
    case 'Network Error': {
      modalResults = {
        title: 'Error',
        content: '取得資料出現錯誤！即將導回登入頁！',
        success: false
      }
    }
      break
    case 'Something went wrong!': {
      modalResults = {
        title: 'Error',
        content: 'Something went wrong!!!',
        success: false
      }
    }
      break
    case 'top contents rule': {
      modalResults = {
        title: '置頂文章規則',
        content: `可插入原先於首頁依發布日期排序的文章，\n但於首頁最多只可插入2篇，\n因此置頂文章超過2篇會以灰色呈現，\n若想在網頁看到更多置頂文章，\n請點選「記事一覽」查詢。`,
        success: true
      }
    }
      break
    case 'hot contents rule': {
      modalResults = {
        title: '熱門文章規則',
        content: `熱門文章首先以觀看次數自然排序，\n且仍可人工插入排序，\n但於首頁最多只會呈現5篇熱門文章，\n因此超過5篇者將以灰色呈現，\n並將於確認後移除熱門文章，\n恢復到非熱門文章區。`,
        success: true
      }
    }
      break
    case 'recommend contents rule': {
      modalResults = {
        title: '推薦文章規則',
        content: `可插入無上限推薦文章，\n但首頁最多只會顯示8篇，\n因此超過8篇者將以灰色呈現。`,
        success: true
      }
    }
      break
    case 'URL updated successfully': {
      modalResults = {
        title: 'Success',
        content: '替換網址成功！',
        success: true
      }
    }
      break
    case 'Need newUrl': {
      modalResults = {
        title: 'Error',
        content: '請輸入替換網址！',
        success: false
      }
    }
      break
    case 'check successfully': {
      modalResults = {
        title: 'Success',
        content: '檢查成功！',
        success: true
      }
    }
      break
    case 'please select at least one url': {
      modalResults = {
        title: 'Warning',
        content: '請至少選擇一個網址！',
        success: false
      }
    }
      break
    case 'url testing...': {
      modalResults = {
        title: '網址測試中',
        content: '......',
        success: true
      }
    }
      break
    case 'Invalid URL': {
      modalResults = {
        title: 'Error',
        content: '網址錯誤！',
        success: false
      }
    }
      break
    case '--reset-error-message': {
      modalResults = {
        title: null,
        content: null,
        success: null,
        sitemapUrl: null,
        editorID: null,
        editorDraft: null,
      }
    }
      break

    default:
      break;
  }

  return modalResults
}
