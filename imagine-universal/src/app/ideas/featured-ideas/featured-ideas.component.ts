import { Component, OnInit } from '@angular/core';
import { Idea } from '../../shared/idea.model';

@Component({
  selector: 'app-featured-ideas',
  templateUrl: './featured-ideas.component.html',
  styleUrls: ['./featured-ideas.component.css']
})
export class FeaturedIdeasComponent implements OnInit {
  idea: Idea;
  
  constructor() { }

  ngOnInit() {
  }

}
