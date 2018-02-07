var t = {
  apiUrl : 'https://api.imagineallthepeople.world',
  pageUrl : 'https://www.imagineallthepeople.world'
};

if ((<any>window).systemconfiguration !== undefined ) {
  t.apiUrl=(<any>window).systemconfiguration.apiUrl;
  t.pageUrl=(<any>window).systemconfiguration.pageUrl;
}

export const environment = {
  production: true,
  apiUrl : t.apiUrl,
  pageUrl : t.pageUrl
};
