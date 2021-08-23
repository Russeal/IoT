import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from 'src/app/services/resource.service';
import { PlantDTO } from 'src/app/util/plantDto';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent implements OnInit {

  public activeStatus;
  private plantId = "";
  private isAuto: boolean = false;
  private isFeed: boolean = false;

  constructor(private router: Router, private  resourceService: ResourceService, private activeRoute: ActivatedRoute) {
    this.activeStatus = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.activeStatus = (this.activeRoute.snapshot.queryParamMap.get('manual')==='true');
    }, 100);

    this.plantId = this.router.url.split('/')[1].split('?')[0];


    this.getPlantStatus;


  }

  public changeStatus() {
    if (this.activeStatus) {
      this.resourceService.setPlantStatus(this.plantId, 'disable').subscribe(
        (data) => {
          this.activeStatus = false
          document.getElementById('manuId')?.classList.remove('active')

          this.router.navigate(['.'],
            {
              relativeTo: this.activeRoute,
              queryParams: { manual: false },
              queryParamsHandling: 'merge'
            })
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.resourceService.setPlantStatus(this.plantId, 'enable').subscribe(
        (data) => {

          this.activeStatus = true
          document.getElementById('manuId')?.classList.add('active')

          this.router.navigate(['.'],
            {
              relativeTo: this.activeRoute,
              queryParams: { manual: true },
              queryParamsHandling: 'merge'
            })
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  private getPlantStatus() {
    this.resourceService.getPlantStatus(this.plantId).subscribe(
      (data) => {
        if (data.includes('auto')) {
          this.isAuto = true;
        }
        if (data.includes('feedback')) {
          this.isFeed = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  public startWatering() {
    let plant = {
      'plantId': this.plantId,
      'action': 'on',
      'duration': parseInt((<HTMLInputElement>document.getElementById("waterDuration")).value)
    };
    // plant.plantId = this.plantId;
    // plant.action = "on";
    // plant.duration = parseInt((<HTMLInputElement>document.getElementById("waterDuration")).value);

    console.log(plant);

    this.resourceService.setPlantWater(plant).subscribe(
      (data) => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

}
