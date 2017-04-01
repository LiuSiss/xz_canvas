(function(){
    var Game = window.Game = Class.extend({
        init:function(id){
            // 得到画布
            this.canvas = document.getElementById(id);
            // 上下文
            this.ctx = this.canvas.getContext("2d");
            // R的文件路径
            this.RtextURL = "R.txt";
            this.RObj=null;
            this.R={};
            // 当前移动次数
            this.move_time=0;
            // 人物方向
            this.type=["up","down","left","right"];
            // 当前人物方向
            this.cur_type=this.type[1];
            // console.log(this.cur_type);
            this.option=null;
            // 当前关卡
            this.curLevel=0;

            //帧编号
            this.f = 0;
            //场景编号0开始画面、1游戏画面、2结束画面
            this.sceneNumber = 0;

            // 演员数组
            this.actors=[];
            // 加载资源
            this.loadResouces(function(){
                this.start();
            });
        },
        loadResouces:function(callback){
            var self = this;
            var count=0;
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange=function(){
                if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)){
                    // 转为对象
                    self.RObj=JSON.parse(xhr.responseText);
                    var imagesAmount = _.size(self.RObj);
                    // 遍历这个对象
                    for(var k in self.RObj){
                        // 创建image对象
                        self.R[k] = new Image();
                        // console.log( self.R[k]);
                        self.R[k].src=self.RObj[k];
                        // 图片监听
                        self.R[k].onload = function(){
                            count++;
                            // 进行判断
                            if(count==imagesAmount){
                                callback.call(self);
                            }
                        }
                    }
                }
            }
            xhr.open("get",this.RtextURL,true);
            xhr.send(null);
        },
        start:function(){
            //场景管理器，唯一的场景管理器
            this.scene = new Scene();
            //命令场景管理器调用场景0！
            this.scene.changeScene(this.sceneNumber);
            // 定时器的开启
            var self=this;
            this.timer = setInterval(function(){
                // 清屏
                self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);

                //命令自己的场景管理器，更新所有演员、渲染所有演员
                self.scene.show();

                // 打印帧编号
                self.f++;


            },20)



        }

    })
})();