import { Component, OnInit } from '@angular/core';

import { DataService } from "../../shared/services/data.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  gitHubRepositoryLink;
  gitHubRepositoryCommits;
  gitHubRepositories;

  constructor( private dataService: DataService) { }

  ngOnInit(): void {
  }

  async getGitHubRepositoryCommits(){
    var str1 = this.gitHubRepositoryLink.replace("github.com", "api.github.com/repos");
    var str2 = "/commits";
    var rezult = str1.concat(str2);
    return await fetch(rezult).then((res)=>{
      if(res.ok){
        res.json().then(res=>{
          this.gitHubRepositoryCommits = res;
          // -- save in DB --
          this.dataService.postCommits({gitHubRepository: this.gitHubRepositoryLink, commits: this.gitHubRepositoryCommits}).subscribe((data) => {
            // console.log(data); // save in db
          })
          // -- save in DB --
          
          setTimeout(()=> {
            this.getAllRepositoryCommits()
          }, 500)
        })
      }
    })
  }

  getAllRepositoryCommits(){
    this.dataService.getAllRepositoryCommits().subscribe((data) => {
      this.gitHubRepositories = data;
    })
  }

  isNumeric(n){
    return !isNaN(n)
  }

}
