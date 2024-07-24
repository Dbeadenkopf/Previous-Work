class Vehicle {
    int speed = 200000000; // variable for speed of vehicle
    byte wheels = 4;    // variable for wheels of vehicle
    short weight = 2000;    // variable for weight of vehicle
    char fuel = 'U'; // variable for fuel type of vehicle
    boolean running = true; // bool variable for determine if vehicle is running or not 
    long sNumber = 12344445655564545656565L; // serial number for vehicle, common practice in java to end long numbers with letter L 
    double remainingFuel = 100.123345543455; // double varible
    float remainingFuelAlso = 100.123345543455f; // float must end with and f
    String carMake = "Toyota"; // this is a non primitive data type because it was made by us the programmer
    Vehicle toy; // the class object which can reference the data types and methods within the class vehicle 
    void acceleration(){ // this is our method
        int countMiles = 0;// we can also delcare data inside our methods 
    }
    Vehicle(){
        speed = 0;
    }

}