// lets practice our index out of bounds exception
import java.util.*;

public class Exception_Example{
  public static void main(String[] args)throws IndexOutOfBoundsException {
    try{
      int[] arr = {1, 2, 3, 4, 5};
      for(int i = 0; i <= arr.length;i++){
        System.out.println(arr[i] + " ");
      }
    }catch(IndexOutOfBoundsException e){
      System.out.println("Error! " + e.getMessage());
    }
  }
}
