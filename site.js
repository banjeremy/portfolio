(function(){
  var setHeight = function(){
    $('.fill-viewport').height($(window).height());
  };

  $(document).ready(function(){
    setHeight();
  });

  $(window).resize(function() {
    setHeight();
  });
})();
