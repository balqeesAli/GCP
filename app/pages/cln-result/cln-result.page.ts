import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cln-result',
  templateUrl: './cln-result.page.html',
  styleUrls: ['./cln-result.page.scss'],
})
export class ClnResultPage implements OnInit {

  text;
  feature;
  result;

  constructor(private route: ActivatedRoute,
    private router: Router) {
      this.route.queryParams.subscribe(params => {

          this.text = params.text;
          this.result = JSON.parse(params.result) ;
          this.feature =params.feature;
        
      });

  }

  ngOnInit() {
  }

}
