import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IUser} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) { }

 async createUser(userData: IUser){
   try {
     await this.auth.createUserWithEmailAndPassword(userData.email, userData.password)
     await this.db.collection('users').add(userData)
     return true;
   } catch (e) {
     console.error(e);
     return false;
   }
 }
}
