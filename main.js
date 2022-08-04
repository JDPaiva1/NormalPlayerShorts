let url = window.location.href;

if(url.match('/shorts/')) {
  url = url.replace('shorts/', 'watch?v=');
  window.location.replace(url);
}
