import { Component, OnInit ,Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import {PublicationService} from '../../services/publication.service';

@Component({
    selector: 'publications',
    templateUrl: './publications.component.html',
    providers: [UserService, PublicationService]
})

export class PublicationsComponent implements OnInit{
    public title:string;
    public publication:Publication;
    public identity;
    public token;
    public status:string;
    public url:string;
    public page;
    public total;
    public pages;
    public itemsPerPage;
    public publications: Publication[];
    public showImage;

    @Input() user:string;
    
  
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService:PublicationService,
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.title = 'Publicaciones';
        this.url = GLOBAL.url;
        this.page =1;
    }
    ngOnInit(){
        console.log('Publications.component cargado exitosamente');
        this.getPublications(this.user,this.page);
    }

    getPublications(user ,page, adding = false){
      
        this._publicationService.getPublicationsUser(this.token,user,page).subscribe(
            response =>{
                if(response.publications){

                    // console.log(this.publications);
                    // console.log(response.publications);
                    this.total = response.total_items;
                    this.pages = response.pages;
                    this.itemsPerPage =response.items_per_page;

                    if(!adding){
                        this.publications = response.publications;
                    }else{
                        var arrayA = this.publications;
                        var arrayB = response.publications;
                        this.publications = arrayA.concat(arrayB);


                        if(this.publications.length == this.total){
                            this.noMore = true;
                        }
                        
                        $("html,body").animate( {scrollTop: $('html').prop('scrollHeight')} , 500);//scroll para abajo con JQUERY
                    }
                 

                    // if(page > this.pages){
                       // this._router.navigate(['/home']);
                    // }
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


    public noMore = false;
    viewMore(){  
        console.log(this.publications.length);
        console.log(this.total);
        if(this.publications.length == this.total ){
            this.noMore = true;
        }else{
            this.page += 1;
            this.getPublications(this.user,this.page,true);  
        }
    }






    refresh(event = null){
        // console.log(event);
        // this.getPublications(1);
        this.getPublications(this.user,1);
    }

    showThisImage(id){
        this.showImage = id; 
    }
    hideThisImage(id){
        this.showImage = 0; 
    }

    deletePublication(id){
        this._publicationService.deletePublication(this.token,id).subscribe(
            response => {
                
                this.refresh();
                // this._router.navigate(['/timeline']);
            },
            error =>{
                console.log(<any>error);
            }
        );
    }
    
}
