import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
​

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.page.html',
  styleUrls: ['./showcase.page.scss'],
})
export class ShowcasePage implements OnInit {

  image: any;
  result: any;
  feature: any;
​
//   constructor(private route: ActivatedRoute,
//     private router: Router) {
//       this.route.queryParams.subscribe(params => {

//           this.image = params.base64;
//           this.result = JSON.parse(params.result);
//           this.feature =params.feature; 
        
//       });
//       alert(JSON.stringify(this.result.responses[0].textAnnotations));
// ​
//   }

constructor(private route: ActivatedRoute,
  private router: Router) {
    this.route.queryParams.subscribe(params => {

        this.image = params.base64;
        this.result = JSON.parse(params.result) ;
        this.feature =params.feature;
      
    });

}


​
  ngOnInit() {
​   
  }
}
