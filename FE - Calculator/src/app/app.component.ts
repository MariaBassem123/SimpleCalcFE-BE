import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  constructor(private http: HttpClient){}
 
  title = 'SimpleCalcAngular';
  currvalue = ''
  toshow = '0'
  equation = '0'
  result = ''
  equal = 0
  unaryFlag = 0

  unaryOper(oneOperator:string){
    this.unaryFlag = 1
    console.log("ccc",this.currvalue)
    console.log("eq",this.equation)
    if((this.currvalue == '0'||  this.currvalue == '0.0' ||  this.currvalue == '' || this.equation == '0') && oneOperator =='1/x'){
      this.toshow = "E"
      this.result = "E"
    }
    if(oneOperator == '1/x'){
      this.equation += 'i'
    }else if(oneOperator == '√x'){
      this.equation += '√' 
    }else if(oneOperator == 'x²'){
      this.equation += '²' 
    }else if(oneOperator == '%'){
      this.equation += '%' 
    }else{
      this.equation += 's' 
    }
    this.toshow  = this.equation 
    console.log("equation:", this.equation)
    this.split()

  }

  writetoinput(value:string){
    if(this.currvalue == '0' ||this.toshow == "E"){
      this.currvalue = value
      this.result = ''
    }else{
      this.currvalue = this.currvalue + value
    }
    this.toshow = this.currvalue
    this.equation = this.currvalue
    this.split()
  }

  split(){
    let leftOperand =''
    let binaryOperator = ''
    let unaryOperator = ''
    let rightOperand = ''
    let leftFlag = 0
    let rightFlag = 0
    let tmp = ''
    for(var i = 0 ; i < this.equation.length ; i++){
      if (!isNaN(Number(this.equation.charAt(i)))||this.equation.charAt(i) == '.'){
        //if the character is a number
        if(leftFlag ==1 && (binaryOperator !=='' || unaryOperator !== '')){
          rightFlag = 1
          rightOperand += this.equation.charAt(i)
        }else{
          leftFlag = 1
          leftOperand += this.equation.charAt(i)
        }
        //console.log("!!!!!!!!!!")
        //console.log("leftOper" , leftOperand,"rightOper ", rightOperand )
      }else if(isNaN(Number(this.equation.charAt(i)))){
        //operator
        tmp = ''
        let symbol = ''
        tmp += this.equation.charAt(i)
        //console.log("tmp: ",tmp)
//################unary operator################
        if(tmp == 'i' ||tmp == '√'||tmp == '²' || tmp == '%' ||tmp == 's' ){
          let operand ='' 
          
          if(tmp == 'i'){
            unaryOperator = "1/x"

          }else if(tmp == '√'){
            unaryOperator = "√x"
            symbol = tmp 
          }else if(tmp == '²'){
            unaryOperator = "x²"
            symbol = tmp 
          }else if(tmp == '%'){
            unaryOperator = '%' 
            symbol = tmp 
          }else if(tmp == 's'){
            unaryOperator = "+/-" 

          }
          if(rightFlag == 1){
            operand = rightOperand
    
          }else{
            operand = leftOperand
          }
          //console.log("operand: ",operand)
          this.http.get("http://localhost:8080/calc/oneOper",{responseType:'text',observe: 'response',params:{operand, unaryOperator}}).subscribe(
             data=>{
                this.currvalue = ''
                this.currvalue = this.toshow.substring(0,this.toshow.lastIndexOf(operand)) + data.body as string 
                this.result = data.body as string
                //this.toshow += symbol 
                console.log("unary to show", this.toshow)
                this.equation = this.currvalue
                leftOperand = ''
                rightOperand = ''
            }
            );
        }else{
//################binary operator################
          if(leftFlag ==1 && rightFlag ==1){
            leftFlag = 0
            rightFlag = 0
            this.http.get("http://localhost:8080/calc/twoOper",{responseType:'text',observe: 'response',params:{leftOperand, binaryOperator, rightOperand}}).subscribe(
             data=>{ 
              
                leftOperand = this.toshow
                if(tmp =='='){
                  this.toshow += '='
                }
                this.equation = data.body as string + binaryOperator
                this.currvalue = data.body as string + binaryOperator
                this.result = data.body as string;
                leftOperand = ''
                rightOperand = ''
                
            }
            );

          }
          if(tmp !=='=')
            binaryOperator = tmp
          else 
            binaryOperator = ''
        }
      }
  }
  
  console.log("toshow", this.toshow)
}

  equals(){
    this.equation += '='
    //console.log("equation: ", this.equation)
    this.split()
    
  }

  clear(){
    this.currvalue = ''
    this.toshow = '0'
    this.result = ''
  }

  back(){
    this.currvalue = this.currvalue.slice(0,-1)
    if(this.currvalue ==''){
      this.currvalue = '0'
    }
    this.toshow = this.currvalue
  }


  changeSign(){
    //this.toshow.split(,this.toshow.length-1)
}
}
