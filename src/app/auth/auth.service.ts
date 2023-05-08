import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from "sweetalert2";
import { IUser } from './Models/IUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth : boolean = false;
  private Role : string  = "";
  private authStatusListener = new Subject<{isAuth : boolean, Role : string}>();
  private baseUrl: string;
  
submit = false;

  constructor(private http:HttpClient, private route:Router ) {
      this.baseUrl = environment.API_URL;
   }


   getauthStatusListener()
  {
    return this.authStatusListener.asObservable();
  }

  getisAuth()
  {
    return this.isAuth;
  }

  getRole()
  {
    let token = sessionStorage.getItem('jwtToken');
    if (token)
    {
      let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
      return decodedJWT['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
    return null;
  }
  MoveToLogin()
  {
    this.route.navigateByUrl('/auth/login');
  }

  // User Login
  onLoginUp(userType : string,loginCredential : any)
  {
    const options = {
      withCredentials: true // include credentials in the request
    };

    let apiUrl : string = "/Auth/userlogin";
    if(userType == "Vendor")
		apiUrl = "/Auth/vendorlogin";

    this.http.post<string>(this.baseUrl + apiUrl, loginCredential).subscribe((response) => {
      Swal.fire(
        'Success!',
        'Login is Successful',
        'success'
        )
        // sessionStorage.setItem("email", cred.email);
        sessionStorage.setItem("jwtToken", response["value"]);
        this.isAuth = true;
        this.Role = this.getRole();
        sessionStorage.setItem("Role", this.Role);
        this.authStatusListener.next({isAuth : true, Role : this.Role});
        if(this.Role ===  "User")
        {
          this.route.navigate(['/user/dashboard']);
        }
        else if(this.Role === "Vendor")
        {
          this.route.navigate(['/vendor/dashboard']);
        }
        else
        {
          this.route.navigate(['/']);
          
        }
    },(error) =>{
        Swal.fire(
            'Oops!',
            error.error,
            'error'
          )
        console.log(error);
        this.authStatusListener.next({isAuth : false, Role : ""});
    }
    )

  }

  // SignUp Method
  // Param - UserType(User or Vendor), IUser 
  onSignUp(userType : string, requestCredential : any)
  {
    let apiUrl : string = "/auth/userSignup";
    if(userType === "Vendor")
    {
      apiUrl = "/auth/vendorSignup";

    }
    this.http.post(this.baseUrl + apiUrl, requestCredential , {
      responseType : 'text'
    }).subscribe((data) => {
        Swal.fire("Success","Successfully Signup","success");
        this.route.navigateByUrl('/auth/login');
        console.log(data);
    },(err) => {
        console.error(err.error);
		Swal.fire("Oops!",err.error,"error");
    }
    )
  }


  onLogout()
  {
    sessionStorage.clear();
    this.isAuth = false;
    this.Role = "";
    this.authStatusListener.next({isAuth : false, Role : ""});
    this.route.navigate(['/auth/login']);
  }


  getProvidedServices()
  {
    return this.http.get<[]>(this.baseUrl + "/event/services");
  }


  autoAuthUser()
  {
    const token = sessionStorage.getItem("jwtToken");
    if(token !== null)
    {
      this.isAuth = true;
      this.Role = this.getRole();
      this.authStatusListener.next({isAuth : true, Role : this.Role});
    }
    else
    {
      this.onLogout();
    }
  }

  autoTimeComplete()
  {
    this.http.get(this.baseUrl + "/event/update/timeComplete").subscribe((response) => {
      console.log(response);
    }, (error)=> {
      console.error(error);
    })
  }

}
