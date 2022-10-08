import { Component, Inject ,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../entities/product';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Para estrenar", "Segunda Mano", "Restaurado"];
  productForm !: FormGroup;
  product !: Product;
  actionBtn : String = "Guardar";

  constructor(private formBuilder: FormBuilder, 
    private api:ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<DialogComponent>) { 

  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['',[Validators.required]],
      category: ['',[Validators.required]],
      freshness: ['',[Validators.required]],
      price:['',[Validators.required]],
      comment: ['',[Validators.required]],
      date: ['',Validators.required],
    });

    if(this.editData){
      this.actionBtn = "Actualizar"
      this.productForm.controls['productName'].setValue(this.editData.name);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
    console.log(this.editData);
  }

  addProduct(){
    
    if(!this.editData){
      if(this.productForm.valid){
        let aux = {... this.productForm.value}
        this.product = new Product(aux.productName,aux.category,aux.freshness,aux.price,aux.comment,aux.date);
        this.api.postProduct(this.product)
        .subscribe({
          next: (res) => {
            alert("Producto agregado exitosamente");
            this.productForm.reset();
            this.dialogRef.close('Guardar');
          },
          error: (err) => {
            console.error("Error mientras se agregaba un producto");
          }
        });
      }  
    } else {
      this.updateProduct();
    }
    
  }

  updateProduct(){
    let aux = {... this.productForm.value}
    this.product = new Product(aux.productName,aux.category,aux.freshness,aux.price,aux.comment,aux.date);
    this.api.putProduct(this.product,this.editData.id)
    .subscribe({
      next: (res) => {
        alert("Producto Actualizado exitosamente");
        this.productForm.reset();
        this.dialogRef.close('Actualizar');
      },
      error: () =>{
        alert("Error mientras se actualizaba el producto");
      }
    });
  }

}
