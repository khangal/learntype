$(function(){
  window.onkeypress = function(e) {
    // stop scrolling on space
    if (e.which == 32) {
      e.preventDefault();
    }

    letter = String.fromCharCode(e.which);
    // console.log(e.shiftKey);
    screen.press(letter);
  }

  stats.init();
  keyboard.init();
  exercises.load().done(function() {
    screen.init();
  })

});

var exercises = {
  data: [],

  load: function() {
    return $.getJSON('data.json', function(d) {
      this.data = d;
    }.bind(this));
  },
  
  sample: function() {
    return this.data[Math.floor(Math.random() * this.data.length)];
  }
};

var stats = {
  errorCount: 0,

  init: function() {
    this.cacheDom();

    this.$start.click(function(){
      this.hide();
      screen.reset();
    }.bind(this));
  },

  cacheDom: function() {
    this.$stats = $('#stats');
    this.$correct = $('#correct');
    this.$error = $('#error');
    this.$start = $('#start');
  },

  show: function(){
    this.$error.text(this.errorCount);
    this.$stats.show();
  },

  hide: function() {
    this.$stats.hide();
  }
}

var screen = {
  cursorPosition: 0,

  init: function(){
    this.cacheDom();
    this.reset();
  },

  cacheDom: function(){
    this.$pre = $("#pre");
    this.$cursor = $("#cursor");
    this.$post = $("#post");
    this.$screen = $('.screen');
  },
  
  press: function(letter){
    if(letter == this.text[this.cursorPosition]) {
      this.cursorPosition++;
      this.render();
      this.$screen.removeClass('screen--warn');
    }
    else {
      this.$screen.removeClass('screen--warn').animate({'nothing': null}, 1, function(){
        $(this).addClass('screen--warn');
        stats.errorCount++;
      })
    }

  },

  setText: function(text){
    this.text = text;
  },

  render: function(){
    if (this.text.length == this.cursorPosition) {
      this.end();
      return;
    }

    var pre = this.text.substring(0, this.cursorPosition);
    var post = this.text.slice(this.cursorPosition);

    this.$pre.text(pre);
    this.$post.text(post);
    keyboard.highlight(this.text[this.cursorPosition]);
  },

  reset: function() {
    this.cursorPosition = 0;
    this.setText(exercises.sample());
    this.render();
    this.$screen.show();
  },

  hide: function() {
    this.$screen.hide();
  },

  end: function() {
    this.hide();
    keyboard.lightoff();
    stats.show();
  }
}

var keyboard = {
  keys: {},

  init: function() {
    this.cacheDom();
  },

  cacheDom: function() {
    var _self = this;

    $('.key').each(function(){
      var obj = {};
      var char = $(this).data("key");
      _self.keys[char] = $(this);

      var shifted = {}
      char = $(this).data("key-shifted");
      _self.keys[char] = $(this);
    })
  },

  highlight: function(letter) {
    if (/[А-Я]|[0-9]|=/.test(letter)) {
      this.keys["shift"].addClass('key--active')
    } else {
      this.keys["shift"].removeClass('key--active')
    }

    this.keys[letter].addClass('key--active');

    if (this.$lastKey) {
      this.$lastKey.removeClass('key--active');
    }

    this.$lastKey = this.keys[letter];
  },

  lightoff: function() {
    this.$lastKey.removeClass('key--active');
  }
}
