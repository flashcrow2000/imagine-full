import {ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import { FormControl } from "@angular/forms";
import { UserService } from '../../services/user.service'

import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import {User} from "app/shared/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public addressZoom: number = 14;
  currentUser: User;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private router: Router,
              private ref:ChangeDetectorRef,
              private userService:UserService) { }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser.location_lat) {
      this.latitude = +this.currentUser.location_lat;
      this.longitude = +this.currentUser.location_long;
      this.zoom = this.addressZoom;
    } else {
      //this.setCurrentPosition();
    }


    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = this.addressZoom;
          //this.updateUser()
        });
      });
    });
  }

  useThisLocation() {
    this.updateUser();
  }

  onDoubleClick(ev) {

    /*
    (mapDblClick)="onDoubleClick($event)"
     */

    /*
    even on dbl click: {coords: {…}}

    coords: {
      lat: 45.6637264789677
      lng: 25.57342529296875
    }
     */
    this.latitude = ev.coords.lat;
    this.longitude = ev.coords.lng;
    this.ref.detectChanges();
    //console.log('even on dbl click:', ev);
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = this.addressZoom;
      });
    }
  }

  updateUser() {

    let label:string = this.searchElementRef.nativeElement.value
    if (!label) {
      label = "Unknown address";
    }
    let currentUser:User = this.userService.getCurrentUser();
    currentUser.location_lat = ''+this.latitude;
    currentUser.location_long= ''+this.longitude;
    currentUser.location_label= label;
    this.userService.update(currentUser).subscribe(
      data => {
        this.userService.updateLocalUser(currentUser);
        this.router.navigate(['/profile']);
      },
      error => {
      }
    )
  }
}



