// this file will teach inheritance , it will have a parent class bird 
// and child class conure ,
#include <iostream>

using namespace std;
class Bird{
    public:
        virtual int calculateAge() const = 0;
};


class Conure : public Bird{

    public:
    Conure(int A, string N, string T){
        age = A;
        name = N;
        type = T;
    }
    int getAge(){
        return age;
    }
    void setAge(int A){
        age = A;
    }
    string getName(){
        return name;
    }
    void setName(string N){
        name = N;
    }
     string getType(){
        return type;
    }
    void setType(string T){
        type = T;
    }

    int calculateAge() const override{
        return age*3;
    }
    private:
        int age;
        string name;
        string type;
};




int main(){
    Conure myBird(2, "Leon", "Green Cheek Conure");
    cout << "The birds name is: " + myBird.getName() << endl;
    cout << "The birds age is: " << myBird.getAge() << endl;
    cout << "The birds type is: " + myBird.getType() << endl;
    cout << "The birds age in human years is: " << myBird.calculateAge() << endl;




    return 0;
}