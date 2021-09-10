import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  private plantId = "";
  public activeFeed: boolean = false;
  public humidity: number = 0;
  public illum: number = 0;
  public light: number = 0;

  constructor(private router: Router, private  resourceService: ResourceService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.plantId = this.router.url.split('/')[1].split(';')[0];

    setTimeout(() => {
      this.activeFeed = (this.activeRoute.snapshot.queryParamMap.get('feedback')==='true');
    }, 50);

    this.getSchedule();
  }

  public changeStatus() {
    if (this.activeFeed) {
      this.resourceService.setPlantStatusFeedbackDisable(this.plantId).subscribe(
        (data) => {
          console.log(data);

          this.activeFeed = false
          document.getElementById('feedbackId')?.classList.remove('active')

          this.router.navigate(['.'],
          {
            relativeTo: this.activeRoute,
            queryParams: { feedback: false },
            queryParamsHandling: 'merge'
          })
        },
        error => {
          console.log(error);
        }
      )
    } else {
      let feedback = {
        light_time: this.light,
        hum_thresh: this.humidity,
        illum_thresh: this.illum
      }

      this.resourceService.setPlantStatusFeedbackEnable(this.plantId, JSON.stringify(feedback)).subscribe(
        (data) => {
          console.log(data);

          this.activeFeed = true
          document.getElementById('feedbackId')?.classList.add('active')

          this.router.navigate(['.'],
          {
            relativeTo: this.activeRoute,
            queryParams: { feedback: true },
            queryParamsHandling: 'merge'
          })
        },
        error => {
          if (error.status === 500) {
            this.activeFeed = true
            document.getElementById('feedbackId')?.classList.add('active')

            this.router.navigate(['.'],
            {
              relativeTo: this.activeRoute,
              queryParams: { feedback: true },
              queryParamsHandling: 'merge'
            })
          }
          console.log(error);
        }
      )
    }
  }

  public setSchedule() {
    let feedback = {
      light_time: this.light,
      hum_thresh: this.humidity,
      illum_thresh: this.illum
    }
    console.log(JSON.stringify(feedback));

    this.resourceService.setFeedbackParams(this.plantId, JSON.stringify(feedback)).subscribe(
      (data) => {
        console.log(data);
      },
      error => console.log(error)
    );


  }



  private getSchedule() {

  }

}
