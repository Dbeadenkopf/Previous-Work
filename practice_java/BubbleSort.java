// this program will implement the Bubblesort algoritm
// the bubble sort algorithm has a runtime of O(n^2) given 
// we must traverse the array twice 

public class Bubblesort{

    public static void bubbleSort(int[] arr){
        int n = arr.length;
        for(int i = 0; i < n - 1; i++){
            for(int j = 0; j < n - i - 1; j++){
                if(arr[j] > arr[j+1]){
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    }

    public static void displayArr(int[] arr){
        int n = arr.length;
        for(int i = 0; i < n; ++i){
            System.out.println(arr[i] + " ");
        }
        System.out.println();
    }



    public static void main(String[] args) {
        int[] arr = { 44, 3, 20, 11, 54, 22};
        bubbleSort(arr);
        System.out.println("Array Sorted: ");
        displayArr(arr);
    }
}
