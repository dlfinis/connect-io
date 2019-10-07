import {Injectable} from '@angular/core';
import {BaseService} from '@services/common/base.service';
import {HttpClient} from '@angular/common/http';
import {LogService} from '@services/common/log.service';
import {AppConstants} from '@constants/app.constants';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService extends BaseService {

    constructor(
        protected http: HttpClient,
        protected logger: LogService
    ) {
        super(http, logger, AppConstants.SERVICE_PREFIX.HELLO);
    }

    /** Test Connection */
    testHello() {
        this.getHello().subscribe(response => {
            this.logger.debug(response);
        });
    }

    /**
     * Obtener un get desde el servidor.
     */
    getHello(): Observable<any> {
        return this.get('/get');
    }

    /**
     * Obtener respuesta de post del servidor.
     * @param content
     */
    postHello(content: object): Observable<any> {
        return this.post('/post', { '{content}': content });
    }
}
