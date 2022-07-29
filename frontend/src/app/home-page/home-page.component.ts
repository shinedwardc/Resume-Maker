import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { type User } from 'shared';
import { UserService } from '../user.service';

//import {trigger,style,transition,query,animate,group} from '@angular/animations'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  // animations:[
  //   trigger('carousel',[
  //       transition(':increment',[
  //           group([
  //               query(':enter',[
  //                     style({transform:'translateX(-100%)'}),
  //                     animate('1s')
  //                 ]),
  //                 query(':leave',[
  //                     animate('1s',style({transform:'translateX(100%)'}))
  //                 ])
  //             ])
  //         ]),
  //         transition(':decrement',[
  //           group([
  //               query(':enter',[
  //                     style({transform:'translateX(100%)'}),
  //                     animate('1s')
  //                 ]),
  //                 query(':leave',[
  //                     animate('1s',style({transform:'translateX(-100%)'}))
  //                 ])
  //             ])
  //         ]),
  //     ])
  //]
})
export class HomePageComponent implements OnInit {
  user: User | null = null;
  loggedin = false;
  //startIndex = 200;
  // url='../../../assets/image/'
  // imgs=[
  //     {id:1,name:'template1.jpeg',state:true},
  //       {id:2,name:'template2.png',state:false},
  //       {id:3,name:'template3.png',state:false}
  //   ]
  // state=0;
  // id;
  // i;
  // switch=true;
  // execTime=0;
  constructor(public route: ActivatedRoute, public usersvc: UserService) {}
  ngOnInit(): void {
    this.usersvc.loggedInState().subscribe((fuser) => {
      console.log('epic');
      if (fuser !== null) {
        this.loggedin = true;
        this.usersvc.getUser().subscribe((user) => {
          this.user = user;
        });
      }
    });
  }

  // fn(){
  //     this.i++;
  //       if(this.i>this.imgs.length-1){
  //           this.i=0;
  //       }
  //     this.imgs.forEach(val=>{val.state=false})
  //       this.imgs[this.i].state=true;
  //       this.state+=0.1;
  // }
  // fnn(){
  //   //console.log('exec fn');
  //   this.i--;
  //     if(this.i<0){
  //         this.i=this.imgs.length-1;
  //     }
  //     this.imgs.forEach(val=>{val.state=false})
  //     this.imgs[this.i].state=true;
  //     this.state-=0.1;
  // }
  // ngOnInit() {
  //   this.id=setInterval(this.fn.bind(this),3000)
  // }
  // stop(){
  //     clearInterval(this.id)
  //   }
  //   start(){
  //     this.id=setInterval(this.fn.bind(this),3000)
  //   }
  //   circleEnter(id){
  //     //console.log(id);
  //       this.i=id-1;
  //       this.imgs.forEach(val=>{val.state=false})
  //       this.imgs[id-1].state=true;
  //       //this.state+=0.1;
  //     this.stop();
  //   }
  //   circleLeave(){
  //     this.start();
  //   }
  //   go(){
  //     this.throttle(this.fn.bind(this),1500)
  //     //this.fn()
  //   }
  //   back(){

  //     this.throttle(this.fnn.bind(this),1500)
  //   }

  // throttle(fn,interval){
  //       if(new Date().getTime()-this.execTime>interval){this.switch=true}
  //       console.log(this.switch);
  //     if(this.switch){
  //           fn();
  //           this.switch=false;
  //           this.execTime=new Date().getTime();
  //       }

  //   }

  //   Imagedata: Array<string> = [
  //     "../../assets/image/template1.jpeg",
  //     "../../assets/image/template2.png",
  //     "../../assets/image/template3.png"
  // ];

  // slideConfig = {
  //   "slidesToShow": 3,
  //   "slidesToScroll": 3,
  //   "dots": true,
  //   "infinite": true
  // };

  // gOnInit() {
  //   //this.Repeat();
  // }

  // Repeat() {
  //   setTimeout(() => {
  //     this.__FunctionSlide();
  //     this.Repeat();
  //   }, 2000);
  // }

  // __FunctionSlide() {
  //   const slides = Array.from(document.getElementsByClassName('mall-show-slide'));
  //   if (slides === []) {
  //     this.Repeat();
  //   }
  //   for (const x of slides) {
  //     const y = x as HTMLElement;
  //     y.style.display = 'none';
  //   }
  //   if (this.startIndex > slides.length - 1) {
  //     this.startIndex = 0;
  //     const slide = slides[this.startIndex] as HTMLElement;
  //     slide.style.display = 'block';
  //     this.startIndex++;
  //   } else {

  //     const slide = slides[this.startIndex] as HTMLElement;
  //     slide.style.display = 'block';
  //     this.startIndex++;
  //   }
  // }
  // url='../../../assets/image/'
  //   imgs=[
  //         {id:1,name:'template1.jpeg',state:true},
  //           {id:2,name:'template2.png',state:false},
  //           {id:3,name:'template3.png',state:false}
  //       ]
  //     state=0;
  //     id;
  //     i=0;
  //     switch=true
  //     execTime
  //   fn(){
  //       this.i++;
  //         if(this.i>this.imgs.length-1){
  //             this.i=0;
  //         }
  //       this.imgs.forEach(val=>{val.state=false})
  //         this.imgs[this.i].state=true;
  //         this.state+=0.1;
  //     }
  //   ngOnInit() {
  //     this.id=setInterval(this.fn.bind(this),3000)
  //   }
  //   stop(){
  //       clearInterval(this.id)
  //     }
  //     start(){
  //       this.id=setInterval(this.fn.bind(this),3000)
  //     }
  //     circleEnter(id){
  //       //console.log(id);
  //         this.i=id-1;
  //         this.imgs.forEach(val=>{val.state=false})
  //         this.imgs[id-1].state=true;
  //         //this.state+=0.1;
  //       this.stop();
  //     }
  //     circleLeave(){
  //       this.start();
  //     }
  //     go(){
  //       this.throttle(this.fn.bind(this),1500)
  //       //this.fn()
  //     }
  //     back(){
  //       const fn=function(this: any){
  //           //console.log('exec fn');
  //           this.i--;
  //             if(this.i<0){
  //                 this.i=this.imgs.length-1;
  //             }
  //             this.imgs.forEach(val=>{val.state=false})
  //             this.imgs[this.i].state=true;
  //             this.state-=0.1;
  //         }
  //       this.throttle(fn.bind(this),1500)
  //     }

  //   throttle(fn,interval){
  //         if(new Date().getTime()-this.execTime>interval){this.switch=true}
  //         console.log(this.switch);
  //       if(this.switch){
  //             fn();
  //             this.switch=false;
  //             this.execTime=new Date().getTime();
  //         }

  //     }
  imageObject = [
    {
      image: 'assets/image/template4.png',
      thumbImage: 'assets/image/template4.png',
    },
    {
      image: 'assets/image/template5.png',
      thumbImage: 'assets/image/template5.png',
    },
    {
      image: 'assets/image/template6.png',
      thumbImage: 'assets/image/template6.png',
    },
    // {
    //   image:
    //   'assets/image/template4.png',
    //   thumbImage:
    //   'assets/image/template4.png',
    // },
    // {
    //   image:
    //   'assets/image/template5.png',
    //   thumbImage:
    //   'assets/image/template5.png',

    // }
  ];
}
