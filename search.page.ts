import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  countries = [];
  //laws=[];
  queryText: String;

  constructor(
    private router: Router,
  	public itemService : ItemService,
  	) {
  	this.itemService.getObservable().subscribe((data) => {
  		console.log('Data Recieved', data);
  		this.countries = this.itemService.countires;
  	});
  	this.countries = this.itemService.countries;
  }

  searchWords(){
  	let queryTextLower = this.queryText.toLowerCase();
  	let filteredResults = [];
  	_.forEach(this.allResults, td =>{
  		let results = _.filter(td.laws, t=> (<any>t).name.toLowerCase().includes(queryTextLower));
  		if(results.length){
  			filteredResults.push({title: td.title});
  		}
  	});
  	this.results = filteredResults;
  }
  ngOnInit() {
  }
    openMyCollection(){
    this.router.navigate(["/collection"]);
  }
  
  openSearchByCountry(){
     this.router.navigate(["/country"]);
  }

  goToSearchHistory(){
     this.router.navigate(["/searchHistory"]);
  }

}
