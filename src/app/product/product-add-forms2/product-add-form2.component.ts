import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-product-add-form2',
  templateUrl: './product-add-form2.component.html',
  styleUrls: ['./product-add-form2.component.css'],
  providers: [CategoryService,ProductService]
})
export class ProductAddForm2Component implements OnInit {

  constructor(private formBuilder: FormBuilder, 
    private categoryService: CategoryService,
    private productService:ProductService,
    private alertifyService:AlertifyService) { }


  productAddForm: FormGroup;
  product: Product = new Product();
  categories: Category[];

  createProductAddForm() {
    this.productAddForm = this.formBuilder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      imageUrl: ["", Validators.required],
      price: ["", Validators.required],
      categoryId: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.createProductAddForm();
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data
    })
  }

  add() {
    if (this.productAddForm.valid) {
      this.product = Object.assign({}, this.productAddForm.value)
      }
      this.productService.addProduct(this.product).subscribe(data=>{
        this.alertifyService.success(data.name+" başarıyla eklendi.")
      })
    }
  }


