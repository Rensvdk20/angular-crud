import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
    id : number = 0;

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
        });
    }

}
