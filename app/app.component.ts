import { Component, OnInit } from '@angular/core';
declare var firebase:  any;
@Component({
    selector: 'hello-world',
    template: 
    `
    <form>
        <input type="text" [(ngModel)]="name" [ngModelOptions]="{standalone : true}">
        <input type="text" [(ngModel)]="planeta" [ngModelOptions]="{standalone : true}">
        <button (click)="fbPostJedi(name,planeta)">Nuevo Jedi</button>              
    </form>
    <ul>
        <li *ngFor="let jedi of jedis"> Nombre: {{ jedi.name }}</li>
    </ul>
    `
})
export class AppComponent implements OnInit {
    jedis = [ ]
    constructor() { }
    ngOnInit() { 
            this.fbgetJedis();
    }
    fbPostJedi(name,planeta) {
        firebase.database().ref('/').push({name: name , planeta : planeta});
    }
    fbgetJedis( ){
        firebase.database().ref('/').on('child_added', (snapshot) => {
            this.jedis.push(snapshot.val())
        })
    }
}