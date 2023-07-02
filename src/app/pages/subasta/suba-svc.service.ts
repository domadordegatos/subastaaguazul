import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { userI } from 'src/app/shared/model/user.interface';
import { AuthSvcService } from '../auth/auth-svc.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { liveI } from 'src/app/shared/model/live.interface';

@Injectable({
  providedIn: 'root'
})
export class SubaSvcService {
  userOne: Observable<userI[]>
  private usuariosCollection: AngularFirestoreCollection<userI>;
  private liveCollection: AngularFirestoreCollection<liveI>
  public viewUser:any = this.afAuth.usuario;

  constructor(private readonly afs: AngularFirestore, public afAuth:AuthSvcService) { 
    this.usuariosCollection = afs.collection<userI>('users', p=> p.orderBy('date','desc'));
    this.liveCollection = afs.collection<liveI>('transmision');
  }

/*   getUserById(email: string): Observable<userI | undefined> {
    console.log("llegando al svc", email);
    return from(
      this.userOneCollection
        .ref
        .where('email', '==', email)
        .get()
    ).pipe(
      map(snapshot => {
        if (snapshot.empty) {
          return undefined;
        } else {
          const data = snapshot.docs[0].data();
          const id = snapshot.docs[0].id;
          return { id, ...data } as userI;
        }
      })
    );
  } */

  getUserById(userId: string): Observable<userI | undefined> {
    return this.usuariosCollection.doc<userI>(userId).valueChanges();
  }
  getLiveById(): Observable<liveI | undefined> {
    const uid = 'SrtqnBVrIFKCKKzmjpCh';
    return this.liveCollection.doc<liveI>(uid).valueChanges();
  }

  onSaveUserInformation(usuario:userI,usId:string):Promise<void>{
    return new Promise( async (resolve, reject) => {
      try{
        const date = new Date().getTime();
        const id = usId || this.afs.createId();
        const paleta = 0;
        const emailVerified = true;
        const email = this.afAuth.usuario.email;
        const data = {id,date,paleta,emailVerified,email, ...usuario};
        const result = await this.usuariosCollection.doc(id).set(data);
        resolve(result);  
      }catch(err){
         reject(err.message);
      }
    })
  }
}
