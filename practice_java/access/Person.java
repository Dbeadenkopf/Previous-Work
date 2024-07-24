package access;

public class Person {
   public static void main(String[] args) {
        Computer pc = new Computer();
        pc.code();
   }
   private int age;
   public void setAge(int val){
        age = val;
   }
   public int getAge(){
        return age;
   }
   
}

class House{
    public void tenant(){
        Person person = new Person();
        person.setAge(24);
        System.out.println(person.getAge());
    }
}
