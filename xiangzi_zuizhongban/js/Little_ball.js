var Little_ball=Class.extend({
    init:function(x,y,r){
        this.targetx = x;
        this.targety = y;
        this.r = 1;
        this.beginx = Math.random() * 1000;
        this.beginy = Math.random() * 500;
        this.color = _.sample(["orange","yellow","gold"],1)[0];
    },
    render:function(){
        var x,y;
        if(game.f < 50){
            x = this.beng(game.f,this.beginx,this.targetx-this.beginx,50);
            y = this.beng(game.f,this.beginy,this.targety-this.beginy,50);
        }
        game.ctx.beginPath();
        game.ctx.arc(x,y,this.r,0,7,false);
        game.ctx.closePath();
        game.ctx.fillStyle = this.color;
        game.ctx.fill();
    },
    beng:function(t, b, c, d){
        if ((t /= d) < (1 / 2.75)) {
              return c * (7.5625 * t * t) + b
            } else if (t < (2 / 2.75)) {
              return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b
            } else if (t < (2.5 / 2.75)) {
              return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b
            } else {
              return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b
            }
    }
})