import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LogService} from '@services/common/log.service';
import {AppConstants} from '@constants/app.constants';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    private baseUrl: string;
    private httpOptions: { headers: HttpHeaders };

    constructor(protected http: HttpClient,
                protected logger: LogService,
                protected prefix: string) {
        this.http = http;
        this.httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        // prefix of the controller that will call.
        let txtPrefix = '/';
        txtPrefix = txtPrefix.concat(prefix);
        // construct the url with the parameters of the services.
        // if not exist will be direct the path.
        this.baseUrl = AppConstants.SERVICE_ID + (prefix ? txtPrefix : '');
    }

    /**
     * metodo GET
     * @param {?} url
     * @return {?}
     */
    get(url): Observable<any> {
        this.log(`call GET url:${url}`);
        return this.http.get(`${this.baseUrl}${url}`, this.httpOptions)
            .pipe(tap(_ => this.log(`fetched url:${url}`)), catchError(this.handleError('method get', [])));
    }

    /**
     * metodo POST
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    post(url, body): Observable<any> {
        this.log(`call POST url:${url}`);
        return this.http.post(`${this.baseUrl}${url}`, body, this.httpOptions)
            .pipe(tap(_ => this.log(`fetched url:${url}`)), catchError(this.handleError('method post', [])));
    }

    /**
     * metodo PUT
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    put(url, id, body): Observable<any> {
        this.log(`call PUT url:${url}`);
        return this.http.put(`${this.baseUrl}${url}/${id}`, body, this.httpOptions)
            .pipe(tap(_ => this.log(`fetched url:${url}/${id}`)),
                catchError(this.handleError('method put', [])));
    }
    /**
     * metodo DELETE
     * @param {?} url
     * @param {?=} body
     * @return {?}
     */
    delete(url, body): Observable<any> {
        this.log(`call DELETE url:${url}`);
        return this.http.delete(`${this.baseUrl}${url}`, body)
            .pipe(tap(_ => this.log(`fetched url:${url}`)), catchError(this.handleError('method delete', [])));
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @protected
     * @template T
     * @param {?=} operation - name of the operation that failed
     * @param {?=} result - optional value to return as the observable result
     * @return {?}
     */
    handleError(operation = 'operation', result) {
        return (error) => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            // return of(result as T);
            return observableThrowError(error);
        };
    }

    /**
     * Log a message
     * @protected
     * @param {?} message
     * @return {?}
     */
    log(message) {
        console.log(`${this.constructor.name} : ${message}`);
    }
}
