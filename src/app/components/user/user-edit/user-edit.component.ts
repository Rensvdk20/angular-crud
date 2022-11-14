import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
        this.id = this.route.snapshot.params['id'];
    }

}
