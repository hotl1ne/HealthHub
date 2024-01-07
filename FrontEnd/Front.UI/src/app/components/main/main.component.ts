import { Component, OnInit } from '@angular/core'; 
import { food } from 'src/app/_interfaces/food.module';
import { userInfo } from 'src/app/_interfaces/userInfo.module';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FoodService } from 'src/app/services/food-service/food.service';
import { GoogleAuthcService } from 'src/app/services/google-auth/google-authc.service';

@Component({
  selector: 'app-main', 
   templateUrl: './main.component.html', 
  styleUrls: ['./main.component.css'] 
})
export class MainComponent implements OnInit{

  isUserAuthenticated = false;
  tabItem: HTMLElement[] = [];
  tabContent: HTMLElement[] = [];
  foods :food[] = [];

  constructor(private google: GoogleAuthcService, private authService: AuthenticationService, private food: FoodService) {
    this.tabItem = Array.from(document.querySelectorAll<HTMLElement>('.tabs_btn'));
    this.tabContent = Array.from(document.querySelectorAll<HTMLElement>('.tabs_content_item'));

    this.tabItem.forEach((element) => {
      element.addEventListener('click', this.open.bind(this));
    });
  }
  checkUser() {
    //localStorage.clear();
    const isUserAuth = localStorage.getItem('UserisAuth');
    if (isUserAuth === 'true') {
      return true;
    }
    else if(this.google.getProfile() != undefined)
    {
      return true;
    }
    return false;
  }
  
  ngOnInit() {
    //localStorage.clear();
    const menuBtn: Element | null = document.querySelector('.menu_btn');
    const menu: HTMLElement | null = document.querySelector('.menu_list');

    if (menuBtn && menu) {
      menuBtn.addEventListener('click', () => {
        menu.classList.toggle('menu_list--active');
      });
    }
    this.getFoods();
  }

  getFoods(){
    this.food.getAllFoods().subscribe(
      (data: food[]) => {
        this.foods = data;
      },
      (error) => {
        console.error('Error fetching foods:', error);
      }
    );
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
