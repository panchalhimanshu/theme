const UrlType = {
    TEST: 'TEST',
    LIVE: 'LIVE',
    LOCAL: 'LOCAL'
  };

  // console.log(first)
  

const GlobalPropperties = {
    // urlParam: 'https://admin.zyapaar.com/',
    // localUrlParam: 'http://192.168.19.249:140/api/',
    localUrlParam: 'http://192.168.19.249:140/api/',
    // testParam: 'https://sms-api.ezeo.app/api/',
    // viewdocument: 'https://sms-api.ezeo.app/',
    viewdocument: 'http://192.168.1.176:126/',
    ezeo_shopmystation:"https://staging.shopmystation.com/",
    ezeo_sms_live:"",
    environment: UrlType.LOCAL,
}
export default GlobalPropperties;











// const UrlType = {
//   TEST: 'TEST',
//   LIVE: 'LIVE',
//   LOCAL: 'LOCAL'
// };

// const GlobalPropperties = {
//   localUrlParam: import.meta.env.VITE_API_URL,
//   viewdocument: import.meta.env.VITE_VIEW_DOCUMENT_URL,
//   ezeo_shopmystation: import.meta.env.VITE_SHOP_MY_STATION_URL,
//   ezeo_sms_live: import.meta.env.VITE_SMS_LIVE_URL,
//   environment: import.meta.env.VITE_ENVIRONMENT || UrlType.LOCAL,
// }

// export default GlobalPropperties;