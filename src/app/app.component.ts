import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { JsonService } from './json.service';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelect, MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-interview';
  loading=false;
  locationData: any;
  Data: any;
  Object = Object;
  moment = moment;
  selectedValue = 'country';
  countryName = 'United Kingdom';
  Designation: any={};
  States: any;
  FilterData: any;
  GroupList: any;
  CountryData: any;
  DesignationList: any;
  abcList:string[]=[];
  NewArray: Object[] = [];
  FinalList:any;
  listdata = {};
  stateName="";
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private jsonService: JsonService) {}

  ngOnInit() {
    this.jsonService.getSampleGroupUsers().subscribe((data) => {
      this.FilterData = data;
      this.GroupList = this.groupBy(this.FilterData, 'group');
      this.DesignationList = this.groupBy(this.FilterData, 'designation');
    });
  }

  groupBy(dataToBeGrouped: any, value: string) {
    return _.groupBy(dataToBeGrouped, value);
  }

  availableRoles(Value: any) {
    this.loading=true;
    this.FinalList=[];
    this.jsonService.getLocationDist().subscribe((data) => {
      this.locationData = data;
      this.Data = data;
      this.Data = this.groupBy(data, this.selectedValue);
      this.Data = this.Data[Value];
      this.States = this.groupBy(this.Data, 'state');
      this.Designation = this.groupBy(this.Data, 'designation');

      // for (var state in this.States) {
      //   for (var designation in this.Designation) {
      //     var dict = { state: state, designation: designation, count: 0 };
      //     for (var countrydata in this.Data) {
      //       if (
      //         this.Data[countrydata].designation === designation &&
      //         this.Data[countrydata].state === state
      //       ) {
      //         dict.count = dict.count + 1;
      //       }
      //     }
      //     this.FinalList.push(dict);
      //   }
      // }
      // this.CountryData = this.FinalList;
      // var dict = { state: [{designation: designation, count: 0}]};


      // for (var stateVariable in this.States) {
      //   for (var designation in this.Designation) {
      //     var list = 0;
      //     for (var countrydata in this.Data) {
      //       if (
      //         this.Data[countrydata].designation === designation &&
      //         this.Data[countrydata].state === stateVariable
      //       ) {
      //         list = list + 1;
      //       }
      //     }
      //     this.abcList.push(list);
      //   }
      //   var add={[stateVariable]: this.abcList }
      //   Object.assign(this.FinalList,add);
      //   this.abcList=[];
      // }
      // this.CountryData = this.FinalList;
      // console.log(this.CountryData)

      for (var stateVariable in this.States) {
        this.abcList.push(stateVariable.toString());
        for (var designation in this.Designation) {
          var list = 0;
          for (var countrydata in this.Data) {
            if (
              this.Data[countrydata].designation === designation &&
              this.Data[countrydata].state === stateVariable
            ) {
              list = list + 1;
            }
          }
          this.abcList.push(list.toString());
        }
        this.FinalList.push(this.abcList);
        this.abcList=[];
      }
      this.CountryData = this.FinalList;

      //  this.CountryData=_.forEach(this.States, (value, key)=> {
      //   this.States[key] = _.groupBy(this.States[key], function(item) {
      //     return item.state;
      //   });
      // });
      this.loading=false;
    });
  }

  filterTask(ColoumnType: any, Value: any) {
    this.loading=true;
    this.jsonService.getSampleGroupUsers().subscribe((data) => {
      this.FilterData = data;
      if (ColoumnType === 'group') {
        this.FilterData = this.groupBy(this.FilterData, ColoumnType);
        this.FilterData = this.FilterData[Value];
      } else if (ColoumnType === 'designation') {
        this.FilterData = this.groupBy(this.FilterData, ColoumnType);
        this.FilterData = this.FilterData[Value];
      } else {
        this.FilterData = this.groupBy(this.FilterData, ColoumnType);
        for (var key in this.FilterData) {
          var keyDate = moment.unix(+key).format('DD/MM/YYYY');
          var compareDate = moment(keyDate, 'DD/MM/YYYY');
          var startDate = moment(Value.start, 'DD/MM/YYYY');
          var endDate = moment(Value.end, 'DD/MM/YYYY');
          if (compareDate.isBetween(startDate, endDate)) {
            this.listdata = this.FilterData[key][0];
            this.NewArray.push(this.listdata);
          }
        }
        this.FilterData = this.NewArray;
      }
      this.loading=false;
    });
  }


}
