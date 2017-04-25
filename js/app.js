$(function(){
  window.onkeypress = function(e) {
    console.log(e.which)
    letter = String.fromCharCode(e.which);
    screen.update(letter)
  }

  screen.init();
});

var screen = {
  cursorPosition: 0,

  init: function(){
    this.cacheDom()
    this.setText("Монгол орны байгаль газарзүйн шинж төрх эрт цаг бусад улс орны адилаар олонтоо хувьсан өөрчилөгдөж байжээ.Эрин, галав солигдох бүрд нэг бол сэрүүсч эсвэл бүр дулаарах, шинэ амьтан, ургамал үүсэх эсхүл мөхөх, шинээр уул нуруу үүсэх, үгүй бол тектоник хөдөлгөөнөөр газрын гадарга доош суух үйл явц тасралтгүй явагдаж байсан нь палеонтологи, геологийн судалгаагаар тогтоогддог.Жишээлбэл одоогийн Төв Оросын нутаг буюу Москвагаас Санкт-Петербург хүртэлхи нутаг элсэн цөл байсан бол Антарктид тив халуун дулаан чийглэг уур амьсгалтай, төрөл бүрийн ургамал, амьтнаар баялаг байжээ.")
    this.render();
  },
  cacheDom: function(){
    this.$pre = $("#pre")
    this.$cursor = $("#cursor")
    this.$post = $("#post")
  },
  
  update: function(letter){
    if(letter == this.text[this.cursorPosition]) {
      this.cursorPosition++;
      this.render()
    }
    else {
      console.log('boom wrong', letter, this.text[this.cursorPosition])
    }

  },

  setText: function(text){
    this.text = text;
  },

  render: function(){
    var pre = this.text.substring(0, this.cursorPosition)
    var post = this.text.slice(this.cursorPosition)

    this.$pre.text(pre)
    this.$post.text(post)
  }
}
