var Wall=Class.extend({
    init:function(){
        this.image = game.R.wall;
    },
    render:function(i,j){
        game.ctx.drawImage(this.image,35*j-(this.image.width-35)/2,35*i-(this.image.height-35),this.image.width,this.image.height);
    }
})