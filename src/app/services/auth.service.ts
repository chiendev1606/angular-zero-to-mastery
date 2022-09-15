import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IUser} from "../models/user.model";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { Observable} from "rxjs";
import {map,delay} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userCollection: AngularFirestoreCollection<IUser>;
  isAuthenticated$: Observable<boolean>;
  isAuthenticatedWithDelay$: Observable<boolean>;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.userCollection = db.collection('users')
    this.isAuthenticated$ = auth.user.pipe(map(user => !!user))
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(1000))

  }

  async createUser(userData: IUser) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(userData.email, userData.password);

      if (!userCredential.user?.uid) throw new Error('user not be found');

      await this.userCollection.doc(userCredential.user?.uid).set({
        name: userData.name,
        email: userData.email, age: userData.age, password: userData.password, phoneNumber: userData.phoneNumber
      })

      await userCredential.user.updateProfile({displayName: userData.name})

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

}
