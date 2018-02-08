const tmpEnv = {
  apiUrl : '%%___IMAGINE_APIURL___%%',
  pageUrl : '%%___IMAGINE_PAGEURL___%%'
};

var t = {
  apiUrl : 'https://api.imagineallthepeople.world',
  pageUrl : 'https://www.imagineallthepeople.world'
};

if (tmpEnv.apiUrl.indexOf("___IMAGINE_APIURL___") == -1) t.apiUrl=tmpEnv.apiUrl;
if (tmpEnv.pageUrl.indexOf("___IMAGINE_PAGEURL___") == -1) t.pageUrl=tmpEnv.pageUrl;

export const environment = {
  production: true,
  apiUrl : t.apiUrl,
  pageUrl : t.pageUrl
};
