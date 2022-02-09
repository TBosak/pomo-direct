import { ChangeDetectionStrategy, Component, ViewChild, AfterViewInit } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { CountdownComponent } from 'ngx-countdown';
import { ChronographComponent } from '../chronograph/chronograph.component';
import { NotificationService } from '../services/notification.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Tab1Page implements AfterViewInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('chronograph', { static: false }) chronograph: ChronographComponent;
  status: BehaviorSubject<string> = new BehaviorSubject('break');
  cd: CountdownComponent;
  pomodoro = 1800;
  short = 300;
  long = 900;
  notificationService: NotificationService;
  data: {'id': number; 'name': string}[];
  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService;
    this.data = Array(100).fill('').map((x, i) => ({id: i + 1, name: 'Item ' + (i + 1)}));
  }


   ngAfterViewInit(): void {
    this.cd = this.chronograph.countdown;
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      if (this.data.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  setTimer(time: number, color: string){
    this.chronograph.setTime(time);
    this.cd.begin();
  }

  toggleNotifications() {
    this.notificationService.notifyMe();
  }

  notifications(){
    return this.notificationService.notificationsOn();
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
