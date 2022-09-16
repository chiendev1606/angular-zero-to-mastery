import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {IUser} from "../models/user.model";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable, of} from "rxjs";
import {delay, map, filter, switchMap} from 'rxjs/operators'
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private redirect = false;
  userCollection: AngularFirestoreCollection<IUser>;
  isAuthenticated$: Observable<boolean>;
  isAuthenticatedWithDelay$: Observable<boolean>;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore, private router: Router, private activeRoute: ActivatedRoute) {
    this.userCollection = db.collection('users')
    this.isAuthenticated$ = auth.user.pipe(map(user => !!user))
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(1000))
    router.events.pipe(filter(e => e instanceof NavigationEnd), map(e => this.activeRoute.firstChild), switchMap(route => route?.data ?? of({}))).subscribe((data) => {
      this.redirect = data.authOnly ?? false
    })
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

  async login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout($event: Event) {
    $event.preventDefault();
    await this.auth.signOut()
    if (this.redirect) {
      await this.router.navigateByUrl('/');
    }
  }

}
