import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movieApp';
  isParent = false;
  routeData:any;

  constructor(private router:Router){
      this.router.events.subscribe((data) =>{
        if(data instanceof RoutesRecognized){
          this.routeData = data.state.root.firstChild?.data;
          this.isParent = this.routeData.isParent
        }
      })
    }
}
