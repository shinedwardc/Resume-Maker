import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Auth,
  browserLocalPersistence,
  browserPopupRedirectResolver,
  connectAuthEmulator,
  getRedirectResult,
  GoogleAuthProvider,
  initializeAuth,
  inMemoryPersistence,
  signInWithRedirect,
  signOut,
  User as Fuser,
  UserCredential,
} from 'firebase/auth';
import { from, mergeMap, Observable, throwError } from 'rxjs';
import { type User } from 'shared';
import { environment } from 'src/environments/environment';

/**
 * Feel free to add more elements to the user, and put them in sub objects for organization
 * But make sure to update `backend/src/server.ts`
 */

export interface Content {
  name: any;
  email: any;
  subject: any;
  message: any;
}

const ROUTE = '/api/v1';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _firebase: FirebaseApp; // firebase will handle both storing and obtaining credentials
  private readonly _auth: Auth;
  private readonly _googleProvider: GoogleAuthProvider;

  constructor(private router: Router, private http: HttpClient) {
    // These identifiers are not secrets
    this._firebase = initializeApp(environment.firebase);
    this._auth = initializeAuth(this._firebase, {
      persistence: [browserLocalPersistence, inMemoryPersistence],
      popupRedirectResolver: browserPopupRedirectResolver,
    });
    if (environment.firebaseEmulator === true) {
      connectAuthEmulator(this._auth, 'http://localhost:9099');
    }
    // uncomment when using the firebase emulator
    this._googleProvider = new GoogleAuthProvider();
    this._googleProvider.addScope('profile');
    this._googleProvider.addScope('email');
  }

  public loggedInState(): Observable<Fuser | null> {
    const auth = this._auth;
    return new Observable((subscriber) => {
      auth.onAuthStateChanged(subscriber);
    });
  }
  public getUser(): Observable<User> {
    const user = this._auth.currentUser;
    if (user === null) {
      return throwError(() => new Error("User isn't logged in"));
    }
    return from(user.getIdToken()).pipe(
      mergeMap((token) => {
        return this.http.get<User>(ROUTE + `/user/${user.uid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
    );
  }
  public updateUser(changes: Partial<User>): Observable<User> {
    const user = this._auth.currentUser;
    if (user === null) {
      return throwError(() => new Error("User isn't logged in"));
    }
    return from(user.getIdToken()).pipe(
      mergeMap((token) => {
        return this.http.put<User>(ROUTE + `/user/${user.uid}`, changes, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
    );
  }
  /**
   * Feel free to rewrite its only for testing
   */
  public makeUser(user: User): Observable<User> {
    if (this._auth.currentUser === null) {
      throw new Error('Unauthorized');
    }
    return from(this._auth.currentUser.getIdToken()).pipe(
      mergeMap((token) => {
        return this.http.post<User>(ROUTE + '/user', user, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
    );
  }

  public async login() {
    await signInWithRedirect(this._auth, this._googleProvider);
  }
  public async logout() {
    return await signOut(this._auth).then(() => {
      return this.router.navigate(['/']);
    });
  }
  public async checkLoginResult(): Promise<UserCredential | null> {
    return getRedirectResult(this._auth);
  }

  public sendMessage(content: Content): Observable<Content> {
    console.log(content);
    if (this._auth.currentUser === null) {
      throw new Error('Unauthorized');
    }
    return from(this._auth.currentUser.getIdToken()).pipe(
      mergeMap((token) => {
        return this.http.post<Content>(ROUTE + '/send', content, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
    );
    //return this.http.post<Content>(ROUTE + "/send", content)
  }
}
