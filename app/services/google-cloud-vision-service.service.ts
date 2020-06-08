import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GoogleCloudVisionServiceService {
public 
  constructor(public http: HttpClient) {
    ​
      }
    ​
      getLabels(base64Image, feature) {
        
        const body = {
          "requests": [
            {
              "features": [
                {
                  "type": feature,
                  "maxResults": 10
                }],
              "image": {
                "content": base64Image
              }
            }]
        }
    // ​this.http.post('https://vision.googleapis.com/v1/images:annotate?key='+environment.googleVisionAPIKey, body).subscribe((Response)=>{
    // },(Err)=>{
    //   alert("Error from post "+Err.message);
    // });
        return this.http.post('https://vision.googleapis.com/v1/images:annotate?key='+environment.googleVisionAPIKey, body);
      }
// 
// CLNMethod(text, feature) {
        
CLN_analyzeEntities_Method(text) {
        
        const body = {
          "document":{
            "type":"PLAIN_TEXT",
            "language": "EN",
            "content":text
          },
          "encodingType":"UTF8"
        }
        return this.http.post('https://language.googleapis.com/v1/documents:analyzeEntities?key='+environment.googleVisionAPIKey, body);
      }


      
CLN_analyzeSentiment_Method(text) {
        
  const body = {
    "document":{
      "type":"PLAIN_TEXT",
      "language": "EN",
      "content":text
    },
    "encodingType":"UTF8"
  }
  return this.http.post('https://language.googleapis.com/v1/documents:analyzeSentiment?key='+environment.googleVisionAPIKey, body);
}


CLN_analyzeSyntax_Method(text) {
        
  const body = {
    "document":{
      "type":"PLAIN_TEXT",
      "language": "EN",
      "content":text
    },
    "encodingType":"UTF8"
  }
  return this.http.post('https://language.googleapis.com/v1/documents:analyzeSyntax?key='+environment.googleVisionAPIKey, body);
}


      
}
