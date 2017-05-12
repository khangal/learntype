$(function(){
  window.onkeypress = function(e) {
    // stop scrolling on space
    if (e.which == 32) {
      e.preventDefault();
    }

    letter = String.fromCharCode(e.which);
    // console.log(e.shiftKey);
    screen.moveCursor(letter);
  }

  stats.init();
  keyboard.init();
  screen.init();

  exercises.load().done(function() {
    world.render('SHOW_EXERCISE');
  })


});

var world = {
  render: function(action) {
    switch (action) {
      case 'SHOW_EXERCISE':
        stats.hide();
        screen.reset();
        screen.render();
        screen.show();
        break;

      case 'SHOW_STATS':
        screen.hide();
        keyboard.lightoff();
        stats.render();
        stats.show();
        break;

      default:
        break;
    }
  }
}

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

    this.startTime = new Date();
  },

  cacheDom: function() {
    this.$stats = $('#stats');
    this.$start = $('#start');
    this.$errorCount = $('.stat--error .stat__measurement');
    this.$accuracy = $('.stat--accuracy .stat__measurement');
    this.$time = $('.stat--time .stat__measurement');
    this.$problems = $('.stat--problem-keys .stat__measurement');
  },

  show: function(){
    this.$stats.show();
  },

  hide: function() {
    this.$stats.hide();
  },

  render: function() {
    this.$errorCount.text(this.getErrorCount());
    this.$accuracy.text(this.getAccuracy());
    this.$time.text(this.getTime());
  },

  reset: function() {
    this.errorCount = 0;
  },

  getProblem: function() {
    
  },

  getErrorCount: function() {
    return this.errorCount;
  },

  getTime: function() {
    return (new Date() - this.startTime) / 1000.0 + " сек";
  },

  getAccuracy: function() {
    var errorPercent = Math.round(this.errorCount * 100 / screen.text.length);
    return 100 - errorPercent + "%";
  }
}

var screen = {
  cursorPosition: 0,

  init: function(){
    this.cacheDom();
  },

  cacheDom: function(){
    this.$pre = $("#pre");
    this.$cursor = $("#cursor");
    this.$post = $("#post");
    this.$screen = $('.screen');
  },
  
  moveCursor: function(letter){
    if (this.firstKey) {
      stats.startTime = new Date();
      this.firstKey = false;
    }
    
    if (letter == this.text[this.cursorPosition]) {
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

    // Text is ended
    if (this.text.length == this.cursorPosition) {
      world.render('SHOW_STATS')
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
    this.firstKey = true;
    this.setText(exercises.sample());
  },

  hide: function() {
    this.$screen.hide();
  },

  show: function() {
    this.$screen.show();
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
