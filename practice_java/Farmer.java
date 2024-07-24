public class Farmer{
    public static void main(String[] args) {
        Pickle pickle = new Pickle();
        pickle.grow();        
    }
}

// we are going to practice inheritance 
class Cucumber{
    double calories;
    public void grow(){
        System.out.println("The cucumber is growing ");
    }
}

class Pickle extends Cucumber{
    Pickle(){
        calories = 0.70 * calories;
    }
}