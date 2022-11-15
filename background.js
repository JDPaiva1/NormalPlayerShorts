chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if(changeInfo?.url && changeInfo?.url.match('youtube.com')){
    chrome.tabs.query({ active: true }, (tabs) => {
      if(tabId === tabs[0].id && changeInfo?.url && changeInfo.url.match('/shorts/')) {
        const url = changeInfo.url.replace('shorts/', 'watch?v=')
        chrome.tabs.update({ url: url })
      }
    })
  }
})