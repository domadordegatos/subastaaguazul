import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';
import { userI } from 'src/app/shared/model/user.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthSvcService {
  public user$: Observable<userI>;
  public usuario:any = {};
  public dataUser:any = {};
  public data$:any ={};
  public correo:any = {};

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore,private route:Router) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<userI>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
      );
      
      this.afAuth.authState.subscribe(dataUser=>{
      if(!dataUser){
        return;
      }
      this.usuario.email = dataUser.email;
      this.usuario.uid = dataUser.uid;
    });

    //this.logout();
  }
  

 public redireccionarLogin(){
  this.afAuth.authState.subscribe(res => {
    if (res && res.uid) {
      this.route.navigate(['/home']);
    }else{
      /* console.log("no haz iniciado"); */
    }
  });
 }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async businessActivate(email: string, password: string): Promise<userI> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async login(email: string, password: string): Promise<userI> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async register(email: string, password: string): Promise<any> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async signInGoogle(): Promise<userI> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      return user;
    } catch (error) {
      console.log('Google login', error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  private updateUserData(user: userI) {
    const userRef: AngularFirestoreDocument<userI> = this.afs.doc(
      `users/${user.id}`
    );

    const data: userI = {
      id: user.id,
      email: user.email,
      emailVerified: user.emailVerified,
    };

    return userRef.set(data, {merge: true});
  }

}
