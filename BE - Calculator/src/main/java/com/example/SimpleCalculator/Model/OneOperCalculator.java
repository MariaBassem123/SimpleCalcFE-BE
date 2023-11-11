package com.example.SimpleCalculator.Model;

public class OneOperCalculator {
    private double leftOperand;
    private String operator;

    public OneOperCalculator(double leftOperand,String operator) {
        this.leftOperand = leftOperand;
        this.operator = operator;
    }
    public double getLeftOperand() {
        return leftOperand;
    }
    public void setLeftOperand(double leftOperand) {
        this.leftOperand = leftOperand;
    }
    public String getOperator() {
        return operator;
    }
    public void setOperator(String operator) {
        this.operator = operator;
    }

    public double calculateResult() {
        double result = 0;

        switch(this.operator) {
            case "1/x":
                result = 1 / this.leftOperand;
                break;
            case "√x":
                result = Math.sqrt(this.leftOperand);
                break;
            case "x²":
                result = Math.pow(this.leftOperand,2);
                break;
            case "%":
                result = this.leftOperand / 100;
                break;
            case "+/-":
                result = this.leftOperand * -1;
                break;
            default:
                result = 0;

        }
        return result;
    }
}
