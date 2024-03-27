// we will be implementing the FizzBuzz problem
#include <iostream>
#include <vector>
#include <string>
#include <cmath>

const double PI = 3.14159;

using namespace std;



class Shape{

    public:
        // initilized pure vitual function 
        virtual double calculateArea() const = 0; 
        virtual double calculatePerimeter() const = 0;

};


class Circle : public Shape{


    private:
        double radius;
    public:
        Circle(double r){
            radius = r;
        }
        double getR() const{
            return radius;
        }
        double calculateArea() const override{
            return 2 * pow(radius,2);
        }
        double calculatePerimeter() const override{
            return 2 * PI * radius;
        }



};


class Rectangle : public Shape {

    private:
        double length;
        double width;

    public:
        Rectangle(double L, double W){
            length = L;
            width = W;
        }
        double calculateArea() const override{
            return length*width;
        }
        double calculatePerimeter() const override{
            return 2 * (length + width);
        }
};



class Triangle : public Shape{

    private:
        double side1;
        double side2;
        double side3;
    public:
        Triangle(double s1,double s2, double s3){
            side1= s1;
            side2 = s2;
            side3 = s3;
        }
        double calculateArea() const override{
            double s = (side1+side2+side3)/2;  /// first calculate the semi-perimater
            return sqrt(s * (s - side1) * (s - side2) * (s - side3));// Calculate the area using Herons Formula 
        }
        double calculatePerimeter() const override{
            return (side1 + side2 + side3);
        }




};


int main(){
    double my_radius;
    my_radius = 4.0;
    cout << "The first shape is the Circle" << endl;
    Circle myCircle(my_radius);
    cout << "The area of this circle is: " << myCircle.calculateArea() << endl;
    cout << "The perimeter of this circle is: " << myCircle.calculatePerimeter() << endl;


    cout << "\t\tThe next shape is rectangle\t\t" << endl;
    Rectangle myRec(3.0,2.5);
    cout << "The area of this rectangle is: " << myRec.calculateArea() << endl;
    cout << "The perimeter of this rectangle is: " << myRec.calculatePerimeter() << endl;

    cout << "\t\tThe next shape is Traingle\t\t" << endl;
    Triangle myTriangle(2.0,3.4,5.7);
    cout << "The area of this triangle is " << myTriangle.calculateArea() << endl;
    cout << "The Perimeter of this triangle is " << myTriangle.calculatePerimeter() << endl;

    return 0;
    
}