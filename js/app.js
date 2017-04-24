$(function(){
  window.onkeypress = function(e) {
    typer.press(e.keyCode, e.shiftKey)
    screen.update(typer.getLastKey())
  }
});

var typer = {
  lastKey: null,

  press: function (keyCode, isShift){
    // isShift = (typeof isShift !== 'undefined') ? isShift : false
    if (isShift) {
      keyCode = keyCode + 32;
    }

    switch (keyCode) {
      case 97:
        this.lastKey = 'й'
        break;

      case 109:
        this.lastKey = 'м'
        break;
      
      default:
        break;
    }

    if (isShift) {
      this.lastKey = this.lastKey.toUpperCase();
    }
  },

  print: function(){
    alert(this.lastKey);
  },
  
  getLastKey: function(){
    return this.lastKey
  }
}

var screen = {
  text: "Монгол орны балалалалалылблөлыблөо рйыбө",
  cursorPosition: 0,
  
  update: function(lastKey){
    if (this.text[this.cursorPosition] == lastKey) {
      console.log('correct');
    } else {
      console.log('wrong', this.text[this.cursorPosition], lastKey);
    }
  }
}
