// lets go ahead and practice our hashmapping 
import java.util.*;

import java.util.HashMap;

public class HashMapping {

    public static void main(String[] args) {
        HashMap<Integer, String> produce = new HashMap<Integer, String>();
        HashMap<Integer, String> meats = new HashMap<Integer, String>();
        produce.put(1, "Apple");
        produce.put(2, "Grapes");
        produce.put(3, "Lemons");
        produce.put(4, "Potatoes");
        produce.put(5, "Carrots");
        int numberOfValues = produce.size();
        System.out.println("The produce hashmap: ");
        for(Map.Entry x: produce.entrySet()){
            System.out.println(x.getKey() + " " + x.getValue());
        }
        System.out.println("The number of values in this hashmap is: " + numberOfValues);
        meats.put(6, "chicken");
        meats.put(7, "groundbeef");
        meats.put(8, "ribs");
        meats.putAll(produce);
        System.out.println("The combined Hashmaps of produce and meats: ");
        for(Map.Entry x: meats.entrySet()){
            System.out.println(x.getKey() + " " + x.getValue());
        }
    }
}
