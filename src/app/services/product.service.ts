import {Injectable} from '@angular/core';
import {BaseService} from '@services/common/base.service';
import {HttpClient} from '@angular/common/http';
import {LogService} from '@services/common/log.service';
import {AppConstants} from '@constants/app.constants';
import {Observable} from 'rxjs';
import {Product} from '@vo/Product';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService extends BaseService {

    constructor(
        protected http: HttpClient,
        protected logger: LogService
    ) {
        super(http, logger, AppConstants.SERVICE_PREFIX.PRODUCT);
    }

    getProduct(id): Observable<Product> {
        return this.get(`/${id}`);
    }

    addProduct(product): Observable<Product> {
        return this.post('/', product);
    }

    updateProduct(id, product): Observable<any> {
        return this.put('/', id, product);
    }

    deleteProduct(id): Observable<Product> {
       return this.delete('/', id);
    }
}
