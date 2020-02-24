function replace_config_values(scope) {
  var parentElement = '';
  if (scope) parentElement = scope + ' ';

  var selector1 = parentElement + '.config_key';

  $(selector1).each(function() {
    var str = $(this).html();
    for (let p in config_params) {
      var word = '%(' + p + ')s';
      word = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      var sign = new RegExp(word, 'g');
      str = str.replace(sign, config_params[p]);
    }
    $(this).html(str);
  });

  if (!scope) {
    $('meta').each(function() {
      var str = $(this).attr('content');
      for (let p in config_params) {
        var word = '%(' + p + ')s';
        word = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        var sign = new RegExp(word, 'g');
        str = str.replace(sign, config_params[p]);
      }
      $(this).attr('content', str);
    });
  }
}

function get_config_parameter(key, strReturn = false) {
  if (!strReturn) document.write(config_params[key]);
  else return config_params[key];
}

function Uint8ArrayFromObj(obj) {
  var str = JSON.stringify(obj, null, 0);
  var ret = new Uint8Array(str.length);
  for (var i = 0; i < str.length; i++) {
    ret[i] = str.charCodeAt(i);
  }
  return ret;
}

function strFromUtf8Ab(ab) {
  return decodeURIComponent(escape(String.fromCharCode.apply(null, ab)));
}
