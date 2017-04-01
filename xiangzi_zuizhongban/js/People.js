var People = Class.extend({
    init:function(type,x,y){
        this.x=x;
        this.y=y;
        // 当前类型值
        this.type = type;
        // this.p1;
        // this.p2;
        this.p1_x;
        this.p1_y;
        this.p2_x;
        this.p2_y;
        this.image=game.R[this.type];
    },
    render:function(i,j){
        game.ctx.drawImage(this.image,35*j-(this.image.width-35)/2,35*i-(this.image.height-35),this.image.width,this.image.height);
    },
    go:function(dir){
        switch (dir){
            case "up":
                this.image= game.R[game.type[0]];
                this.p1_x=game.people.x-1;
                this.p1_y=game.people.y;

                this.p2_x=game.people.x-2;
                this.p2_y=game.people.y;
                console.log(this.p1_x,this.p1_y,this.p2_x,this.p2_y);
                break;
            case "down":
                this.image= game.R[game.type[1]];
                this.p1_x=game.people.x+1;
                this.p1_y=game.people.y;

                this.p2_x=game.people.x+2;
                this.p2_y=game.people.y;
                // 判断
                break;
            case "left":
                this.image= game.R[game.type[2]];
                this.p1_x=game.people.x;
                this.p1_y=game.people.y-1;

                this.p2_x=game.people.x;
                this.p2_y=game.people.y-2;
                break;
            case "right":
                this.image= game.R[game.type[3]];
                this.p1_x=game.people.x;
                this.p1_y=game.people.y+1;

                this.p2_x=game.people.x;
                this.p2_y=game.people.y+2;
                break;
        }
        // 移动
        if(this.isGo(this.p1_x,this.p1_y,this.p2_x,this.p2_y)){
            game.move_time++;
            // console.log(game.move_time);
            new Background();
            // 重绘当前地图
            game.map.drawMap(game.map.tempMap);
        }
        if(game.map.success()){
           sucess1_radio.play();
           game.map.nextLevel(1);
        }
    },
    isGo:function(p1_x,p1_y,p2_x,p2_y){
        //超出地图的上边、左边、下边、右边、墙
        if(p1_x<0||p1_y<0||p1_x>game.map.tempMap.length||p1_y>game.map.tempMap[0].length||game.map.tempMap[p1_x][p1_y]==1){
            return false;
        }
        //小人前面是箱子那就还需要判断箱子前面有没有障碍物(箱子/墙)
        if(game.map.tempMap[p1_x][p1_y]==3 || game.map.tempMap[p1_x][p1_y]==5){
            if(game.map.tempMap[p2_x][p2_y]==1 || game.map.tempMap[p2_x][p2_y]==3){
                return false;
            }
            //更改地图对应坐标点的值
            game.map.tempMap[p2_x][p2_y] = 3;
            // console.log(game.map.tempMap[p2_x][p2_y]);
        }
        //都没判断成功小人前进一步
        game.map.tempMap[p1_x][p1_y] = 4;//更改地图对应坐标点的值
        //小人前进了一步，小人原来的位置如何显示
        var coordinate = Levels[game.curLevel][game.people.x][game.people.y];
        // console.log(coordinate);
        if (coordinate!=2){
            if (coordinate==5){
                coordinate=2;
            }else{
                coordinate=0;
            }
        }
        // 重置小人位置的参数
        game.map.tempMap[game.people.x][game.people.y]=coordinate;
        return true;
    }

})