import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {BestArticlesType} from "../../types/best-articles.type";
import {BlogService} from "../../shared/services/blog.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../shared/services/request.service";
import {RequestType} from "../../types/request.type";
import {DefaultResponseType} from "../../types/default-response.type";
import {Router} from "@angular/router";
import {OrderPopupComponent} from "../../shared/components/order-popup/order-popup.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  articles: BestArticlesType[] | null = [];
  @ViewChild('popup') popup!: TemplateRef<ElementRef>;

  constructor(private bestArticle: BlogService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private router: Router,
              private requestService: RequestService) {}

  ngOnInit(): void {
    this.bestArticle.getBestArticles()
      .subscribe((data: BestArticlesType[]) => {
        if (data) {
          this.articles = data
        }
      })

  }

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    items: 1,
    autoplay: true,
    autoplayTimeout: 4500,
    autoplaySpeed: 1000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    nav: false,

  }

  products = [
    {
      image: 'product_1.png',
      price: 7500,
      url: 'frilans',
      title: 'Создание сайтов',
      text: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
    },
    {
      image: 'product_2.png',
      price: 3500,
      url: 'smm',
      title: 'Продвижение',
      text: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
    },
    {
      image: 'product_3.png',
      price: 1000,
      url: 'target',
      title: 'Реклама',
      text: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
    },
    {
      image: 'product_4.png',
      price: 750,
      url: 'kopiraiting',
      title: 'Копирайтинг',
      text: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
    },
  ];

  customOptionsReviews: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 26,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
    },
    nav: false
  };

  reviews = [
    {
      name: 'Станислав',
      image: 'review1.png',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.',
    },
    {
      name: 'Алёна',
      image: 'review2.png',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.',
    },
    {
      name: 'Мария',
      image: 'review3.png',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!',
    },
    {
      name: 'Вячеслав',
      image: 'review4.jpg',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.',
    },
    {
      name: 'Марина',
      image: 'review5.jpg',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!',    },
    {
      name: 'Яника',
      image: 'review6.jpg',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.',
    },
  ];

  request(){
    this.dialog.open(OrderPopupComponent);
    this.requestService.order = true;
  }
}
