// we will be practicing a queue which is essentially a linkedlist data structure 
// but it allows for first in , first out structure that is the first element added will be the first
// element to be shown or come from the queue
import java.util.LinkedList;
import java.util.Queue;


public class QueueExample {
   public static void main(String[] args) {
     Queue<String> produce = new LinkedList<String>();
     produce.offer("Banana");
     produce.offer("Apple");
     produce.offer("Lemon");

     produce.poll();
     produce.poll();
     produce.poll();
     produce.offer("Strawberry");

     //System.out.println("Here is your queue: " + produce);
     produce.offer("Grapes");
     produce.offer("Cherries");
     System.out.println("Here is your new queue: " + produce);
     if(produce.isEmpty()){
         System.out.println("Your Queue is empty");
     }else{
         System.out.println("Your Queue is not empty");
     }

    
        
        
            
   }
}
