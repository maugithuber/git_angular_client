import { Component, OnInit, DoCheck, EventEmitter, Input, Output } from '@angular/core';  //agregar el OnInit, DoCheck
import { Router,ActivatedRoute,Params } from '@angular/router'
import { UserService } from './services/user.service';
import { UploadService } from './services/upload.service';
import { GLOBAL } from './services/global';
import {Publication} from './models/publication';
import {PublicationService} from './services/publication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService,PublicationService,UploadService]
})

export class AppComponent implements OnInit, DoCheck{  //implementar OnInit, DoCheck
  public title:string;
  public identity;
  public url:string;
  public token;
  public status;
  public publication:Publication;

  constructor(
    private _route:ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _publicationService:PublicationService,
    private _uploadService:UploadService,    
  ){
    this.title = 'ISAGRAM';
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    // this.token = this._userService.getToken();
    this.publication = new Publication("","","","","");
  }
        // output 
        @Output() sended = new EventEmitter();


  ngOnInit(){
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    console.log(this.identity);
  }

  ngDoCheck(){  //funcion para que se refresque automaticamente
    this.identity = this._userService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }





  onSubmit(form, $event){ 
    // this.token = this._userService.getToken();
    // this.identity = this._userService.getIdentity();
    // this.publication = new Publication("","","","",this.identity._id);
    console.log(this.publication);
    this._publicationService.addPublication(this.token, this.publication).subscribe(
        response =>{
            if(response.publication){
                // this.publication = response.publication;

                if(this.filesToUpload && this.filesToUpload.length){
                //subir imagen
                    this._uploadService.makeFileRequest(this.url+'upload-image-publication/'+response.publication._id,[],
                    this.filesToUpload,this.token,'image').then((result:any)=>{
                            this.publication.file=result.image;
                            this.status= 'success';
                            form.reset();
                            this._router.navigate(['timeline']);
                            this.sended.emit({send:'true'});
                    });
                }else{

                    this.status= 'success';
                    form.reset();
                    this._router.navigate(['/timeline']);
                    this.sended.emit({send:'true'});
                }



            }else{
                this.status = 'error';
            }
        },
        error =>{
            var errorMessage = <any>error;
            console.log(errorMessage);
            if(errorMessage != null){
                this.status = 'error';
            }
        }
    );

}  


public filesToUpload:Array<File>;
fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
}




}
