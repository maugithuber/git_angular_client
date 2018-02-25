import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { Like } from '../../models/like';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import {PublicationService} from '../../services/publication.service';
import { LikeService} from '../../services/like.service';

@Component({
    selector: 'timeline',
    templateUrl: './timeline.component.html',
    providers: [UserService, PublicationService,LikeService]
})

export class TimelineComponent implements OnInit{
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

    public loading:boolean;
    public likes;
  
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService:PublicationService,
        private _likeService:LikeService
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.title = 'Timeline';
        this.url = GLOBAL.url;
        this.page =1;

        this.loading = true;
    }
    ngOnInit(){
        console.log('TimelineComponent cargado exitosamente');
        
        this.getPublications(this.page);
    }

    getPublications(page, adding = false){
      
        this._publicationService.getPublications(this.token,page).subscribe(
            response =>{
                if(response.publications){
                    this.loading = false;
                    // console.log(this.publications);
                    // console.log(response.publications);
                    this.total = response.total_items;
                    this.pages = response.pages;
                    this.itemsPerPage =response.items_per_page;
                    this.likes = response.pub_liking;
                    if(!adding){
                        console.log('errorfin');
                        this.publications = response.publications;
                    }else{
                       
                        var arrayA = this.publications;
                        console.log(arrayA);
                        var arrayB = response.publications;
                        console.log(arrayB);
                        this.publications = arrayA.concat(arrayB);
                        

                        if(this.publications.length == this.total){
                            this.noMore = true;
                            console.log('fin');
                            console.log(this.publications.length);
                            console.log(this.total);
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
        console.log('logintud'); 
        console.log(this.publications.length);
        console.log(this.total);
        if(this.publications.length == this.total  ){
            this.noMore = true;
            console.log('fin-viewmore');
            console.log(this.publications.length);
            console.log(this.total);
        }else{
            this.page += 1;
            this.getPublications(this.page,true);  
        }
        
    }

    refresh(event = null){
        // console.log(event);
        this.getPublications(1);
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
                console.log('vista-delete');
                console.log(this.publications.length);
                console.log(this.total);
                this.refresh();
                // this.getPublications(1);
                // this._router.navigate(['/perfil',this.identity._id]);
            },
            error =>{
                console.log(<any>error);
            }
        );
    }








    public likePubOver;
    mouseEnter(pub_id){
        this.likePubOver=pub_id;
    }

    
    mouseLeave(pub_id){
        this.likePubOver=0;
    }



    likePub(liked){
        var like = new Like('',this.identity,liked);
        this._likeService.addLike(this.token,like).subscribe(
            response =>{
                if(!response.like){
                    this.status = 'error';
                }else{
                    this.status = 'success';
                     this.likes.push(liked);
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

    unlikePub(pub){
        this._likeService.deleteLike(this.token,pub).subscribe(
            response =>{
                var search = this.likes.indexOf(pub);

                if(search != -1){
                    this.likes.splice(search,1);
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

}
