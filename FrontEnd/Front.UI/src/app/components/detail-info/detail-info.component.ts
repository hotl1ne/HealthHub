import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { food } from 'src/app/_interfaces/food.module';
import { FoodService } from 'src/app/services/food-service/food.service';
import { GoogleAuthcService } from 'src/app/services/google-auth/google-authc.service';
import { SearchService } from 'src/app/services/search-service/search.service';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.css']
})
export class DetailInfoComponent {
  isUserAuthenticated = false;
  tabItem: HTMLElement[] = [];
  tabContent: HTMLElement[] = [];
  info: food | undefined;
  search_result: food[] | undefined;
  foodID: string = "";
  input_text = '';
  constructor(private google: GoogleAuthcService, private route: ActivatedRoute, private food: FoodService, private search: SearchService) {
    this.tabItem = Array.from(document.querySelectorAll<HTMLElement>('.tabs_btn'));
    this.tabContent = Array.from(document.querySelectorAll<HTMLElement>('.tabs_content_item'));

    this.tabItem.forEach((element) => {
      element.addEventListener('click', this.open.bind(this));
    });

    this.route.params.subscribe(params => {
      this.foodID = params['Id'];
      console.log(this.foodID);
    });
  }
  
  ngOnInit() {
    const menuBtn: Element | null = document.querySelector('.menu_btn');
    const menu: HTMLElement | null = document.querySelector('.menu_list');

    if (menuBtn && menu) {
      menuBtn.addEventListener('click', () => {
        menu.classList.toggle('menu_list--active');
      });
    }
    
      this.food.GetFoodbyID(this.foodID).subscribe(
        (data: food) => {
          if (data) {
            this.info = data;
          } else {
            console.error('No data received for food ID:', this.foodID);
          }
        },
        (error) => {
          console.error('Error fetching food:', error);
        }
      );
    

  }
  
  performSearch(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log(inputValue);
    if(inputValue === '')
    {
      const found: HTMLElement = document.getElementById('found_foods')!;
      while (found.firstChild) {
        found.removeChild(found.firstChild);
      }
    }
    else{
    this.search.search_food(inputValue).subscribe(
      (data: food[]) => {
        if (data) {
          this.search_result = data;
          this.search_result = this.search_result.slice(0, 5);
        } else {
          console.error('No data received for food ID:', this.foodID);
        }
      },
      (error) => {
        console.error('Error fetching food:', error);
      }
    );
    }
  }
  
  open(evt: MouseEvent) {
    const tabTarget = evt.currentTarget as HTMLElement;
    const button = tabTarget.dataset['button'];

    this.tabItem.forEach((item) => {
      item.classList.remove('tabs_btn--active');
    });

    tabTarget.classList.add('tabs_btn--active');

    this.tabContent.forEach((item) => {
      item.classList.remove('tabs_content_item--active');
    });

    const contentItem = this.tabContent.find((item) => item.id === button);
    if (contentItem) {
      contentItem.classList.add('tabs_content_item--active');
    }
  }
}

