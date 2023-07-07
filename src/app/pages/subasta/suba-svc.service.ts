import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot, QueryFn, QuerySnapshot } from '@angular/fire/firestore';
import { userI } from 'src/app/shared/model/user.interface';
import { AuthSvcService } from '../auth/auth-svc.service';
import { Observable } from 'rxjs';
import { liveI } from 'src/app/shared/model/live.interface';
import { pujaI } from 'src/app/shared/model/puja.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubaSvcService {
  private usuariosCollection: AngularFirestoreCollection<userI>;
  private liveCollection: AngularFirestoreCollection<liveI>
  private pujasCollection: AngularFirestoreCollection<pujaI>
  private historyPujasCollection: AngularFirestoreCollection<pujaI>
  private uid = 'SrtqnBVrIFKCKKzmjpCh';

  constructor(private readonly afs: AngularFirestore, public afAuth: AuthSvcService) {
    this.usuariosCollection = afs.collection<userI>('users');
    this.liveCollection = afs.collection<liveI>('transmision');
    this.pujasCollection = afs.collection<pujaI>('pujas');
  }

  updateUserPaleta(userId: string, paleta: number): Promise<void> {
    const userDocRef = this.usuariosCollection.doc(userId);
    return userDocRef.update({ paleta })
      .catch(error => {
        console.error('Error updating user paleta:', error);
        throw error;
      });
  }

  updateLiveState(stateLive: boolean): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const transmisionDoc = await this.liveCollection.doc(this.uid).get();
        if (transmisionDoc) {
          const transmisionRef = this.liveCollection.doc(this.uid).ref;
          await transmisionRef.update({ estado: stateLive });
          resolve();
        } else {
          reject("No existe el documento de transmisión.");
        }
      } catch (err) {
        reject(err.message);
      }
    });
  }
  
  updateNotifiedPuja(userId: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const pujaSnapshot = await this.pujasCollection.ref.where('idUser', '==', userId).where('state', '==', true).get();
        const batch = this.afs.firestore.batch();
        pujaSnapshot.forEach(pujaDoc => {
          const pujaRef = this.pujasCollection.doc(pujaDoc.id).ref;
          batch.update(pujaRef, { notified: true });
        });
        await batch.commit();
        resolve();
      } catch (err) {
        reject(err.message);
      }
    });
  }

  public getAllUsers(): Observable<userI[]> {
    this.usuariosCollection = this.afs.collection<userI>('users', p => p.orderBy('paleta', 'asc'));
    return this.usuariosCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as userI;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public getFivePujas(): Observable<pujaI[]> {
    this.pujasCollection = this.afs.collection<pujaI>('pujas', p => p.where('state', '==', true).orderBy('date', 'desc').limit(5)
);
    return this.pujasCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as pujaI;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public getLastPuja(): Observable<pujaI | undefined> {
    return this.afs.collection<pujaI>('pujas', p => p.where('state', '==', true).where('idUser', '==', this.afAuth.usuario.uid))
      .valueChanges({ idField: 'id' })
      .pipe(
        map(pujas => {
          if (pujas.length > 0) {
            return pujas[0];
          } else {
            return undefined;
          }
        })
      );
  }
  

  initializeHistoryPujasCollection(): Observable<pujaI[]> {
    const query: QueryFn = ref => ref.where('idUser', '==', this.afAuth.usuario.uid).orderBy('date', 'desc').limit(40);
    this.historyPujasCollection = this.afs.collection<pujaI>('pujas', query);
    return this.historyPujasCollection.valueChanges();
  }

  getUserById(userId: string): Observable<userI | undefined> {
    return this.usuariosCollection.doc<userI>(userId).valueChanges();
  }
  getLiveById(): Observable<liveI | undefined> {
    return this.liveCollection.doc<liveI>(this.uid).valueChanges();
  }



  onSaveUserInformation(usuario: userI, usId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const date = new Date().getTime();
        const id = usId || this.afs.createId();
        const paleta = 0;
        const emailVerified = true;
        const email = this.afAuth.usuario.email;
        const data = { id, date, paleta, emailVerified, email, ...usuario };
        const result = await this.usuariosCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    })
  }

  onSavePuja(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const date = new Date();
        const hour = new Date().getTime();
        const idUser = this.afAuth.usuario.uid;
        const state = true;
        const win = false;
        const id = this.afs.createId();
        const notified = false;
        const data = { idUser, date, state, hour, win, id, notified };
        const result = await this.pujasCollection.doc(id).set(data); // Utilizamos el ID generado como el ID del documento
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }
  
  getActivePujasCollection(): AngularFirestoreCollection<pujaI> {
    return this.afs.collection<pujaI>('pujas', p => p.where('state', '==', true));
  }
  

  updatePujasFalse(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const pujasCollection = this.getActivePujasCollection(); // Obtener la colección filtrada
        const pujasSnapshot = await pujasCollection.get().toPromise();
        const batch = this.afs.firestore.batch();
        pujasSnapshot.forEach((pujaDoc: QueryDocumentSnapshot<pujaI>) => {
          const pujaRef = pujasCollection.doc(pujaDoc.id).ref; // Utilizar la colección filtrada
          batch.update(pujaRef, { state: false });
        });
        await batch.commit();
        resolve();
      } catch (err) {
        reject(err.message);
      }
    });
  }
  
  

  
  updatePujasState(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const userId = this.afAuth.usuario.uid;
        const pujasSnapshot = await this.getPujasByUserId(userId);
        const batch = this.afs.firestore.batch();
        pujasSnapshot.forEach((pujaDoc: QueryDocumentSnapshot<pujaI>) => {
          const pujaRef = this.pujasCollection.doc(pujaDoc.id).ref;
          batch.update(pujaRef, { state: false });
        });
        await batch.commit();
        resolve();
        this.onSavePuja();
      } catch (err) {
        reject(err.message);
      }
    });
  }

  updatePuja(pujaId: string, data: Partial<pujaI>): Promise<void> {
    const pujaRef = this.afs.collection('pujas').doc(pujaId);
    return pujaRef.update(data);
  }

  getPujasByUserId(userId: string): Promise<QuerySnapshot<pujaI>> {
    return this.pujasCollection.ref.where('idUser', '==', userId).get();
  }

  


}
