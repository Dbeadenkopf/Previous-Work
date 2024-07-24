// lets use this class to practice our constructor 
import java.util.*;


public class Constructors{

    public static void main(String[] args) {
        Conure myBird = new Conure(2, "Leon", "Green Cheek Conure");
        System.out.println("Here is the birds age: " + myBird.getAge());
        System.out.println("Here is the birds Name: " + myBird.getName());
        System.out.println("Here is the birds Description: " + myBird.getDesc());
        System.out.println("Here is the age in human years: " + myBird.calculateAge());
        myBird.Talk();
    }
}


class Bird{

    public int calculateAge(){
        return 0;
    }

    public void Talk(){
        System.out.println("Peekaboo!");
    }

};


class Conure extends Bird{

    
    Conure(int A, String N, String D){
        age = A;
        name = N;
        Description = D;
    }

    public int getAge(){
        return age;
    }

    public String getName(){
        return name;
    }

    public String getDesc(){
        return Description;
    }

    public void setAge(int A){
        age = A;
    }

    public void setName(String N){
        name = N;
    }


    public void setDesc(String D){
        Description = D;
    }

    public int calculateAge(){
        return age*3;
    }

    public void Talk(){
        System.out.println("PeekaBoo!");
    }

    private int age;
    private String name;
    private String Description;

};
