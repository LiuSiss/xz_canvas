//场景管理器
var Scene = Class.extend({
    init : function(){
        this.bindEvent();
    },
    //换为某一个场景，进入某一个场景的瞬间应该做什么事情，要写在这个函数里面
    changeScene : function(number){
        //改变自己的场景编号
        game.sceneNumber = number;
        //根据场景的不同来决定做什么事情 this.data[(1000 * j + i) * 4 + 3]
        switch(number){
            case 0:
                this.txt_x=150;
                this.txt_y=800;
                this.right_image=game.R["right_button"];
                this.false_image=game.R["false_button"];
                // 对的按钮的x值
                this.right_image_X=90;
                this.right_image_Y=800;
                // 错的按钮的x值
                this.false_image_X=300;
                this.false_image_Y=800;

                break;
            case 1:
                this.buttonPlay = game.R["button_play"];
                this.buttonPlayX = (560 - 116) / 2;
                this.buttonPlayY = 800;

                this.start_bg=game.R["start"];

                break;
            case 2:
                //场景管理器要负责new出元素，什么时候new出元素？
                //当场景管理器切换到这个场景的时候，要重新new出元素！
                //清空所有演员
                game.actors = [];
                // 背景
                game.bg=new Background();
                //当前关卡地图
                game.map = new Map(game.curLevel);
                // 盒子
                game.box=new Box();
                game.ball=new Ball();
                game.wall=new Wall();
                game.people=new People(game.cur_type);

                break;
            case 3:
                this.ff=game.f;
                // console.log(this.ff);
                this.Tip_image=game.R["tip1"];
                // console.log(this.Tip_image);
                this.Tip_X=50;
                this.Tip_Y=900;
                this.Tip_people=game.R["down"];
                this.Tip_people_X=20;
                this.Tip_people_Y=800;
                break;
        }
    },
    //渲染，这个函数被主循环每帧调用
    show : function(){
        //根据场景的不同来决定做什么事情
        switch(game.sceneNumber){
            case 0:
                // 文字出场
                this.txt_y-=20;
                if(this.txt_y<180){
                    this.txt_y=180
                }
                // 左按钮出场
                this.right_image_Y-=15;
                if(this.right_image_Y<350){
                    this.right_image_Y=350
                }
                // 右按钮出场
                this.false_image_Y-=15;
                if(this.false_image_Y<350){
                    this.false_image_Y=350
                }
                game.ctx.save();
                game.ctx.font = "32px Consolas";
                game.ctx.fillStyle="orange";
                game.ctx.fillText("一边是红一边是绿",this.txt_x,this.txt_y)
                game.ctx.fillText("一边喜风一边喜雨",this.txt_x,this.txt_y+60)
                game.ctx.drawImage(this.right_image,this.right_image_X,this.right_image_Y);
                game.ctx.drawImage(this.false_image,this.false_image_X,this.false_image_Y);
                game.ctx.restore();

                // 如果长时间没有人回答则自动到场景1开始
                if(game.f>20){
                    this.changeScene(1);
                }
                break;
            case 1:
                music.play();
                //更新按钮
                this.buttonPlayY -= 20;
                if(this.buttonPlayY < 400){
                    this.buttonPlayY = 400;
                }
                game.ctx.drawImage(this.start_bg,0,0);
                game.ctx.drawImage(this.buttonPlay,this.buttonPlayX,this.buttonPlayY);

                break;
            case 2:
                music.pause();

                // 渲染演员
                _.each(game.actors,function(actor){
                    actor.render();
                })
                // 当前地图的渲染
                game.map.drawMap(game.map.tempMap);
                // console.log(game.map.tempMap[8][8]);

                document.onkeydown=function(event){
                // console.log(1)
                    switch (event.keyCode)
                        {
                            case 37://左键头
                                step_radio.play();
                                game.people.go("left");
                                break;
                            case 38://上键头
                                step_radio.play();
                                game.people.go("up");
                                break;
                            case 39://右箭头
                                step_radio.play();
                                game.people.go("right");
                                break;
                            case 40://下箭头
                                step_radio.play();
                                game.people.go("down");
                                break;
                        }
                }
                next.onclick=function(){
                    sucess_radio.play();
                    game.map.nextLevel(1);
                }
                // var self=this;
                restart.onclick=function(){
                    restart_radio.play();
                    // self.people.render()
                    game.map.nextLevel(0);
                    // game.sceneNumber=0;
                }
                var self=this;
                regret.onclick=function(){
                    tip_radio.play();
                    self.changeScene(3);
                }
                // // 选择关卡
                // choose.onfocus=function(){
                //     game.curLevel=self.value;
                //     console.log(game.curLevel);
                //     // game.map.nextLevel(game.curLevel);
                // }
                // 移动次数
                game.ctx.font="20px 微软雅黑";
                game.ctx.fillText("移动次数 "+game.move_time, 20, 50)
                // //TODO:为了方便我们调试，我们往表格中实时输出当前的矩阵
                // for(var i = 0 ; i < 16 ; i++){
                //     for(var j = 0 ; j < 16 ; j++){
                //         document.getElementById("tiaoshi1").getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = Levels[game.curLevel][i][j];
                //     }
                // }

                // //TODO:为了方便我们调试，我们往表格中实时输出临时矩阵
                // for(var i = 0 ; i < 16 ; i++){
                //     for(var j = 0 ; j < 16; j++){
                //         if(game.map.tempMap[i][j] != undefined){
                //             document.getElementById("tiaoshi2").getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = game.map.tempMap[i][j];
                //         }
                //     }
                // }
                break;
             case 3:
                this.Tip_Y -=20;
                if(this.Tip_Y < 100){
                    this.Tip_Y = 100;
                }
                this.Tip_people_Y -=20;
                if(this.Tip_people_Y < 50){
                    this.Tip_people_Y = 50;
                }

                // game.ctx.clearRect(0,0,game.canvas.width,game.canvas.height);
                game.ctx.fillStyle="rgba(255,245,146,0.4)";
                game.ctx.fillRect(0, 0, 560, 560);
                game.ctx.drawImage(this.Tip_people,this.Tip_people_X,this.Tip_people_Y);
                game.ctx.drawImage(this.Tip_image,this.Tip_X,this.Tip_Y);


                if(game.f > this.ff + 320){
                    game.move_time=0;
                     // 移动次数
                    game.ctx.font="20px 微软雅黑";
                    game.ctx.fillStyle="black";
                    game.ctx.fillText("移动次数 "+game.move_time, 20, 50)
                    this.changeScene(2);
                }
                break;
        }
    },
    bindEvent:function(){
        // 根据不同的场景调用不同的事件监听
        //
        var self=this;
        game.canvas.onmousedown=function(event){
            var x = event.offsetX;
            var y = event.offsetY;
            // console.log(x,y);
            if(game.sceneNumber==1){
                if(x > self.buttonPlayX && x < self.buttonPlayX + 116 && y >  self.buttonPlayY && self.buttonPlayY + 70){
                    self.changeScene(2);
                }
            }else if(game.sceneNumber==0){
                if(x > self.right_image_X && x < self.right_image_X + 215 && y >  self.right_image_Y && y < self.right_image_Y + 100){
                    self.changeScene(2);
                }else if(x > self.false_image_X && x < self.false_image_X + 215 && y >  self.false_image_Y && y < self.false_image_Y + 100){
                    // 如果答错的，我们直接跳到第3关，但我们这里要写2 因为Next方法会默认加1
                    game.curLevel=2;
                    self.changeScene(2);
                }
            }
        }
    }
});