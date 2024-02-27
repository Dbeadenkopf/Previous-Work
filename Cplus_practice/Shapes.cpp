#include <iostream>
#include <cmath>

using namespace std;

const double PI = 3.14159;

class Shape {

    public:
        virtual double calculateArea() const = 0;

        virtual double calculatePerimeter() const = 0;

        


};

class Circle: public Shape{


    private:
        double radius;

    public:
        Circle(double rad){
            radius = rad;
        }

        double calculateArea() const override{
            return PI * pow(radius,2);
        }

        double calculatePerimeter() const override{
            return PI * 2 * radius;
        }
   
};

class Triangle : public Shape{
    private:
        double side1;
        double side2;
        double side3;

    public:
        Triangle(double s1, double s2, double s3){
            side1 = s1;
            side2 = s2;
            side3 = s3;
        }
        double calculateArea() const override{
            double s1 = (side1 + side2 + side3)/2;
            return sqrt(s1 * (s1 - side1) * (s1- side2) * (s1 - side3));

        }
        double calculatePerimeter() const override{
            return (side1+side2+side3);
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
            return (length * width);
        }
        double calculatePerimeter() const override{
            return 2 * (length + width);
        }

};




int main(){
    // lets make some instances of some shapes
    Circle myCircle(2.0);
    cout << "The First Shape is circle" << endl;
    cout << "The Area of this circle is : " << myCircle.calculateArea() << endl;
    cout << "The Perimeter of this circle is: " << myCircle.calculatePerimeter() << endl;

    Rectangle myRectangle(2.3,2.4);
    cout << "The second Shape is rectangle " << endl;
    cout << "The area of this rectangle is: " << myRectangle.calculateArea() << endl;
    cout << "The Perimeter of this rectangle is: " << myRectangle.calculatePerimeter() << endl;

    Triangle myTriangle(2.3,2.5,3.4);
    cout << "The final shape is Triangle" << endl;
    cout << "The Area of this traingle is: " << myTriangle.calculateArea() << endl;
    cout << "The Perimeter of this triangle is: " << myTriangle.calculatePerimeter() << endl;

    return 0;
}