let canvas = document.querySelector('canvas');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
let aud1=document.getElementById('aud1');
let aud2=document.getElementById('aud1');
let retryaud=document.getElementById('retry');
let startaud=document.getElementById('start');
let colaud=document.getElementById('col');
// startaud.play();

if(localStorage.getItem('hscore')==null)
{
    localStorage.setItem('hscore','0');
}

let c= canvas.getContext('2d');
c.imageSmoothingEnabled=true;
let mouse = {
    x: undefined,
    y: undefined
}

function distance(x1,y1,x2,y2)
{
    let sqt= Math.sqrt(((x1-x2)*(x1-x2)) + ((y1-y2)*(y1-y2)));
    return sqt;
}


let colors=[]

colors[0]='#50DFF5';
colors[1]='#FF0061';
colors[2]='#8E0BD1';
colors[3]='#FFFF00';

let gstart=0;
let mult=33;
let playang1=0;
let playang2=0;
let startscr=1;


function startscreen()
{    
    c.clearRect(0,0,650,695);
    c.font='75px   Staatliches';
    c.beginPath();
    c.fillStyle=colors[0];
    c.fillText('c',137+mult*0,230);
    c.closePath();
    c.beginPath();
    c.fillStyle=colors[1];
    c.fillText('o',137+mult*1,230);
    c.closePath();
    c.beginPath();
    c.fillStyle=colors[2];
    c.fillText('l',137+mult*2,230);
    c.closePath();
    c.beginPath();
    c.fillStyle=colors[3];
    c.fillText('o',137+mult*3,230);
    c.closePath();
    c.beginPath();
    c.fillStyle=colors[1];
    c.fillText('r',137+mult*4,230);
    c.closePath();
    c.beginPath();
    c.fillStyle=colors[3];
    c.fillText('s',137+20+mult*5,230);
    c.closePath();
    c.beginPath();
    c.fillStyle=colors[0];
    c.fillText('w',137+20+mult*6,230);
    c.closePath();
    c.beginPath();
    c.fillStyle=colors[2];
    c.fillText('i',137+20+17+mult*7,230);
    c.closePath();
    c.beginPath();
    c.fillStyle=colors[3];
    c.fillText('t',137+20+3+mult*8,230);
    c.closePath();
    c.beginPath();
    c.fillStyle=colors[1];
    c.fillText('c',137+20+2+mult*9,230);
    c.closePath();
    c.beginPath();
    c.fillStyle=colors[0];
    c.fillText('h',137+20+2+mult*10,230);
    c.closePath();

    c.beginPath();
    c.lineWidth=15;
    c.arc(325,450,120,playang1,playang1+(0.5*Math.PI),false);
    c.strokeStyle='#50DFF5';
    c.stroke();
    c.closePath();
    c.beginPath();
    c.arc(325,450,120,playang1+(0.5*Math.PI),playang1+Math.PI,false);
    c.strokeStyle='#FF0061';
    c.stroke();
    c.beginPath();
    c.closePath();
    c.arc(325,450,120,playang1+Math.PI,playang1+(1.5*Math.PI),false);
    c.strokeStyle='#8E0BD1';
    c.stroke();
    c.beginPath();
    c.closePath();
    c.arc(325,450,120,playang1+(1.5*Math.PI),playang1+(2*Math.PI),false);
    c.strokeStyle='#FFFF00';
    c.stroke();
    c.strokeStyle='#00CEF5';
    c.lineWidth=2;
    c.beginPath();
    c.lineWidth=15;
    c.arc(325,450,95,playang2,playang2+(0.5*Math.PI),false);
    c.strokeStyle='#50DFF5';
    c.stroke();
    c.closePath();
    c.beginPath();
    c.arc(325,450,95,playang2+(0.5*Math.PI),playang2+Math.PI,false);
    c.strokeStyle='#FF0061';
    c.stroke();
    c.beginPath();
    c.closePath();
    c.arc(325,450,95,playang2+Math.PI,playang2+(1.5*Math.PI),false);
    c.strokeStyle='#8E0BD1';
    c.stroke();
    c.beginPath();
    c.closePath();
    c.arc(325,450,95,playang2+(1.5*Math.PI),playang2+(2*Math.PI),false);
    c.strokeStyle='#FFFF00';
    c.stroke();
    c.strokeStyle='#00CEF5';
    c.lineWidth=2;
    c.fillStyle='#CCCCCC'
    c.fillText('Play',264,475);

}




let i;
let cx=325;//window.innerWidth/2;
let cy=window.innerHeight*0.7;
let iw=window.innerWidth;
let r=10;
let cdy;
let cd2y;
let or=80;
let sor=58;
let col='#50DFF5';
let score=0;
let fg=0;
let stop=0;
let obstrnd;
let active = [];
let shactive = [];




shactive[0]=0;
shactive[1]=0;
shactive[2]=0;
shactive[3]=0;
shactive[4]=0;
active[0]=0;
active[1]=0;
active[2]=0;
active[3]=0;


class obs3
{
    constructor(no)
    {
        this.no=no;
        this.c1= new obs1(150,0);
        this.c2= new obs1(sor,0);
        this.oy=-or;
        this.c1.oy=this.oy;
        this.c2.oy=this.oy;
        this.start=0
        this.c1.no=no;
        this.c2.no=no;
        this.c1.ifobs3=1;
        this.c2.ifobs3=1;
        this.c2.angacc=-0.04;
    }
    update()
    {
        this.c1.oy=this.oy;
        this.c2.oy=this.oy;
        this.c1.start=this.start;
        this.c2.start=this.start;
        
        this.c1.update();
        this.c2.update();
    }
}


class obs1
{
    constructor(r,no)
    {
        this.ox=325;//window.innerWidth/2;
        this.ody=2;
        this.or=r;
        this.oy=-this.or;
        this.ang=0;
        this.flscr=0;
        this.start=0;
        this.no=no;
        this.flrnd=0;
        this.shflrnd=0;
        this.angacc=0.04;
        this.ifobs3=0;
        this.addd=0;
    }
    draw()
    {
        // c.clearRect(0,0,650,695);
        if(this.ifobs3==1)
        {
            // if(cir.col=='#50DFF5' ||cir.col=='#8E0BD1' )
            {
                this.addd=0.25*Math.PI;
            }
            // else
            // {
            //     this.addd=0.75*Math.PI;
            //     this.ang=0.75*Math.PI;
            // }    
        }
        c.beginPath();
        c.lineWidth=15;
        c.arc(this.ox,this.oy,this.or,this.ang+this.addd,this.ang+this.addd+(0.5*Math.PI),false);
        c.strokeStyle='#50DFF5';
        c.stroke();
        c.closePath();
        c.beginPath();
        c.arc(this.ox,this.oy,this.or,this.ang+this.addd+(0.5*Math.PI),this.ang+this.addd+Math.PI,false);
        c.strokeStyle='#FF0061';
        c.stroke();
        c.beginPath();
        c.closePath();
        c.arc(this.ox,this.oy,this.or,this.ang+this.addd+Math.PI,this.ang+this.addd+(1.5*Math.PI),false);
        c.strokeStyle='#8E0BD1';
        c.stroke();
        c.beginPath();
        c.closePath();
        c.arc(this.ox,this.oy,this.or,this.ang+this.addd+(1.5*Math.PI),this.ang+this.addd+(2*Math.PI),false);
        c.strokeStyle='#FFFF00';
        c.stroke();
        c.strokeStyle='#00CEF5';
        c.lineWidth=2;

    }
    update()
    {
        if(gstart==1 && this.start==1)
        {
            this.angacc+=0.000002;
            active[this.no]=1;
            if(gstart==1)
                this.ang+=this.angacc;
            
            this.draw();
            //this.oy+=this.ody;
            if(this.oy==window.innerHeight*0.5)
            {
                newobs();
            }
            if(this.oy+this.or>=370 && !(this.ifobs3==1 && this.or==sor))
            {
                if(this.flrnd==0)
                {
                    while(true)
                    {
                        let flgforfor=0;
                        obstrnd=Math.floor(Math.random()*4);
                        for(i=0;i<4;i++)
                        {    
                            if(active[i]==1)
                            {
                                if(obst[i].no==obstrnd)
                                {
                                    flgforfor=1;
                                    break;
                                }
                            }
                        }    
                        if(flgforfor==0)
                        {
                            break;
                        }
                    }
                    obst[obstrnd].start=1;
                    active[obstrnd]=1;
                    this.flrnd=1;
                }    
            }

            if((this.oy+this.or>=230) && !(this.ifobs3==1 && this.or==sor))
            {
                if(this.shflrnd==0)
                {
                    while(true)
                    {
                        let flgforfor=0;
                        obstrnd=Math.floor(Math.random()*5);
                        for(i=0;i<5;i++)
                        {    
                            if(shactive[i]==1)
                            {
                                if(shobt[i].no==obstrnd)
                                {
                                    flgforfor=1;
                                    break;
                                }
                            }
                        }    
                        if(flgforfor==0)
                        {
                            break;
                        }
                    }
                    shobt[obstrnd].start=1;
                    shactive[obstrnd]=1;
                    this.shflrnd=1;
                }    
            }

            if(this.oy-this.or>=695)
            {
                this.oy=-this.or;
                this.start=0;
                this.flscr=0;
                active[this.no]=0;
                this.flrnd=0;
                this.shflrnd=0;
            }
            if(this.oy<=cir.cy+1 && this.oy>=cir.cy-1)
            {
                if(this.flscr==0)
                {
                    this.flscr=1;
                    score++;
                }
            }
            let flforthisif=0
            if(stop!=1)
            {
            if((cir.cy-this.oy<=(cir.r+this.or+7) && cir.cy-this.oy>=(-(cir.r-this.or)-10)) || ((this.oy-cir.cy)<=(this.or+cir.r) && (this.oy-cir.cy)>=(this.or-cir.r-10) ) )
            {
                let d=(this.ang + this.addd)%(2*Math.PI);
                let dforother=d+1*Math.PI;
                dforother=dforother%(2*Math.PI);

                if(((d>=0 && d<=(0.5*Math.PI)) && cir.cy>this.oy) || (dforother>=0 && dforother<=(0.5*Math.PI) && cir.cy<this.oy))
                {
                    if(cir.col!='#50DFF5')
                    stop=1;
                    // colaud.play();
                }
                else if(((d>=(0.5*Math.PI) && d<=(1*Math.PI) && cir.cy>this.oy)) || (dforother>=(0.5*Math.PI) && dforother<=(1*Math.PI) && cir.cy<this.oy))
                {
                    if(cir.col!='#FFFF00')
                    stop=1;
                    // colaud.play();
                }
                else if(((d>=(1*Math.PI) && d<=(1.5*Math.PI)) && cir.cy>this.oy) || (dforother>=(1*Math.PI) && dforother<=(1.5*Math.PI) && cir.cy<this.oy))
                {
                    if(cir.col!='#8E0BD1')
                    stop=1;
                    // colaud.play();
                }
                else if(((d>=(1.5*Math.PI) && d<=(2*Math.PI)) && cir.cy>this.oy) || (dforother>=(1.5*Math.PI) && dforother<=(2*Math.PI) && cir.cy<this.oy))
                {
                    if(cir.col!='#FF0061')
                    stop=1;
                    // colaud.play();
                }
                else{
                    flforthisif=1;
                }
            }
            }
            if(cir.cy>=600)
                stop=1;
            
            c.beginPath();
            c.font='30px Verdana';
            c.strokeStyle='#00CEF5'
            c.strokeText('Score:'+score,500,65);
            
            c.strokeStyle='#2E3830'   
            c.closePath();     

            if(stop==1)
            {
                cir.col='#2E3830';
                cir.dy=0;
                cir.d2y=0;
                this.ody=0;
                this.ang-=0.04;
                cir.col='#2E3830';
                c.fillStyle='#2E3830';
                c.fillRect(0,0,650,695);
                c.font='75px Staatliches';
                c.strokeStyle='#CCCCCC'
                c.fillStyle='#CCCCCC'
                c.fillText("GAME OVER",193,190);
                c.font='40px Staatliches';
                c.fillText("Score: "+score,193,270);
                
                
                if(Number(localStorage.getItem('hscore'))<score)
                {
                    localStorage.setItem('hscore',score);
                }    
                
                c.fillText("Highscore: "+localStorage.getItem('hscore'),193,340);
                c.fillStyle='#222A22';
                c.fillRect(245,450,160,70)
                c.fillStyle='#CCCCCC';
                c.fillText("RETRY",285,500);
                if(fg==0)
                {colaud.play();mouse.x=0;mouse.y=0;fg++;}
                c.globalAlpha=0;
                 // cancelAnimationFrame(raf);

            }
           
        }
    }
}

class obs2
{
    constructor(r,no)
    {
        this.ox=270;//window.innerWidth/2;
        this.ody=2;
        this.or=r;
        this.oy=-this.or;
        this.ang=0;
        this.flscr=0;
        this.start=0;
        this.no=no;
        this.flrnd=0;
        this.angacc=0.04;
    }
    draw()
    {
        //c.clearRect(0,0,650,695);
        c.lineWidth=15;
        c.beginPath();
        c.moveTo(this.ox,this.oy);
        c.strokeStyle='#50DFF5';
        c.lineTo(this.ox+this.or*Math.sin(this.ang),this.oy-this.or*Math.cos(this.ang));
        // c.arc(this.ox,this.oy,this.or,this.ang,this.ang+(0.5*Math.PI),false);
        c.stroke();
        c.closePath();
        c.beginPath();
        c.moveTo(this.ox,this.oy);
        c.strokeStyle='#FF0061';
        c.lineTo(this.ox+this.or*Math.sin(this.ang+(Math.PI*0.5)),this.oy-this.or*Math.cos(this.ang+(Math.PI*0.5)));
        // c.arc(this.ox,this.oy,this.or,this.ang+(0.5*Math.PI),this.ang+Math.PI,false);
        c.stroke();
        c.beginPath();
        c.closePath();
        c.moveTo(this.ox,this.oy);
        c.strokeStyle='#8E0BD1';
        c.lineTo(this.ox+this.or*Math.sin(this.ang+(Math.PI)),this.oy-this.or*Math.cos(this.ang+(Math.PI)));
        // c.arc(this.ox,this.oy,this.or,this.ang+Math.PI,this.ang+(1.5*Math.PI),false);
        c.stroke();
        c.beginPath();
        c.closePath();
        c.moveTo(this.ox,this.oy);
        c.strokeStyle='#FFFF00';
        c.lineTo(this.ox+this.or*Math.sin(this.ang+(Math.PI*1.5)),this.oy-this.or*Math.cos(this.ang+(Math.PI*1.5)));
        // c.arc(this.ox,this.oy,this.or,this.ang+(1.5*Math.PI),this.ang+(2*Math.PI),false);
        c.stroke();
        c.closePath();
        c.strokeStyle='#00CEF5';
        c.lineWidth=2

    }
    update()
    {
        this.angacc+=0.000002;
        if(gstart==1 && this.start==1)
        {
            active[this.no]=1;
            this.ang+=this.angacc;
            
            this.draw();
            //this.oy+=this.ody;
            if(this.oy+this.or>=370)
            {
                if(this.flrnd==0)
                {
                    while(true)
                    {
                        let flgforfor=0;
                        obstrnd=Math.floor(Math.random()*4);
                        for(i=0;i<4;i++)
                        {    
                            if(active[i]==1)
                            {
                                if(obst[i].no==obstrnd)
                                {
                                    flgforfor=1;
                                    break;
                                }
                            }
                        }    
                        if(flgforfor==0)
                        {
                            break;
                        }
                    }
                    obst[obstrnd].start=1;
                    active[obstrnd]=1;
                    this.flrnd=1;
                }    
            }


            
            if(this.oy-this.or>=695)
            {
                this.oy=-this.or;
                this.start=0;
                this.flscr=0;
                active[this.no]=0;
                this.flrnd=0;
            }
            if(this.oy<=cir.cy+1 && this.oy>=cir.cy-1)
            {
                if(this.flscr==0)
                {
                    this.flscr=1;
                    score++;
                }
            }
            let flforthisif=0
            // if(stop!=1)
            // {
            //     let anglim =Math.acos((cir.cx-this.or)/this.or);

            //     let hereang=this.ang%(2*Math.PI);
            //     if(((Math.PI/2)-hereang)<=anglim && ((Math.PI/2)-hereang)>=0)
            //     {
            //         let s1=Math.tan(hereang);
            //         let s2=-s1;
            //         s1=1/s1;
            //         sy1=s1*cir.cx;
            //         sy2=s2*cir.cx;
            //         if(sy1==cir.cy)
            //         {
                        
            //         }
            //     }    
            // }
            if(cir.cy>=600)
                stop=1;
            
            c.beginPath();
            c.font='30px Verdana';
            c.strokeStyle='#00CEF5'
            c.strokeText('Score:'+score,500,65);
            
            c.strokeStyle='#2E3830'   
            c.closePath();     

            if(stop==1)
            {
                cir.col='#2E3830';
                cir.dy=0;
                cir.d2y=0;
                this.ody=0;
                this.ang-=0.04;
                cir.col='#2E3830';
                c.fillStyle='#2E3830';
                c.fillRect(0,0,650,695);
                c.font='75px Staatliches';
                c.strokeStyle='#CCCCCC'
                c.fillStyle='#CCCCCC'
                c.fillText("GAME OVER",193,190);
                c.font='40px Staatliches';
                c.fillText("Score: "+score,193,270);
                c.fillStyle='#222A22';
                c.fillRect(245,450,160,70)
                c.fillStyle='#CCCCCC'
                c.fillText("RETRY",285,500);
                if(fg==0)
                {colaud.play();mouse.x=0;mouse.y=0;fg++;}
                
                c.globalAlpha=0;
                 // cancelAnimationFrame(raf);

            }
           
        }
    }
}

class circle
{
    
    constructor(cx,cy,r,col)
    {
        this.cx=cx;
        this.cy=cy;
        this.r=r;
        this.dy=0;
        this.ddy=this.cy;
        this.d2y=0;
        this.col=col;

    }
    
    draw()
    {
        c.clearRect(0,0,650,695);
        //c.clearRect(0,0,window.innerWidth,window.innerHeight)
        c.beginPath();
        c.arc(this.cx,this.cy,this.r,0,2*Math.PI,false);
        c.fillStyle=this.col;
        c.fill();
       
        c.lineWidth=7;
        c.strokeStyle=this.col;
        c.stroke();
        c.closePath(); 
        c.beginPath();
        c.arc(60,60,25,0,2*Math.PI,false);
        c.fillStyle='#3A3A3A';
        c.strokeStyle='#3A3A3A';
        c.fill();
        c.stroke();
        c.closePath();
        c.beginPath();
        c.moveTo(51,45);
        c.lineTo(51,75);
        c.lineWidth=12;
        c.strokeStyle='#EEEEEE';
        c.stroke();
        c.closePath();
        c.beginPath();
        c.moveTo(68,45);
        c.lineTo(68,75);
        c.lineWidth=12;
        c.strokeStyle='#EEEEEE';
        c.stroke();
        c.closePath();
    }
    update()
    {
        
        if(gstart==1 && stop==0)
        {
            this.d2y=0.38;
        
        this.dy+=this.d2y;
        // this.ddy+=this.d2y;
        this.cy+=this.dy;
        if(this.cy<0.5*innerHeight )//&& this.ddy<0.5*innerHeight)
        {
            for(i=0;i<4;i++)
            {
                if(active[i]==1)
                {
                    obst[i].oy-=(this.cy-0.5*innerHeight);//(this.dy*this.dy)/(2*this.d2y);
    
                }    
            }
            for(i=0;i<5;i++)
            {
                if(shactive[i]==1)
                {
                    shobt[i].shy-=(this.cy-0.5*innerHeight);
                }
            }

            this.cy=0.5*innerHeight
            // this.ddy+=this.dy;
        }
        
        if((625>=Math.pow(mouse.x-369-60,2)+Math.pow(mouse.y-60,2)))
        {
            if(swchvar==0)
            {
                gstart=0;swchvar=1;
                c.clearRect(0,0,650,695);
               
                mouse.x=0;
                mouse.y=0;
                // c.font='75px Staatliches';
            }
            // else
            // {
            //     gstart=1;swchvar=0;
            // }
        }
        }
        
        if(startscr==0)
        {    
            this.draw();
            if(swchvar==1)
            {
                c.closePath();
                c.beginPath();
                c.font='40px  Staatliches';
                c.fillStyle='#FFFFFF';
                c.fillText('Press Space to continue!',160,580);
            }
        }
        if(stop==1)
        {
            c.globalAlpha=1;
        }
        if(gstart==0 && swchvar==0)
        {
            c.beginPath();
            c.font='40px  Staatliches';
            c.fillStyle='#FFFFFF';
            c.fillText('Press Space to bounce!',160,580);
        }
    }
}

class shiftcol
{
    constructor(no)
    {
        this.shr=20;
        this.shx=325;
        this.shy=-this.shr;
        this.no=no;
        this.start=0;
        this.col='#FFFF00';
        this.change=0;
        this.precol;
        this.f=0;
    }

    draw()
    {
        this.change++;
        if(this.change>20)
        {
            this.change=0;
            this.precol=this.col;
            this.col=colors[Math.floor(Math.random()*4)];
            while(true)
            {
                if(this.col==this.precol || this.col==cir.col)
                {
                    this.col=colors[Math.floor(Math.random()*4)];
                }
                else
                    break;
            }
        }
        c.beginPath();
        c.arc(this.shx,this.shy,this.shr,0,2*Math.PI,false);
        c.fillStyle=this.col;
        c.fill();
        
        // // c.closePath();
        // c.beginPath();
        // c.arc(this.shx,this.shy,this.shr,0.5*Math.PI,Math.PI,false);
        // c.fillStyle="#FF0061"
        // c.fill();
        // c.stroke();
        // // c.closePath();
        // c.beginPath();
        // c.arc(this.shx,this.shy,this.shr,Math.PI,1.5*Math.PI,false);
        // c.fillStyle="#8E0BD1"
        // c.fill();
        // c.stroke();
        // // c.closePath();
        // c.beginPath();
        // c.arc(this.shx,this.shy,this.shr,1.5*Math.PI,2*Math.PI,false);
        // c.fillStyle="#FFFF00"
        // c.fill();
        // // c.closePath();
    }
    update()
    {
        
        if(this.start==1 && gstart==1)
        {
            
            if(this.shy<cir.cy && this.f==0)
            {
                this.draw();
            }
            else
            {
                cir.col=this.col;
                this.f=1;
            }

            if(this.shy>695)
            {
                shactive[this.no]=0;
                this.start=0;
                this.shy=-this.shr;
                this.f=0;
            }
        }
    }
}

let cir = new circle(cx,cy,r,col);
let count=0;
let obst1 = new obs1(or,0);
let obst2 = new obs1(sor,1);
let obst3 = new obs1(or,2);
let obst4 = new obs1(or,3);
let sh1 = new shiftcol(0)
let sh2 = new shiftcol(1)
let sh3 = new shiftcol(2)
let sh4 = new shiftcol(3)
let sh5 = new shiftcol(4)

let obst=[];
obst[0]=obst1;
obst[1]=obst2;
obst[2]=obst3;
obst[3]=obst4;
let shobt=[];
shobt[0]=sh1;
shobt[1]=sh2;
shobt[2]=sh3;
shobt[3]=sh4;
shobt[4]=sh5;

function animate()
{
    if(startscr==1)
    {
        startscreen();
        playang1+=0.03;
        playang2-=0.03;
    }
    else
    {
        cir.update();
        obst[0].update();
        obst[1].update();
        obst[2].update();
        obst[3].update();
        shobt[0].update();
        shobt[1].update();
        shobt[2].update();
        shobt[3].update();
        shobt[4].update();
    }
    let raf=requestAnimationFrame(animate);
}
animate();
let abstrt=0;
let swchvar=0;
let key;
pausecol='#AAAAAA';
addEventListener('keypress',
    function(event)
    {
        if(startscr==0 )
        {   
            key=event.key;
            if(key==' ' || key=='space')
            {
                gstart=1;
                if(abstrt==0)
                {
                    abstrt=1;
                    obst1.start=1;
                }
                if(swchvar==0)
                {
                    cir.dy=-6.5;
                }
                else
                {
                    swchvar=0;
                }
            }
            if(stop==0 )
            {
                aud1.pause();
                aud1.play();
            }
        }
    }
)
window.addEventListener("click",
    function(event)
    {
        mouse.x=event.x;
        mouse.y=event.y;
        
        if(distance(325+(0.274*innerWidth),450,mouse.x,mouse.y)<95 && startscr==1)
        {
            startscr=0;
        }    


        
    
        if(stop==1)
        {
            if(mouse.x>615 && mouse.y>450 && mouse.x<775 && mouse.y<520)
                {
                    retryaud.play();
                    location.reload();
                }
        }
        if(stop==0)
        {
            aud1.pause();
            aud1.play();

        }
        // cir.ddy=-6;
    })
// window.addEventListener('resize',function()
// {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     cir.cx=window.innerWidth/2;
// })
