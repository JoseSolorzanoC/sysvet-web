import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector: 'app-mi-informacion',
    templateUrl: './mi-informacion.component.html',
    styleUrls: ['./mi-informacion.component.scss'],
})
export class MiInformacionComponent implements OnInit {
    user: any;
    constructor(private userService: UserService) {
        this.userService.user$.subscribe((res) => {
            this.user = res;
            console.log(this.user);
        });
    }

    ngOnInit(): void {}
}
