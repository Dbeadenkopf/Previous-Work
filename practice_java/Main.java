import java.util.*;
import java.io.*;
import java.util.Scanner;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.StringTokenizer;
import java.math.BigInteger;
import java.io.BufferedReader;









public class Main{


    // lets learn hashmapping


    static int myMethod(int a, int b){
      return a+b;
    }


    static int Difference(int a, int b){
      return (a - b);
    }
    public static void main(String[] args) {
      int num1 = 24;
      int num2 = 34;
      
      int num3 = myMethod(num1,num2);
      int num4 = Difference(num1,num2);
    
      System.out.println("The sum of the numbers is: " + num3);
      System.out.println("The difference of the numbers is: "+  num4);



    }
}
