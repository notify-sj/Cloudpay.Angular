/* eslint-disable @typescript-eslint/no-unused-vars */

import {TestBed, inject, waitForAsync} from '@angular/core/testing';
import {UserService} from './user.service';

describe('Service: App', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService]
        });
    });

    it('should ...', inject([UserService], (service: UserService) => {
        expect(service).toBeTruthy();
    }));
});
