$(function(){
  window.onkeypress = function(e) {
    if (e.which == 32) {
      e.preventDefault();
    }

    letter = String.fromCharCode(e.which);
    screen.update(letter)
  }

  $.getJSON('data.json', function(d) {
    data = d
    var text = data[Math.floor(Math.random() * data.length)];
    screen.init(text);
  })

});

var data;

var screen = {
  cursorPosition: 0,

  init: function(text){
    this.cacheDom()
    this.setText(text)
  },
  cacheDom: function(){
    this.$pre = $("#pre")
    this.$cursor = $("#cursor")
    this.$post = $("#post")
    this.$text = $('.text')
  },
  
  update: function(letter){
    if(letter == this.text[this.cursorPosition]) {
      this.cursorPosition++;
      this.render()
      this.$text.removeClass('wrong')
    }
    else {
      this.$text.removeClass('wrong').animate({'nothing': null}, 1, function(){
        $(this).addClass('wrong')
      })
    }

  },

  setText: function(text){
    this.text = text;
    this.render()
  },

  render: function(){
    if (this.text.length == this.cursorPosition) {
      this.end()
      return
    }

    var pre = this.text.substring(0, this.cursorPosition)
    var post = this.text.slice(this.cursorPosition)

    this.$pre.text(pre)
    this.$post.text(post)
  },

  end: function() {
    alert("ended")
    this.cursorPosition = 0
    this.render()
  }
}
