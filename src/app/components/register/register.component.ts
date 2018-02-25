import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService} from '../../services/user.service';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [UserService]            //cargamos los servicios
})

export class RegisterComponent implements OnInit{
    public title:string;
    public user:User;
    public status:string;

    constructor( 
        //propiedades privadas
        private _route:ActivatedRoute,
        private _router:Router,
        private _userService:UserService
    ){
        this.title = 'Registro';
        this.user = new User("","","","", "", "", "ROLE_USER", "", "");
    }
    ngOnInit(){
        console.log('componente de register cargado');
    }

    onSubmit(form){
        this._userService.register(this.user).subscribe(
            response => {
                if(response.user && response.user._id){
                    // console.log(response.user);
                    this.status = 'success';
                    form.reset();
                }else{
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}
