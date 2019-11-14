import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ThirdPartyService {
  
baseUrl='https://api.postalpincode.in/pincode/'
constructor(private http: HttpClient) { }
CityState(PIN:string)
{
return this.http.get(this.baseUrl+PIN)
.pipe(
  map((response:any)=>{
    const citycountry=response;
    if(citycountry){
      console.log(citycountry);
     
    }
  }
  
  )
)

}

}
