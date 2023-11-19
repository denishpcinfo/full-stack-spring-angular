import { Component, OnInit } from '@angular/core';
import {Book} from "../../models/book.model";
import {AuthenticationService} from "../../services/authentication.service";
import {BookService} from "../../services/book.service";
import {PurchaseService} from "../../services/purchase.service";
import {Purchase} from "../../models/purchase.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bookList: Array<Book> = [];
  errorMessage: string = "";
  infoMessage: string = "";

  constructor(private authenticationService: AuthenticationService,
              private bookService: BookService,
              private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(data => {
      this.bookList = data;
    })
  }

  purchase(item: Book) {
    if (!this.authenticationService.currentUserValue?.id) {
      this.errorMessage = 'Você deve fazer login para fazer pedido livro!';
      return;
    }

    const purchase = new Purchase(this.authenticationService.currentUserValue.id, item.id, item.price);

    this.purchaseService.savePurchase(purchase).subscribe(data => {
      this.infoMessage = 'Pedido realizado!';
    }, err => {
      this.errorMessage = 'Ocorreu um erro inesperado.';
      console.log(err);
    });
  }

}
