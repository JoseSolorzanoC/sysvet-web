import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     * Constructor
     */
    constructor(private _authService: AuthService) {}

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // Response
        return next
            .handle(
                this.addAuthenticationToken(req, this._authService.accessToken)
            )
            .pipe(
                catchError((error) => {
                    // Catch "401 Unauthorized" responses
                    if (
                        error instanceof HttpErrorResponse &&
                        error.status === 401
                    ) {
                        // Sign out
                        this._authService.signOut();

                        // Reload the app
                        location.reload();
                    }

                    return throwError(error);
                })
            );
    }

    addAuthenticationToken(request: HttpRequest<any>, token): any {
        return request.clone({
            setHeaders: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Authorization: `Bearer ${token}`,
            },
        });
    }
}
