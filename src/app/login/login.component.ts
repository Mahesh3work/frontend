import { Component,OnInit } from '@angular/core';
import {MatModule} from '../appModules/mat/mat.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [MatModule, ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm ! : FormGroup;
  constructor(private fb: FormBuilder,private router: Router,private authService: AuthService){}
   ngOnInit(): void {
     this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['',[Validators.required]],
     });
   }
onSubmit() {
  if (this.loginForm.valid) {
    const { name, password } = this.loginForm.value;
    
        this.authService.login(name,password).subscribe(
        (response) => {
          this.authService.accessToken = response.access_token;
          this.authService.refreshToken = response.refresh_token;
          this.authService.username = response.username;
          this.authService.role = response.role_name;
          this.authService.isLoggedIn = true;
          localStorage.setItem('user_role', response.role_name);
          localStorage.setItem('username', response.username);
          // this.loading = false; // Stop loading spinner
          this.router.navigate(['/dashboard']); // Navigate to dashboard
        },
        (error) => {
          if (error.status === 401){
            // console.error('Login failed:', error.message);\
            this.loginForm.get('username')?.setValue('')
            this.loginForm.get('password')?.setValue('')// Clear password field
            // this.loading = false; // Stop loading spinner
            alert(error.error.message);
          } else {
            console.error('Something went wrong:', error.message);
            this.loginForm.get('password')?.setValue(''); // Clear password field
            this.loginForm.get('username')?.setValue(''); // Clear username field
            // this.loading = false; // Stop loading spinner
            if (error.error.message) {
              alert(error.error.message);
            } else {
              alert('Something went wrong. Please try again later.');
            } 
          }
        }
      );
  
  }
}
  onSingUp() {
    this.router.navigate(['/signup']);
  }

}
