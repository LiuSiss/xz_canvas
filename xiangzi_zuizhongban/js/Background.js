(function(){
    var Background = window.Background =Actor.extend({
        init:function(){
            this.image=game.R.block;
            this.b_width=35;
            this.b_height=35;

            this._super();
        },
        render:function(){
           for (var i=0;i<16 ;i++ )
            {
                for (var j=0;j<16 ;j++ )
                {
                    game.ctx.drawImage(this.image,this.b_width*j,this.b_height*i,this.b_width,this.b_height);
                }
            }
        }
    })
})();