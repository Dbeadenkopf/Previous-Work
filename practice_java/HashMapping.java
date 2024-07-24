import java.util.*;
// lets write a program to copy the contents of one hashmap to another 
public class HashMapping {
    public static void main(String[] args) {
        HashMap<Integer, String> power_Ranger1 = new HashMap<Integer, String>();
        HashMap<Integer, String> power_Ranger2 = new HashMap<Integer, String>();

        power_Ranger1.put(1, "Red Ranger");
        power_Ranger1.put(2, "Blue Ranger");
        power_Ranger1.put(3, "Pink Ranger");
        power_Ranger1.put(4, "Yellow Ranger");
        power_Ranger1.put(5, "Black Ranger");
       
        System.out.println("Here is your first hashmap:  " + power_Ranger1);

        power_Ranger2.put(6, "Green Ranger");
        power_Ranger2.put(7, "White Ranger");
        System.out.println("Here is your second hashmap: " + power_Ranger2);

        // now combining all of the first hashmap into the second
        power_Ranger2.putAll(power_Ranger1);

        System.out.println("Combined the two hashmaps: ");
        for(Map.Entry x: power_Ranger2.entrySet()){
            System.out.println(x.getKey() + " " + x.getValue());
        }
        
        
    }
}
