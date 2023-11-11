package com.example.SimpleCalculator.controller;

import com.example.SimpleCalculator.Model.twoOperCalculator;
import com.example.SimpleCalculator.Model.OneOperCalculator;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin (origins = "http://localhost:4200")
@RequestMapping("/calc")
public class CalculatorController {

    @GetMapping("/twoOper")
    public double solution(
                @RequestParam String leftOperand,
                @RequestParam String binaryOperator,
                @RequestParam String rightOperand
    ) throws Exception {
            double leftNumber;
            double rightNumber;

            try {
                leftNumber = Double.parseDouble(leftOperand);
            }
            catch (NumberFormatException ex) {
                leftNumber = 0;
            }

            try {
                rightNumber = Double.parseDouble(rightOperand);
            }
            catch (NumberFormatException ex) {
                rightNumber = 0;
            }

            twoOperCalculator calculator = new twoOperCalculator(
                    leftNumber,
                    rightNumber,
                    binaryOperator
            );

            double result = calculator.calculateResult();
        return result;
    }
    @GetMapping("/oneOper")
    public double solution(
            @RequestParam String operand,
            @RequestParam String unaryOperator
    ) {
        double leftNumber;

        try {
            leftNumber = Double.parseDouble(operand);
        }
        catch (NumberFormatException ex) {
            leftNumber = 0;
        }

        OneOperCalculator oneoperCalculator = new OneOperCalculator(
                leftNumber,
                unaryOperator
        );

        double result = oneoperCalculator.calculateResult();
        return result;
    }
}
