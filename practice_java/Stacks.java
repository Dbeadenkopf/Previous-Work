// we are going to practice programming with a stack 
import java.util.Stack;

public class Stacks{

    public static void main(String[] args) {
        Stack<String> stacks = new Stack<String>();
        stacks.add("Banana");
        stacks.add("Apple");
        stacks.add("Strawberry");
        //System.out.println(stacks.peek());
        System.out.println("Your Stack = " + stacks);
    }
}