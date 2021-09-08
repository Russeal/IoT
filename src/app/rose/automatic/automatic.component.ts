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

  public lie: boolean = false;

  public dur?: number;

  public checkModel2: any = {
    water: false,
    light: false
  };

  public activeAuto: boolean;

  private week = [
    {

    },
    {
    },
    {
    },
    {
    },
    {
    },
    {
    },
    {
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
            if (this.checkModel2.light && this.checkModel2.water) {
              this.week[0] = {
                "light": {
                  [time]: duration
                },
                "water": {
                  [time]: duration
                }
              }
            } else if (this.checkModel2.light) {
              this.week[0] = {
                "light": {
                  [time]: duration
                }
              }
            } else if (this.checkModel2.water) {
              this.week[0] = {
                "water": {
                  [time]: duration
                }
              }
            }
            break;

          case 'tuesday':
            if (this.checkModel2.light && this.checkModel2.water) {
              this.week[1] = {
                "light": {
                  [time]: duration
                },
                "water": {
                  [time]: duration
                }
              }
            } else if (this.checkModel2.light) {
              this.week[1] = {
                "light": {
                  [time]: duration
                }
              }
            } else if (this.checkModel2.water) {
              this.week[1] = {
                "water": {
                  [time]: duration
                }
              }
            }
            break;

          case 'wednesday':
            if (this.checkModel2.light && this.checkModel2.water) {
              this.week[2] = {
                "light": {
                  [time]: duration
                },
                "water": {
                  [time]: duration
                }
              }
            } else if (this.checkModel2.light) {
              this.week[2] = {
                "light": {
                  [time]: duration
                }
              }
            } else if (this.checkModel2.water) {
              this.week[2] = {
                "water": {
                  [time]: duration
                }
              }
            }
            break;

          case 'thursday':
            if (this.checkModel2.light && this.checkModel2.water) {
              this.week[3] = {
                "light": {
                  [time]: duration
                },
                "water": {
                  [time]: duration
                }
              }
            } else if (this.checkModel2.light) {
              this.week[3] = {
                "light": {
                  [time]: duration
                }
              }
            } else if (this.checkModel2.water) {
              this.week[3] = {
                "water": {
                  [time]: duration
                }
              }
            }
            break;

          case 'friday':
            if (this.checkModel2.light && this.checkModel2.water) {
              this.week[4] = {
                "light": {
                  [time]: duration
                },
                "water": {
                  [time]: duration
                }
              }
            } else if (this.checkModel2.light) {
              this.week[4] = {
                "light": {
                  [time]: duration
                }
              }
            } else if (this.checkModel2.water) {
              this.week[4] = {
                "water": {
                  [time]: duration
                }
              }
            }
            break;

          case 'saturday':
            if (this.checkModel2.light && this.checkModel2.water) {
              this.week[5] = {
                "light": {
                  [time]: duration
                },
                "water": {
                  [time]: duration
                }
              }
            } else if (this.checkModel2.light) {
              this.week[5] = {
                "light": {
                  [time]: duration
                }
              }
            } else if (this.checkModel2.water) {
              this.week[5] = {
                "water": {
                  [time]: duration
                }
              }
            }
            break;

          case 'sunday':
            if (this.checkModel2.light && this.checkModel2.water) {
              this.week[6] = {
                "light": {
                  [time]: duration
                },
                "water": {
                  [time]: duration
                }
              }
            } else if (this.checkModel2.light) {
              this.week[6] = {
                "light": {
                  [time]: duration
                }
              }
            } else if (this.checkModel2.water) {
              this.week[6] = {
                "water": {
                  [time]: duration
                }
              }
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
      console.log(JSON.stringify(plantJson));


      this.resourceService.setPlantAutoSchedule(this.plantId, JSON.stringify(plantJson)).subscribe(
        (data) => {
          this.lie = false;
          console.log(data);


        },
        error => console.log(error)

      );


    }, 50);

  }

  private getSchedule() {
    this.resourceService.getAutomaticSchedule(this.plantId).subscribe(
      (data) => {
        this.lie = false;

        for (let i = 0; i < data.length; i++) {

          if (data[i].water || data[i].light) {
            for (var key in data[i].light) {
              this.dur = parseInt(data[i].light[key]);
              (<HTMLInputElement>document.getElementById("inputTime")).value = key.slice(0, 5);
            }
            this.checkModel2.water = data[i].water ? true : null;
            this.checkModel2.light = data[i].light ? true : null;
            switch (i) {
              case 0:
                this.checkModel.monday = true;
                break;
              case 1:
                this.checkModel.tuesday = true;
                break;
              case 2:
                this.checkModel.wednesday = true;
                break;
              case 3:
                this.checkModel.thursday = true;
                break;
              case 4:
                this.checkModel.friday = true;
                break;
              case 5:
                this.checkModel.saturday = true;
                break;
              case 6:
                this.checkModel.sunday = true;
                break;
            }
          }
        }
      },
      (error) => {
        if (error.status !== 200) {
          console.log(error)
        } else {
          this.lie = true;
        }
      }
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
          if (error.status === 500) {
            this.activeAuto = true
            document.getElementById('autoId')?.classList.add('active')

            this.router.navigate(['.'],
            {
              relativeTo: this.activeRoute,
              queryParams: { auto: true },
              queryParamsHandling: 'merge'
            })
          }
          console.log(error.status);
        }
      )
    }
  }

}
