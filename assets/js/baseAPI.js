
$.ajaxPrefilter(function (options) {

  let baseURL = 'http://www.liulongbin.top:3008'
  options.url = `${baseURL}` + options.url

})









