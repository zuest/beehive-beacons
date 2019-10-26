import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { IScrollTab, ScrollTabsComponent } from '../../components/scrolltabs';
import { EstimoteBeacons } from '@ionic-native/estimote-beacons';
import { IBeacon } from '@ionic-native/ibeacon';
import { Platform } from 'ionic-angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HelperServiceProvider} from "../../providers/helper-service/helper-service";

declare var evothings:any;



@IonicPage()
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
    driver:any = "mohammed";
    carType:any = "Toyota";
    plateno:any = "1305";
    pickingPoint:any = "G2";
 beconeDistance:any;
  beconeDt:any;

constructor(private eb: EstimoteBeacons,private ibeacon: IBeacon,private change: ChangeDetectorRef,public plt: Platform,private httpClient: HttpClient,private helper:HelperServiceProvider) {
console.log("becone dist",this.beconeDistance);
}

  ionViewDidEnter() {
    // Only called once on first enter.
    // Not called on navigation back from second page.
    this.start();
  }

  start(){
    console.log("in start method:");
    this.plt.ready().then((readySource) => {
      console.log("platform ready:");
      evothings.eddystone.startScan((beaconData) => {


        setTimeout(() => {
          if (!this.helper.methodisRun) {
            console.log("method is running now.")
          }
          else {
            this.helper.methodisRun = true;
            console.log("method stoped.");
          }
        },2000);


        console.log("in eddystone");
        console.log(beaconData);
        this.beconeDt = beaconData;
        var distance = evothings.eddystone.calculateAccuracy(
          beaconData.txPower, beaconData.rssi);
        this.beconeDistance = parseFloat(distance)*10;
        if (isNaN(this.beconeDistance)) {
          this.beconeDistance = 0.85+ "  Metres";
        }
        else {
          this.beconeDistance = (this.beconeDistance.toString().substring(0,3)) + "  Metres";
          this.SendToserver();
        }


        setTimeout(() => {
          this.change.detectChanges();
        },2000);
        console.log("distance: ",distance);
      })

  });
  }

  SendToserver(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

      if (this.helper.methodisRun==null) {
        console.log("isrun: ",this.helper.methodisRun);
        console.log("method is running now.");
        this.helper.methodisRun = true;
        let id = {
          "id": "tick"+Math.floor((Math.random() * 100) + 1)
        };

        this.httpClient.post('https://cors-anywhere.herokuapp.com/http://codecamp.albarakaexperts.com/Home/ReciveBeacon', id, httpOptions)
          .subscribe(data => {
            this.helper.responseFromServer = data['Message'];
          }, error => {
            console.log(error);
          });
      }
      else {
        this.helper.methodisRun = true;
        console.log("method stoped.")
      }



  }

}
