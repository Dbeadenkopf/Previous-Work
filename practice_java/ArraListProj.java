/// we will be practicing arrary list in java

import java.util.ArrayList;

public class ArraListProj {

    public static void main(String[] args){
       
        ArrayList<String> producE = new ArrayList<String>();
        
        producE.add("Apple");
        producE.add("Pear");
        producE.add("Banana");

        System.out.println(producE);
        String myFruit = producE.get(1);
        System.out.println(myFruit);
        
    }
}
