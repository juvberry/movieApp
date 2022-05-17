import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'movieApp';
  isParent = false;
  routeData:any;

  constructor(
    private router:Router,
    private breakpointObserver:BreakpointObserver
    ){
    this.router.events.subscribe((data) =>{
      if(data instanceof RoutesRecognized){
        this.routeData = data.state.root.firstChild?.data;
        this.isParent = this.routeData.isParent
      }
    })
  }

  isMobile:any = false

  ngOnInit( ): void {
    this.isMobileScreen()
  }

  isMobileScreen(){
    this.breakpointObserver
    .observe(['(max-width: 767px)'])
    .subscribe((state: BreakpointState) => {
      if(state.matches){
        this.isMobile = true
      }
    })
  }

}
