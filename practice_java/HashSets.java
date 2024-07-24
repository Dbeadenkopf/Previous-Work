
// lets practice hashsets which is an unordered collection of elements and contains no duplicates

import java.util.HashSet;
import java.util.Iterator;

public class HashSets {
   
    public static void main(String[] args) {
        HashSet<String> power_r = new HashSet<String>();
        power_r.add("Red Ranger");
        power_r.add("Blue Ranger");
        power_r.add("Pink Ranger");
        power_r.add("Yellow Ranger");
        power_r.add("Black Ranger");

        System.out.println("Here is your Hash Set: " + power_r);

       Iterator p = power_r.iterator();
       System.out.println("The amount of elements in the set is: " + power_r.size());
       if(power_r.isEmpty()){
            System.out.println("This set is empty");
       }else{
            System.out.println("This set is not empty");
       }
    }

}
