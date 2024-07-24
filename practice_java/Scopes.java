public class Scopes {
    public static void main(String[] args) {
        Person one = new Person();
        Person two = new Person();
        one.planet = "Earth";
        //two.planet = "Mars";
        one.age = 12;
        two.age = 34;
        System.out.println(one.planet);
        System.out.println(Person.planet);
        System.out.println(two.age);
        System.out.println(one.age);
    }
}



class Person{
    int age;
    static String planet;
    public void move(int distance){
        {
            int x = 12;
            distance = 10;
        }

    }
}
