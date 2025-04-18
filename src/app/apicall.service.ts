import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {HttpClient,HttpParams} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  url="https://api.doyoursurvey.com:3009/atlas/getAtlasData"
  urlforhistorical="https://api.doyoursurvey.com:3009/atlas/gethistoricalAtlasData"
  url2="https://api.doyoursurvey.com:3009/atlas/filterData"
  UrlForFilterHistorical="https://api.doyoursurvey.com:3009/atlas/historicalfilterData"
  url3="http://52.66.181.209:8000/getapi/"
  url4="https://api.doyoursurvey.com:3009/atlas/getAtlasData"
  // old data api 
  // url5 ="http://52.66.181.209:8000/internalupdateapi/"
  url6="https://api.doyoursurvey.com:3009/atlas/getAtlasOldData"

  constructor(private http:HttpClient) { }

  
  getData(params:any){
    const queryparams = new HttpParams({fromObject :params})
    
    return this.http.get(this.url,{params:queryparams})
    
  }
  getHistoricalData(params:any){
    const queryparams = new HttpParams({fromObject :params})
    
    return this.http.get(this.urlforhistorical,{params:queryparams})
    
  }
 
  getfilteredData(data:any){
    
    return this.http.post(this.url2,data)
    
  }
  getfilteredHistoricalData(data:any){
    
    return this.http.post(this.UrlForFilterHistorical,data)
    
  }
  updateData(data:any){

    return this.http.post("https://api.doyoursurvey.com:3009/atlas/updateData",data);
  }

  updateHistoricalData(data:any){

    return this.http.post("https://api.doyoursurvey.com:3009/atlas/historicalupdateData",data);
  }



  // Old Data Api
  getOldData(params:any){
    const queryparams = new HttpParams({fromObject :params})
    
    return this.http.get(this.url6,{params:queryparams})
    
  }
  // All Data Api
  // allData(params:any){
  //   const queryparams = new HttpParams({fromObject :params})
    
  //   return this.http.get(this.url4,{params:queryparams})
    
  // }

  // updateAll Data
  updateOldData(data:any){

    return this.http.post("https://api.doyoursurvey.com:3009/atlas/updateOldData",data);
  }
  // getScoring(){
  //   return this.http.get("http://52.66.181.209:8000/getscoring/")
  // }
}
