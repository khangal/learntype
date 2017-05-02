$(function(){
  window.onkeypress = function(e) {
    // stop scrolling on space
    if (e.which == 32) {
      e.preventDefault();
    }

    letter = String.fromCharCode(e.which);
    screen.press(letter)
  }

  exercises.load().done(function() {
    screen.init(exercises.sample())
  })

});

var exercises = {
  data: [],

  load: function() {
    return $.getJSON('data.json', function(d) {
      this.data = d
    }.bind(this))
  },
  
  sample: function() {
    return this.data[Math.floor(Math.random() * this.data.length)]
  }
};

var stats = {
  errors: 0,

  cacheDom: function() {
    
  },

  render: function(){
    
  },

  hide: function() {

  }
}

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
    this.$screen = $('.screen')
  },
  
  press: function(letter){
    if(letter == this.text[this.cursorPosition]) {
      this.cursorPosition++;
      this.render()
      this.$screen.removeClass('wrong')
    }
    else {
      this.$screen.removeClass('wrong').animate({'nothing': null}, 1, function(){
        $(this).addClass('wrong')
        stats.errors++;
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

  reset: function() {
    this.cursorPosition = 0
    this.render()
    this.setText(exercises.sample())
    this.$screen.show()
  },

  hide: function() {
    this.$screen.hide()
  },

  end: function() {
    this.hide()
    stats.render()
  }
}
