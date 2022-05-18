import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthService} from "../service/auth.service";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.headers.get("No-Auth") === "True") {
      return next.handle(req.clone());
    } else {
      req = AuthInterceptor.addToken(req, this.authService.getToken());
      return next.handle(req).pipe(
        catchError(
          (error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.router.navigate(['/']);
            } else if (error.status == 403) {
              this.router.navigate(['/forbidden'])
            }
            return throwError("Some thing is wrong");
          }
        )
      );
    }

  }

  private static addToken(request: HttpRequest<any>, token: string | null) {
    return request.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

}
