// we are going to practice programming with a stack 
import java.util.Stack;

public class Stacks{

    public static void main(String[] args) {
        Stack<String> produce = new Stack<String>();
        produce.push("Apple");
        produce.push("Banana");
        produce.push("Melon");

        System.out.println("Here is a peek of your stack: " + produce.peek());
        produce.pop();
        System.out.println("Here is your stack: " + produce);
        
    }
}