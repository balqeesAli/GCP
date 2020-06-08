import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GoogleCloudVisionServiceService } from './../../services/google-cloud-vision-service.service';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private isRecorging: boolean = false;
  private matches: string[] = [];
  // homeArr:any[]=[
  //   {
  //     "img":"../../../assets/shapes.svg",
  //     "name":"iphon 8",
  //     "desc":"arrived in 2019",
  //     "rating":"4",
  //     "cost":"291.8",
  //     "comments":["good product" , "new feature", "High cost"]
  //   },
  //   {
  //     "img":"../../../assets/shapes.svg",
  //     "name":"samsung",
  //     "desc":"from samsung comapny",
  //     "rating":"5",
  //     "cost":"213.323",
  //     "comments":["good product" , "new feature", "High cost"]
  //   },
  //   {
  //     "img":"../../../assets/shapes.svg",
  //     "name":"Pixel 2",
  //     "desc":"from google campany",
  //     "rating":"3",
  //     "cost":"346",
  //     "comments":["good product" , "new feature", "High cost"]
  //   }
  // ];
  selectedfeature: any;
  text: any = "Create an account or log in to Instagram";
  feature: any[] = ["OBJECT_LOCALIZATION", "WEB_DETECTION",
    "LANDMARK_DETECTION", "LABEL_DETECTION",
    "TEXT_DETECTION", "LOGO_DETECTION",
    "FACE_DETECTION", "SAFE_SEARCH_DETECTION",
    "IMAGE_PROPERTIES", "CROP_HINTS",
    "DOCUMENT_TEXT_DETECTION"];


  public base64: any;
  constructor(private camera: Camera,
    private speechRecognition: SpeechRecognition,
    private vision: GoogleCloudVisionServiceService,
    private route: Router,
    public loadingController: LoadingController,
    public alertController: AlertController) {
    //check permission
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });

  }

  ngOnInit() {
  }

  startStop() {
    this.isRecorging = (!this.isRecorging);

    let options = {
      language: "en-US",
      matches: 5
    }

    // Start the recognition process
    this.speechRecognition.startListening(options)
      .subscribe(
        (matches: string[]) => {
          this.matches = matches;
          this.presentAlert(JSON.stringify(matches[0]));
        },
        (onerror) => console.log('error:', onerror)
      )

    // Stop the recognition process (iOS only)
    this.speechRecognition.stopListening()

  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Select one option ',
      message: 'Take Photo or Select from Galary!!!',
      buttons: [
        // {
        //   text: 'Camera',
        //   role: 'camera',
        //   handler: () => {
        //     this.takePhoto();
        //   }
        // },
        {
          text: 'Gallary',
          role: 'gallary',
          handler: () => {
            this.selectPhoto();
          }
        }
      ]
    });
    await alert.present();
  }

  async selectPhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then(async (imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      // alert(JSON.stringify(imageData));
      const loading = await this.loadingController.create({
        message: 'Getting Results...',
        translucent: true
      });
      await loading.present();

      this.sendrequest(imageData);
      loading.dismiss();
    }, (err) => {
      console.log(err)
    })
  }
  async sendrequest(imageData) {
    // this.msg = this.base64+"______" + this.selectedfeature ;
    const loading = await this.loadingController.create({
      message: 'wait',
      spinner: 'bubbles'
    });
    await loading.present();


    this.vision.getLabels(imageData, this.selectedfeature).subscribe((Success) => {
      // this.loadingController.dismiss();
      // alert("request sent");
      // alert(JSON.stringify(Success));
      loading.dismiss();
      let navigationExtras: NavigationExtras = {
        queryParams: {
          base64: imageData,
          feature: this.selectedfeature,
          result: JSON.stringify(Success)
        }
      };
      this.route.navigate(["showcase"], navigationExtras)


    }, (Err) => {
      this.loadingController.dismiss();
      alert(JSON.stringify(Err));
      // alert("Error to send request"+Err.message);
    });

  }

  async sendrequestCNL_Sentiment() {
    const loading = await this.loadingController.create({
      message: 'wait',
      spinner: 'bubbles'
    });
    await loading.present();


    this.vision.CLN_analyzeSentiment_Method(this.text).subscribe((Success) => {
      loading.dismiss();
      // this.presentAlert("request sent");
      // alert(JSON.stringify(Success));
      let navigationExtras: NavigationExtras = {
        queryParams: {
          text: this.text,
          feature: "Sentiment Analyze",
          result: JSON.stringify(Success)
        }
      };
      this.route.navigate(["cln-result"], navigationExtras)


    }, (Err) => {
      this.loadingController.dismiss();
      this.presentAlert("Error to send reguest");
    });

  }

  async sendrequestCNL_Syntax() {
    const loading = await this.loadingController.create({
      message: 'wait',
      spinner: 'bubbles'
    });
    await loading.present();


    this.vision.CLN_analyzeSyntax_Method(this.text).subscribe((Success) => {
      this.loadingController.dismiss();
      // this.presentAlert("request sent");
      // alert(JSON.stringify(Success));
      let navigationExtras: NavigationExtras = {
        queryParams: {
          text: this.text,
          feature: "Syntax Analysis",
          result: JSON.stringify(Success)
        }
      };
      this.route.navigate(["cln-result"], navigationExtras)
    }, (Err) => {
      this.loadingController.dismiss();
      this.presentAlert("Error to send reguest");
    });

  }
  async sendrequestCNL_Entities() {
    const loading = await this.loadingController.create({
      message: 'wait',
      spinner: 'bubbles'
    });
    await loading.present();


    this.vision.CLN_analyzeEntities_Method(this.text).subscribe((Success) => {
      this.loadingController.dismiss();
      // this.presentAlert("request sent");
      // alert(JSON.stringify(Success));
      let navigationExtras: NavigationExtras = {
        queryParams: {
          text: this.text,
          feature: "Entity Analysis ",
          result: JSON.stringify(Success)
        }
      };
      this.route.navigate(["cln-result"], navigationExtras)

    }, (Err) => {
      this.loadingController.dismiss();
      this.presentAlert("Error to send reguest");
    });

  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({

      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}