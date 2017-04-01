var Map = Class.extend({
    init:function(level){
        console.log(Levels.length);
        // 克隆一个临时数组，以备临时更改数组
        this.tempMap=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
        for(var i = 0 ; i < 16 ; i++){
            for(var j = 0 ; j < 16 ; j++){
                this.tempMap[i][j] = Levels[level][i][j];
            }
        }
        // console.log(this.tempMap[8][8]);
        },
    drawMap:function(level){
         for (var i=0;i<level.length ;i++ ){
            for (var j=0;j<level[i].length ;j++ ){
                switch (level[i][j]){
                    case 1:
                        game.wall.render(i,j);
                        break;
                    case 2:
                        game.ball.render(i,j);
                        break;
                    case 3:
                        game.box.render(i,j);
                        break;
                    case 4:
                        game.people.x=i;
                        game.people.y=j;
                        game.people.render(i,j);
                        break;
                    case 5:
                        //箱子和陷阱
                        game.box.render(i,j);
                        break;
                }
            }
         }
         // game.box.render();
    },
    success:function(){
        for(var i = 0 ;i<game.map.tempMap.length ; i++){
            for(var j = 0 ; j <game.map.tempMap[i].length ; j++){
                if(Levels[game.curLevel][i][j]==2&&game.map.tempMap[i][j] !=3
                    ||
                    Levels[game.curLevel][i][j]==5&&game.map.tempMap[i][j] !=3)
                {
                    return false;
                }
            }
        }
        return true;
    },
    nextLevel:function(i){
        // console.log(game.curLevel);
        // 将步数清空
        game.move_time=0;
        // 改变当前等级
        game.curLevel +=i;
        // 验收
        if(game.curLevel>Levels.length-1){
            game.curLevel=Levels.length-1;
            alert("客官，这已经是最后一关啦");
        }
        // 清空原来临时数组
        this.tempMap=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
        // 改变临时数组
        for(var i = 0 ; i < 16 ; i++){
            for(var j = 0 ; j < 16 ; j++){
                this.tempMap[i][j] = Levels[game.curLevel][i][j];
            }
        }
        // 改变当前默认人物
        game.cur_type=game.type[1];
        game.people.image=game.R[game.cur_type];
    }
})