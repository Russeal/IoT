import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-automatic',
  templateUrl: './automatic.component.html',
  styleUrls: ['./automatic.component.scss']
})
export class AutomaticComponent implements OnInit {

  public checkModel: any = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  };

  public checkModel2: any = {
    water: false,
    light: false
  };

  public activeAuto: boolean;

  private week = [
    {
      'water': {},
      "light": {}
    },
    {
      'water': {},
      "light": {}
    },
    {
      'water': {},
      "light": {}
    },
    {
      'water': {},
      "light": {}
    },
    {
      'water': {},
      "light": {}
    },
    {
      'water': {},
      "light": {}
    },
    {
      'water': {},
      "light": {}
    }
  ];

  private plantId = "";

  constructor(private router: Router, private  resourceService: ResourceService, private activeRoute: ActivatedRoute) {
    this.activeAuto = false;
  }

  ngOnInit(): void {

    this.plantId = this.router.url.split('/')[1].split(';')[0];

    setTimeout(() => {
      this.activeAuto = (this.activeRoute.snapshot.queryParamMap.get('auto')==='true');
    }, 50);

    this.getSchedule();
  }

  public setSchedule() {

    let time = (<HTMLInputElement>document.getElementById("inputTime")).value + ":00";
    let duration = parseInt((<HTMLInputElement>document.getElementById("inputDuration")).value);
    if (duration.toString() == "NaN") {
      duration = -1;
    }

    for (const x in this.checkModel) {
      if (this.checkModel[x] === true) {
        switch (x) {
          case 'monday':
            this.week[0] = {
              "water": (
                this.checkModel2.water ?
                { [time]: duration } :
                {}
              ),
              "light": (
                this.checkModel2.light ?
                { [time]: duration } :
                {}
              ),
            }
            break;

          case 'tuesday':
            this.week[1] = {
              "water": (
                this.checkModel2.water ?
                { [time]: duration } :
                {}
              ),
              "light": (
                this.checkModel2.light ?
                { [time]: duration } :
                {}
              ),
            }
            break;

          case 'wednesday':
            this.week[2] = {
              "water": (
                this.checkModel2.water ?
                { [time]: duration } :
                {}
              ),
              "light": (
                this.checkModel2.light ?
                { [time]: duration } :
                {}
              ),
            }
            break;

          case 'thursday':
            this.week[3] = {
              "water": (
                this.checkModel2.water ?
                { [time]: duration } :
                {}
              ),
              "light": (
                this.checkModel2.light ?
                { [time]: duration } :
                {}
              ),
            }
            break;

          case 'friday':
            this.week[4] = {
              "water": (
                this.checkModel2.water ?
                { [time]: duration } :
                {}
              ),
              "light": (
                this.checkModel2.light ?
                { [time]: duration } :
                {}
              ),
            }
            break;

          case 'saturday':
            this.week[5] = {
              "water": (
                this.checkModel2.water ?
                { [time]: duration } :
                {}
              ),
              "light": (
                this.checkModel2.light ?
                { [time]: duration } :
                {}
              ),
            }
            break;

          case 'sunday':
            this.week[6] = {
              "water": (
                this.checkModel2.water ?
                { [time]: duration } :
                {}
              ),
              "light": (
                this.checkModel2.light ?
                { [time]: duration } :
                {}
              ),
            }
            break;
        }
      }
    }

    setTimeout(() => {
      let plantJson = {
        [ this.plantId ]: {
          "type": "weekly",
          "schedData": this.week
        }
      }

      this.resourceService.setPlantStatusAutoEnableWithData(this.plantId, JSON.stringify(plantJson)).subscribe(
        (data) => {
          console.log(data);

        },
        error => console.log(error)

      );


    }, 50);

  }

  private getSchedule() {
    this.resourceService.getAutomaticSchedule(this.plantId).subscribe(
      (data) => {
        console.log(data)
      },
      (error) => console.log(error)
    );
  }

  public changeStatus() {
    if (this.activeAuto) {
      this.resourceService.setPlantStatusAutoDisable(this.plantId).subscribe(
        (data) => {
          this.activeAuto = false
          document.getElementById('autoId')?.classList.remove('active')

          this.router.navigate(['.'],
          {
            relativeTo: this.activeRoute,
            queryParams: { auto: false },
            queryParamsHandling: 'merge'
          })
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.resourceService.setPlantStatusAutoEnable(this.plantId).subscribe(
        (data) => {
          this.activeAuto = true
          document.getElementById('autoId')?.classList.add('active')

          this.router.navigate(['.'],
          {
            relativeTo: this.activeRoute,
            queryParams: { auto: true },
            queryParamsHandling: 'merge'
          })
        },
        error => {
          console.log(error);
        }
      )
    }
  }

}
