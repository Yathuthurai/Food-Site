import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  // tslint:disable-next-line:typedef
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  // tslint:disable-next-line:typedef
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  // tslint:disable-next-line:typedef
  onLogout() {
    this.authService.logout();
  }

  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
